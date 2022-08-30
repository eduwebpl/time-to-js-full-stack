import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const restaurants = await prisma.restaurant.findMany({})

await prisma.$disconnect();

console.log(restaurants)
