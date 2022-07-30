import React, { Component, useEffect, useState } from "react";
import "./Rooms.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/room_btn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { editRoom } from "./EditPages/EditRoom";
import Navbar from "../components/Navbar";

const Rooms = () => {
  var [rooms, setRooms] = useState([]);
  var [editRoomID, setID] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getRooms();
    }

    async function getRooms() {
      try {
        const room = await axios({
          method: "get",
          url: baseURL + "admin/rooms",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((room) => {
            setRooms((rooms = room.data));
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

  function setLocalStorageRoomID(id) {
    localStorage.setItem("roomID", id);
    const roomID = localStorage.getItem("roomID");
    navigate("/edit-room");
  }

  return (
    <div>
      <Navbar />
      <span className="rooms_Text">Room</span>
      <form className="sched_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="sched_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-room">
          <button>
            <img className="Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="term_TableArea">
        <table>
          <tr>
            <th>Room Name</th>
            <th>Room Code</th>
            <th>Action</th>
          </tr>
          <tbody>
            {rooms.map((rooms) => {
              return (
                <tr key={rooms.id}>
                  <td> {rooms.roomName}</td>
                  <td> {rooms.roomCode} </td>
                  <td>
                    <button
                      value={rooms.id}
                      onClick={() => setLocalStorageRoomID(rooms.id)}
                    >
                      <img className="term_EditIcon" src={EditIcon} />
                    </button>
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

export default Rooms;
