import React, { useEffect, useState } from "react";
import "./Schedule.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/sched_btn.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { EditSchedule } from "./EditPages/EditSchedule";
import Navbar from "../components/Navbar";

const Schedule = () => {
  var [sched, setSched] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getSchedule();
    }

    async function getSchedule() {
      try {
        const scheduleData = await axios({
          method: "get",
          url: baseURL + "admin/schedules",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((sched) => {
            setSched((sched = sched.data));
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
  }, []);

  function setLocalStorageScheduleID(id) {
    localStorage.setItem("scheduleID", id);
    const scheduleID = localStorage.getItem("scheduleID");
    navigate("/edit-sched");
  }

  return (
    <div>
      <Navbar />
      <span className="sched_Text">Schedule</span>
      <form className="sched_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="sched_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-schedule">
          <button>
            <img className="sched_Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="sched_TableArea">
        <table>
          <tr>
            <th>Time</th>
            <th>Repeating Days</th>
            <th>Action</th>
          </tr>
          <tbody>
            {sched.map((sched) => {
              return (
                <tr key={sched.id}>
                  {/* <td> {inst.id}</td> */}
                  <td>
                    {" "}
                    {String(sched.startTime) + "-" + String(sched.endTime)}{" "}
                  </td>
                  <td> {String(sched.day)}</td>
                  <td>
                    <Link to="/edit-sched">
                      <button
                        value={sched.id}
                        onClick={() => setLocalStorageScheduleID(sched.id)}
                      >
                        <img className="sched_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
