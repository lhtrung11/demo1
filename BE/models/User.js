const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Tên tài khoản không được để trống"],
    },
    password: {
        type: String,
        required: [true, "Mật khẩu không được để trống"],
    },
});

userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
