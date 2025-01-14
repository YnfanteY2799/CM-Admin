import { prisma } from "@/db";
import type { TConsumableAction, ISessionUser } from "@/types/common";

export async function getUserByEmail(email?: string): Promise<TConsumableAction<ISessionUser>> {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        verified_email: true,
        hashed_password: true,
        Account_Status: { select: { name: true } },
      },
    });
    if (!user) return { message: "udn" };
    return { data: user };
  } catch (e) {
    return { message: "ecdb" };
  }
}
