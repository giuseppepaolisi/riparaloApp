const Service = require('../../../models/service');
const { getBrands } = require('../device');

// Mock del model Service
jest.mock('../../../models/service', () => ({
  distinct: jest.fn(),
}));

describe('getBrands', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test per il caso di successo
  it('SUCCESS - Ritorna una lista di marche', async () => {
    const uniqueBrands = ['Apple', 'Samsung', 'Huawei'];
    Service.distinct.mockResolvedValue(uniqueBrands);

    await getBrands(mockReq, mockRes, mockNext);

    expect(Service.distinct).toHaveBeenCalledWith('marca');
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ brands: uniqueBrands });
  });

  // Test per il caso di errore
  it('ERROR - Fallimento della chiamata al DB', async () => {
    const error = new Error('Failed to fetch brands');
    Service.distinct.mockRejectedValue(error);

    await getBrands(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(error);
  });
});
