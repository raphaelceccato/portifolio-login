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
            let pwdCorrect = await bcrypt.compare(password, accInfo.password);
            if (!pwdCorrect)
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


function register(username, password) {
    return new Promise((resolve, reject) => {
        Account.create(username, password)
        .then(result => {
            return resolve("ok");
        }).catch(error => {
            if (error.code == "ER_DUP_ENTRY")
                return resolve("O nome de usuário especificado já está em uso, por favor escolha outro.");
            return reject(error);
        });
    });
}


module.exports = {
    isLoggedIn,
    getLoginInfo,
    login,
    logout,
    register
}