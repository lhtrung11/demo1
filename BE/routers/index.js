const studentRoute = require("./student.route");
const authRoute = require("./auth.route");
const { verifyToken } = require("../middlewares/verifyToken");

route = (app) => {
    app.use("/students", verifyToken, studentRoute);
    app.use("/auth", authRoute);
    app.all("*", (req, res, next) => {
        const err = new Error("The route can not be found");
        err.statusCode = 404;
        next(err);
    });
};

module.exports = route;
