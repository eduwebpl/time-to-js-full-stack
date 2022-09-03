import { HttpException } from '@adonisjs/http-server/build/src/Exceptions/HttpException'
import prisma from '@ioc:Orm/Prisma'

export class OrderService {
  public async getAllOrdersForUser(userId: number) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        products: true,
        delivery: true,
        restaurant: true,
      },
    })
  }

  public async placeAnOrderByUser({
    userId,
    restaurantId,
    productsIds,
    address,
  }: {
    userId: number
    restaurantId: number
    productsIds: number[]
    address: string
  }) {
    const products = await prisma.product.findMany({
      where: {
        id: { in: productsIds },
        restaurant: { is: { id: restaurantId } },
      },
    })
    if (products.length !== productsIds.length) {
      throw new HttpException('All ordered products must be from the same restaurant', 400)
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
  }

  public async getOrderForUser(userId: number, orderId: number) {
    return prisma.order.findFirstOrThrow({ where: { userId, id: orderId } })
  }
}
