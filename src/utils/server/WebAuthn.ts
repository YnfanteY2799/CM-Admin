import { encodeHexLowerCase } from "@oslojs/encoding";

const challengeBucket = new Set<string>();

export function createWebAuthnChallenge(): Uint8Array {
  const challenge = new Uint8Array(20);
  crypto.getRandomValues(challenge);
  const encoded = encodeHexLowerCase(challenge);
  challengeBucket.add(encoded);
  return challenge;
}

export function verifyWebAuthnChallenge(challenge: Uint8Array): boolean {
  const encoded = encodeHexLowerCase(challenge);
  return challengeBucket.delete(encoded);
}
