const User = require('../../../models/user');

// registrazione di un utente base
const signupTechnician = async (req, res) => {
  const newuser = req.body;

  try {
    const user = await User.signupTechnician(newuser);

    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
    signupTechnician
}