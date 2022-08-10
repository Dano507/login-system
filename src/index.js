const { resolve } = require("path");
const fs = require("fs");
const session = require("express-session");
const express = require("express");
const app = express();


// Middleware
// Handle users that are not logged in
app.use('/', express.static(resolve(__dirname, "site-files/public")));
app.use(express.urlencoded());
app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}));

// Variables
var logins = JSON.parse(fs.readFileSync(resolve(__dirname, "site-files/logins.json"), "utf-8"));


// App
app.use("/app", require(resolve(__dirname, "site-files/appHandler.js")));



// TODO: implement encryption with bcrypt
app.post("/login", (req, res) => {
    let match = false;

    // Loop through all login data and find matching username
    // If password matches for username, set "match" to true
    for (let i=0; i<logins.length; i++) {
        if (logins[i].username === req.body.username) {
            if (logins[i].password === req.body.password) { match = true }
        }
    }

    if (match === true) {
        req.session.authorised = true;
        let e = req.body.username + " " + req.body.password;
        res.redirect("/app");
    } 
    else { res.status(400).send("Bad Login") }
});


// Temporary
// Should be a POST (not USE)
app.use("/logout", (req, res) => {
    if (req.session.authorised) { 
        req.session.authorised = false;
        res.send("Logged out");
    } else { res.send("You are not logged in") }

});

// TODO: implement register page


app.listen(3000);