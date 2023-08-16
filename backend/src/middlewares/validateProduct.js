const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProduct = (req, res, next) => {
  const { body } = req;
  const requiredProductFields = ['name'];
  const error = checkRequiredFields(body, requiredProductFields);

  if (error) return res.status(400).json({ message: error });
  next();
};

module.exports = {
  validateProduct,
};