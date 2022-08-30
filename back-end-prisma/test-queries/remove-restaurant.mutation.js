import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

try {
	const restaurant = await prisma.restaurant.delete({where: {id: 2}})
	console.log(restaurant)
} catch( e ) {
	console.error('There is error:')
	console.log(e)
}
await prisma.$disconnect();


