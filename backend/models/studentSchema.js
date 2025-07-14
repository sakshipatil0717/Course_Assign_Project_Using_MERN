const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qualification:{ type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true }

});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;