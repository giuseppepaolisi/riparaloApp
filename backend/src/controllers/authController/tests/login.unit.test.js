const { loginUser } = require('../login');
const User = require('../../../models/user');
const { generateToken } = require('../../../middleware/requireAuth');

jest.mock('../../../models/user', () => ({
  login: jest.fn(),
}));
jest.mock('../../../middleware/requireAuth', () => ({
  generateToken: jest.fn(),
}));

describe('login', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    // Resetta i mock e definisci i comportamenti
    User.login.mockReset();
    generateToken.mockReset();
    generateToken.mockReturnValue('fakeToken123');

    // Crea oggetti mock per req, res
    mockReq = {
      body: { email: 'test@example.com', password: 'password123' },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('Login con successo', async () => {
    // Setup User.login to resolve with user details
    const mockUserDetails = {
      _id: '123',
      email: 'test@example.com',
      role: 'user',
      nome: 'Test',
      cognome: 'User',
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
        cognome: mockUserDetails.cognome,
      },
      token: 'fakeToken123',
    });
  });

  it('creadenziali errate', async () => {
    User.login.mockRejectedValue(new Error('Invalid credentials'));

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(
      expect.any(Error)
    );
    
    expect(mockNext.mock.calls[0][0].message).toContain('Invalid credentials');
  });
});
