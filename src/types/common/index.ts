import type { User } from "@prisma/client";

export interface PassKeyCredentialsObj {
  id: string;
  json: string;
  data: string;
  signature: string;
}

export type TConsumableAction<G> = { message: string } | G;

export interface ISessionUser extends Omit<User, "create_time" | "update_time" | "status_id"> {}

export interface SessionFlags {
  twoFactorVerified: boolean;
}

export interface ISession extends SessionFlags {
  id: string;
  user_id: number;
  expires_at: Date;
}

export type SessionValidationResult = { session: ISession; user: User } | { session: null; user: null };
