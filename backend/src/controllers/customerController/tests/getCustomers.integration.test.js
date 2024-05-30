const Customer = require('../../../models/customer');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { getCustomers } = require('../customer');

// npm test -- src/controllers/customerController/tests/

// mock del model
jest.mock('../../../models/customer', () => ({
  find: jest.fn(),
}));

describe('TEST getCustomers', () => {
  let mockReq, mockRes, mockNext, mockCustomer;

  beforeEach(() => {
    mockReq = {
      user: {},
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
      email: 'ciaone@gmail.com',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Lista di tutti i clienti del partner con la sessione attiva', async () => {
    mockReq.user._id = '601c546d4d3f8b2f243d58e6'; // id del partner
    Customer.find.mockResolvedValue([mockCustomer]);

    await getCustomers(mockReq, mockRes, mockNext);

    expect(Customer.find).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      customers: [mockCustomer],
    });
  });
});
