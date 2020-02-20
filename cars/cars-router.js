const express = require('express');

const Cars = require('./cars-model')

const router = express.Router();

router.get('/', (req, res) => {
    // db('cars')
    Cars.find()
    .then(cars => {
        res.json(cars)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve cars' })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // db('cars')
    // .where({ id })
    Cars.findById(id)
    .first()
    .then(car => {
        res.json(car)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve fruit by id' })
    })
});

router.get('/:id/sales', (req, res) => {
    // db('sales as s')
    // .join('cars as c', 's.car_id', 'c.id')
    // .select('s.text', 'c.id')
    // .where({ car_id: req.params.id })
    const { id } = req.params;

    Cars.findSales(id)
    .then(sale => {
        if(sale.length) {
            res.json(sale);
        } else {
            res.status(404).json({ errorMessage: 'Could not find sales for this ID' })
        }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error retrieving sales'})
    })
});

router.post('/', (req, res) => {
    // db('cars')
    // .insert(req.body)
    // .then(ids => {
    //     db('cars')
    //     .where({ id: ids[0] })
    Cars.add(req.body)
    .then(newcar => {
        res.status(201).json(newcar)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to add car data' })
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    // db('cars')
    // .where({ id })
    Cars.findById(id)
    .then(car => {
        if (car) {
            Cars.update(changes, id)
            .then(updated => {
                res.json(car)
            })
        } else {
            res.status(404).json({ error: 'Failed to update car data' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to update the car' })
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    // db('cars')
    // .where({ id })
    // .del()
    Cars.remove(id)
    .then(del => {
        if (del) {
            res.json({ removed: del });
    } else {
      res.status(404).json({ message: 'Could not find car with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to remove the car' })
    })
});

module.exports = router;