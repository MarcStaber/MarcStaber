
const express = require("express");
const addressLookupControllers = require("../controllers/addressLookupControllers");
const router = express.Router();

router
    .route("/")
    .get(addressLookupControllers.getAllAddressLookups)
    .post(addressLookupControllers.addAddressLookup);

router
    .route("/:id")
    .get(addressLookupControllers.getAddressLookupById)
    .post(addressLookupControllers.updateAddressLookupById)
    .delete(addressLookupControllers.deleteAddressLookupById);

module.exports = router;
