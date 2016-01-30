var mysql = require('mysql');
var connection=mysql.createConnection({
host : app.locals.config.host,
user : app.locals.config.user,
database : app.locals.config.database,
password : app.locals.config.password
});
//connection.connect();
module.exports.mysqlconnection = connection;
