import Knex from 'knex'
import knexfile from '../../knexfile.js';
import { Model, knexSnakeCaseMappers } from 'objection'

const env = process.env.NODE_ENV || 'development'

export const knex = Knex({
	...knexfile[env],
	...knexSnakeCaseMappers()
})

Model.knex(knex)
