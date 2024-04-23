const { loginUser } = require('./login');
const User = require('../../models/user');
const { generateToken } = require('../../middleware/requireAuth');

jest.mock('../../models/user', () => ({
  login: jest.fn()
}));
jest.mock('../../middleware/requireAuth', () => ({
  generateToken: jest.fn()
}));

describe('Controller: loginUser', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    // Resetta i mock e definisci i comportamenti
    User.login.mockReset();
    generateToken.mockReset();
    generateToken.mockReturnValue('fakeToken123');

    // Crea oggetti mock per req, res
    mockReq = {
      body: { email: 'test@example.com', password: 'password123' }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('should return 200 and token with user details when credentials are correct', async () => {
    // Setup User.login to resolve with user details
    const mockUserDetails = {
      _id: '123',
      email: 'test@example.com',
      role: 'user',
      nome: 'Test',
      cognome: 'User'
    };
    User.login.mockResolvedValue(mockUserDetails);

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      user: {
        _id: mockUserDetails._id,
        email: mockUserDetails.email,
        role: mockUserDetails.role,
        nome: mockUserDetails.nome,
        cognome: mockUserDetails.cognome
      },
      token: 'fakeToken123'
    });
  });

  it('should return 400 when credentials are incorrect', async () => {
    User.login.mockRejectedValue(new Error('Invalid credentials'));

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Invalid credentials'
    });
  });
});
