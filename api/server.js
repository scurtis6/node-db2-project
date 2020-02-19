const express = require('express');

const CarRouter = require('../cars/cars-router');

const SalesRouter = require('../sales/sales-router');

const server = express();

server.use(express.json());

server.use('/api/cars', CarRouter);

server.use('/api/sales', SalesRouter);

module.exports = server;