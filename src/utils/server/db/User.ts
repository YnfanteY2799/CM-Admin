import { prisma } from "@/db";

export async function getUserByEmail(email?: string): Promise<any> {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      select: { email: true, hashed_password: true, Account_Status: { select: { name: true } } },
    });
    console.log({ user });
    if (!user) return { message: "User does not exists" };
    return user;
  } catch (e) {
    console.log({ e });
    return { message: "Error" };
  }
}
