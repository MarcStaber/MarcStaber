const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router
    .route("/")
    .get(userControllers.getAllUsers)
    .post(userControllers.addUser);

router
    .route("/:id")
    .get(userControllers.getUserById)
    .post(userControllers.updateUserById)
    .delete(userControllers.deleteUserById);

module.exports = router;