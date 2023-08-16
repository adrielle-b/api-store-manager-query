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

    it('Inserindo um produto com sucesso', async function () {
        const insertId = 4;
        sinon.stub(connection, 'execute').resolves([{ insertId }]);

        const product = { id: 4, name: 'ProdutoX' };
        const result = await productsModel.insert(product);
        expect(result).to.be.an('number');
        expect(result).to.be.deep.equal(insertId);
    });
    afterEach(function () {
        sinon.restore();
      });
});