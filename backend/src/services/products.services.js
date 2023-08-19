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

const update = async (product, id) => {
    const { error } = productValidation.validate(product);
    if (error) return { status: 'INVALID_VALUE', data: { message: error.message } };

    const productExist = await productsModel.findById(id);
    if (!productExist) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

    await productsModel.update(product, id);
    const productUpdate = await productsModel.findById(id);
    return { status: 'SUCCESSFUL', data: productUpdate };
};

const exclui = async (id) => {
    const [{ affectedRows }] = await productsModel.exclui(id);
    if (affectedRows === 0) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
    return { status: 'DELETE', data: undefined };
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
    exclui,
};