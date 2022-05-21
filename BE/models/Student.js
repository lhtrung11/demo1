const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Chưa có Id"],
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Chưa điền họ và tên"],
    },
    class: {
        type: String,
        trim: true,
        required: [true, "Sinh viên chưa thuộc về lớp học nào"],
    },
    code: {
        type: String,
        unique: true,
        required: [true, "Chưa điền mã số sinh viên"],
    },
    home: {
        type: String,
        trim: true,
        required: [true, "Chưa điền quê quán cho sinh viên"],
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
