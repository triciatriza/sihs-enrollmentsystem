import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Schedule from "../Schedule";
import Swal from "sweetalert2";
import axios from "axios";

const EditSchedule = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);

  let history = useNavigate();

  const [starttime, setStartTime] = useState();
  const [endtime, setEndTime] = useState();
  const [repeatingdays, setRepeatingDays] = useState([]);

  const [isMobile] = useState(false);

  const saveSched = async () => {
    try {
      const scheduleID = localStorage.getItem("scheduleID");

      if (starttime > endtime) {
        throw new Error("Start time cannot be greater than end time.");
      }

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const schedule = await axios({
        method: "patch",
        url: baseURL + "admin/schedules/" + scheduleID,
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          startTime: starttime,
          endTime: endtime,
          updateDay: repeatingdays,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
        })
        .catch((error) => {
          Swal.fire("Oops!", error.data.message, "error");
        });
      window.location = "/schedule";
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    }
  };

  return (
    <div>
      <div className="top">
        <h3>Edit Schedule</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button className="cancelbutton" onClick={() => history("/schedule")}>
            CANCEL
          </button>
          <button className="savebutton" onClick={saveSched}>
            SAVE
          </button>
        </div>
      </div>
      <div className="informationver2">
        <div className="leftside">
          <label>Repeating Days</label>
          <select
            defaultValue=""
            className="selectbar"
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
        <div className="rightside">
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
        </div>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button className="cancelbutton" onClick={() => history("/schedule")}>
            CANCEL
          </button>
          <button className="savebutton" onClick={saveSched}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSchedule;
