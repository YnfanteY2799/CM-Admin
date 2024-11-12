import { createWebAuthnChallengeAction } from "@/api";
import { decodeBase64 } from "@oslojs/encoding";

export async function createChallenge(): Promise<Uint8Array> {
  const encoded = await createWebAuthnChallengeAction();
  return decodeBase64(encoded);
}
