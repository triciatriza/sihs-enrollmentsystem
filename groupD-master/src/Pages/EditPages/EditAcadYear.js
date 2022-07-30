import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditAcadYear = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);
  const [yearname, setYearName] = useState("");
  const [startyear, setStartYear] = useState("");
  const [endyear, setEndYear] = useState("");

  const [isMobile] = useState(false);

  const displayInfo = () => {};
  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Academic Year</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/academic-year");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={displayInfo}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>School Year</label>
        <input
          type="text"
          onChange={(event) => {
            setYearName(event.target.value);
          }}
        />
        <label>Start Year</label>
        <select
          name="startYear"
          className="selectbar"
          onChange={(event) => {
            setStartYear(event.target.value);
          }}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <label>End Year</label>
        <select
          name="cars"
          className="selectbar"
          onChange={(event) => {
            setEndYear(event.target.value);
          }}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/academic-year");
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

export default EditAcadYear;
