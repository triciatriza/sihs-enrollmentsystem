import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPagesVer2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewSchedule = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);

  const [starttime, setStartTime] = useState();
  const [endtime, setEndTime] = useState();
  const [repeatingdays, setRepeatingDays] = useState();
  const [isMobile] = useState(false);
  const navigate = useNavigate();

  const saveSchedData = async () => {
    try {
      if (endtime == null || starttime == null || repeatingdays == null) {
        throw new Error("Some fields are empty!");
      }
      if (endtime < starttime) {
        throw new Error("End time should not be before start time");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");
      const schedule = await axios({
        method: "post",
        url: baseURL + "admin/schedules",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          startTime: starttime,
          endTime: endtime,
          day: repeatingdays,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/schedule");
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
        <h3>New Schedule</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/schedule");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveSchedData}>
            SAVE
          </button>
        </div>
      </div>

      <div className="information">
        <label>Start Time</label>
        <input
          type="time"
          onChange={(event) => {
            setStartTime(event.target.value);
          }}
        />
        <label>End Time</label>
        <input
          type="time"
          onChange={(event) => {
            setEndTime(event.target.value);
          }}
        />

        <label>Day</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setRepeatingDays(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Day
          </option>
          <option value={"Monday"}>Monday</option>
          <option value={"Tuesday"}>Tuesday</option>
          <option value={"Wednesday"}>Wednesday</option>
          <option value={"Thursday"}>Thursday</option>
          <option value={"Friday"}>Friday</option>
          <option value={"Saturday"}>Saturday</option>
          <option value={"Sunday"}>Sunday</option>
        </select>
      </div>

      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => navigate("/schedule")}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveSchedData}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSchedule;
