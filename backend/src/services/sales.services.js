const { salesModel } = require('../models');

const findAll = async () => {
    const data = await salesModel.findAll();
  
    return { status: 'SUCCESSFUL', data };
}; 

const findById = async (saleId) => {
    const data = await salesModel.findById(saleId);
    if (data.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  
    return { status: 'SUCCESSFUL', data };
};

const insert = async (sales) => {
    const insertId = await salesModel.insert(sales);
    const salesById = await salesModel.findById(insertId);

    const itemsSold = salesById.map(({ productId, quantity }) => ({ productId, quantity }));
    return ({
        status: 'CREATED',
        data: { id: insertId, itemsSold },
    });
};

module.exports = {
    findAll,
    findById,
    insert,
};