import React, { useEffect, useState } from "react";
import "./Courses.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/course_btn.svg";
import PreviewIcon from "./PagesPics/Preview.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Courses = () => {
  var [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    console.log(token);
    if (token == null) {
      navigate("/login");
    } else {
      getCourse();
    }

    async function getCourse() {
      try {
        const courseData = await axios({
          method: "get",
          url: baseURL + "admin/courses",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((course) => {
            setCourses((courses = course.data));
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

  function setLocalStorageCourseID(id) {
    localStorage.setItem("courseID", id);
    const courseID = localStorage.getItem("courseID");
    console.log(courseID);
    navigate("/edit-course");
  }

  return (
    <div>
      <Navbar />
      <span className="course_Text">Courses</span>
      <form className="course_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="course_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-course">
          <button>
            <img className="course_Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="course_TableArea">
        <table>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Instructor</th>
            <th>Action</th>
          </tr>
          <tbody>
            {courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td> {String(course.courseName)} </td>
                  <td> {String(course.courseCode)}</td>
                  <td>
                    {course.teacher
                      ? course.teacher.firstName + " " + course.teacher.lastName
                      : "No teacher assigned"}
                  </td>
                  <td>
                    <Link to="/edit-course">
                      <button
                        value={course.id}
                        onClick={() => setLocalStorageCourseID(course.id)}
                      >
                        <img className="course_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button
                      onClick={() => console.log("Text has been Deleted")}
                    >
                      <img className="course_DeleteIcon" src={DeleteIcon} />
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

export default Courses;
