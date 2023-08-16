const { saleServices } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTPP');

const getSales = async (_req, res) => {
    const { status, data } = await saleServices.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await saleServices.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

const insertSales = async (req, res) => {
    const { body } = req;
    const { status, data } = await saleServices.insert(body);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getSales,
    getSaleById,
    insertSales,
};