const sequelize = require("sequelize");


const Account = sequelize.Model.define("account", {
    user: sequelize.DataTypes.CHAR(20),
    password: sequelize.DataTypes.CHAR(20),
    email: sequelize.DataTypes.CHAR(255)
});


module.exports = Account;