import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Student() {
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
        <div className="container">
            <div className="row">
                {/* Student Selection Sidebar */}
                <div className="col-md-3 my-4 me-5 d-flex justify-content-center" style={{ height: '600px' }}>
                    <div className="w-100 h-100 shadow-lg p-5 rounded">
                        <h4 className='text-center'>Select Student</h4><hr />
                        <select className="form-select mb-4 w-100 mt-5" defaultValue="" onChange={handleStudentChange}>
                            <option value="" disabled>---Select Student---</option>
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
                    </div>
                </div>

                {/* Student Details Card */}
                <div className="col-md-8 my-4 shadow-lg p-4 rounded">
                    <h1 className='text-center'>Student Details</h1><hr />
                    <div className="container p-5">
                        {selectedStudent ? (
                            <div className="card mx-auto" style={{ width: '500px' }}>
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
                                            <button className="btn btn-success px-4 py-2 rounded-pill fw-bold me-2" onClick={handleSave}>
                                                Save
                                            </button>
                                            <button className="btn btn-secondary px-4 py-2 rounded-pill fw-bold" onClick={toggleEditMode}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button className="btn btn-primary px-5 py-2 rounded-pill fw-bold" onClick={toggleEditMode}>
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <h4 className="text-center text-muted">No Student Selected</h4>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
