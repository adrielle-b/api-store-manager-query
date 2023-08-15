const saleDate = '2023-08-14T21:51:46.000Z';

const salesFromDB = [
  {
    saleId: 1,
    date: saleDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: saleDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: saleDate,
    productId: 3,
    quantity: 15,
  },
];

const saleFromDB = [
  {
    date: saleDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: saleDate,
    productId: 2,
    quantity: 10,
  },
];

const salesFromModel = [
  {
    saleId: 1,
    date: saleDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: saleDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: saleDate,
    productId: 3,
    quantity: 15,
  },
];

const saleFromModel = [
  {
    date: saleDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: saleDate,
    productId: 2,
    quantity: 10,
  },
];

const salesFromServices = {
  status: 'SUCCESSFUL',
  data: salesFromModel,
};

const saleFromServices = {
  status: 'SUCCESSFUL',
  data: saleFromModel,
};

const saleFromServiceNotFound = { 
  status: 'NOT_FOUND', 
  data: { message: 'Sale not found' },
};

module.exports = {
  salesFromDB,
  saleFromDB,
  salesFromModel,
  saleFromModel,
  salesFromServices,
  saleFromServices,
  saleFromServiceNotFound,
};