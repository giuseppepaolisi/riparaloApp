const User = require('../../models/user');
const { PARTNER } = require('../../conf/role');

// registrazione di un utente base
const signupPartner = async (req, res) => {
  
  try {
    let newuser = req.body;

    // Controlla la lunghezza del codice univoco
    if (!newuser.codiceUnivoco || newuser.codiceUnivoco.length !== 6) {
      throw new Error('Il codice univoco deve avere esattamente 6 caratteri');
    }

    newuser.role = PARTNER;
    const user = await User.signup(newuser);
  
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  signupPartner
}