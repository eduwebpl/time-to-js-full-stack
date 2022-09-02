import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  public async store({ params, request }: HttpContextContract) {
    return { body: request.body(), params }
  }

  public async update({ params, request }: HttpContextContract) {
    return { body: request.body(), params }
  }

  public async destroy({ params }: HttpContextContract) {
    return { params }
  }
}
