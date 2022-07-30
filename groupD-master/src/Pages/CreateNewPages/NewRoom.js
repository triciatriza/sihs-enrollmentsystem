import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewRoom = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);

  const [roomname, setRoomName] = useState();
  const [roomcode, setRoomCode] = useState();
  const [isMobile] = useState(false);

  const saveRoomData = async () => {
    try {
      if (roomname == null || roomcode == null) {
        throw new Error("Some fields are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const room = await axios({
        method: "post",
        url: baseURL + "admin/rooms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          roomName: roomname,
          roomCode: roomcode,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(
            function () {
              window.location = "/room";
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
        <h3>New Room</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/room");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveRoomData}>
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
        <label>Room Code</label>
        <input
          type="text"
          onChange={(event) => {
            setRoomCode(event.target.value);
          }}
        />
      </div>

      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button className="cancelbutton" onClick={() => navigate("/room")}>
            CANCEL
          </button>
          <button className="savebutton" onClick={saveRoomData}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;

// const NewRoom = () => {
//     let history = useNavigate();
// const [roomname, setRoomName] = useState("");
// const [roomid, setRoomID] = useState("");

//     const [isMobile] = useState(false);

//     return (
//         <div>
//             <div className="top">
//                 <h3>New Room</h3>
//                 <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
//                     <button className="cancelbutton" onClick={() => { history("/room"); }}>CANCEL</button>
//                     <button type="submit" className="savebutton">SAVE</button>
//                 </div>
//             </div>
//             <div className="information" onsubmit={this.saveRoom}>
//                 {/* <label>Room Name</label>
//                 <input type="text" name="roomname" value=""
//                     onChange={(event) => {
//                         setRoomName(event.target.value);
//                     }}
//                 />
//                 <label>Room ID</label>
//                 <input type="text" name="roomcode" value=""
//                     onChange={(event) => {
//                         setRoomID(event.target.value);
//                     }}
//                 /> */}
//                 <label>Room Name</label>
//                 <input type="text" name="roomName"
//                     value={this.state.roomname}
//                     onChange={this.handleInput}
//                 />
//                 <label>Room ID</label>
//                 <input type="text" name="roomCode"
//                     value={this.state.roomcode}
//                     onChange={this.handleInput}
//                 />
//             </div>
//             <div className="bottom">
//                 <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
//                     <button className="cancelbutton" onClick={() => { history("/room"); }}>CANCEL</button>
//                     <button type="submit" className="savebutton">SAVE</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewRoom;
