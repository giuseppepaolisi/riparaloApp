const {ADMIN, TECHNICIAN, PARTNER} = require('../../conf/role');
const {signupPartner} = require('./partner');
const { signupTechnician } = require('./technician');


function signupFactory(role) {
    switch(role) {
        case PARTNER:
            return signupPartner;
        case TECHNICIAN:
            return signupTechnician;
        default:
            throw new Error("Ruolo non supportato: " + role);
    }
}

module.exports = {
    signupFactory
}