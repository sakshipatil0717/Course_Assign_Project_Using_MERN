import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Student() {

    // {/* GET STUDENT METHOD */ }
    const [studentData, setStudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedStudent, setEditedStudent] = useState(null);

    // Fetch student data
    useEffect(() => {
        axios.get(import.meta.env.VITE_BASEURL + "/student")
            .then((res) => {
                setStudentData(res.data.data);
            })
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

    // Handle student selection
    const handleStudentChange = (e) => {
        const studentId = e.target.value;
        const student = studentData.find((s) => s._id === studentId);
        setSelectedStudent(student);
        setEditedStudent({ ...student }); // Initialize editedStudent state
        setIsEditing(false); // Ensure editing mode is off when selecting a new student
    };

    // Handle input change for editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Toggle edit mode
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    // Save edited student data
    const handleSave = () => {
        axios.put(import.meta.env.VITE_BASEURL + `/student/${editedStudent._id}`, editedStudent)
            .then(() => {
                // Update studentData with the edited student
                setStudentData((prev) =>
                    prev.map((s) => (s._id === editedStudent._id ? editedStudent : s))
                );
                setSelectedStudent(editedStudent);
                setIsEditing(false);
            })
            .catch((error) => console.error("Error updating student:", error));
    };

    return (
        <>
            {/* <h1>Student</h1> */}

            <div className='text-center border shadow p-3 bg-light'>
                <h2 className='fw-bold text-warning' style={{ fontFamily: 'serif' }}><i class="fa-solid fa-desktop"></i> iGAP Technology</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 my-4 me-5 d-flex justify-content-center" style={{ height: '600px' }}>
                        <div className="w-100 h-100 shadow-lg rounded">

                            <div className='px-5'>
                                <h3 className='text-center mt-4'>Select Student</h3>
                                <select style={{ appearance: 'none' }} className="form-select mb-4 w-100 mt-4" defaultValue="" onChange={handleStudentChange}>
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
                                </select>
                                <hr />
                            </div>


                            <div class="d-flex align-items-center gap-2" style={{ marginTop: '370px' }}>
                                <a href=""><i class="fa-solid fa-gear fa-2xl mt-5 ms-4 text-dark"></i></a>
                            </div>
                        </div>
                    </div>


                    {/* ------------------------------------------------------------- */}

                    <div className="col-md-8 my-4 shadow-lg p-4 rounded">
                        <div className="">
                            <h1 className='text-center fw-bold' style={{ fontFamily: 'serif' }}>Student Details</h1><hr />
                            <div className="container">
                                {selectedStudent ? (
                                    <div className="card mx-auto shadow-lg" style={{ width: '500px', marginTop: '80px', marginBottom: '80px' }}>
                                        <div className="card-header text-center bg-light fw-bold py-3">
                                            <h4>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control text-center"
                                                        value={editedStudent.name}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    selectedStudent.name
                                                )}
                                            </h4>
                                        </div>
                                        <div className="card-body px-5">
                                            <p><strong>Qualification: </strong>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="qualification"
                                                        className="form-control"
                                                        value={editedStudent.qualification}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    selectedStudent.qualification
                                                )}
                                            </p>
                                            <p><strong>Email: </strong>
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={editedStudent.email}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    selectedStudent.email
                                                )}
                                            </p>
                                            <p><strong>Mobile: </strong>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name="mobile"
                                                        className="form-control"
                                                        value={editedStudent.mobile}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    selectedStudent.mobile
                                                )}
                                            </p>
                                        </div>
                                        <div className="card-footer text-center bg-light text-muted py-3">
                                            {isEditing ? (
                                                <>
                                                    <button className="btn btn-primary px-4 py-2 rounded-pill fw-bold me-2" onClick={handleSave}>
                                                        Save
                                                    </button>
                                                    <button className="btn btn-danger px-4 py-2 rounded-pill fw-bold" onClick={toggleEditMode}>
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="btn btn-success px-5 py-2 rounded-pill fw-bold" onClick={toggleEditMode}>
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <h4 className="text-center mt-5 text-danger">No Student Selected..!!</h4>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Student;