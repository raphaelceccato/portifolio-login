function isLoggedIn(session) {
    return (login in session);
}


function getLoginInfo(session) {
    if (!isLoggedIn(session))
        return null;
    return session.login;
}


function login(session, username, password) {
    if (isLoggedIn(session))
        logout(session);
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