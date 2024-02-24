const sequelize = require("sequelize");
const Account = require("./models/Account.js");


const db = new sequelize.Sequelize({ dialect: "sqlite", storage: "database.db" });


module.exports = db;