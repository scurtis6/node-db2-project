const express = require('express');

const Sales = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body)
    Sales('sales')
    .then(sales => {
        res.json(sales)
        console.log(sales)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve sales' })
    })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Sales('sales')
    .where({ id })
    .first()
    .then(sale => {
        res.json(sale)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve fruit by id' })
    })
});

router.post('/', (req, res) => {
    Sales('sales')
    .insert(req.body)
    .then(ids => {
        Sales('sales')
        .where({ id: ids[0] })
        .then(newsale => {
            res.status(201).json(newsale)
        })
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to add sale data' })
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Sales('sales')
    .where({ id })
    .update(changes)
    .then(sale => {
        res.status(200).json(sale)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to update the sale' })
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Sales('sales')
    .where({ id })
    .del()
    .then(del => {
        res.status(200).json(del)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to remove the sale' })
    })
});

module.exports = router;