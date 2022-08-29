import { knex } from './database/connection.js'

const restaurants = await knex('restaurants').where({id: 12}).first()

await knex.destroy();

console.log(restaurants)
