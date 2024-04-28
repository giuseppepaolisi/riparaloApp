const Customer = require('../../../models/customer');
const { ErrorResponse } = require('../../../middleware/errorManager');
const { createCustomer } = require('../customer');

// npm test -- src/controllers/customerController/tests/

// mock del model
jest.mock('../../../models/customer', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

describe('TEST getCustomers', () => {
  let mockReq, mockRes, mockNext, mockCustomer;

  beforeEach(() => {
    mockReq = {
      body: {
        nome: 'Giuseppe',
        cognome: 'Polese',
        telefono: '+39 098 765 4321',
        email: 'ciaone@gmail.com',
      },
      user: {
        _id: '601c546d4d3f8b2f243d58e6',
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Inserimento cliente', async () => {
    Customer.findOne.mockResolvedValue(false);
    Customer.create.mockResolvedValue(mockCustomer);

    await createCustomer(mockReq, mockRes, mockNext);

    expect(Customer.create).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      customer: mockCustomer,
    });
  });

  it('SUCCESS - Cliente già inserito', async () => {
    Customer.findOne.mockResolvedValue(true);

    await createCustomer(mockReq, mockRes, mockNext);

    expect(Customer.findOne).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - email non valida', async () => {
    mockReq.body.email = '';
    await createCustomer(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - nome non valido', async () => {
    mockReq.body.nome = '';
    await createCustomer(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - cognome non valido', async () => {
    mockReq.body.cognome = '';
    await createCustomer(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - telefono non valido', async () => {
    mockReq.body.telefono = '';
    await createCustomer(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
});
