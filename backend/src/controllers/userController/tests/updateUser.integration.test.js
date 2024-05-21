const { updateUser } = require('../user');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');
// npm test -- src/controllers/userController/tests/

jest.mock('../../../models/user', () => ({
  findByIdAndUpdate: jest.fn(),
}));

describe('updateUser', () => {
  let mockReq, mockRes, mockNext, mockUser;

  beforeEach(() => {
    mockReq = {
      params: {
        id: '507f1f77bcf86cd799439011',
      },
      body: {},
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
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    await updateUser(mockReq, mockRes, mockNext);

    expect(User.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: mockUser });
  });

  it('SUCCESS - Cambio password', async () => {
    mockReq.body.data = {
      password: 'password1',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    User.findByIdAndUpdate.mockResolvedValue(mockUser);

    await updateUser(mockReq, mockRes, mockNext);
    expect(User.findByIdAndUpdate).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: mockUser });
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
  });

  it('ERROR - password non valida', async () => {
    mockReq.body.data = {
      password: '',
    };
    mockReq.user = {
      role: TECHNICIAN,
    };
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);

    await updateUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain(
      'La password deve avere almeno 8 caratteri'
    );
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ERROR - ID device non valido', async () => {
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
});
