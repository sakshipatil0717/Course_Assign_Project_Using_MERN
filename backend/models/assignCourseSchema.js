const mongoose = require("mongoose");

const assignCourseSchema = new mongoose.Schema({

    studentId: { type: mongoose.Types.ObjectId, ref: "student" },
    courseId: { type: mongoose.Types.ObjectId, ref: "course" },
});

const AssignCourse = mongoose.model("assigncourse", assignCourseSchema);
module.exports = AssignCourse;