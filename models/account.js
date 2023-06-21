const db = require("../utils/database.js");


function getAccountInfoByUsername(username) {
    let sql = db.getConnection();
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM accounts WHERE username = ?", [username], (error, results) => {
            if (error) {
                console.error("Error on getting account by username: " + error);
                return reject(error);
            }
            return resolve((results.length != 0 ? results[0] : null));
        }); 
    });
}


module.exports = {
    getAccountInfoByUsername
}