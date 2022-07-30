import React, { useEffect, useState } from "react";
import "./Blocks.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/block_btn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Blocks = () => {
  var [block, setBlock] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getBlocks();
    }
  }, []);
  async function getBlocks() {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    try {
      const blocks = await axios({
        method: "get",
        url: baseURL + "admin/blocks",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((blocks) => {
          setBlock((block = blocks.data));
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

  return (
    <div>
      <Navbar />
      <span className="blocks_Text">Blocks</span>
      <form className="blocks_example">
        <input type="text" placeholder="Search" />
        <button>
          <img className="blocks_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-block">
          <button>
            <img className="blocks_Add_btn" src={Add_btn} />
          </button>
        </Link>
        <Link to="/blocks-courses">
          <button className="blockCourse">Add Courses to Block</button>
        </Link>
      </form>

      <div className="blocks_TableArea">
        <table>
          <thead>
            <th>Block Name</th>
            <th>Block Code</th>
            <th>Action</th>
          </thead>
          <tbody>
            {block.map((blocks) => {
              return (
                <tr>
                  <td> {blocks.blockName}</td>
                  <td> {blocks.blockCode}</td>
                  <td>
                    <Link to="/edit-block">
                      <button>
                        <img className="blocks_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button
                      onClick={() => console.log("Text has been Deleted")}
                    >
                      <img className="blocks_DeleteIcon" src={DeleteIcon} />
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

export default Blocks;
