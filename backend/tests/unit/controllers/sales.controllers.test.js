const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleServices } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesFromModel, saleFromModel, salesFromServices, saleFromServices, saleFromServiceNotFound } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de sales - SALES CONTROLLER', function () {
    it('Buscando todos sales com sucesso ', async function () {
    sinon.stub(saleServices, 'findAll').resolves(salesFromServices);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesFromModel);
  });

  it('Buscando sale por ID com sucesso', async function () {
    sinon.stub(saleServices, 'findById').resolves(saleFromServices);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleFromModel);
    });

  it('Não busca sale com id inexistente', async function () {
      sinon.stub(saleServices, 'findById').resolves(saleFromServiceNotFound);
  
      const req = { params: { id: 10 }, body: { } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await salesController.getSaleById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(saleFromServiceNotFound.data);
    });

afterEach(function () {
    sinon.restore();
});
});