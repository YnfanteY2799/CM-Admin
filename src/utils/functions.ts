import { type TimeSpanUnit, TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function generateRandomSalt(): string {
  return generateRandomString(16, alphabet("a-z", "A-Z", "0-9"));
}

export function generateToken(): string {
  return generateRandomString(12, alphabet("a-z", "A-Z", "0-9"));
}

export function generateDate(ammount: number, unit: TimeSpanUnit): Date {
  return createDate(new TimeSpan(ammount, unit));
}
