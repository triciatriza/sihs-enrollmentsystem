import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewAcadYear = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);

  //!FIX: typing on year name exits the page, clicking on the dropdown removes the date
  const [startyear, setStartYear] = useState();
  const [endyear, setEndYear] = useState();
  const [isMobile] = useState(false);

  const saveAcadYear = async () => {
    try {
      if (startyear == null || endyear == null) {
        throw new Error("Some field are empty!");
      }
      if (startyear > endyear)
        throw new Error("Start Year must be before End Year");
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const academicYears = await axios({
        method: "post",
        url: baseURL + "admin/academic-years",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },

        data: {
          startYear: startyear,
          endYear: endyear,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/academic-year");
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
        <h3>New Academic Year</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => navigate("/academic-year")}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveAcadYear}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>Start Year</label>
        {
          //TODO: Replace with calendar; use only year
          // Follow this link:  https://stackoverflow.com/questions/57464783/enable-only-year-in-material-ui-datepicker-with-react

          <select
            className="selectbar"
            defaultValue=""
            onChange={(event) => {
              setStartYear(event.target.value);
            }}
          >
            <option disabled={true} value="">
              Select Start Year
            </option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        }
        <label>End Year</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setEndYear(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select End Year
          </option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => navigate("/academic-year")}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveAcadYear}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAcadYear;
