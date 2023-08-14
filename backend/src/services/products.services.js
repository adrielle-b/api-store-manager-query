const { productsModel } = require('../models');

const findAll = async () => {
    const data = await productsModel.findAll();
  
    return { status: 'SUCCESSFUL', data };
}; 

const findById = async (productId) => {
    const data = await productsModel.findById(productId);
    if (!data) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
    return { status: 'SUCCESSFUL', data };
};

module.exports = {
    findAll,
    findById,
};