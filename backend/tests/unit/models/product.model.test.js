const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productByIdFromDB, productByIdFromModel } = require('../mocks/products.mock');

describe('Testes de products - PRODUCTS MODEL', function () {
    it('Buscando todos produtos com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);

        const result = await productsModel.findAll();
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal(productsFromModel);
    });

    it('Buscando produtos pelo ID com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[productByIdFromDB]]);

        const IdMock = 2;
        const result = await productsModel.findById(IdMock);
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal(productByIdFromModel);
    });
    afterEach(function () {
        sinon.restore();
      });
});