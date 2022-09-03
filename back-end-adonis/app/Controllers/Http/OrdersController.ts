import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import orderService from '@ioc:Services/OrderService'

export default class OrdersController {
  public async index({ request }: HttpContextContract) {
    return orderService.getAllOrdersForUser(request.user.id)
  }

  public async store({ request }: HttpContextContract) {
    const { address, productsIds, restaurantId } = request.body()
    return orderService.placeAnOrderByUser({
      userId: request.user.id,
      address,
      productsIds,
      restaurantId,
    })
  }

  public async show({ params, request }: HttpContextContract) {
    return orderService.getOrderForUser(request.user.id, params.orderId)
  }
}
