const sequelize = require("sequelize");
const db = require("../db.js");


const Account = db.define("account", {
    user: {
        type: sequelize.DataTypes.CHAR(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.DataTypes.CHAR(20),
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize.DataTypes.CHAR(255),
        allowNull: false,
        unique: true
    }
});


module.exports = Account;