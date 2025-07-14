import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Course() {

    const [selectedCourseDetail, setselectedCourseDetail] = useState(null);


    // *****************GET DATA FROM API OF STUDENT & COURSE****************
    {/* GET STUDENT METHOD */ }
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/student")
            .then((res) => {
                // console.log(res.data.data);
                setStudentData(res.data.data);
            })
    }, [])

    {/* GET COURSE METHOD */ }
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/course")
            .then((res) => {
                // console.log(res.data.data);
                setCourseData(res.data.data);
            })
    }, [])

    
    // *****************ADD STUDENT****************
    {/* ADD STUDENT MODAL */ }
    const [AddStudentModal, setAddStudentModal] = useState(false);

    {/* POST STUDENT METHOD */ }
    const [newStudent, setNewStudent] = useState({
        name: '',
        qualification: '',
        email: '',
        mobile: ''
    });

    // {*--HANDLE INPUT CHANGE-- *}
    const handleChangeStudentData = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value })
    };

    // {*--HANDLE FORM SUBMISSION-- *}
    const handleAddStudent = () => {
        // if (!newStudent.name || !newStudent.qualification || !newStudent.email || !newStudent.mobile) {
        //     alert("Please fill all fields.");
        //     return;
        // }
        axios.post(import.meta.env.VITE_BASEURL + "/student", newStudent)
            .then((res) => {
                setStudentData([...studentData, res.data]);
                setAddStudentModal(false);
                setNewStudent({ name: '', qualification: '', email: '', mobile: '' }); //clear form
                alert("Student added successfully!");
            })
            .catch((err) => {
                console.error("Error adding student:", err);
                alert("Failed to add student.");
            });
    };


    // ******************ADD COURSES*******************

    {/* ADD COURSE MODAL */ }
    const [AddCourseModal, setAddCourseModal] = useState(false);

    {/* POST COURSE METHOD */ }
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        duration: '',
        fees: ''
    });

    {/*--HANDLE INPUT CHANGE-- */ }
    const handleChangeCoursetData = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value })
    };

    {/*--HANDLE FORM SUBMISSION-- */ }
    const handleAddCourse = () => {
        axios.post(import.meta.env.VITE_BASEURL + "/course", newCourse)
            .then((res) => {
                setCourseData([...courseData, res.data]);
                setAddCourseModal(false);
                setNewCourse({ name: '', description: '', duration: '', fees: '' });
            })
            .catch((err) => console.error("Error adding course:", err));
    };



    // ********************ASSIGN COURSES*************************
    // ------assign course-------
    const [AssignCourseModal, setAssignCourseModal] = useState(false);

    // {*------ COURSE POST METHOD ------ *} 
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setselectedCourse] = useState("");

    const handleAssignCourse = () => {
        axios.post(import.meta.env.VITE_BASEURL + "/assigncourse", { studentId: selectedStudent, courseId: selectedCourse })
            .then((res) => {
                alert("Course assigned successfully!");
                setAssignCourseModal(false);
                setSelectedStudent('');
                setselectedCourse('');
            })
            .catch((err) => {
                console.error("Error assigning course:", err);
                alert("Failed to assign course.");
            });
    };


    // ****************assign course************************
    const [assignedCourse, setAssignedCourse] = useState([]);

    function fetchStudentCourse(id) {

        axios.get(import.meta.env.VITE_BASEURL + "/assigncourse/" + id)
            .then((res) => {
                // console.log(res.data.data);
                setAssignedCourse(res.data.data);
            })
    }


    // ********************CARD DELETE**********************

    function deleteStudentCourse(id) {
        axios
            .delete(`${import.meta.env.VITE_BASEURL}/assigncourse/${id}`)
            .then((res) => {
                console.log("Course deleted from backend:", res.data);

                // Remove the deleted course from the frontend UI
                setAssignedCourse((prevCourses) =>
                    prevCourses.filter((course) => course._id !== id)
                );
            })
            .catch((error) => {
                console.error("Error deleting course:", error);
                alert("Failed to delete course. Please try again.");
            });
    }






    // ***************************************************************************************************

    return (
        <>
            {/* <h1>Course</h1> */}
            <div className='text-center border shadow p-3 bg-light'>
                <h2 className='fw-bold text-warning' style={{ fontFamily: 'serif' }}><i class="fa-solid fa-desktop"></i> iGAP Technology</h2>
            </div>

            {/* student */}
            <div className="container">
                <div className="row">

                    <div className="col-md-3 my-4 me-5 d-flex justify-content-center" style={{ height: '600px' }}>
                        <div className="w-100 h-100 shadow-lg rounded">

                            <div className='px-5'>
                                <h3 className='text-center mt-4'>Select Student</h3>
                                <select style={{ appearance: 'none' }} className="form-select mb-4 w-100 mt-4 mb-4" value={selectedStudent.name}
                                    // onChange={(e) => alert(e.target.value)}

                                    onChange={(e) => fetchStudentCourse(e.target.value)}
                                >
                                    <option selected>---Select Student---</option>
                                    {studentData.length > 0 ? (
                                        studentData.map((student) => (
                                            <option key={student._id} value={student._id}>
                                                {student.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Loading students...</option>
                                    )}
                                </select><hr />

                                <button type="button" onClick={() => setAddStudentModal(true)} className="btn btn-primary w-100 mb-4 mt-4" data-bs-toggle="modal" data-bs-target="#addStudentModal"><i class="fa-solid fa-user-plus fa-lg"></i> ADD STUDENT</button>
                                <button type="button" onClick={() => setAddCourseModal(true)} className="btn btn-success w-100 mb-4" data-bs-toggle="modal" data-bs-target="#addCourseModal"><i class="fa-solid fa-plus fa-lg"></i> ADD COURSE</button>
                                <button type="button" onClick={() => setAssignCourseModal(true)} className="btn btn-danger w-100 mb-4" data-bs-toggle="modal" data-bs-target="#assignCourseModal"> <i class="fa-solid fa-book-open fa-lg"></i> ASSIGN COURSE</button>
                            </div>

                            <div class="d-flex align-items-center gap-2" style={{ marginTop: '138px' }}>
                                <a href=""><i class="fa-solid fa-gear fa-2xl mt-5 ms-4 text-dark"></i></a>
                                <a href="/students"><h6 class="text-center mt-5 ms-4">View Students Details</h6></a>
                            </div>

                        </div>
                    </div>

                    {AddStudentModal && (
                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Student</h5>
                                        <button type="button" className="btn-close" onClick={() => setAddStudentModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-3" name='name' placeholder="Enter student name" value={newStudent.name} onChange={handleChangeStudentData} />
                                        <input type="text" className="form-control mb-3" name='qualification' placeholder="Enter qualification" value={newStudent.qualification} onChange={handleChangeStudentData} />
                                        <input type="text" className="form-control mb-3" name='email' placeholder="Enter email" value={newStudent.email} onChange={handleChangeStudentData} />
                                        <input type="text" className="form-control mb-3" name='mobile' placeholder="Enter mobile" value={newStudent.mobile} onChange={handleChangeStudentData} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleAddStudent}>ADD STUDENT</button>
                                        <button type="button" className="btn btn-danger" onClick={() => setAddStudentModal(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {AddCourseModal && (
                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Course</h5>
                                        <button type="button" className="btn-close" onClick={() => setAddCourseModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input type="text" className="form-control mb-3" name='name' placeholder="Course Name" value={newCourse.name} onChange={handleChangeCoursetData} />
                                        <input type="text" className="form-control mb-3" name='description' placeholder="Description" value={newCourse.description} onChange={handleChangeCoursetData} />
                                        <input type="text" className="form-control mb-3" name='duration' placeholder="Duration" value={newCourse.duration} onChange={handleChangeCoursetData} />
                                        <input type="text" className="form-control mb-3" name='fees' placeholder="Fees" value={newCourse.fees} onChange={handleChangeCoursetData} />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleAddCourse}>ADD COURSE</button>
                                        <button type="button" className="btn btn-danger" onClick={() => setAddCourseModal(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {AssignCourseModal && (
                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Assign Course</h5>
                                        <button type="button" className="btn-close" onClick={() => setAssignCourseModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <select className="form-select mb-4 w-100 mt-5" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                                            <option selected>---Select Student---</option>
                                            {
                                                studentData.map((student) => {
                                                    return (
                                                        <option value={student._id}>{student.name}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                        <select className="form-select mb-4 w-100 mt-5" value={selectedCourse} onChange={(e) => setselectedCourse(e.target.value)}>
                                            <option selected>---Select Course---</option>
                                            {
                                                courseData.map((course) => {
                                                    return (

                                                        <option value={course._id}>{course.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleAssignCourse}>ASSIGN COURSE</button>
                                        <button type="button" className="btn btn-danger" onClick={() => setAssignCourseModal(false)}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    {/* -------------------------------COURSES--------------------------- */}

                    <div className="col-md-8 my-4 shadow-lg p-4 rounded">
                        <div className="">
                            <h1 className='text-center fw-bold' style={{ fontFamily: 'serif' }}>COURSES</h1><hr />

                            <div className="container">
                                <div className="row my-5">
                                    {
                                        assignedCourse.length > 0 ? (
                                            assignedCourse.map((eachdata, index) => {
                                                return (
                                                    <div className="col-md-6 mb-4" key={index}>
                                                        <div class="card shadow-lg bg-light text-center">
                                                            <div class="card-body">
                                                                <h5 class="card-title">{eachdata.courseId.name}</h5>
                                                                {/* <p class="card-text">{eachdata.courseId.description}</p>
                                                                 <p class="card-text">{eachdata.courseId.duration}</p> */}

                                                                <button
                                                                    className="btn btn-primary mt-3 rounded-pill"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#detailsModal"
                                                                    onClick={() => setselectedCourseDetail(eachdata.courseId)}
                                                                >
                                                                    Details
                                                                </button>
                                                                {/* <button className='btn btn-danger mt-3 mx-2 rounded-pill' onClick={() => deleteStudentCourse(eachdata._id)}>Remove</button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="col-md-12">
                                                <h4 className='text-center text-danger'>No Courses Assigned..!!</h4>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>


                            {/* <!-------------------- Modal ------------------> */}
                            <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            {/* <h5 class="modal-title" id="detailsModalLabel">Course Details</h5> */}
                                            <h2 className="modal-title">{selectedCourse?.name || "Course Details"}</h2>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>

                                        <div class="modal-body">
                                            {selectedCourseDetail ? (
                                                <>
                                                    <h3 className='fw-bold'>{selectedCourseDetail.name}</h3>
                                                    <p><strong>Description:</strong> {selectedCourseDetail.description}</p>
                                                    <p><strong>Duration:</strong> {selectedCourseDetail.duration}</p>
                                                    <p><strong>Fees:</strong> {selectedCourseDetail.fees}</p>
                                                </>
                                            ) : (
                                                <p>Loading course details...</p>
                                            )}

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            </div >
        </>
    )
};

export default Course;