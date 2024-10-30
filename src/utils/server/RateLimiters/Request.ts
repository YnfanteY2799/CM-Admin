import { RefillingTokenBucket } from "../classes.ts";
import { headers } from "next/headers";

export const globalBucket = new RefillingTokenBucket<string>(100, 1);

export function globalGETRateLimit(): boolean {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 1);
}

export function globalPOSTRateLimit(): boolean {
  // Note: Assumes X-Forwarded-For will always be defined.
  const clientIP = headers().get("X-Forwarded-For");
  if (clientIP === null) {
    return true;
  }
  return globalBucket.consume(clientIP, 3);
}
