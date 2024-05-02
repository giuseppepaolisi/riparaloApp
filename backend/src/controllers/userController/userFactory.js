const { ADMIN, TECHNICIAN, PARTNER } = require('../../conf/role');
const { signupPartner, updatePartner } = require('./partner');
const { signupTechnician, updateTechnician } = require('./technician');
const { ErrorResponse } = require('../../middleware/errorManager');

// Factory che in base al ruolo decide restituisce la funzione appropriata per la creazione di un utente
function signupFactory(role, next) {
  switch (role) {
    case PARTNER:
      return signupPartner;
    case TECHNICIAN:
      return signupTechnician;
    default:
      return next(new ErrorResponse('Ruolo non supportato: ' + role, 400));
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
      return next(new ErrorResponse('Ruolo non supportato: ' + role, 400));
  }
}

function filterUserFactory(role, newuser, next) {
  switch (role) {
    case PARTNER:
      return filterUserFields(
        newuser,
        [
          'email',
          'password',
          'nome',
          'cognome',
          'telefono',
          'ragioneSociale',
          'partitaIVA',
          'codiceUnivoco',
          'pec',
          'cap',
          'via',
          'provincia',
        ],
        next
      );
    case TECHNICIAN:
      return filterUserFields(
        newuser,
        ['email', 'password', 'nome', 'cognome', 'telefono'],
        next
      );
    default:
      return next(new ErrorResponse('Ruolo non supportato: ' + role, 400));
  }
}

function filterUserFields(user, allowedFields, next) {
  const filteredUser = {};
  allowedFields.forEach((field) => {
    if (user[field]) {
      filteredUser[field] = user[field];
    }
  });
  return filteredUser;
}

module.exports = {
  signupFactory,
  updateFactory,
  filterUserFactory,
};
