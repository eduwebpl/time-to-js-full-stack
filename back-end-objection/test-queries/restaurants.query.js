import { knex } from '../src/database/connection.js'

const restaurants = await knex('restaurants')

await knex.destroy();

console.log(restaurants)
