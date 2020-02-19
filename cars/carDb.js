const db = require('../data/dbConfig');

module.exports ={
    getCarSales
}

function getCarSales(carId) {
    return db('sales as s')
      .join('cars as c', 'c.id', 's.car_id')
      .select('s.id', 's.text', 'c.name as postedBy')
      .where('s.car_id', carId);
  }