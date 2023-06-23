const Account = require("../models/account.js");


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
    
    return new Promise((resolve, reject) => {
        Account.getAccountInfoByUsername(username, password)
        .then((accInfo) => {
            if (accInfo == null)
                return resolve("Invalid username and/or password");
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