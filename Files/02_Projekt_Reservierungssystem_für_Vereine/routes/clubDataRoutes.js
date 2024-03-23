const express = require("express");
const clubDataControllers = require("../controllers/clubDataControllers");
const router = express.Router();

router
    .route("/")
    .get(clubDataControllers.getAllClubData)
    .post(clubDataControllers.addClubData);

router
    .route("/:id")
    .get(clubDataControllers.getClubDataById)
    .post(clubDataControllers.updateClubDataById)
    .delete(clubDataControllers.deleteClubDataById);

module.exports = router;