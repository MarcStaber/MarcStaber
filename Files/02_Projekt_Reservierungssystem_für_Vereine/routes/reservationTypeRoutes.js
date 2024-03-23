const express = require("express");
const reservationTypeControllers = require("../controllers/reservationTypeControllers");
const router = express.Router();

router
    .route("/")
    .get(reservationTypeControllers.getAllReservationTypes)
    .post(reservationTypeControllers.addReservationType);

router
    .route("/:id")
    .get(reservationTypeControllers.getReservationTypeById)
    .post(reservationTypeControllers.updateReservationTypeById)
    .delete(reservationTypeControllers.deleteReservationTypeById);

module.exports = router;