"use server";

import { TLoginFS } from "@/utils/common";
import { cookies } from "next/headers";

export async function serviceBasedLogin(data: TLoginFS): Promise<Omit<any, "JWT">> {
  return { response: "logged" };
}
