import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewAcademicTerm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getAcademicYears();
    //TODO: fix academic years
  }, []);

  var [years, setYears] = useState([]);
  const [semname, setSem] = useState();
  const [acadyear, setYear] = useState();
  const [isMobile] = useState(false);

  const getAcademicYears = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const academicYears = await axios({
        method: "get",
        url: baseURL + "admin/academic-years",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((academicYear) => {
        setYears((years = academicYear.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveAcadTerm = async () => {
    try {
      if (semname == null || acadyear == null) {
        throw new Error("Semester or Academic Year is empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const acadTerm = await axios({
        method: "post",
        url: baseURL + "admin/academic-terms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          semName: semname,
          academicYearId: acadyear,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/academic-term");
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
        <h3>New Academic Term</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/academic-term");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveAcadTerm}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>Academic Year</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setYear(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select an academic year
          </option>
          {years.map((year) => {
            return (
              <option key={year.id} value={year.id}>
                {String(year.startYear) + "-" + String(year.endYear)}
              </option>
            );
          })}
        </select>
        <label>Semester Name</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setSem(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select a semester
          </option>
          <option value={"First Semester"}>First Semester</option>
          <option value={"Second Semester"}>Second Semester</option>
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/academic-term");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveAcadTerm}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAcademicTerm;
