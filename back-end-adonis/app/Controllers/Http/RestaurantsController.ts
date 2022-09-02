import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import restaurantService from '@ioc:Services/RestaurantService'
import { updateRestaurantDtoSchema } from 'App/DTOs/restaurant-dto.schema'
import RestaurantValidator from 'App/Validators/RestaurantValidator'
import { Restaurant } from '@prisma/client'

export default class RestaurantsController {
  public async index({}: HttpContextContract): Promise<Restaurant[]> {
    return restaurantService.getAllRestaurants()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(RestaurantValidator)

    return { id: 100, payload }
  }

  public async show({ params }: HttpContextContract) {
    return params
  }

  public async update({ request }: HttpContextContract) {
    await request.validateAjv(updateRestaurantDtoSchema)

    return { payload: request.body() }
  }

  public async destroy({ params }: HttpContextContract) {
    return params
  }
}
