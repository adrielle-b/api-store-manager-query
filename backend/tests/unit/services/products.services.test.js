const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsFromModel, productByIdFromModel } = require('../mocks/products.mock');
const { productServices } = require('../../../src/services');

describe('Testes de products - PRODUCTS SERVICES', function () {
    it('Buscando todos produtos com sucesso', async function () {
        sinon.stub(productsModel, 'findAll').resolves(productsFromModel);

        const resultService = await productServices.findAll();
        expect(resultService.status).to.be.equal('SUCCESSFUL');
        expect(resultService.data).to.be.deep.equal(productsFromModel);
    });

    it('Buscando produto por ID com sucesso', async function () {
        sinon.stub(productsModel, 'findById').resolves(productByIdFromModel);
        const idMock = 1;
        const resultService = await productServices.findById(idMock);
        expect(resultService.status).to.be.equal('SUCCESSFUL');
        expect(resultService.data).to.deep.equal(productByIdFromModel);
    });

afterEach(function () {
    sinon.restore();
});
});