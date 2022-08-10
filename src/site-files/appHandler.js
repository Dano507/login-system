const path = require("path");
const express = require("express");
let router = express.Router();


router.use("*", (req, res, n) => {
  if (!req.session.authorised) {
    res.send("Bad");
  }
  else {n()}
})

router.use("/", express.static(path.resolve(__dirname, "app")));

/*
router.route("/") 
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/private/index.html"));
    //res.send("A");
  })
;*/

module.exports = router;
