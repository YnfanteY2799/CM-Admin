import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { prisma } from "@/db";

import type { SessionValidationResult, ISession } from "@/types/common";

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
    id: dbSession.id,
    user_id: dbSession.user_id,
    expires_at: dbSession.expires_at,
    twoFactorVerified: dbSession.two_factor_verified,
  };

  const user: User = {
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
    db.execute("UPDATE session SET expires_at = ? WHERE session.id = ?", [
      Math.floor(session.expiresAt.getTime() / 1000),
      sessionId,
    ]);
  }
  return { session, user };
}
