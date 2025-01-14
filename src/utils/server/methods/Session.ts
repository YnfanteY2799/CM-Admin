import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { prisma } from "@/db";
import { cache } from "react";

import type { SessionValidationResult, ISession, ISessionUser, ISessionFlags } from "@/types/common";

export function generateSessionToken(): string {
  const tokenBytes = new Uint8Array(20);
  crypto.getRandomValues(tokenBytes);
  return encodeBase32LowerCaseNoPadding(tokenBytes);
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = (await cookies()).get("session")?.value ?? null;
  if (!token) return { session: null, user: null };
  return await validateSessionToken(token);
});

export async function createSession(token: string, user_id: number, flags: ISessionFlags): Promise<ISession> {
  const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: ISession = {
    id,
    user_id,
    twoFactorVerified: flags.twoFactorVerified,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await prisma.session.create({
    data: {
      id,
      user_id,
      two_factor_verified: flags.twoFactorVerified,
      expires_at: Math.floor(session.expires_at.getTime() / 1000).toString(),
    },
  });

  return session;
}

export async function validateSessionToken(id: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(id)));
  const dbSession = await prisma.session.findFirst({
    where: { id },
    select: {
      id: true,
      user_id: true,
      expires_at: true,
      two_factor_verified: true,
      user: {
        select: {
          email: true,
          username: true,
          verified_email: true,
          TOTPCredentials: { select: { id: true } },
          PassKeyCredentials: { select: { id: true }, take: 1 },
          SecurityKeysCredentials: { select: { id: true }, take: 1 },
        },
      },
    },
  });

  if (!dbSession) return { session: null, user: null };

  const session: ISession = {
    twoFactorVerified: dbSession.two_factor_verified,
    expires_at: dbSession.expires_at,
    user_id: dbSession.user_id,
    id: dbSession.id,
  };

  const user: ISessionUser = {
    registered2FA: false,
    id: dbSession.user_id,
    email: dbSession.user.email,
    username: dbSession.user.username,
    verified_email: dbSession.user.verified_email,
    registeredTOTP: !!dbSession.user.TOTPCredentials,
    registeredPasskey: dbSession.user.PassKeyCredentials.length > 0,
    registeredSecurityKey: dbSession.user.PassKeyCredentials.length > 0,
  };
  if (user.registeredPasskey || user.registeredSecurityKey || user.registeredTOTP) user.registered2FA = true;

  if (Date.now() >= session.expires_at.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  if (Date.now() >= session.expires_at.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    const expires_at = Math.floor(session.expires_at.getTime() / 1000).toString();
    await prisma.session.update({ data: { expires_at }, where: { id: sessionId } });
  }

  return { session, user };
}

export async function invalidateSession(id: string): Promise<void> {
  await prisma.session.delete({ where: { id } });
}

export async function setSessionAs2FAVerified(id: string): Promise<void> {
  await prisma.session.update({ where: { id }, data: { two_factor_verified: true } });
}

export async function invalidateUserSessions(user_id: number): Promise<void> {
  //   await prisma.session.delete({ where: { user_id } });
}

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
