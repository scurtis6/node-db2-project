const express = require('express');

const db = require('../data/dbConfig');


const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve cars' })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where({ id })
    .first()
    .then(car => {
        res.json(car)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve fruit by id' })
    })
});

router.get('/:id/sales', (req, res) => {
    db('sales as s')
    .join('cars as c', 's.car_id', 'c.id')
    .select('s.text', 'c.id')
    .where({ car_id: req.params.id })
    .then(sale => {
      res.status(200).json(sale);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error retrieving sales'})
    })
});

// router.get("/sales/:id", (req, res) => {
//     const { id } = req.params;
//     Cars
//       .getCarSales(id)
//       .then(carsposts => {
//         res.status(200).json(carsposts);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ errormessage: "error getting all sales by car id" });
//       });
// });

router.post('/', (req, res) => {
    db('cars')
    .insert(req.body)
    .then(ids => {
        db('cars')
        .where({ id: ids[0] })
        .then(newcar => {
            res.status(201).json(newcar)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to add car data' })
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    db('cars')
    .where({ id })
    .update(changes)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to update the car' })
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('cars')
    .where({ id })
    .del()
    .then(del => {
        res.status(200).json(del)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to remove the car' })
    })
});

module.exports = router;