const bcrypt = require('bcryptjs');

const hashpassword = (password) =>{
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt)
};

const comparedhash = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
}

module.exports = {
    hashpassword,
    comparedhash,
}