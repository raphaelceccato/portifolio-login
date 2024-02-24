const sequelize = require("sequelize");


const Account = sequelize.Model.define("account", {
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