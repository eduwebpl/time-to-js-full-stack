import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrdersController {
  public async index({}: HttpContextContract) {
    return []
  }

  public async store({ request }: HttpContextContract) {
    return { body: request.body() }
  }

  public async show({ params }: HttpContextContract) {
    return { params }
  }
}
