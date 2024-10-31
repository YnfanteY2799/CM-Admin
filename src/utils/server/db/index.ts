import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: { prismaGlobal: ReturnType<typeof prismaClientSingleton> } & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { PrismaClient };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
