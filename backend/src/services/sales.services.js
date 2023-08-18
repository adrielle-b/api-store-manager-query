const { salesModel, productsModel } = require('../models');
const { saleValidation } = require('../utils/validations/sales');

const findAll = async () => {
    const data = await salesModel.findAll();
  
    return { status: 'SUCCESSFUL', data };
}; 

const findById = async (saleId) => {
    const data = await salesModel.findById(saleId);
    if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  
    return { status: 'SUCCESSFUL', data };
};

const productIdVerify = async (sales) => {
    const promises = sales
      .map(({ productId }) => productsModel.findById(productId));
    const productIdExist = await Promise.all(promises);
    const errorResults = productIdExist.some((result) => result === undefined);
    if (errorResults) {
      return { status: 'NOT_FOUND', message: 'Product not found' };
    }
  };

const salesVerifyJoi = (sales) => {
    for (let i = 0; i < sales.length; i += 1) {
        const sale = sales[i];
        const { error } = saleValidation.validate(sale);
        if (error) return { status: 'INVALID_VALUE', message: error.message };
    }  
};

const insert = async (sales) => {
    const errorVerify = salesVerifyJoi(sales);
    if (errorVerify) return { status: errorVerify.status, data: { message: errorVerify.message } };

    const errorProductId = await productIdVerify(sales);
    if (errorProductId) {
        return { status: errorProductId.status, data: { message: errorProductId.message } };
    }

    const insertId = await salesModel.insert(sales);
    const salesById = await salesModel.findById(insertId);
    const itemsSold = salesById.map(({ productId, quantity }) => ({ productId, quantity }));
    const result = {
        status: 'CREATED',
        data: { id: insertId, itemsSold },
    };
    return result;
};

module.exports = {
    findAll,
    findById,
    insert,
};