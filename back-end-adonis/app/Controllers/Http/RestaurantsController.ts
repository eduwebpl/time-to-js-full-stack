import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { updateRestaurantDtoSchema } from 'App/DTOs/restaurant-dto.schema'
import RestaurantValidator from 'App/Validators/RestaurantValidator'

export default class RestaurantsController {
  public async index({ request }: HttpContextContract) {
    return [{ query: request.qs() }]
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
