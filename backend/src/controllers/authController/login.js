const user = require('../../models/user');
const { generateToken } = require('../../middleware/requireAuth');

// login di un utente
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.login(email, password);

        // creazione token
        const token = generateToken({ _id: user._id });

        // Selezionare solo i campi necessari per l'output
        const userOutput = {
            _id: user._id,
            email: user.email,
            role: user.role,
            nome: user.nome,
            cognome: user.cognome
        };

        res.status(200).json({ user: userOutput, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginUser }