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

const insertProduct = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const product = { id, name };

    const { status, data } = await productServices.insert(product);
    return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await productServices.update(body, id);
    return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    getProducts,
    getProductId,
    insertProduct,
    updateProduct,
};