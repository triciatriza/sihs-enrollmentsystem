import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPagesVer2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewInstructor = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getDepartment();
  }, []);

  var [dept, setDept] = useState([]);
  const [universityid, setUniversityID] = useState();
  const [firstname, setFirstName] = useState();
  const [middlename, setMiddleName] = useState();
  const [lastname, setLastName] = useState();
  const [department, setDepartment] = useState();
  const [isMobile] = useState(false);

  const getDepartment = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const getDepartmentData = await axios({
        method: "get",
        url: baseURL + "admin/departments",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((department) => {
        setDept((dept = department.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveInstructor = async () => {
    try {
      if (firstname == null || lastname == null || department == null) {
        throw new Error("Some fields are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const departmentData = await axios({
        method: "post",
        url: baseURL + "admin/teachers",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          firstName: firstname,
          middleName: middlename,
          lastName: lastname,
          departmentID: department,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/instructor");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <div className="top">
        <h3>New Instructor</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/instructor");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveInstructor}>
            SAVE
          </button>
        </div>
      </div>
      <div className="informationver2">
        <div className="leftside">
          <label>First Name</label>
          <input
            type="text"
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          />
          <label>Middle Name</label>
          <input
            type="text"
            onChange={(event) => {
              setMiddleName(event.target.value);
            }}
          />
        </div>
        <div className="rightside">
          <label>Last Name</label>
          <input
            type="text"
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          />
          <label>Department</label>
          <select
            className="selectbar"
            defaultValue=""
            onChange={(event) => {
              setDepartment(event.target.value);
            }}
          >
            <option disabled={true} value="">
              Select Department
            </option>
            {dept.map((dept) => {
              return (
                <option key={dept.id} value={dept.id}>
                  {dept.collegeName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/instructor");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveInstructor}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInstructor;
