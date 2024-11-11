import { hash, verify } from "@node-rs/argon2";

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 });
}

export async function verifyPasswordHash(hash: string, password: string): Promise<boolean> {
  return await verify(hash, password);
}

export async function verifyPasswordStrength(password: string): Promise<boolean> {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
}