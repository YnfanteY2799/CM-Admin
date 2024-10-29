import type { Session, User } from "@prisma/client";

export interface DatabaseUserAttributes extends User {
  email: User["email"];
}

export interface DatabaseSessionAttributes {
  user_id: Session["user_id"];
}
