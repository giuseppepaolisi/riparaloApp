const { getAll } = require('../user');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');

jest.mock('../../../models/user');

// TEST getAll
describe('TEST getAll', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    User.find = jest.fn();
  });

  it('ritorna tutti i partenr con successo', async () => {
    mockReq.params.role = PARTNER;
    const mockUsers = [{ role: PARTNER }];
    User.find.mockResolvedValue(mockUsers);

    await getAll(mockReq, mockRes);

    expect(User.find).toHaveBeenCalledWith({ role: PARTNER });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ users: mockUsers });
  });

  it('ritorna tutti i tecnici con successo', async () => {
    mockReq.params.role = TECHNICIAN;
    const mockUsers = [{ role: TECHNICIAN }];
    User.find.mockResolvedValue(mockUsers);

    await getAll(mockReq, mockRes);

    expect(User.find).toHaveBeenCalledWith({ role: TECHNICIAN });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ users: mockUsers });
  });

  it('ruolo non supportato', async () => {
    mockReq.params.role = 'admin';

    await getAll(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'ruolo non supportato',
    });
  });

  it('errore nel metodo User.find', async () => {
    mockReq.params.role = PARTNER;
    const errorMessage = 'Database error';
    User.find.mockRejectedValue(new Error(errorMessage));

    await getAll(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
