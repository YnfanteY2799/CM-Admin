"use server";
import { ObjectParser } from "@pilcrowjs/object-parser";
import { globalPOSTRateLimit } from "@/utils/server";
import { cookies } from "next/headers";

import type { PassKeyCredentialsObj } from "@/types/common";
import type { TLoginFS } from "@/utils/common";

export async function serviceBasedLogin(data: TLoginFS): Promise<Omit<any, "JWT">> {
  return { response: "logged" };
}

export async function passKeyBasedLogin(data: PassKeyCredentialsObj): Promise<boolean> {
  if (!globalPOSTRateLimit()) return false;

  const parser = new ObjectParser(data);
  console.log({ data });

  return true;
}
