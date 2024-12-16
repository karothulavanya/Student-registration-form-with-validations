import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentInfo from "./StudentInfo";
import Address from "./Address";
import ContactInfo from "./ContactInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentsList from "./StudentsList"; // Import the StudentsList page component

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    studentId: "",
    gender: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });

  const [students, setStudents] =useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dob: date,
    }));
  };

  const handleCreate = () => {
    if (editingIndex === null) {
      setStudents((prev) => [...prev, formData]);
    } else {
      handleUpdate();
    }
    setFormData({
      firstName: "",
      lastName: "",
      dob: null,
      studentId: "",
      gender: "",
      streetAddress: "",
      city: "",
      state:"",
      country:"",
      phone:"",
      email:"",
    });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditingIndex(index);
  

  };

  const handleUpdate = () => {
    const updatedStudents = students.map((student, index) =>
      index === editingIndex ? formData : student
    );
    setStudents(updatedStudents);
  };
  const handleDelete=(index)=>{
    const updatedStudents=students.filter((_,i)=>i!==index);
    setStudents(updatedStudents);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <Router>
      <div className="container">
        {/* Routes and link components for navigation */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-4">
                  <div className="card p-4 shadow-lg">
                    <h2 className="text-center mb-4">Student Registration Form</h2>
                    <form onSubmit={handleSubmit}>
                      <StudentInfo
                        formData={formData}
                        handleChange={handleChange}
                        handleDateChange={handleDateChange}
                      />
                      <Address formData={formData} handleChange={handleChange} />
                      <ContactInfo formData={formData} handleChange={handleChange} />
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-light btn-block btn-lg"
                        >
                          {editingIndex === null ? "Submit" : "Update"}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="text-center my-4">
                    <Link to="/students" className="btn btn-primary">
                      View Students List
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/students"
            element={
            <StudentsList 
              students={students}
              handleEdit={handleEdit} 
              handleDelete={handleDelete}
                />
              }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


