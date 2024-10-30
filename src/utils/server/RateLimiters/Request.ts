"use server";
import { RefillingTokenBucket } from "../classes.ts";
import { headers } from "next/headers";

export const globalBucket = new RefillingTokenBucket<string>(100, 1);

export async function globalGETRateLimit(): Promise<boolean> {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 1);
}

export async function globalPOSTRateLimit(): Promise<boolean> {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 3);
}
