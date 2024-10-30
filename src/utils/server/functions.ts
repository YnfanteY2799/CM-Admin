"use server";
import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export async function generateRandomSalt(): Promise<string> {
  return generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
}

export async function generateToken(): Promise<string> {
  return generateRandomString(12, alphabet("a-z", "A-Z", "0-9"));
}

export async function generateDate(ammount: number, unit: TimeSpanUnit): Promise<Date> {
  return createDate(new TimeSpan(ammount, unit));
}
