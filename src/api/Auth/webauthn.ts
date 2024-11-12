"use server";

import { RefillingTokenBucket, createWebAuthnChallenge } from "@/utils/server";
import { encodeBase64 } from "@oslojs/encoding";
import { headers } from "next/headers";

const webauthnChallengeBucket = new RefillingTokenBucket<string>(30, 10);

export async function createWebAuthnChallengeAction(): Promise<string> {
  const clientIP = (await headers()).get("X-Forwarded-For");
  if (clientIP !== null && !webauthnChallengeBucket.consume(clientIP, 1)) throw new Error("Too many requests");
  const challenge = createWebAuthnChallenge();
  return encodeBase64(challenge);
}
