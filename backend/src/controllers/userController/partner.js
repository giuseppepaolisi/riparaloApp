const { PARTNER } = require('../../conf/role');
const { ErrorResponse } = require('../../middleware/errorManager');

// preparazione dell'utente PARTNER alla registrazione
function signupPartner(newuser, next) {
  if (!newuser.codiceUnivoco || newuser.codiceUnivoco.length !== 6) {
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

function updatePartner(data, next) {
  if (!data.codiceUnivoco || data.codiceUnivoco.length !== 6) {
    return next(
      new ErrorResponse(
        'Il codice univoco deve avere esattamente 6 caratteri',
        400
      )
    );
  }

  return data;
}
module.exports = {
  signupPartner,
  updatePartner,
};
