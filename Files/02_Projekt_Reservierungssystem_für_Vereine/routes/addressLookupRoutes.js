
const express = require("express");
const addressLookupControllers = require("../controllers/addressLookupControllers");
const router = express.Router();

router
    .route("/")
    .get(addressLookupControllers.getAllAddressLookups);

module.exports = router;
