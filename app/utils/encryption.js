const bcrypt = require('bcrypt.js');

exports.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

exports.compare = async (password, savedPass) => {
    try{
        const result = await bcrypt.compare(password, savedPass);
        return result;
    }catch(err){
        console.log(err);
    }
}