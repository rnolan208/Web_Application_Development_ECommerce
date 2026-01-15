//Connect to Database
const mysql = require('mysql');

//Create a connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'g00474404',
});

//Connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});

//Export for use elsewhere
module.exports = connection;



