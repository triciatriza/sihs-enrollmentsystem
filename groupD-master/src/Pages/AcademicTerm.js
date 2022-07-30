import React, { useEffect, useState } from "react";
import "./AcadTerm.css";
import SearchIcon from "./PagesPics/SearchIcon.svg";
import EditIcon from "./PagesPics/Edit.svg";
import DeleteIcon from "./PagesPics/Delete.svg";
import Add_btn from "./PagesPics/term_btn.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const AcademicTerm = () => {
  var [terms, setTerms] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const baseURL = window.localStorage.getItem("baseURL");
    if (token == null) {
      navigate("/login");
    } else {
      getTerms();
    }

    async function getTerms() {
      try {
        const academicTerm = await axios({
          method: "get",
          url: baseURL + "admin/academic-terms",
          headers: {
            // created headers with Bearer token
            // Without bearer token, api will not allow user to make changes
            Authorization: "Bearer " + token,
          },
        })
          .then((term) => {
            setTerms((terms = term.data));
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
      <span className="AcadtermText">Academic Term</span>
      <form className="term_example">
        <input type="text" placeholder="Search" />
        <button onClick={() => console.log("Searched")}>
          <img className="sched_SearchIcon" src={SearchIcon} />
        </button>
        <Link to="/new-academic-term">
          <button>
            <img className="Add_btn" src={Add_btn} />
          </button>
        </Link>
      </form>

      <div className="term_TableArea">
        <table>
          <tr>
            <th>Semester Name</th>
            <th>Academic Year</th>
            <th>Action</th>
          </tr>
          <tbody>
            {terms.map((acadterms) => {
              return (
                <tr key={acadterms.id}>
                  <td> {acadterms.semName}</td>
                  <td>
                    {" "}
                    {String(acadterms.academic_year.startYear) +
                      "-" +
                      String(acadterms.academic_year.endYear)}{" "}
                  </td>
                  <td>
                    <Link to="/edit-acadterm">
                      <button>
                        <img className="term_EditIcon" src={EditIcon} />
                      </button>
                    </Link>

                    <button
                      onClick={() => console.log("Text has been Deleted")}
                    >
                      <img className="term_DeleteIcon" src={DeleteIcon} />
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

export default AcademicTerm;
