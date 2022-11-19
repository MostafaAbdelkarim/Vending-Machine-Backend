const bcrypt = require('bcrypt');

const encodePassword = async (rawPassword) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
}

const comparePasswords = async (rawPassword, hashedPassword) => {
    return await bcrypt.compare(rawPassword, hashedPassword);
}

module.exports = {encodePassword, comparePasswords}
