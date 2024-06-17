const { updateUser } = require('../user');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { ErrorResponse } = require('../../../middleware/errorManager');

jest.mock('../../../models/user', () => ({
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('updateUser', () => {
  let mockReq, mockRes, mockNext, mockUser;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
      body: {
        data: {},
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    mockUser = {
      _id: '507f1f77bcf86cd799439011',
      email: 'example@example.com',
      password: 'longenoughpassword',
    };
    mongoose.Types.ObjectId.isValid = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('SUCCESS - Cambio email', async () => {
    mockReq.body.data = {
      email: 'newemail@new.com',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findById.mockResolvedValue(mockUser);
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    await updateUser(mockReq, mockRes, mockNext);

    expect(User.findById).toHaveBeenCalledWith(mockReq.params.id);
    expect(User.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockUser,
    });
  });
  /*
  it('SUCCESS - Cambio password', async () => {
    mockReq.body.data = {
      oldPassword: 'longenoughpassword',
      newPassword: 'newlongenoughpassword',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.genSalt.mockResolvedValue('salt');
    bcrypt.hash.mockResolvedValue('hashedpassword');
    User.findByIdAndUpdate.mockResolvedValue({ ...mockUser, password: 'hashedpassword' });

    await updateUser(mockReq, mockRes, mockNext);

    expect(bcrypt.compare).toHaveBeenCalledWith('longenoughpassword', mockUser.password);
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith('newlongenoughpassword', 'salt');
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      { _id: mockUser._id },
      { password: 'hashedpassword' },
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: { ...mockUser, password: 'hashedpassword' },
    });
  });

  it('ERROR - email non valida', async () => {
    mockReq.body.data = {
      email: 'newemailnewcom',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);

    await updateUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      "Inserire un'email valida"
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });*/
  /*
  it('ERROR - password non valida', async () => {
    mockReq.body.data = {
      newPassword: '',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);

    await updateUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'La nuova password deve avere almeno 8 caratteri'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
*/
  it('ERROR - ID utente non valido', async () => {
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);

    await updateUser(mockReq, mockRes, mockNext);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011'
    );
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('ID utente non valido');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });
  /*
  it('ERROR - Vecchia password non corretta', async () => {
    mockReq.body.data = {
      oldPassword: 'wrongpassword',
      newPassword: 'newlongenoughpassword',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findById.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await updateUser(mockReq, mockRes, mockNext);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', mockUser.password);
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('La vecchia password non è corretta');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });*/
});
