const express = require("express");
const app = express();

//Uses express-session (for custom modules such as authentication of user and payment)
const session = require("express-session");

app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true
}));

// Makes user available to all page if logged in
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Uses absolute path if project folder is loaded on different system - not hard-coding file paths
const path = require("path");
//Allows Node to browse backend folders such as for carousel images
const fs = require("fs");

//Connect to the db.js file
const db = require("./database/db");

//Import authentication custom module
const auth = require("./custom_node_modules/auth.js");

// View engine - uses __dirname for absolute path in directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files - uses __dirname for absolute path in directory (CSS, JS, images, etc.)
app.use("/public", express.static(path.join(__dirname, "public")));


//------------------------------
// For Home Page Carousel Images
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

    //Prints to the console the selected images
    console.log("Images selected for carousel:", images);

    //renders the home page with the carousel images
    res.render("home", { images });
});

//End of carousel
//---------------


//------------------------------------------------------------------------
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


            //QUERY: will look in the database for the alternate version (Home ↔ Away)
            db.query(
                "SELECT ID, Version FROM product_data.database WHERE Club = ? AND Version != ? LIMIT 1",
                [clubName, versionName],
                function (err2, altRows) {

                    if (err2) {
                        console.error("Error fetching alternate version", err2);
                        res.status(500).send("Error retreiving alternate product.");
                        return;
                    }

                    // Build link if alternate exists (back to shopItems via the ID)
                    const altLink = altRows.length > 0
                        ? `/shop?rec=${altRows[0].ID}`
                        : null;

                    const altVersion = altRows.length > 0
                        ? altRows[0].Version
                        : null;


            //Inject data into a HTML page - Render the shopItems page with the information stored 
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

// End of SHOP LAYOUT GET Method
//------------------------------


//--------------------------------------------------------------------------------------------------------------
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

// End of GET METHOD /search
//--------------------------


//-------------------------------
// Routes to Pages in the website

//Route back to Home Page (GET Method)
app.get("/", function (req, res) {
    res.render("home");
})


//Route to the About page (GET Method)
app.get("/about", (req, res) => {
    res.render("about");
});


//Route to the Contact Us page (GET Method)
app.get("/contactUs", (req, res) => {
    res.render("contactUs");
});


//Route to the Jersey Shop Page (GET Method)
app.get("/jerseyShop", (req, res) => {
    res.render("jerseyShop");
});


//Route to the Misc Items Shop Page (GET Method)
app.get("/miscShop", (req, res) => {
    res.render("miscShop");
});


//Route for the entire shopEntire page (GET Method)
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


//Route to Payment / Order Successful after Checkout Page (POST METHOD)
app.post("/paymentSuccess", (req, res) => {
    // Generate a random number
    const orderNumber = Math.floor(Math.random() * 900000 + 100000); // 6-digit number

    //Generates the order number when page is rendered
    res.render("paymentSuccess", { 
        orderNumber // pass as object to avoid error
    });
});

// End of Routes to Pages in the website
//--------------------------------------


//-----------------------------------
//For the payment options in Checkout
//Uses Custom Node Module payment.js
const { getPaymentHTML } = require('./custom_node_modules/payment');

//Get the switch case options from the custom module
app.get('/checkout', (req, res) => {
    res.render('checkout', {
        user: req.session.user || null,
        creditCardFields: getPaymentHTML('credit-card'),
        paypalFields: getPaymentHTML('paypal'),
        stripeFields: getPaymentHTML('stripe'),
        cryptoFields: getPaymentHTML('crypto')
    });
});

// End of Payment Options
//-----------------------


//--------------------------------
//Create Users for the application
auth.createUser("user@123.ie", "pass")

//test users work
console.log(auth.authenticateUser("user@123.ie", "pass"));

// End of application users
//-------------------------


//--------------------------------
//Route to Login Page (GET METHOD)
app.get("/login", (req, res) => {
    res.render("login", { error: null, username: "" });
});

//Route to handle Login Form Submission - (POST METHOD)
app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    //authenticate the username and password
    const authenticated = auth.authenticateUser(username, password);
    console.log(authenticated);

    if (authenticated) {
        // store user in session
        req.session.user = username;

        //Logs to the console that the login was a success
        //If login is successful then directed to the home page (/)
        console.log("Successful Authentication");
        res.redirect("/");
    }
    else {
        //If login fails the login page renders again
        //Logs to the console that the login failed
        //Redirects to the login page with the previously input username still shown
        //Gives an alert message saying invalid username or passowrd
        console.log("Failed Authentication");
        res.render("login", {error: "Invalid username or password", username: username });
    }
});

// End of Login Route Methods
//---------------------------


// Server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});








