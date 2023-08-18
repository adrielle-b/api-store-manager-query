const productsFromDB = [
    {
        id: 1,
        name: 'Martelo de Thor',
    },
    {
        id: 2,
        name: 'Traje de encolhimento',
    },
];
const productsFromModel = [
    {
        id: 1,
        name: 'Martelo de Thor',
    },
    {
        id: 2,
        name: 'Traje de encolhimento',
    },
];

const productByIdFromDB = {
    id: 1,
    name: 'Martelo de Thor',
};

const productByIdFromModel = {
    id: 1,
    name: 'Martelo de Thor',
};

const productsFromService = {
    status: 'SUCCESSFUL',
    data: productsFromModel,
};
  
const productFromService = {
    status: 'SUCCESSFUL',
    data: productByIdFromModel,
};

const productFromServiceNotFound = { 
    status: 'NOT_FOUND', 
    data: { message: 'Product not found' },
};

const updateFromDB = [
    {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: 'Rows matched: 1  Changed: 1  Warnings: 0',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 1,
    },
    undefined,
  ];
  
module.exports = {
    productsFromDB,
    productsFromModel,
    productByIdFromDB,
    productByIdFromModel,
    productsFromService,
    productFromService,
    productFromServiceNotFound,
    updateFromDB,
};