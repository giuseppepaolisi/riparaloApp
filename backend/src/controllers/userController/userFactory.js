const { ADMIN, TECHNICIAN, PARTNER } = require('../../conf/role');
const { signupPartner, updatePartner } = require('./partner');
const { signupTechnician, updateTechnician } = require('./technician');

// Factory che in base al ruolo decide restituisce la funzione appropriata per la creazione di un utente
function signupFactory(role) {
  switch (role) {
    case PARTNER:
      return signupPartner;
    case TECHNICIAN:
      return signupTechnician;
    default:
      throw new Error('Ruolo non supportato: ' + role);
  }
}

function updateFactory(role) {
  switch (role) {
    case PARTNER:
      return updatePartner;
    case TECHNICIAN:
    case ADMIN:
      return updateTechnician;
    default:
      throw new Error('Ruolo non supportato: ' + role);
  }
}

module.exports = {
  signupFactory,
  updateFactory,
};
