import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProgram = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);
  const [programname, setProgramName] = useState("");
  const [programcode, setProgramCode] = useState("");
  const [departmentcode, setDepartmentCode] = useState("");

  const [isMobile] = useState(false);

  const displayInfo = () => {};
  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Program</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/program");
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
        <label>Program Name</label>
        <input
          type="text"
          onChange={(event) => {
            setProgramName(event.target.value);
          }}
        />
        <label>Program Code</label>
        <input
          type="text"
          onChange={(event) => {
            setProgramCode(event.target.value);
          }}
        />
        <label>Department Code</label>
        <select
          name="departmentCode"
          className="selectbar"
          onChange={(event) => {
            setDepartmentCode(event.target.value);
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
              history("/program");
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

export default EditProgram;
