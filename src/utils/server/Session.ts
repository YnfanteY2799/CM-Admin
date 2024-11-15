import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { prisma } from "@/db";
import { cache } from "react";

import type { SessionValidationResult, ISession, ISessionUser } from "@/types/common";

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);
  return encodeBase32LowerCaseNoPadding(tokenBytes);
}

export async function validateSessionToken(id: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(id)));
  const dbSession = await prisma.session.findFirst({
    select: { id: true, user_id: true, expires_at: true, two_factor_verified: true },
    where: { id },
  });
  if (!dbSession) return { session: null, user: null };

  const session: ISession = {
    twoFactorVerified: dbSession.two_factor_verified,
    expires_at: dbSession.expires_at,
    user_id: dbSession.user_id,
    id: dbSession.id,
  };

  const user: ISessionUser = {
    id: row.number(4),
    email: row.string(5),
    username: row.string(6),
    emailVerified: Boolean(row.number(7)),
    registeredTOTP: Boolean(row.number(8)),
    registeredPasskey: Boolean(row.number(9)),
    registeredSecurityKey: Boolean(row.number(10)),
    registered2FA: false,
  };
  if (user.registeredPasskey || user.registeredSecurityKey || user.registeredTOTP) user.registered2FA = true;

  if (Date.now() >= session.expires_at.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const expires_at = Math.floor(session.expires_at.getTime() / 1000);
    await prisma.session.update({ data: { expires_at: new Date() }, where: { id: sessionId } });
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateUserSessions(user_id: number): Promise<void> {
  await prisma.session.delete({ where: { user_id } });
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = (await cookies()).get("session")?.value ?? null;
  if (!token) return { session: null, user: null };
  return await validateSessionToken(token);
});

export async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
  (await cookies()).set("session", token, {
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  (await cookies()).set("session", "", {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}
