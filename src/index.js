const bc = require("bcrypt");
const session = require("express-session");
const express = require("express");
const app = express();


// Middleware
// Handle users that are not logged in

app.use('/', express.static("site-files/public"));

app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false
}));




// App




app.listen(80);