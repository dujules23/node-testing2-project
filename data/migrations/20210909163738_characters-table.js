
exports.up = function(knex) {
  return knex.schema.createTable("characters", tbl => {
    tbl.increments()

    tbl.string("name", 225).unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("characters")
};
