const { TECHNICIAN } = require('../../conf/role');

// preparazione dell'utente TECNICO alla registrazione
function signupTechnician(newuser, next) {
  newuser.role = TECHNICIAN;
  return newuser;
}

module.exports = {
  signupTechnician,
};
