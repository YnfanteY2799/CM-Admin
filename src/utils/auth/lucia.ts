import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia, TimeSpan } from "lucia";
import { prisma } from "@/db";

const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(3, "d"),
  sessionCookie: { attributes: { secure: process.env.NODE_ENV === "production" } },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    //     DatabaseUserAttributes: DatabaseUserAttributes;
    //     DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}
