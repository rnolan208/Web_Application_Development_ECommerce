const express = require("express");
const app = express();

//Uses absolute path if project folder is loaded on different system - not hard-coding file paths
const path = require("path");

//Connect to the db.js file
const db = require("./database/db");

//Server Static Files from Public Directory for Home page
app.use(express.static("pages", {index: "home.html"}));

// View engine - uses __dirname for absolute path in directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files - uses __dirname for absolute path in directory (such as images)
app.use(express.static(path.join(__dirname, "pages")));



//Shop function GET Method
app.get("/shop", function(req, res){
    const ID = req.query.rec;
    db.query("SELECT * FROM product_data.database WHERE ID = ?", [ID], function(err, rows, fields) {
        if(err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        }
        else if(rows.length === 0) {
            console.error("No rows found for ID $[ID]");
            res.status(404).send("Product not found");
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
            const manufact = rows[0].Manufacturer;
            const images = rows[0].Image;
            const crest = rows[0].Crest;

            res.render("shopItems.ejs", {myClub: clubName, myVersion: versionName, myPrice: price, myLeague: league, 
                                    myManufacturer: manufact ,myImage: images, myCrest: crest});
        }

        //Inject data into a HTML page
    })
});


//Shop function POST Method
app.post("/shop", function(req, res){
    const ID = req.body.rec2;
    db.query("SELECT * FROM product_data.database WHERE ID = ?", [ID], function(err, rows, fields) {
        if(err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        }
        else if(rows.length === 0) {
            console.error("No rows found for ID $[ID]");
            res.status(404).send("Product not found");
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

//NEEDS TO BE FIXED AND UPDATED WITH HOME PAGE
//Route back to Home Page
app.get("/pages", function(req, res){
    res.render("home.html");
})

//Route to handle Login Form Submission - POST Method
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    //authenticate the username and password
    const authenticated = auth.authenticateUser(username, password);
    console.log(authenticated);

    if(authenticated) {
        console.log("Successful Authentication");
        res.render("home");
    }
    else {
        console.log("Failed Authentication");
        res.render("failed");
    }

});



// Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});


//Import authentication module
const auth = require("./auth.js");

//Users for the application
auth.createUser("John", "secret123");
auth.createUser("Robert", "helloworld");
auth.createUser("Mary", "pass456");

//test users work
console.log(auth.authenticateUser("John", "secret123"));
console.log(auth.authenticateUser("John", "secret456"));

