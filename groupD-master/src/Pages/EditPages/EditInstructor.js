import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditInstructor = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);
  const [universityid, setUniversityID] = useState("");
  const [instructorfirstname, setInstructorFirstName] = useState("");
  const [instructormiddlename, setInstructorMiddleName] = useState("");
  const [instructorlastname, setInstructorLastName] = useState("");
  const [department, setDepartment] = useState("");

  const [isMobile] = useState(false);

  const displayInfo = () => {};
  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Instructor</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/instructor");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={displayInfo}>
            SAVE
          </button>
        </div>
      </div>
      <div className="informationver2">
        <div className="leftside">
          <label>University ID</label>
          <input
            type="text"
            onChange={(event) => {
              setUniversityID(event.target.value);
            }}
          />
          <label>First Name</label>
          <input
            type="text"
            onChange={(event) => {
              setInstructorFirstName(event.target.value);
            }}
          />
          <label>Middle Name</label>
          <input
            type="text"
            onChange={(event) => {
              setInstructorMiddleName(event.target.value);
            }}
          />
        </div>
        <div className="rightside">
          <label>Last Name</label>
          <input
            type="text"
            onChange={(event) => {
              setInstructorLastName(event.target.value);
            }}
          />
          <label>Department</label>
          <select
            name="set-department"
            className="selectbar"
            onChange={(event) => {
              setDepartment(event.target.value);
            }}
          >
            <option value=""></option>
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/instructor");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={displayInfo}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInstructor;
