/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.alterTable('deliveries', table => {
	    table.text('address')
	    table.enum('status', ['IN_PROGRESS', 'DELIVERED', 'CANCELLED']).defaultTo('IN_PROGRESS')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	await knex.schema.alterTable('deliveries', table => {
		table.dropColumns('address', 'status')
	})
}
