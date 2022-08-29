import { knex } from '../src/database/connection.js'

try {
	const result = await knex('restaurants').where('id', 2).del()
	console.log(result)
} catch( e ) {
	console.error('There is error:')
	console.log(e)
}
await knex.destroy();


