const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
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

    /* it('Inserindo sale com sucesso', async function () {
        const saleId = 1;
        sinon.stub(salesModel, 'insert').resolves(newSalesFromModel);
        sinon.stub(salesModel, 'findById').resolves(saleId);
    
        const resultService = await saleServices.insert(newSalesFromModel);
    
        expect(resultService.status).to.be.equal('CREATED');
        expect(resultService.data).to.deep.equal(newSalesFromServices.data);
      }); */
    
      it('Não insere sale se quantity for menor que 1', async function () {
        const saleMock = [
          { productId: 1, quantity: 0 },
        ];
        const resultService = await saleServices.insert(saleMock);
    
        expect(resultService.status).to.equal('INVALID_VALUE');
        expect(resultService.data).to.deep.equal({ message: '"quantity" must be greater than or equal to 1' });
      });
    
      it('Não insere sale se productId for inválido', async function () {
        sinon.stub(productsModel, 'findById').resolves(undefined);
    
        const saleMock = [
          { productId: 10, quantity: 1 },
        ];
        const resultService = await saleServices.insert(saleMock);
    
        expect(resultService.status).to.equal('NOT_FOUND');
        expect(resultService.data).to.deep.equal({ message: 'Product not found' });
      });

afterEach(function () {
    sinon.restore();
});
});