let express = require('express');
let cors = require('cors');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect("mongodb://127.0.0.1:27017/student-data")
    .then((res) => {
        console.log("Databse Connect...");
    });

let app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome To NodeJs")
});

app.use("/student", require("./routes/studentRoutes"));
app.use("/course", require("./routes/courseRoutes"));
app.use("/assigncourse", require("./routes/assignCourseRoutes"));


const PORT = 8080
app.listen(8080, () => {
    console.log("Server Running on http://localhost:8080");
});