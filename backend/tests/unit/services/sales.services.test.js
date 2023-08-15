const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesFromModel, saleFromModel } = require('../mocks/sales.mock');
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

afterEach(function () {
    sinon.restore();
});
});