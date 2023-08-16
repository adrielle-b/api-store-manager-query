const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productServices } = require('../../../src/services');
const { productsFromService, productsFromModel, productFromService, productByIdFromModel, productFromServiceNotFound } = require('../mocks/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes de products - PRODUCTS CONTROLLERS', function () {
    it('Buscando todos produtos com sucesso ', async function () {
    sinon.stub(productServices, 'findAll').resolves(productsFromService);

    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsFromModel);
  });

  it('Buscando produto por ID com sucesso', async function () {
    sinon.stub(productServices, 'findById').resolves(productFromService);

    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductId(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productByIdFromModel);
    });
  
  it('Não busca product com id inexistente', async function () {
      sinon.stub(productServices, 'findById').resolves(productFromServiceNotFound);
  
      const req = { params: { id: 10 }, body: { } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await productsController.getProductId(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(productFromServiceNotFound.data);
    });
  
  it('Inserindo um produto com sucesso', async function () {
    const resultService = { status: 'CREATED', data: { id: 4, name: 'produtoX' } };
    sinon.stub(productServices, 'insert').resolves(resultService);

    const req = { params: { id: 4 }, body: { name: 'produtoX' } };
    const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
    };

    await productsController.insertProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(resultService.data);
  });

afterEach(function () {
    sinon.restore();
});
});