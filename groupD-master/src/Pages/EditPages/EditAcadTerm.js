import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditAcadTerm = () => {
  let history = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);

  const [semname, setSemName] = useState("");
  const [yearsemname, setYearSem] = useState("");

  const [isMobile] = useState(false);

  const displayInfo = () => {};
  return (
    <div>
      <div className="top">
        <h3>Edit Academic Term</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/academic-term");
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
        <label>Semester Name</label>
        <input
          type="text"
          onChange={(event) => {
            setSemName(event.target.value);
          }}
        />
        <label>Academic Year</label>
        <select
          name="yearSem"
          className="selectbar"
          onChange={(event) => {
            setYearSem(event.target.value);
          }}
        >
          <option value=""></option>
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/academic-term");
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

export default EditAcadTerm;
