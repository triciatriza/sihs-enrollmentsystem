import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewDepartment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);

  const [collegename, setCollegeName] = useState();
  const [collegecode, setCollegeCode] = useState();
  const [isMobile] = useState(false);

  const saveDeparment = async () => {
    try {
      if (collegename == null || collegecode == null) {
        throw new Error("Some fields are empty!");
      }

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const deptartment = await axios({
        method: "post",
        url: baseURL + "admin/departments",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          collegeName: collegename,
          collegeCode: collegecode,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(
            function () {
              window.location = "/department";
            }
          );
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
        <h3>New Department</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/department");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveDeparment}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>College Name</label>
        <input
          type="text"
          onChange={(event) => {
            setCollegeName(event.target.value);
          }}
        />
        <label>College Code</label>
        <input
          type="text"
          onChange={(event) => {
            setCollegeCode(event.target.value);
          }}
        />
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/department");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveDeparment}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewDepartment;
