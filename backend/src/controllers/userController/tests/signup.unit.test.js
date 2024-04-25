const { signup } = require('../user');
const { signupFactory } = require('../userFactory');
const User = require('../../../models/user');
const { TECHNICIAN, PARTNER } = require('../../../conf/role');
const mongoose = require('mongoose');
const { ErrorResponse } = require('../../../middleware/errorManager');

// Mock di signupFactory e User
jest.mock('../userFactory');
jest.mock('../../../models/user');

// Test di signup
describe('TEST signup', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      params: { role: PARTNER },
      body: {
        email: 'example@example.com',
        password: 'longenoughpassword',
        codiceUnivoco: '123456',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Creazione partner con successo', async () => {
    // setup del metodo signup du User
    const newUser = {
      email: 'example@example.com',
      password: 'longenoughpassword',
      role: PARTNER,
    };
    User.signup.mockResolvedValue(newUser);
    // mock della funzione factory
    signupFactory.mockImplementation(() => jest.fn().mockReturnValue(newUser));

    await signup(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ user: newUser });
  });

  it('Creazione tecnico con successo', async () => {
    // setup del metodo signup du User
    const newUser = {
      email: 'example@example.com',
      password: 'longenoughpassword',
      role: TECHNICIAN,
    };
    // eliminazione del codice univoco per il tecnico
    delete newUser.codiceUnivoco;
    User.signup.mockResolvedValue(newUser);
    // mock della funzione factory
    signupFactory.mockImplementation(() => jest.fn().mockReturnValue(newUser));

    await signup(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ user: newUser });
  });

  it('email invalida', async () => {
    mockReq.body.email = 'invalidemail';
    await signup(mockReq, mockRes, mockNext);
    
    expect(mockNext.mock.calls[0][0].message).toContain("Inserire un'email valida");
  });

  it('password troppo corta', async () => {
    mockReq.body.password = '123';
    await signup(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorResponse));
    expect(mockNext.mock.calls[0][0].message).toContain('La password deve avere almeno 8 caratteri');
    expect(mockNext.mock.calls[0][0].statusCode).toBe(400);
  });

  it('ruolo non specificato', async () => {
    const errorMessage = 'Ruolo non supportato: ';
    signupFactory.mockImplementation(() => () => {
      throw new Error(errorMessage);
    });
    await signup(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      expect.any(Error)
    );
    
    expect(mockNext.mock.calls[0][0].message).toContain(errorMessage);
  });
});
