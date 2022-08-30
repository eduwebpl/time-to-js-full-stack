import { knex } from '../src/database/connection.js'
import { Restaurant } from '../src/models/Restaurant.js';

const restaurants = await Restaurant.query()

await knex.destroy();

console.log(restaurants)
