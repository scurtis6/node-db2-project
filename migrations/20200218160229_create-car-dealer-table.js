
exports.up = function(knex) {
  return knex.schema
  .createTable('cars', function(cars) {
      cars.increments();
      cars.string('VIN', 50)
        .notNullable()
        .index();
      cars.string('make', 50)
        .notNullable()
        .index();
      cars.string('model', 50)
        .notNullable()
        .index();
      cars.integer('carmiles')
        .notNullable();  
      cars.string('transtype', 50);
      cars.string('titlestatus', 50);
  })
  .createTable('sales', function(sales) {
    sales.increments();
    sales.text('text').notNullable();

    sales
      .integer('car_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sales').dropTableIfExists('cars');
};
