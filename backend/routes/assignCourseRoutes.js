let express = require('express');
// let Student = require('../models/studentSchema');
const AssignCourse = require('../models/assignCourseSchema');

let router = express.Router();

// *******************POST METHOD******************
router.post("/", async (req, res) => {
    try {

        const { studentId, courseId } = req.body;

        const createAssignCourse = await AssignCourse.create({ studentId, courseId });

        res.json({ status: "success", data: createAssignCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

// *******************GET METHOD******************
router.get("/", async (req, res) => {

    try {
        const assignCourse = await AssignCourse.find({});

        res.json({ status: "success", data: assignCourse });
    } catch (err) {
        res.send({ status: "Failed", data: "Something Wents Wrong" })
    }
});

// *******************GET BY ID ******************

router.get("/:id", async (req, res) => {
    try {
        const studentId = req.params.id; // Assuming you're searching by AssignCourse ID

        const getAssignCourseData = await AssignCourse.find({studentId})
            .populate("studentId")  // Replace with actual field name in schema
            .populate("courseId");   // Replace with actual field name in schema

        if (!getAssignCourseData) {
            return res.status(404).json({ status: "error", message: "Assigned course not found" });
        }
        res.json({ status: "success", data: getAssignCourseData });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


// *******************PUT BY ID ******************
router.put("/:id", async (req, res) => {

    try {
        const assignCourseId = req.params.id;
        const body = req.body;

        let updatedData = await AssignCourse.findByIdAndUpdate(assignCourseId, body, { new: true });

        res.json({ status: "success", data: updatedData });
    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});

// *******************DELETE BY ID ******************
router.delete("/:id", async (req, res) => {
    // const studentId = req.params.id;
    try {
        const deletedData = await AssignCourse.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedData });

    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});


module.exports = router;
