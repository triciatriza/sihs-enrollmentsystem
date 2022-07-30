import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  var [student, setStudent] = useState([]);
  var [dept, setDept] = useState([]);
  var [program, setProgram] = useState([]);
  var [courses, setCourses] = useState([]);
  var [block, setBlock] = useState([]);
  var [instructor, setInstructor] = useState([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getStudents();
    getDeparment();
    getBlocks();
    getCourse();
    getPrograms();
    getInstructors();
  }, []);

  const token = window.localStorage.getItem("token");
  const baseURL = window.localStorage.getItem("baseURL");

  async function getStudents() {
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
        .then((students) => {
          setStudent((student = students.data));
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
  async function getBlocks() {
    try {
      const blocks = await axios({
        method: "get",
        url: baseURL + "admin/blocks",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((blocks) => {
          setBlock((block = blocks.data));
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

  async function getDeparment() {
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

  async function getPrograms() {
    try {
      const programsData = await axios({
        method: "get",
        url: baseURL + "admin/programs",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((program) => {
          setProgram((program = program.data));
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
    <div className="dashboardbody">
      <Navbar />
      <div className="top">
        <h1>Dashboard</h1>
      </div>

      <div className="wrapper">
        <Link to="/department">
          <div class="departmentcard">
            <h2 class="departmentnumber">{dept.length ?? 0}</h2>
            <p className="cardtitle">Departments</p>
            <p className="totaltitle">Total Departments</p>
          </div>
        </Link>
        <Link to="/instructor">
          <div class="instructorcard">
            <h2 class="instructornumber">{instructor.length ?? 0}</h2>
            <p class="cardtitle">Instructors</p>
            <p className="totaltitle">Total Instructors</p>
          </div>
        </Link>
        <Link to="/program">
          <div class="programcard">
            <h2 class="programnumber">{program.length ?? 0}</h2>
            <p class="cardtitle">Programs</p>
            <p className="totaltitle">Total Programs</p>
          </div>
        </Link>
        <Link to="/course">
          <div class="coursecard">
            <h2 class="coursenumber">{courses.length ?? 0}</h2>
            <p class="cardtitle">Courses</p>
            <p className="totaltitle">Total Courses</p>
          </div>
        </Link>
        <Link to="/block">
          <div class="blockcard">
            <h2 class="blocknumber">{block.length ?? 0}</h2>
            <p class="cardtitle">Blocks</p>
            <p className="totaltitle">Total Blocks</p>
          </div>
        </Link>
        <Link to="/student">
          <div class="studentcard">
            <h2 class="studentumber">{student.length ?? 0}</h2>
            <p class="cardtitle">Students</p>
            <p className="totaltitle">Total Students</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
