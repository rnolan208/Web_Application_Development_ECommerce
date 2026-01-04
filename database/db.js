//Connect to Database
const mysql = require('mysql');

//Create a connection to MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'product_data',
});

//Connect to database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        console.log('Connected to database!');
    }
});


module.exports = connection;
