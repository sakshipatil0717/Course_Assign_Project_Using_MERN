let express = require('express');
let Course = require('../models/courseSchema');

let router = express.Router();

// *******************POST METHOD******************
router.post("/", async (req, res) => {
    try {

        const { name, description, duration ,fees } = req.body;

        const createCourse = await Course.create({  name, description, duration, fees});

        res.json({ status: "success", data: createCourse });
    } catch (err) {
        res.json({ status: "error", data: err });
    }
});

// *******************GET METHOD******************
router.get("/", async (req, res) => {

    try {
        const allCourse = await Course.find({});

        res.json({ status: "success", data: allCourse });
    } catch (err) {
        res.send({ status: "Failed", data: "Something Wents Wrong" })
    }
});

// *******************GET BY ID******************
router.get("/:id", async (req, res) => {

    try {
        const courseId = req.params.id;

        const singleCourse = await Course.findById(courseId);

        res.json({ status: "success", data: singleCourse })
    } catch (err) {
        res.send({ status: "Failed", data: "Something Wents Wrong !!!" });
    }
});

// *******************PUT BY ID******************
router.put("/:id", async (req, res) => {

    try {
        const courseId = req.params.id;
        const body = req.body;

        let updatedData = await Course.findByIdAndUpdate(courseId, body, { new: true });

        res.json({ status: "success", data: updatedData });
    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});


// *******************DELETE BY ID******************
router.delete("/:id", async (req, res) => {
    // const studentId = req.params.id;
    try {
        const deletedData = await Course.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedData });

    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }

});

module.exports = router;
