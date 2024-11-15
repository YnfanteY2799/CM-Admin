import type { User } from "@prisma/client";

export interface PassKeyCredentialsObj {
  id: string;
  json: string;
  data: string;
  signature: string;
}

export type TConsumableAction<G> = { message: string } | G;

export interface ISessionUser extends Omit<User, "create_time" | "update_time" | "status_id"> {}
