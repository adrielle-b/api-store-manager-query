const { productServices } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTPP');

const getProducts = async (_req, res) => {
    const { status, data } = await productServices.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
};

const getProductId = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productServices.findById(id);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getProducts,
    getProductId,
};