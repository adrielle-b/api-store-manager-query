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
  
module.exports = {
    productsFromDB,
    productsFromModel,
    productByIdFromDB,
    productByIdFromModel,
    productsFromService,
    productFromService,
    productFromServiceNotFound,
};