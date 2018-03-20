var mysql      = require('mysql');


/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'TuitionPoint'
});*/
var connection = mysql.createConnection(process.env.JAWSDB_URL);

connection.connect();

exports.connection = connection;