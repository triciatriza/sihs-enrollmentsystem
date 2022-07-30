import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditEnrollment = () => {
  const navigate = useNavigate([]);
  var [blocks, setBlocks] = useState([]);
  var [yearLevels, setYearLevels] = useState([]);
  var [terms, setTerms] = useState([]);

  var [block, setBlock] = useState();
  var [student, setStudent] = useState();
  var [yearLevel, setYearLevel] = useState();
  var [term, setTerm] = useState();

  //   var[]

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getBlocks();
    getTerms();
    getYearLevels();
  }, []);

  const [isMobile] = useState(false);
  const token = window.localStorage.getItem("token");
  const baseURL = window.localStorage.getItem("baseURL");

  async function getTerms() {
    try {
      const academicTerm = await axios({
        method: "get",
        url: baseURL + "admin/academic-terms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((term) => {
          setTerms((terms = term.data));
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  async function getYearLevels() {
    try {
      const yearLevelsData = await axios({
        method: "get",
        url: baseURL + "admin/year-levels",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          setYearLevels((yearLevels = response.data));
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  async function getBlocks() {
    try {
      const blocksDatas = await axios({
        method: "get",
        url: baseURL + "admin/blocks",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          setBlocks((blocks = response.data));
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  const saveEnrollment = async () => {
    try {
      if (
        student == null ||
        block == null ||
        yearLevel == null ||
        term == null
      ) {
        throw new Error("Some fields are empty!");
      }

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const deptartment = await axios({
        method: "post",
        url: baseURL + "admin/enrollment",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          studentID: student,
          blockID: block,
          yearLevelID: yearLevel,
          termID: term,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(
            function () {
              window.location = "/enrollment";
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
        <h3>Edit Enrollment</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/enrollment");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveEnrollment}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>Student</label>
        <select
          disabled={true}
          defaultValue=""
          className="selectbar"
          onChange={(event) => {
            setStudent(event.target.value);
          }}
        >
          <option disabled={true} value="">
            {localStorage.getItem("ditEnrollmentfName")}
          </option>
        </select>
        <label>Block</label>
        <select
          defaultValue=""
          className="selectbar"
          onChange={(event) => {
            setBlock(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Block
          </option>
          {blocks.map((currentBlock) => {
            return (
              <option key={currentBlock.id} value={currentBlock.id}>
                {String(currentBlock.blockCode)}
              </option>
            );
          })}
        </select>
        <label>Year Level</label>
        <select
          defaultValue=""
          className="selectbar"
          onChange={(event) => {
            setYearLevel(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Year Level
          </option>
          {yearLevels.map((currentYearLevel) => {
            return (
              <option key={currentYearLevel.id} value={currentYearLevel.id}>
                {String(currentYearLevel.yearName)}
              </option>
            );
          })}
        </select>
        <label>Academic Term</label>
        <select
          defaultValue=""
          className="selectbar"
          onChange={(event) => {
            setTerm(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Academic Term
          </option>
          {terms.map((currentTerms) => {
            return (
              <option key={currentTerms.id} value={currentTerms.id}>
                {String(currentTerms.semName) +
                  " (" +
                  String(currentTerms.academic_year.startYear) +
                  " - " +
                  String(currentTerms.academic_year.endYear) +
                  ")"}
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
              navigate("/department");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveEnrollment}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEnrollment;
