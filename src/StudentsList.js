import React from "react";
import { useNavigate } from "react-router-dom";

const StudentsList = ({ students, handleEdit, handleDelete }) => {
  const navigate = useNavigate();

  const confirmDelete = (index) => {
    const isConfirmed = window.confirm("Are you sure to delete this student?");
    if (isConfirmed) {
      handleDelete(index);
    }
  };

  const handleEditAndNavigate = (index) => {
    handleEdit(index); // Set the form data for the selected student
    navigate("/"); // Navigate to the registration form
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <h3>Students List</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.dob ? student.dob.format("DD/MM/YYYY") : ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditAndNavigate(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
