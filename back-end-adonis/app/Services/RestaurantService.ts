import prisma from '@ioc:Orm/Prisma'
import { Restaurant } from '@prisma/client'

export class RestaurantService {
  public async getAllRestaurants(): Promise<Restaurant[]> {
    return prisma.restaurant.findMany({})
  }
}
