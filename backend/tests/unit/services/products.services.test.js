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

    it('Inserindo um produto com sucesso', async function () {
        const insertId = 4;
        const produto = { id: 4, name: 'ProdutoX' };
        sinon.stub(productsModel, 'insert').resolves(insertId);
        sinon.stub(productsModel, 'findById').resolves(produto);

        const resultService = await productServices.insert(produto);
        expect(resultService.status).to.be.equal('CREATED');
        expect(resultService.data).to.deep.equal(produto);
    });

    it('Não insere produto se o tamanho do campo "name" for menor que 5 caracteres', async function () {
        const produto = { id: 4, name: 'pro' };
        const responseService = await productServices.insert(produto);
        expect(responseService.status).to.equal('INVALID_VALUE');
        expect(responseService.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });

    afterEach(function () {
    sinon.restore();
});
});