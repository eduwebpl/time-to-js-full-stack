declare module '@ioc:Services/OrderService' {
  import { OrderService } from 'App/Services/OrderService'

  const orderService: OrderService

  export default orderService
}

declare module '@ioc:Services/RestaurantService' {
  import { RestaurantService } from 'App/Services/RestaurantService'

  const restaurantService: RestaurantService

  export default restaurantService
}
