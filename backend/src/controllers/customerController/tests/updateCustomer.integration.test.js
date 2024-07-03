const Customer = require('../../../models/customer');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { updateCustomer } = require('../customer');

// npm test -- src/controllers/customerController/tests/

// mock del model
jest.mock('../../../models/customer', () => ({
  findOneAndUpdate: jest.fn(),
}));

describe('TEST updateCustomer', () => {
  let mockReq, mockRes, mockNext, mockCustomer;
  mockReq = {
    body: {
      nome: 'gatto',
      cognome: 'morgante',
      telefono: '+39 098 765 4321',
      email: '',
    },
    user: {
      _id: '601c546d4d3f8b2f243d58e6',
    },
    params: {
      id: '601c546d4d3f8b2f243d58e6',
    },
  };
  mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  mockNext = jest.fn();
  mockCustomer = {
    _id: '123456',
    nome: 'Giuseppe',
    cognome: 'Polese',
    telefono: '+39 098 765 4321',
    partner: '601c546d4d3f8b2f243d58e6',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Modifica cliente tutti i dati', async () => {
    Customer.findOneAndUpdate.mockResolvedValue(mockCustomer);

    await updateCustomer(mockReq, mockRes, mockNext);

    expect(Customer.findOneAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockCustomer,
    });
  });
});
