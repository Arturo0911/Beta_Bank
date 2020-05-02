const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.MatchPassword = async(password, savedPass) => {
    try {
        return await bcrypt.compare(password, savedPass);
    } catch (e) {
        console.log('error marcado: ', e);
    }

};

module.exports = helpers;