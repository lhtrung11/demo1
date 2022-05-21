const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                username: req.body.username,
            },
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        });
        if (!user) {
            const err = new Error("Tên đăng nhập không tồn tại");
            err.statusCode = 400;
            return next(err);
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user._id },
                process.env.APP_SECRET
            );
            res.status(200).json({
                status: "success",
                data: {
                    token,
                    username: user.username,
                },
            });
        } else {
            const err = new Error("Mật khẩu không đúng");
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    const token = jwt.sign({ message: "" }, process.env.APP_SECRET, {
        expiresIn: "1ms",
    });
    res.status(200).json({
        status: "success",
        message: "Đăng xuất thành công",
        data: { token },
    });
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null };
        if (req.user) {
            const user = await User.findById(req.user.userId);
            data.user = { username: user.username };
        }
        res.status(200).json({
            status: "success",
            data: data,
        });
    } catch (error) {
        res.json(error);
    }
};
