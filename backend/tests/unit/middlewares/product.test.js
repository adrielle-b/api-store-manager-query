const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateSale = require('../../../src/middlewares/validateSale');

const { expect } = chai;

chai.use(sinonChai);

describe('Product middlewares ', function () {
  it('Se req.body for válido, next deve ser chamado', function () {
    const req = {
      body: 
        [
            {
              productId: 1,
              quantity: 1,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ],
    };
    const res = {};
    const next = sinon.stub().returns();

    validateSale(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});