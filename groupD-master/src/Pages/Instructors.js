import React, { useEffect, useState } from "react";
import "./Instructors.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/inst_btn.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const deleteTeacher = async (id) => {
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
        title: "Are you sure you want to delete this teacher??",
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
            url: baseURL + "admin/teachers/" + id,
            headers: {
              // created headers with Bearer token
              // Without bearer token, api will not allow user to make changes
              Authorization: "Bearer " + token,
            },
          });
          swalWithBootstrapButtons
            .fire("Deleted!", "This teacher has been deleted.", "success")
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

const Instructors = () => {
  const navigate = useNavigate();
  var [instructor, setInstructor] = useState([]);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getInstructors();
    }
  }, []);

  async function getInstructors() {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    try {
      const teachersData = await axios({
        method: "get",
        url: baseURL + "admin/teachers",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((inst) => {
          setInstructor((instructor = inst.data));
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
      <span className="inst_Text">Instructors</span>
      <form className="inst_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="inst_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-instructor">
          <button>
            <img className="inst_Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>
      <div className="inst_TableArea">
        <table>
          <tr>
            <th>University ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
          <tbody>
            {instructor.map((inst) => {
              return (
                <tr key={inst.id}>
                  <td> {inst.id}</td>
                  <td>
                    {" "}
                    {String(inst.firstName) + " " + String(inst.lastName)}{" "}
                  </td>
                  <td> {String(inst.department.collegeName)} </td>
                  <td>
                    <Link to="/edit-instructor">
                      <button>
                        <img className="inst_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button onClick={() => deleteTeacher(inst.id)}>
                      <img className="inst_DeleteIcon" src={DeleteIcon} />
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

export default Instructors;
