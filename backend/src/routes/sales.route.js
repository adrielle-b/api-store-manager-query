const route = require('express').Router();
const { salesController } = require('../controllers');
const validateSale = require('../middlewares/validateSale');

route.get('/', salesController.getSales);
route.post('/', validateSale, salesController.insertSales);
route.get('/:id', salesController.getSaleById);

module.exports = route;