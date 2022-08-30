import { knex } from '../src/database/connection.js'

const orders = await knex('orders')
const computedOrders = [];
for (const order of orders) {
	order.user = await knex('users').where({id: order.user_id }).first()
	order.restaurant = await knex('restaurants').where({id: order.restaurant_id }).first()
	order.delivery = await knex('deliveries').where({ order_id: order.id }).first()
	computedOrders.push(order)
}

await knex.destroy();

console.log(computedOrders)
