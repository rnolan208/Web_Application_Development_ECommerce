const express = require('express');
const app = express();

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


app.get("/shop", function(req, res){
    const ID = req.query.rec;
    connection.query("SELECT * FROM product_data.database WHERE ID = ?", [ID], function(err, rows, fields) {
        if(err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        }
        else if(rows.length === 0) {
            console.error("No rows found for ID $[ID]");
        }
        else {
            //To monitor the application while developing it
            console.log("Data retreived from the database.");
            console.log(rows[0].Club);
            console.log(rows[0].Version);
            console.log(rows[0].Price);
            console.log(rows[0].League);

            //Variables from Database
            const clubName = rows[0].Club;
            const versionName = rows[0].Version;
            const price = rows[0].Price;
            const league = rows[0].League;

            res.render("test.ejs", {myClub: clubName, myVersion: versionName, myPrice: price, myLeague: league});
        }

        //Inject data into a HTML page
    })
});


//Start the server
app.use(express.static("pages", {index: "home.html"}));
app.listen(3000, () => {
    console.log('Server stated on port 3000');
});