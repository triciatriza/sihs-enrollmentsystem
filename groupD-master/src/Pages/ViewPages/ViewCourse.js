import React, { useEffect } from 'react';
import './ViewPage.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';


const ViewCourse = () => {
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        console.log(token);
        if (token == null){
            navigate('/login');
        }
        getRoomData()
        getSchedData()
        getInstructorData()
    }, []);

    var[Room, setRoom] = useState([])
    var[inst, setInst] = useState([])
    var[sched, setSched] = useState([])
    const [blockcode, setBlockCode] = useState("");
    const [coursename, setCourseName] = useState("");
    const [coursecode, setCourseCode] = useState("");
    const [instructor, setInstructor] = useState("");
    const [rooms, setRooms] = useState("");
    const [schedule, setSchedule] = useState("");
    const navigate = useNavigate();
    const [isMobile] = useState(false);

    const getRoomData = async () => {
        const baseURL = window.localStorage.getItem('baseURL');
        const token = window.localStorage.getItem('token');

        try{
        const roomData = await axios({
            method: 'get',
            url: baseURL + 'admin/rooms',
            headers: {
                // created headers with Bearer token
                // Without bearer token, api will not allow user to make changes 
                Authorization: 'Bearer ' + token
            }
        }).then((rooms) => {
            setRoom(Room = rooms.data);
            console.log(Room);
        })
        } catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
        }
    }

    const getSchedData= async () => {
        const baseURL = window.localStorage.getItem('baseURL');
        const token = window.localStorage.getItem('token');

        try{
        const schedData = await axios({
            method: 'get',
            url: baseURL + 'admin/schedules',
            headers: {
                // created headers with Bearer token
                // Without bearer token, api will not allow user to make changes 
                Authorization: 'Bearer ' + token
            }
        }).then((schedule) => {
            setSched(sched = schedule.data);
            console.log(sched);
        })
        } catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
        }
    }
    const getInstructorData= async () => {
        const baseURL = window.localStorage.getItem('baseURL');
        const token = window.localStorage.getItem('token');

        try{
        const instructorData = await axios({
            method: 'get',
            url: baseURL + 'admin/teachers',
            headers: {
                // created headers with Bearer token
                // Without bearer token, api will not allow user to make changes 
                Authorization: 'Bearer ' + token
            }
        }).then((instructors) => {
            setInst(inst = instructors.data);
            console.log(inst);
        })
        } catch (error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                })
        }
    }

    return (
        <div>
            <div className="top">
                <h3>View Course</h3>
                <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
                    <button className="backbutton" onClick={() => 
                        {navigate("/course");}}> 
                         BACK 
                    </button>
                </div>
            </div>
            <div className="informationver2">
                <div className="leftside">
                    <label>Block Code</label>
                    <select name="blockCode" className="selectbar"
                        onChange={(event) => {
                            setBlockCode(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Course Name</label>
                    <input type="text"
                        onChange={(event) => {
                            setCourseName(event.target.value);
                        }}
                    />
                    <label>Course Code</label>
                    <input type="text"
                        onChange={(event) => {
                            setCourseCode(event.target.value);
                        }}
                    />
                </div>
                <div className="rightside">
                    <label>Instructor</label>
                    <select name="set-instructor" className="selectbar"
                        onChange={(event) => {
                            setInstructor(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Room</label>
                    <select name="set-room" className="selectbar"
                        onChange={(event) => {
                            setRooms(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Schedule</label>
                    <select name="set-schedule" className="selectbar"
                        onChange={(event) => {
                            setSchedule(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <div className="bottom">
                <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
                    <button className="backbutton" onClick={() => 
                        {navigate("/course");}}> 
                         BACK 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCourse;