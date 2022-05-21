const express = require("express");
const {
    register,
    login,
    logout,
    getCurrentUser,
} = require("../controllers/auth.controller");
const { checkCurrentUser } = require("../middlewares/checkCurrentUser");

const Router = express.Router();
Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").post(logout);
Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
