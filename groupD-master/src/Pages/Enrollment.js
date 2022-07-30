import React, { useEffect, useState } from "react";
import "./Enrollment.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/student_btn.svg";
import PreviewIcon from "./PagesPics/Preview.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const deleteEnrollment = async (id) => {
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
            url: baseURL + "admin/enrollment/" + id,
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

const Enrollment = () => {
  var [enrollments, setEnroll] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getEnrollment();
    }

    async function getEnrollment() {
      try {
        const enrollData = await axios({
          method: "get",
          url: baseURL + "admin/enrollment",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((enroll) => {
            setEnroll((enrollments = enroll.data));
            // navigate("/enrollment");
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
  }, []);

  var [student, setStudent] = useState();

  const editEnrollment = (id, studentID) => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    localStorage.setItem("editEnrollmentID", id);
    getStudents();
    async function getStudents() {
      try {
        console.log(studentID);
        const studentData = await axios({
          method: "get",
          url: baseURL + "admin/enrollment/" + studentID,
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((std) => {
            setStudent((student = std.data));
            console.log(student[0].user.firstName);
            localStorage.setItem(
              "editEnrollmentfName",
              student[0].user.firstName
            );
            localStorage.setItem(
              "editEnrollmentlName",
              student[0].user.lastName
            );
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
    console.log(studentID);
    navigate("/edit-enrollment");
  };

  return (
    <div>
      <Navbar />
      <span className="enrollment_Text">Enrolled Students</span>
      <form className="enrollment_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="enrollment_SearchIcon" src={SearchIcon} />
        </button>
        <button
          onClick={() => navigate("/new-enrollment")}
          className="enrollmentbutton"
        >
          Enroll Student
        </button>
      </form>

      <div className="enrollment_TableArea">
        <table>
          <tr>
            <th>Name</th>
            <th>Term</th>
            <th>Year Level</th>
            <th>Block</th>
            <th>Type</th>
          </tr>
          <tbody>
            {enrollments.map((enroll) => {
              return (
                <tr value={enroll.id} key={enroll.id}>
                  <td> {enroll.studentID} </td>
                  <td> {enroll.term.semName} </td>
                  <td>{enroll.year_level.yearName}</td>
                  <td>{enroll.block.blockName}</td>
                  <td>
                    <button
                      onClick={() => {
                        editEnrollment(enroll.id, enroll.studentID);
                      }}
                    >
                      <img className="enrollment_EditIcon" src={EditIcon} />
                    </button>
                    <button onClick={() => deleteEnrollment(enroll.id)}>
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
export default Enrollment;
