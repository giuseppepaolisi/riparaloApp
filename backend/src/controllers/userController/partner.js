const User = require('../../models/user');
const { PARTNER } = require('../../conf/role');

// registrazione di un utente base
function signupPartner(newuser) {
  
  if (!newuser.codiceUnivoco || newuser.codiceUnivoco.length !== 6) {
    throw new Error('Il codice univoco deve avere esattamente 6 caratteri');
  }

  newuser.role = PARTNER;
  return newuser;
}

module.exports = {
  signupPartner
}