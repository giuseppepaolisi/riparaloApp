const { signupPartner } = require('../../controllers/userController/partner');
const User = require('../../models/user');
const { PARTNER } = require('../../conf/role');

// Mock delle costanti e del modello User
jest.mock('../../models/user');

// Setup del test
describe('signupPartner', () => {
  let mockReq, mockRes, next;

  beforeEach(() => {
    // Mock degli oggetti request e response
    mockReq = {
      body: {
        codiceUnivoco: '123456',
        email: 'example@example.com',
        password: 'password123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Il partner viene inserito correttamente', async () => {
    // Setup del mock del metodo signup di User
    User.signup.mockResolvedValue({
      email: 'example@example.com',
      role: PARTNER
    });

    await signupPartner(mockReq, mockRes);

    // Verifica che la funzione signup sia stata chiamata correttamente
    expect(User.signup).toHaveBeenCalledWith(expect.objectContaining({
      codiceUnivoco: '123456',
      role: PARTNER
    }));

    // Verifica che la risposta sia stata inviata con status 200
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      user: expect.any(Object)
    }));
  });

  it('Codice univoco invalido', async () => {
    // Imposta un codiceUnivoco non valido
    mockReq.body.codiceUnivoco = '123';

    // Esegui la funzione
    await signupPartner(mockReq, mockRes);

    // Verifica che la risposta sia stata inviata con status 400
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Il codice univoco deve avere esattamente 6 caratteri'
    }));
  });

});
