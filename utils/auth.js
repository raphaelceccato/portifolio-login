const Account = require("../models/account.js");
const bcrypt = require("bcrypt");



function isLoggedIn(session) {
    return (session.login != null)
}


function getLoginInfo(session) {
    if (!isLoggedIn(session))
        return null;
    return session.login;
}


function login(session, username, password) {
    if (isLoggedIn(session))
        logout(session);
    
    return new Promise(async(resolve, reject) => {
        Account.getAccountInfoByUsername(username, password)
        .then(async (accInfo) => {
            if (accInfo == null)
                return resolve("Nome de usuário e/ou senha inválido(s)");
            let hashedPassword = await bcrypt.hash(password, accInfo.pwd_rounds);
            if (hashedPassword != accInfo.password)
                return resolve("Nome de usuário e/ou senha inválido(s)");
            session.login = accInfo;
            return resolve("ok");
        })
        .catch(error => {
            return reject(error);
        });
    });
}


function logout(session) {
    delete session.login;
}


module.exports = {
    isLoggedIn,
    getLoginInfo,
    login,
    logout
}