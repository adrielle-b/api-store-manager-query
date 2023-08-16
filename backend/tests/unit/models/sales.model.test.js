const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesFromDB, saleFromDB, newSalesFromModel } = require('../mocks/sales.mock');

describe('Testes de sales - SALES MODEL', function () {
    it('Buscando todos sales com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDB]);

        const result = await salesModel.findAll();
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal(salesFromDB);
    });

    it('Buscando sale pelo ID com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([saleFromDB]);

        const IdMock = 1;
        const result = await salesModel.findById(IdMock);
        expect(result).to.be.an('array');
        expect(result).to.be.deep.equal(saleFromDB);
    });

    it('Inserindo sale com sucesso', async function () {
        const insertIdMock = { insertId: 10 };
        const saleId = 10;
        sinon.stub(connection, 'execute')
          .onFirstCall()
          .resolves([insertIdMock])
          .resolves();
    
        const insertId = await salesModel.insert(newSalesFromModel);
    
        expect(insertId).to.be.equal(saleId);
      });

    afterEach(function () {
        sinon.restore();
    });
});