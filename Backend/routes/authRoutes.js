const express = require("express");
const routes = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/authController.js");

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/logout", logoutUser);