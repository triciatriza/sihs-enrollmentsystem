import React, { useEffect, useState } from "react";
import "./Students.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/student_btn.svg";
import PreviewIcon from "./PagesPics/Preview.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const deleteStudent = async (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: true,
  });

  try {
    // if (id == null){
    //     throw new Error("Teacher ID cannot be found.")
    // }

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure you want to delete this student??",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const baseURL = window.localStorage.getItem("baseURL");
          const token = window.localStorage.getItem("token");

          const schedule = await axios({
            method: "delete",
            url: baseURL + "admin/student/" + id,
            headers: {
              // created headers with Bearer token
              // Without bearer token, api will not allow user to make changes
              Authorization: "Bearer " + token,
            },
          }).catch((error) => {});
          swalWithBootstrapButtons
            .fire("Deleted!", "This student has been deleted.", "success")
            .then(() => {
              window.location.reload();
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Deletion cancelled",
            "error"
          );
        }
      });
  } catch (error) {
    Swal.fire("Oops!", error.message, "error");
  }
};

const Students = () => {
  var [student, setStudent] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getStudents();
    }
  }, []);

  async function getStudents() {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    try {
      const studentData = await axios({
        method: "get",
        url: baseURL + "admin/student",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((student) => {
          setStudent((student = student.data));
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  return (
    <div>
      <Navbar />
      <span className="student_Text">Students</span>
      <form className="sched_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="sched_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-student">
          <button>
            <img className="student_Add_btn" src={Add_btn} />
          </button>
        </Link>
        <button
          onClick={() => navigate("/enrollment")}
          className="enrollmentbutton"
        >
          ENROLLMENT
        </button>
      </form>

      <div className="student_TableArea">
        <table>
          <tr>
            <th>Name</th>
            <th>University ID</th>
            <th>Actions</th>
          </tr>
          <tbody>
            {student.map((student) => {
              return (
                <tr key={student.id}>
                  <td>
                    {" "}
                    {String(student.user.firstName) +
                      " " +
                      String(student.user.lastName)}{" "}
                  </td>
                  <td> {String(student.user.universityID)} </td>
                  <td>
                    <Link to="/edit-student">
                      <button>
                        <img className="student_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button onClick={() => deleteStudent(student.id)}>
                      <img className="student_DeleteIcon" src={DeleteIcon} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Students;
