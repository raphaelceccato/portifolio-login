const mysql = require("mysql");


function getConnection() {
    if (global.sql == undefined) {
        let sql = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'portifolio_login'
        });
        sql.connect((error) => {
            if (error)
                throw Error("Error connecting to MySQL database: " + error);
        });
        global.sql = sql;
    }
    return global.sql;
}


module.exports = {
    getConnection
}