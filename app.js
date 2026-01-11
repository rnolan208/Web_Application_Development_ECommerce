const express = require("express");
const app = express();

//Uses absolute path if project folder is loaded on different system - not hard-coding file paths
const path = require("path");
//Allows Node to browse backend folders such as for carousel images
const fs = require("fs");

//Connect to the db.js file
const db = require("./database/db");


// View engine - uses __dirname for absolute path in directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files - uses __dirname for absolute path in directory (CSS, JS, images, etc.)
app.use("/public", express.static(path.join(__dirname, "public")));

// For Home Page and Carousel Images
app.get("/", (req, res) => {
    const imagesDir = path.join(__dirname, "public/images/jerseys");

    //Creates empty array for the images to be stored before shuffle
    let images = [];

    try {
        // Read all files in the folder
        images = fs.readdirSync(imagesDir)
            .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file)); // Only image files

        // Shuffle the array randomly
        for (let i = images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [images[i], images[j]] = [images[j], images[i]];
        }

        // Picks the first 10 images after the shuffle
        images = images.slice(0, 10);

    } catch (err) {
        console.error("Error reading images folder:", err);
    }

    console.log("Images selected for carousel:", images);

    res.render("home", { images });
});


/*
//Shop function GET Method using LIKE search for product names
app.get("/shop", function (req, res) {
    const searchTerm = req.query.rec;
    db.query("SELECT * FROM product_data.database WHERE Club LIKE ?", [`%${searchTerm}%`], function (err, rows, fields) {
        if (err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        }
        else if (rows.length === 0) {
            console.error("No rows found for ${searchTerm}");
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

            res.render("shopItems.ejs", {
                myClub: clubName, myVersion: versionName, myPrice: price, myLeague: league,
                myManufacturer: manufact, myImage: images, myCrest: crest
            });
        }

        //Inject data into a HTML page
    })
});
*/




//GET METHOD /shop USED TO CREATE SHOP LAYOUT PAGES USING ID FROM DATABASE 
app.get("/shop", function (req, res) {
    const ID = req.query.rec;
    db.query("SELECT * FROM product_data.database WHERE ID = ?", [ID], function (err, rows, fields) {
        if (err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        } else if (rows.length === 0) {
            console.error("No rows found for ID $[ID]");
            res.status(404).send("Product not found");
        } else {
            //To monitor the application while developing it 
            console.log("Data retreived from the database.");
            console.log(rows[0].Club);
            console.log(rows[0].Version);
            console.log(rows[0].Price);
            console.log(rows[0].League);
            console.log(rows[0].ID);

            //Variables from Database 
            const clubName = rows[0].Club;
            const versionName = rows[0].Version;
            const price = rows[0].Price;
            const league = rows[0].League;
            const manufact = rows[0].Manufacturer;
            const images = rows[0].Image;
            const crest = rows[0].Crest;
            const ID = rows[0].ID;


            //QUERY: will look in the database for teh alternate version (Home ↔ Away)
            db.query(
                "SELECT ID, Version FROM product_data.database WHERE Club = ? AND Version != ? LIMIT 1",
                [clubName, versionName],
                function (err2, altRows) {

                    if (err2) {
                        console.error("Error fetching alternate version", err2);
                        res.status(500).send("Error retreiving alternate product.");
                        return;
                    }

                    // Build link if alternate exists
                    const altLink = altRows.length > 0
                        ? `/shop?rec=${altRows[0].ID}`
                        : null;

                    const altVersion = altRows.length > 0
                        ? altRows[0].Version
                        : null;



            res.render("shopItems.ejs", {
                myClub: clubName, myVersion: versionName, myPrice: price, myLeague: league,
                myManufacturer: manufact, myImage: images, myCrest: crest, altLink: altLink,
                altVersion: altVersion, myID: ID,
            });
                }
            );
        }
    });
});
//Inject data into a HTML page 



//GET METHOD /search FOR SEARCHING BY PRODUCT NAME OR CLUB NAME / ITEM TYPE AS PER Club and League FROM DATABASE
app.get("/search", function (req, res) {
    const searchTerm = req.query.q;

    const sql = `
        SELECT ID
        FROM product_data.database
        WHERE Club LIKE ? OR League LIKE ?
        LIMIT 1
    `;

    db.query(
        sql,
        [`%${searchTerm}%`, `%${searchTerm}%`],
        function (err, rows) {
            if (err) {
                console.error("Search error:", err);
                return res.status(500).send("Search failed");
            }

            if (rows.length === 0) {
                return res.status(404).send("No products found");
            }

            res.redirect(`/shop?rec=${rows[0].ID}`);
        }
    );
});


/*
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
 
*/


//Route back to Home Page
app.get("/", function (req, res) {
    res.render("home");
})

//Route to handle Login Form Submission - POST Method
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    //authenticate the username and password
    const authenticated = auth.authenticateUser(username, password);
    console.log(authenticated);

    if (authenticated) {
        console.log("Successful Authentication");
        res.render("home");
    }
    else {
        console.log("Failed Authentication");
        res.render("failed");
    }
});

//Route for the entire shopEntire page
app.get("/shop-all", (req, res) => {
    //No need for the const ID = req.query.rec as this will be using all items from db on the one page
    db.query("SELECT * FROM product_data.database", (err, rows) => {
        if (err) {
            console.error("Error getting data from database.", err);
            res.status(500).send("Error retreiving data from database.");
        }
        res.render("shopEntire", {
            products: rows
        });
    });
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

