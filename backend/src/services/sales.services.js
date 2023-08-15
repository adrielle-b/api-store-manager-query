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

module.exports = {
    findAll,
    findById,
};