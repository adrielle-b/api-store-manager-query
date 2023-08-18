const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/validateProduct');

route.get('/', productsController.getProducts);
route.post('/', validateProduct, productsController.insertProduct);
route.get('/:id', productsController.getProductId);
route.put('/:id', validateProduct, productsController.updateProduct);

module.exports = route;