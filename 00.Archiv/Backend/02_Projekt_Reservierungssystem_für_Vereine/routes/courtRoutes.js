const express = require("express");
const courtControllers = require("../controllers/courtControllers");
const router = express.Router();

router
    .route("/")
    .get(courtControllers.getAllCourts)
    .post(courtControllers.addCourt);

router
    .route("/:id")
    .get(courtControllers.getCourtById)
    .post(courtControllers.updateCourtById)
    .delete(courtControllers.deleteCourtById);

module.exports = router;