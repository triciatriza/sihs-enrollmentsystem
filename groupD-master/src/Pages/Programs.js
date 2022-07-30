import React, { useEffect, useState } from "react";
import "./Programs.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/pgrm_btn.svg";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Programs = () => {
  var [program, setProgram] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    console.log(token);
    if (token == null) {
      navigate("/login");
    } else {
      getPrograms();
    }
  }, []);
  async function getPrograms() {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    try {
      const programsData = await axios({
        method: "get",
        url: baseURL + "admin/programs",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      })
        .then((program) => {
          setProgram((program = program.data));
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
      <span className="pgrm_Text">Programs</span>
      <form className="pgrm_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="pgrm_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-program">
          <button>
            <img className="pgrm_Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="pgrm_TableArea">
        <table>
          <tr>
            <th>Program Name</th>
            <th>Program Code</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
          <tbody>
            {program.map((pgrm) => {
              return (
                <tr key={pgrm.id}>
                  {/* <td> {inst.id}</td> */}
                  <td> {String(pgrm.programName)} </td>
                  <td> {String(pgrm.programCode)}</td>
                  <td> {String(pgrm.department.collegeName)} </td>
                  <td>
                    <Link to="/edit-program">
                      <button>
                        <img className="pgrm_EditIcon" src={EditIcon} />
                      </button>
                    </Link>
                    <button
                      onClick={() => console.log("Text has been Deleted")}
                    >
                      <img className="pgrm_DeleteIcon" src={DeleteIcon} />
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

export default Programs;
