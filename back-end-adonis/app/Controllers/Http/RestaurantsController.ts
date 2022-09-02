import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RestaurantsController {
  public async index({ request }: HttpContextContract) {
    return [{ query: request.qs() }]
  }

  public async store({ request }: HttpContextContract) {
    return { id: 100, body: request.body() }
  }

  public async show({ params }: HttpContextContract) {
    return params
  }

  public async update({ request }: HttpContextContract) {
    return { body: request.body() }
  }

  public async destroy({ params }: HttpContextContract) {
    return params
  }
}
