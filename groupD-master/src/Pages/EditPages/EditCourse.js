import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditCourse = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
    getRoomData();
    getSchedData();
    getInstructorData();
  }, []);

  let history = useNavigate();
  var [Room, setRoom] = useState([]);
  var [inst, setInst] = useState([]);
  var [sched, setSched] = useState([]);
  const [coursename, setCourseName] = useState("");
  const [coursecode, setCourseCode] = useState("");
  const [instructor, setInstructor] = useState("");
  const [rooms, setRooms] = useState("");
  const [schedule, setSchedule] = useState("");

  const [isMobile] = useState(false);

  const getRoomData = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const roomData = await axios({
        method: "get",
        url: baseURL + "admin/rooms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((rooms) => {
        setRoom((Room = rooms.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const getSchedData = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const schedData = await axios({
        method: "get",
        url: baseURL + "admin/schedules",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((schedule) => {
        setSched((sched = schedule.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  const getInstructorData = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const instructorData = await axios({
        method: "get",
        url: baseURL + "admin/teachers",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((instructors) => {
        setInst((inst = instructors.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveCourse = async () => {
    try {
      const courseID = localStorage.getItem("courseID");

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const schedules = await axios({
        method: "patch",
        url: baseURL + "admin/courses/" + courseID,
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          courseName: coursename,
          courseCode: coursecode,
          teacherID: instructor,
          roomID: rooms,
          scheduleID: schedule,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(() => {
            window.location = "/course";
          });
        })
        .catch((error) => {
          Swal.fire("Oops!", error.message, "error");
        });
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    }
  };

  return (
    <div>
      <div className="top">
        <h3>Edit Course</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/course");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveCourse}>
            SAVE
          </button>
        </div>
      </div>
      <div className="informationver2">
        <div className="leftside">
          <label>Course Name</label>
          <input
            type="text"
            onChange={(event) => {
              setCourseName(event.target.value);
            }}
          />
          <label>Course Code</label>
          <input
            type="text"
            onChange={(event) => {
              setCourseCode(event.target.value);
            }}
          />
        </div>
        <div className="rightside">
          <label>Instructor</label>
          <select
            defaultValue=""
            className="selectbar"
            onChange={(event) => {
              setInstructor(event.target.value);
            }}
          >
            <option disabled={true} value="">
              Select Instructor
            </option>
            {inst.map((inst) => {
              return (
                <option key={inst.id} value={inst.id}>
                  {String(inst.firstName) + " " + String(inst.lastName)}
                </option>
              );
            })}
          </select>
          <label>Room</label>
          <select
            defaultValue=""
            className="selectbar"
            onChange={(event) => {
              setRooms(event.target.value);
            }}
          >
            <option disabled={true} value="">
              Select Room
            </option>
            {Room.map((rooms) => {
              return (
                <option key={rooms.id} value={rooms.id}>
                  {String(rooms.roomName)}
                </option>
              );
            })}
          </select>
          <label>Schedule</label>
          <select
            defaultValue=""
            className="selectbar"
            onChange={(event) => {
              setSchedule(event.target.value);
            }}
          >
            <option disabled={true} value="">
              Select Schedule
            </option>
            {sched.map((sched) => {
              return (
                <option key={sched.id} value={sched.id}>
                  {String(sched.startTime) +
                    "-" +
                    String(sched.endTime) +
                    ", (" +
                    "" +
                    String(sched.day) +
                    ")"}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/course");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveCourse}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
