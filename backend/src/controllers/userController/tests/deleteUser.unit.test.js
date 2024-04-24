const { deleteUser } = require('../user');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');

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
    await deleteUser(mockReq, mockRes);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({
      _id: '507f1f77bcf86cd799439011',
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: mockUser });
  });

  it('ID mongo non valido', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    await deleteUser(mockReq, mockRes);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'ID utente non valido',
    });
  });

  it('Nessun utente trovato', async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findOneAndDelete.mockResolvedValue(null);
    await deleteUser(mockReq, mockRes);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({
      _id: '507f1f77bcf86cd799439011',
    });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Nessun utente trovato',
    });
  });

  it('errore per findOneAndDelete', async () => {
    const errorMessage = 'Database error';
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findOneAndDelete.mockRejectedValue(new Error(errorMessage));
    await deleteUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
