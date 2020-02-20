const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSales,
    add,
    update,
    remove,
    addSale
}
function find() {
    return db('cars')
}

function findById(id) {
    return db('cars')
    .where('id', id)
}

function findSales(id) {
    return db('cars as c')
    .join('sales as s', 's.car_id', 'c.id')
    .select('s.id', 's.text')
    .where('c.id', id)
    // .orderBy('st.car_number')
}

function add(car) {
    return db('cars')
    .insert(car, 'id')
    // .where({ id: ids[0] })
}

function addSale(sale, sale_id) {
    newSale = {...sale, sale_id}
    return db('cars')
    .insert(newSale)
}

function update(changes, id) {
    return db('cars')
    .where('cars.id', id)
    .update(changes)
}

function remove(id) {
    return db('cars')
    .where('id', id)
    .del()
}
