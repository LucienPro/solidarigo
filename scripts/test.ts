import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const associations = await prisma.association.findMany();
  console.log("Associations:", associations);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
