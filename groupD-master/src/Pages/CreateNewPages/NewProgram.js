import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProgram = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getDeparment();
  }, []);

  var [dept, setDept] = useState([]);
  const [programname, setProgramName] = useState();
  const [programcode, setProgramCode] = useState();
  const [departmentcode, setDepartmentCode] = useState();
  const [isMobile] = useState(false);

  const getDeparment = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const deparment = await axios({
        method: "get",
        url: baseURL + "admin/departments",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((deparment) => {
        setDept((dept = deparment.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveProgram = async () => {
    try {
      if (
        programname == null ||
        programcode == null ||
        departmentcode == null
      ) {
        throw new Error("Some field are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const program = await axios({
        method: "post",
        url: baseURL + "admin/programs",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          programName: programname,
          programCode: programcode,
          departmentID: departmentcode,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/program");
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
        <h3>New Program</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/program");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveProgram}>
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
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setDepartmentCode(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select a Department
          </option>
          {dept.map((dept) => {
            return (
              <option key={dept.id} value={dept.id}>
                {String(dept.collegeCode)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/program");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveProgram}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProgram;
