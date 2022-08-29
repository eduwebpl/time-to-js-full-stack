import Knex from 'knex'
import knexfile from '../../knexfile.js';

const env = process.env.NODE_NEV || 'development'

export const knex = Knex(knexfile[env])
