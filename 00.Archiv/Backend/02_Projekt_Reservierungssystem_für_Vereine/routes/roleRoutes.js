const express = require("express");
const roleControllers = require("../controllers/roleControllers");
const router = express.Router();

router
    .route("/")
    .get(roleControllers.getAllRoles)
    .post(roleControllers.addRole);

router
    .route("/:id")
    .get(roleControllers.getRoleById)
    .post(roleControllers.updateRoleById)
    .delete(roleControllers.deleteRoleById);

module.exports = router;