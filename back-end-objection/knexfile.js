// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './src/database/objection-dev-base.sqlite3'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    } ,
    pool: {
      afterCreate: (knex, cb) => knex.run("PRAGMA foreign_keys = ON", cb)
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.MYSQL_DB_CONNECTION_URL,
    migrations: {
      directory: './src/database/migrations'
    },
    // Only for MySQL "showcase" !!!
    // Do not really include production seed in real project
    seeds: {
      directory: './src/database/seeds'
    }
  }

};
