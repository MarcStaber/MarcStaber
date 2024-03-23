const express = require("express");
const courtReservationControllers = require("../controllers/courtReservationControllers");
const router = express.Router();

router
    .route("/")
    .get(courtReservationControllers.getAllCourtReservations)
    .post(courtReservationControllers.addCourtReservation);

router
    .route("/:id")
    .get(courtReservationControllers.getCourtReservationById)
    .post(courtReservationControllers.updateCourtReservationById)
    .delete(courtReservationControllers.deleteCourtReservationById);

module.exports = router;