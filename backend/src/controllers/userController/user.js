// signup.js
const {signupFactory} = require('./userFactory');
const User = require('../../models/user');

// Si occupa della creazione di untente 
const signup = async (req, res) => {
    const { role } = req.params;

    try {
        let newuser = req.body;
        const signupFunction = signupFactory(role);
        newuser = signupFunction(newuser);

        // Controlli comuni (es. validazione email e password)
        if (!/\S+@\S+\.\S+/.test(newuser.email)) {
            throw new Error("Inserire un'email valida");
        }
        if (newuser.password.length < 8) {
            throw new Error('La password deve avere almeno 8 caratteri');
        }

        const user = await User.signup(newuser);
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  signup
};
