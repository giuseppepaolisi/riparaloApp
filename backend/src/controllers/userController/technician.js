const { TECHNICIAN } = require('../../conf/role');

// preparazione dell'utente TECNICO alla registrazione
function signupTechnician(newuser, next) {
  newuser.role = TECHNICIAN;
  return newuser;
}

function updateTechnician(data, next) {
  const allowedUpdates = ['email', 'password', 'nome', 'cognome', 'telefono'];
  return filterUpdates(data, allowedUpdates, next);
}

const filterUpdates = (data, allowedUpdates, next) => {
  const updates = {};
  Object.keys(data).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = data[key];
    }
  });
  return updates;
};

module.exports = {
  signupTechnician,
  updateTechnician,
};
