import React, { useEffect, useState } from "react";
import "./Departments.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/dept_btn.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Departments = () => {
  var [dept, setDept] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getDeparment();
    }
  }, []);
  async function getDeparment() {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    try {
      const department = await axios({
        method: "get",
        url: baseURL + "admin/departments",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((dept) => {
          setDept((dept = dept.data));
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
      <span className="dept_Text">Departments</span>
      <form className="dept_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="dept_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-department">
          <button>
            <img className="dept_Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="dept_TableArea">
        <table>
          <tbody>
            <tr>
              <th>College Name</th>
              <th>College Code</th>
              <th>Action</th>
            </tr>
            {dept.map((deptName) => {
              return (
                <tr>
                  <td> {deptName.collegeName}</td>
                  <td> {deptName.collegeCode}</td>
                  <td>
                    <Link to="/edit-dept">
                      <button>
                        <img className="dept_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button
                      onClick={() => console.log("Text has been Deleted")}
                    >
                      <img className="dept_DeleteIcon" src={DeleteIcon} />
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

export default Departments;
