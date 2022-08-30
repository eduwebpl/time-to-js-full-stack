import { knex } from '../src/database/connection.js'
import { Restaurant } from '../src/models/Restaurant.js';

try {
	const restaurant = await Restaurant.query().findById(2).throwIfNotFound({
		message: 'Restaurant not exist'
	})
	await restaurant.$query().del()
	console.log(restaurant)
} catch( e ) {
	console.error('There is error:')
	console.log(e)
}
await knex.destroy();


