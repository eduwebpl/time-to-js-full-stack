import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import orderService from '@ioc:Services/OrderService'

export default class OrdersController {
  public async index({}: HttpContextContract) {
    return orderService.getAllOrdersForUser(1)
  }

  public async store({ request }: HttpContextContract) {
    const { address, productsIds, restaurantId } = request.body()
    return orderService.placeAnOrderByUser({ userId: 1, address, productsIds, restaurantId })
  }

  public async show({ params }: HttpContextContract) {
    return { params }
  }
}
