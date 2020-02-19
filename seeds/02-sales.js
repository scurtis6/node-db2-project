
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {car_id: 1, text: 'This car has been looked at'},
        {car_id: 1, text: 'This car may sell quickly'},
        {car_id: 2, text: 'this car is sold'}
      ]);
    });
};
