/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world !!' }
})

Route.resource('/restaurants', 'RestaurantsController')
  .apiOnly()
  .paramFor('restaurants', 'restaurantId')
  .where('restaurantId', Route.matchers.number())

Route.resource('restaurants.products', 'ProductsController')
  .only(['store', 'update', 'destroy'])
  .paramFor('restaurants', 'restaurantId')
  .paramFor('products', 'productId')
  .where('restaurantId', Route.matchers.number())
  .where('productId', Route.matchers.number())

Route.resource('/orders', 'OrdersController')
  .middleware({
    '*': 'auth',
  })
  .only(['index', 'store', 'show'])
  .paramFor('orders', 'orderId')
  .where('orderId', Route.matchers.number())

Route.post('/users/sign-in', 'UsersController.signIn')
