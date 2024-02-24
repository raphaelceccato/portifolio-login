const sequelize = require("sequelize");


const db = new sequelize.Sequelize({ dialect: "sqlite", storage: "database.db" });


module.exports = db;