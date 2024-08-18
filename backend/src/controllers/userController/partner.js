const { PARTNER } = require('../../conf/role');
const { ErrorResponse } = require('../../middleware/errorManager');

// preparazione dell'utente PARTNER alla registrazione
function signupPartner(newuser, next) {
  if (!newuser.codiceUnivoco || newuser.codiceUnivoco.length !== 7) {
    return next(
      new ErrorResponse(
        'Il codice univoco deve avere esattamente 6 caratteri',
        400
      )
    );
  }

  newuser.role = PARTNER;
  return newuser;
}

const updatePartner = (data, next) => {
  // Specifica quali campi possono essere aggiornati da un partner
  const allowedUpdates = [
    'email',
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
  ];

  if (data.codiceUnivoco && data.codiceUnivoco.length !== 7) {
    return next(
      new ErrorResponse(
        'Il codice univoco deve avere esattamente 6 caratteri',
        400
      )
    );
  }

  return filterUpdates(data, allowedUpdates, next);
};

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
  signupPartner,
  updatePartner,
};
