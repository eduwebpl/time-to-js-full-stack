import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const orderService = {
  async placeAnOrderByUser({ userId, restaurantId, productsIds, address }) {
    const products = await prisma.product.findMany({
      where: {
        id: { in: productsIds },
        restaurant: { is: { id: restaurantId } },
      },
    })
    if (products.length !== productsIds.length) {
      const err = new Error(
        'All ordered products must be from the same restaurant'
      )
      err.status = 400
      throw err
    }
    const productForOrder = products.map(({ id, price }) => ({
      price,
      product: {
        connect: { id },
      },
    }))
    return prisma.order.create({
      data: {
        userId,
        restaurantId,
        delivery: {
          create: { address },
        },
        products: {
          create: productForOrder,
        },
      },
    })
  },
}
