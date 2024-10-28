import { commonStatus, tokenTypes } from "./resources";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const Tokens = await prisma.token_Type.createMany({ data: tokenTypes, skipDuplicates: true });
    const accountStatus = await prisma.account_Status.createMany({ data: commonStatus, skipDuplicates: true });

    console.log({ Tokens, accountStatus });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

(async () => {
  await main();
  await prisma.$disconnect();
  process.exit();
})();
