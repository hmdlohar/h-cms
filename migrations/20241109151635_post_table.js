/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('slug').notNullable().unique();
        table.text('bodyhtml').notNullable();
        table.timestamps(true, true);
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('posts');
};
