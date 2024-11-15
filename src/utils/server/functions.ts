"use server";
import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { hash, verify } from "@node-rs/argon2";

export async function generateRandomSalt(): Promise<string> {
  return generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
}

export async function generateToken(): Promise<string> {
  return generateRandomString(12, alphabet("a-z", "A-Z", "0-9"));
}

export async function generateDate(ammount: number, unit: TimeSpanUnit): Promise<Date> {
  return createDate(new TimeSpan(ammount, unit));
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 });
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
  return await verify(hash, password);
}
