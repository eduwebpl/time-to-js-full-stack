import prisma from '@ioc:Orm/Prisma'
import { Restaurant } from '@prisma/client'

export class RestaurantService {
  public async getAllRestaurants(): Promise<Restaurant[]> {
    return prisma.restaurant.findMany({})
  }

  public async getOneRestaurant(restaurantId: number) {
    return prisma.restaurant.findFirstOrThrow({
      where: { id: restaurantId },
      include: {
        products: true,
      },
    })
  }
}
