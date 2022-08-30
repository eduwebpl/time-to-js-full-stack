import { knex } from '../src/database/connection.js'
import { Order } from '../src/models/Order.js';

const orders = await Order.query().withGraphFetched('[user, restaurant, products,delivery]')

await knex.destroy();

console.log(orders)
console.log(JSON.stringify(orders, null, 4))
