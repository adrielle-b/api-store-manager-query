const { productsModel } = require('../models');
const { productValidation } = require('../utils/validations/product');

const findAll = async () => {
    const data = await productsModel.findAll();
  
    return { status: 'SUCCESSFUL', data };
}; 

const findById = async (productId) => {
    const data = await productsModel.findById(productId);
    if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
    return { status: 'SUCCESSFUL', data };
};

const insert = async (product) => {
    const { error } = productValidation.validate(product);
    if (error) return { status: 'INVALID_VALUE', data: { message: error.message } };

    const insertId = await productsModel.insert(product);
    const newProduct = await productsModel.findById(insertId);

    return { status: 'CREATED', data: newProduct };
};

module.exports = {
    findAll,
    findById,
    insert,
};