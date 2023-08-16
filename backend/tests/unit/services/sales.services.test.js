const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesFromModel, saleFromModel, newSalesFromModel, newSalesFromServices } = require('../mocks/sales.mock');
const { saleServices } = require('../../../src/services');

describe('Testes de sales - SALES SERVICES', function () {
    it('Buscando todos sales com sucesso', async function () {
        sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

        const resultService = await saleServices.findAll();
        expect(resultService.status).to.be.equal('SUCCESSFUL');
        expect(resultService.data).to.be.deep.equal(salesFromModel);
    });

    it('Buscando sale por ID com sucesso', async function () {
        sinon.stub(salesModel, 'findById').resolves(saleFromModel);
        const idMock = 1;
        const resultService = await saleServices.findById(idMock);
        expect(resultService.status).to.be.equal('SUCCESSFUL');
        expect(resultService.data).to.deep.equal(saleFromModel);
    });

    it('Inserindo sale com sucesso', async function () {
        const saleId = 10;
        sinon.stub(salesModel, 'insert').resolves(saleId);
        sinon.stub(salesModel, 'findById').resolves(newSalesFromModel);
    
        const responseService = await saleServices.insert(newSalesFromModel);
    
        expect(responseService.status).to.equal('CREATED');
        expect(responseService.data).to.deep.equal(newSalesFromServices.data);
      });

afterEach(function () {
    sinon.restore();
});
});