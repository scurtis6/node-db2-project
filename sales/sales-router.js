const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body)
    db('sales')
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
    db('sales')
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
    db('sales')
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
    db('sales')
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
    db('sales')
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