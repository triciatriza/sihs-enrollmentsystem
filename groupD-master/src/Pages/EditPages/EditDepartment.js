import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditDepartment = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);
  const [collegename, setCollegeName] = useState("");
  const [collegecode, setCollegeCode] = useState("");

  const [isMobile] = useState(false);

  const saveDept = async () => {
    try {
      const scheduleID = localStorage.getItem("D");

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const schedule = await axios({
        method: "patch",
        url: baseURL + "admin/schedules/" + scheduleID,
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
          Swal.fire("Good job!", response.data.message, "success");
        })
        .catch((error) => {
          Swal.fire("Oops!", error.data.message, "error");
        });
      window.location = "/schedule";
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    }
  };
  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Department</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/department");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveDept}>
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
              history("/department");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveDept}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;
