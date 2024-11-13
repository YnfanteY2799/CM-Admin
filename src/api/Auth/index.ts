"use server";
import { getUserByEmail, globalPOSTRateLimit, RefillingTokenBucket, Throttler } from "@/utils/server";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { cookies, headers } from "next/headers";

import type { PassKeyCredentialsObj } from "@/types/common";
import type { TLoginFS } from "@/utils/common";

const throttler = new Throttler<number>([1, 2, 4, 8, 16, 30, 60, 180, 300]);
const ipBucket = new RefillingTokenBucket<string>(20, 1);

// TODO: Assumes X-Forwarded-For is always included.
export async function serviceBasedLogin({ email, password }: TLoginFS): Promise<Omit<any, "JWT">> {
  if (!globalPOSTRateLimit()) return { response: "not logged" };

  const clientIP = (await headers()).get("X-Forwarded-For");
  if (clientIP !== null && !ipBucket.check(clientIP, 1)) return { message: "Too many requests" };

  const user = await getUserByEmail(email);
  console.log({ user });
  if (!user) return { message: "user not exists" };
  if (!throttler.consume(user.id)) return { message: "Too many requests" };

  return { response: "logged" };
}

export async function passKeyBasedLogin(data: PassKeyCredentialsObj): Promise<any> {
  if (!globalPOSTRateLimit()) return false;

  const parser = new ObjectParser(data);
  console.log({ data });

  return true;
}
