const db = require("../utils/database.js");
const bcrypt = require("bcrypt");


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


function create(username, password) {
    let sql = db.getConnection();
    const rounds = 12; //bcrypt rounds
    return new Promise(async (resolve, reject) => {
        let hashedPassword = await bcrypt.hash(password, rounds);
        sql.query("INSERT INTO accounts SET username=?, password=?, pwd_rounds=?", [username, hashedPassword, rounds], (error, result) => {
            if (error) {
                if (error.code != "ER_DUP_ENTRY")
                   console.error("Error on creating account: ", error);
                return reject(error);
            }
            return resolve("ok");
        });
    });
}


module.exports = {
    getAccountInfoByUsername,
    create
}