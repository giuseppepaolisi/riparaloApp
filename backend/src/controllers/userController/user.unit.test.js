const { signup, getAll, deleteUser } = require('./user');
const { signupFactory } = require('./userFactory');
const User = require('../../models/user');
const { TECHNICIAN, PARTNER } = require('../../conf/role');
const mongoose = require('mongoose');

// Mock di signupFactory e User
jest.mock('./userFactory');
jest.mock('../../models/user');

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

    await signup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
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

    await signup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: newUser });
  });

  it('email invalida', async () => {
    mockReq.body.email = 'invalidemail';
    await signup(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: "Inserire un'email valida" })
    );
  });

  it('password troppo corta', async () => {
    mockReq.body.password = '123';
    await signup(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'La password deve avere almeno 8 caratteri',
      })
    );
  });

  it('ruolo non specificato', async () => {
    const errorMessage = 'Ruolo non supportato: ';
    signupFactory.mockImplementation(() => () => {
      throw new Error(errorMessage);
    });
    await signup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
// end signup test

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
