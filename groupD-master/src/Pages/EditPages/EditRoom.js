import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages1.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditRoom = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);

  const [roomname, setRoomName] = useState();
  const [roomid, setRoomID] = useState();
  let history = useNavigate();
  const [isMobile] = useState(false);

  const displayInfo = async () => {
    const roomID = localStorage.getItem("roomID");

    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");
    try {
      const room = await axios({
        method: "patch",
        url: baseURL + "admin/rooms/" + roomID,
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          roomName: roomname,
          roomCode: roomid,
        },
      }).then((response) => {
        Swal.fire("Good job!", response.data.message, "success").then(
          function () {
            window.location = "/room";
          }
        );
      });
    } catch (error) {
      Swal.fire("Good job!", error.data.message, "success");
    }
  };

  return (
    <div>
      <div className="top">
        <h3>Edit Room</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/room");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={displayInfo}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>Room Name</label>
        <input
          type="text"
          onChange={(event) => {
            setRoomName(event.target.value);
          }}
        />
        <label>Room ID</label>
        <input
          type="text"
          onChange={(event) => {
            setRoomID(event.target.value);
          }}
        />
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/room");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={displayInfo}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
