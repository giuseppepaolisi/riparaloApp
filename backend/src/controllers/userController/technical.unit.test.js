const { signupTechnician } = require('../../controllers/userController/technician');
const User = require('../../models/user');
const { TECHNICIAN } = require('../../conf/role');

// Mock delle costanti e del modello User
jest.mock('../../models/user');


// Setup del test
describe('signupTechnician', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    // Mock degli oggetti request e response
    mockReq = {
      body: {
        email: 'tech@example.com',
        password: 'securePassword123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('il tecnico viene creato con successo', async () => {
    // Setup del mock del metodo signup di User
    User.signup.mockResolvedValue({
      email: 'tech@example.com',
      role: TECHNICIAN
    });

    await signupTechnician(mockReq, mockRes);

    // Verifica che la funzione signup sia stata chiamata con il ruolo TECHNICIAN
    expect(User.signup).toHaveBeenCalledWith(expect.objectContaining({
      role: TECHNICIAN
    }));

    // Verifica che la risposta sia stata inviata con status 200
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      user: expect.any(Object)
    }));
  });

  it('la creazione del tecnico fallisce', async () => {
    // Setup del mock del metodo signup di User per generare un errore
    const errorMessage = 'Signup failed';
    User.signup.mockRejectedValue(new Error(errorMessage));

    await signupTechnician(mockReq, mockRes);

    // Verifica che la risposta sia stata inviata con status 400
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      error: errorMessage
    }));
  });
});
