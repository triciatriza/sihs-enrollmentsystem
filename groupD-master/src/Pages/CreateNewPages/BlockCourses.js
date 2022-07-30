import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlockCourses = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
    getAcadTermid();
    getBlockid();
    getCourseid();
  }, []);

  var [blockid, setBlockid] = useState([]);
  var [acadtermid, setTermid] = useState([]);
  var [courseid, setCourseid] = useState([]);
  const [blocks, setBlocks] = useState();
  const [terms, setTerms] = useState();
  const [course, setCourse] = useState();
  const [isMobile] = useState(false);

  const getAcadTermid = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const acadtermsData = await axios({
        method: "get",
        url: baseURL + "admin/academic-terms",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((termsid) => {
        setTermid((acadtermid = termsid.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const getBlockid = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const blocksData = await axios({
        method: "get",
        url: baseURL + "admin/blocks",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((block) => {
        setBlockid((blockid = block.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const getCourseid = async () => {
    const baseURL = window.localStorage.getItem("baseURL");
    const token = window.localStorage.getItem("token");

    try {
      const coursesData = await axios({
        method: "get",
        url: baseURL + "admin/courses",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
      }).then((coursesid) => {
        setCourseid((courseid = coursesid.data));
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const saveBlockCourse = async () => {
    try {
      if (blocks == null || course == null || terms == null) {
        throw new Error("Some field are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const program = await axios({
        method: "post",
        url: baseURL + "admin/blocks-courses",
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          blockID: blocks,
          termID: terms,
          courseID: course,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success");
          navigate("/block");
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
        <h3>Blocks-Courses</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/block");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveBlockCourse}>
            SAVE
          </button>
        </div>
      </div>
      <div className="information">
        <label>Blocks</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setBlocks(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Block
          </option>
          {blockid.map((block) => {
            return (
              <option key={block.id} value={block.id}>
                {String(block.blockName)}
              </option>
            );
          })}
        </select>
        <label>Academic Code</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setTerms(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Academic ID
          </option>
          {acadtermid.map((acadterm) => {
            return (
              <option key={acadterm.id} value={acadterm.id}>
                {String(
                  acadterm.semName +
                    ": " +
                    String(
                      acadterm.academic_year.startYear +
                        "-" +
                        String(acadterm.academic_year.endYear)
                    )
                )}
              </option>
            );
          })}
        </select>
        <label>Courses</label>
        <select
          className="selectbar"
          defaultValue=""
          onChange={(event) => {
            setCourse(event.target.value);
          }}
        >
          <option disabled={true} value="">
            Select Course{" "}
          </option>
          {courseid.map((course) => {
            return (
              <option key={course.id} value={course.id}>
                {String(course.courseName)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/block");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveBlockCourse}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockCourses;
