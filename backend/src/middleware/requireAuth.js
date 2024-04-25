const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const { ADMIN, TECHNICIAN, PARTNER } = require('../conf/role');

// Carica la chiave privata per firmare il token
const privateKey = fs.readFileSync(
  path.join(__dirname, '../keys/rsa.private'),
  'utf8'
);

// Carica la chiave pubblica per verificare il token
const publicKey = fs.readFileSync(
  path.join(__dirname, '../keys/rsa.public'),
  'utf8'
);

// Funzione per generare un token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

// Middleware base per verificare l'autenticazione
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token richiesto' });
  }

  const token = authorization.split(' ')[1];

  try {
    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

    // Includi il campo 'role' quando recuperi l'utente dal database
    const user = await User.findOne({ _id: payload._id }).select('_id role');

    if (!user) {
      throw new Error('Utente non trovato');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Richiesta non autorizzata' });
  }
};

/* Middleware per partner, technician e admin
   è una factory che prende un array di ruoli e verifica se appartine a quelli autorizzati
*/
const requireRole = (rolesArray) => async (req, res, next) => {
  await requireAuth(req, res, async () => {
    if (rolesArray.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ error: 'Accesso non autorizzato' });
    }
  });
};

// Middleware specifico per admin
const requireAdmin = async (req, res, next) => {
  await requireRole([ADMIN])(req, res, next);
};

// Middleware specifico per partner, technician e admin
const requireTechnicianAdmin = async (req, res, next) => {
  await requireRole([TECHNICIAN, ADMIN])(req, res, next);
};

// Middleware specifico per partner
const requirePartner = async (req, res, next) => {
  await requireRole([PARTNER])(req, res, next);
};

module.exports = {
  generateToken,
  requireAuth,
  requireAdmin,
  requireTechnicianAdmin,
  requirePartner,
};
