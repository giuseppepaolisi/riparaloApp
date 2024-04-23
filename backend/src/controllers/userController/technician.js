const User = require('../../models/user');
const { TECHNICIAN } = require('../../conf/role');

// registrazione di un utente base
const signupTechnician = async (req, res) => {
  let newuser = req.body;

  try {
    newuser.role = TECHNICIAN;
    const user = await User.signup(newuser);

    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
    signupTechnician
}