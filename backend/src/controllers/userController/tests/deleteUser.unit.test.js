const { deleteUser } = require('../user');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');

jest.mock('../../../models/user');

// TEST deleteUser
describe('deleteUser', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011', // Un ObjectId MongoDB valido
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mongoose.Types.ObjectId.isValid = jest.fn();
    User.findOneAndDelete = jest.fn();
  });

  it('Utente eliminato con successo', async () => {
    const mockUser = { _id: '507f1f77bcf86cd799439011' };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findOneAndDelete.mockResolvedValue(mockUser);
    await deleteUser(mockReq, mockRes, mockNext);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({
      _id: '507f1f77bcf86cd799439011',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: mockUser });
  });

  it('ID mongo non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    await deleteUser(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID utente non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('Nessun utente trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findOneAndDelete.mockResolvedValue(null);
    await deleteUser(mockReq, mockRes, mockNext);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({
      _id: '507f1f77bcf86cd799439011',
    });

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'Nessun utente trovato'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('errore per findOneAndDelete', async () => {
    const errorMessage = 'Database error';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findOneAndDelete.mockRejectedValue(new Error(errorMessage));
    await deleteUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    expect(mockNext.mock.calls[0][0].message).toContain(errorMessage);
  });
});
