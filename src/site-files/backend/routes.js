"use strict";
const express = require("express");
let router = express.Router();


router.use("*", (req, res, n) => {
  if (!req.session.authorised) {
    res.send("Bad");
  }
  else {n()}
})


router.route("/") 
  .get((req, res) => {
    //res.sendFile("/site-file/frontend/private/index.html");
    res.send("A");
  })
;

module.exports = router;
