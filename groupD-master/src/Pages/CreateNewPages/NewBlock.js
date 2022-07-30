import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewBlock = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getProgram();
    getAcadTerm();
  }, []);

  var [prog, setProg] = useState([]);
  var [year, setYear] = useState([]);
  const [blockname, setBlockName] = useState();
  const [blockcode, setBlockCode] = useState();
  const [program, setProgram] = useState();
  const [academicterm, setAcademicTerm] = useState();

  const [isMobile] = useState(false);

  const getProgram = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const getProgramData = await axios({
        method: "get",
        url: baseURL + "admin/programs",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((program) => {
        setProg((prog = program.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const getAcadTerm = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const getAcadTermData = await axios({
        method: "get",
        url: baseURL + "admin/academic-terms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((acadterm) => {
        setYear((year = acadterm.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveBlock = async () => {
    try {
      if (
        blockname == null ||
        blockcode == null ||
        program == null ||
        academicterm == null
      ) {
        throw new Error("Some fields are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const blockData = await axios({
        method: "post",
        url: baseURL + "admin/blocks",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          blockName: blockname,
          blockCode: blockcode,
          programID: program,
          yearID: academicterm,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(
            function () {
              window.location = "/block";
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
        <h3>New Block</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/block");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveBlock}>
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
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setProgram(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Program
          </option>
          {prog.map((prog) => {
            return (
              <option key={prog.id} value={prog.id}>
                {prog.programName}
              </option>
            );
          })}
        </select>
        <label>Academic Term</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setAcademicTerm(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Academic Term
          </option>
          {year.map((year) => {
            return (
              <option key={year.id} value={year.id}>
                {year.semName}
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
              navigate("/block");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveBlock}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBlock;
