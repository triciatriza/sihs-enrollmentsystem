import React, { useEffect, useState } from "react";
import "./AcadYear.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import Add_btn from "./PagesPics/Add_btn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AcademicYear = () => {
  var [years, setYears] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getYears();
    }

    async function getYears() {
      try {
        const academicYears = await axios({
          method: "get",
          url: baseURL + "admin/academic-years",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((year) => {
            setYears((years = year.data));
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

  return (
    <div>
      <Navbar />
      <span className="AcadYrText">Academic Year</span>
      <form className="sched_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="sched_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-academic-year">
          <button>
            <img className="Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="term_TableArea">
        <table>
          <tr>
            <th>Start Year</th>
            <th>End Year</th>
            <th> Action </th>
          </tr>
          <tbody>
            {years.map((acadYear) => {
              return (
                <tr key={acadYear.id}>
                  <td> {acadYear.startYear}</td>
                  <td> {acadYear.endYear}</td>
                  <td>
                    <Link to="/edit-academic-year">
                      <button>
                        <img className="term_EditIcon" src={EditIcon} />
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

export default AcademicYear;
