import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const orders = await prisma.order.findMany({ include: {
	user: true,
		restaurant: true,
		delivery: true,
		products: true
} })

await prisma.$disconnect();

console.log(orders)
console.log(JSON.stringify(orders, null, 4))

