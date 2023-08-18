const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsFromModel, productByIdFromModel, updateFromDB } = require('../mocks/products.mock');
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
        const resultService = await productServices.insert(produto);
        expect(resultService.status).to.equal('INVALID_VALUE');
        expect(resultService.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
    });

    it('Atualizando product com sucesso', async function () {
        sinon.stub(productsModel, 'findById')
          .onFirstCall()
          .resolves(productByIdFromModel)
          .onSecondCall()
          .resolves(productByIdFromModel);
        sinon.stub(productsModel, 'update').resolves(updateFromDB);
    
        const productId = 1;
        const productUpdate = { name: 'Martelo do Batman' };
        const resultService = await productServices.update(productUpdate, productId);
    
        expect(resultService.status).to.equal('SUCCESSFUL');
        expect(resultService.data).to.deep.equal(productByIdFromModel);
      });
    
      it('Não atualiza product se o tamanho do campo "name" for menor que 5 caracteres', async function () {
        sinon.stub(productsModel, 'findById')
          .resolves(undefined);
    
        const productId = 1;
        const productUpdate = { name: 'Martelo do Batman' };
        const resultService = await productServices.update(productUpdate, productId);
        expect(resultService.status).to.equal('NOT_FOUND');
        expect(resultService.data).to.deep.equal({ message: 'Product not found' });
      });
    
      it('Não altera product se o id recebido não existir', async function () {
        const productId = 10;
        const productUpdate = { name: 'Produto' };
        const resultService = await productServices.update(productUpdate, productId);
        expect(resultService.status).to.equal('NOT_FOUND');
        expect(resultService.data).to.deep.equal({ message: 'Product not found' });
      });

    afterEach(function () {
    sinon.restore();
});
});