const db = require("../utils/database.js");
const bcrypt = require("bcrypt");

const BCRYPT_ROUNDS = 12;


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
    return new Promise(async (resolve, reject) => {
        let hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
        sql.query("INSERT INTO accounts SET username=?, password=?, pwd_rounds=?", [username, hashedPassword, BCRYPT_ROUNDS], (error, result) => {
            if (error) {
                if (error.code != "ER_DUP_ENTRY")
                   console.error("Error on creating account: ", error);
                return reject(error);
            }
            return resolve("ok");
        });
    });
}


function changePassword(accountId, newPassword) {
    let sql = db.getConnection();
    return new Promise(async (resolve, reject) => {
        let hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
        sql.query("UPDATE accounts SET password=?, pwd_rounds=? WHERE id = ?", [hashedPassword, BCRYPT_ROUNDS, accountId], (error, result) => {
            if (error) {
                console.error("Error on changing password: ", error);
                return reject(error);
            }
            return resolve("ok");
        });
    });
}


function erase(accountId) {
    let sql = db.getConnection();
    return new Promise(async (resolve, reject) => {
        sql.query("DELETE FROM accounts WHERE id = ?", [accountId], (error, result) => {
            if (error) {
                console.error("Error on deleting account: ", error);
                return reject(error);
            }
            return resolve("ok");
        });
    });
}


module.exports = {
    getAccountInfoByUsername,
    create,
    changePassword,
    erase
}