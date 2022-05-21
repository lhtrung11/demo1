const express = require("express");
const studentCtl = require("../controllers/student.controller");

const Router = express.Router();
Router.route("/").get(studentCtl.getAllStudent);
Router.route("/:studentId")
    .get(studentCtl.getStudent)
    .put(studentCtl.updateStudent)
    .post(studentCtl.createStudent)
    .delete(studentCtl.deleteStudent);

module.exports = Router;
