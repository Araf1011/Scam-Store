const express = require("express");
const routes = express.Router();
const { registerUser, loginUser, getUsers, logoutUser } = require("../controllers/authController.js");
const { protect} = require("../middleware/authMiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/users", protect , admin, getUsers);
routes.post("/logout", logoutUser);


module.exports = routes;