import { knex } from '../src/database/connection.js'

const orders = await knex('orders').leftJoin('users', { 'orders.user_id': 'users.id'})

await knex.destroy();

console.log(orders)
