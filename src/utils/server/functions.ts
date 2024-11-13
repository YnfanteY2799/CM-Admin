"use server";
import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { hash, verify } from "@node-rs/argon2";
import { sha1 } from "@oslojs/crypto/sha1";

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

export async function verifyPasswordStrength(password: string): Promise<boolean> {
  if (password.length < 8 || password.length > 255) return false;

  const hash = encodeHexLowerCase(sha1(new TextEncoder().encode(password)));
  const hashPrefix = hash.slice(0, 5);
  const response = await fetch(`https://api.pwnedpasswords.com/range/${hashPrefix}`);
  const data = await response.text();
  const items = data.split("\n");
  for (const item of items) {
    const hashSuffix = item.slice(0, 35).toLowerCase();
    if (hash === hashPrefix + hashSuffix) return false;
  }
  return true;
}
