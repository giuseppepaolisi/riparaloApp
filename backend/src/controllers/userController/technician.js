const { TECHNICIAN } = require('../../conf/role');

// preparazione dell'utente TECNICO alla registrazione
function signupTechnician(newuser) {
  newuser.role = TECHNICIAN;
  return newuser;
}

module.exports = {
    signupTechnician
}