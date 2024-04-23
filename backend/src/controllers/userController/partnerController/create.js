const User = require('../../../models/user');

// registrazione di un utente base
const signupPartner = async (req, res) => {
  const newuser = req.body;

  try {
    const user = await User.signupPartner(newuser);

    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  signupPartner
}