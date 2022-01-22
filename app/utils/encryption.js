const bcrypt = require('bcrypt');

exports.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
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