const { TECHNICIAN } = require('../../conf/role');

// preparazione dell'utente TECNICO alla registrazione
function signupTechnician(newuser, next) {
  newuser.role = TECHNICIAN;
  return newuser;
}

function updateTechnician(data, next) {
  return data;
}

module.exports = {
  signupTechnician,
  updateTechnician,
};
