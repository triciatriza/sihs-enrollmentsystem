import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditBlock = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);
  const [blockname, setBlockName] = useState("");
  const [blockcode, setBlockCode] = useState("");
  const [programcode, setProgramCode] = useState("");

  const [isMobile] = useState(false);

  const displayInfo = () => {};
  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Block</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/block");
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
        <label>Block Name</label>
        <input
          type="text"
          onChange={(event) => {
            setBlockName(event.target.value);
          }}
        />
        <label>Block Code</label>
        <input
          type="text"
          onChange={(event) => {
            setBlockCode(event.target.value);
          }}
        />
        <label>Program Code</label>
        <select
          name="programCode"
          className="selectbar"
          onChange={(event) => {
            setProgramCode(event.target.value);
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
              history("/block");
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

export default EditBlock;
