let express = require('express');
let Student = require('../models/studentSchema');

let router = express.Router();

// *******************POST METHOD******************
router.post("/", async (req, res) => {
    try {

        const { name, qualification, email, mobile } = req.body;

        const createStudent = await Student.create({ name, qualification, email, mobile });

        res.json({ status: "success", data: createStudent });
    } catch (err) {
        res.json({ status: "error", data: err });
    }

});

// *******************GET METHOD******************
router.get("/", async (req, res) => {

    try {
        const allStudent = await Student.find({});

        res.json({ status: "success", data: allStudent });
    } catch (err) {
        res.send({ status: "Failed", data: "Something Wents Wrong" })
    }
});


// *******************GET BY ID******************
router.get("/:id", async (req, res) => {

    try {

        const studentId = req.params.id;

        const singleStudent = await Student.findById(studentId);

        res.json({ status: "success", data: singleStudent })
    } catch (err) {
        res.send({ status: "failed", data: "Something Wents Wrong !!!" });
    }
});

// *******************PUT BY ID******************
router.put("/:id", async (req, res) => {

    try {

        const studentId = req.params.id;
        const body = req.body;

        let updatedData = await Student.findByIdAndUpdate(studentId, body, { new: true });

        res.json({ status: "success", data: updatedData });
    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }
});

// *******************DELETE BY ID******************
router.delete("/:id", async (req, res) => {
    // const studentId = req.params.id;

    try {
        const deletedData = await Student.findByIdAndDelete(req.params.id);

        res.json({ status: "success", data: deletedData });

    } catch (err) {
        res.json({ status: "ERROR", data: "Something Wents Wrong" });
    }

});

module.exports = router;
