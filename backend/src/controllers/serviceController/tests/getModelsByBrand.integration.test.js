const Service = require('../../../models/service');
const { getModelsByBrand } = require('../device');

// Mock del model Service
jest.mock('../../../models/service', () => ({
  find: jest.fn(() => ({
    distinct: jest.fn(),
  })),
}));

describe('getModelsByBrand', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {
        brand: 'Apple',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    Service.find.mockImplementation(() => ({
      distinct: jest.fn().mockResolvedValue(['iPhone X', 'iPhone 12']),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Ritorna una lista di modelli per un brand passato', async () => {
    Service.find.mockImplementation(() => ({
      distinct: jest.fn().mockResolvedValue(['iPhone X', 'iPhone 12']),
    }));

    await getModelsByBrand(mockReq, mockRes, mockNext);

    expect(Service.find).toHaveBeenCalledWith({ marca: mockReq.params.brand });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      modelli: ['iPhone X', 'iPhone 12'],
    });
  });

  it('ERRORE - connessione al DB fallita', async () => {
    const error = new Error('Database error');
    Service.find.mockImplementation(() => ({
      distinct: jest.fn().mockRejectedValue(error),
    }));

    await getModelsByBrand(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
