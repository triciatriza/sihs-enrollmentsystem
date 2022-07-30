import React, { useEffect } from "react";
import "./EditPagesCSS/EditPages2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const EditStudent = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      history("/login");
    }
  }, []);

  const [studentfirstname, setStudentFirstName] = useState();
  const [studentmiddlename, setStudentMiddleName] = useState();
  const [studentlastname, setStudentLastName] = useState();
  const [birthdate, setBirthDate] = useState();
  const [address, setAddress] = useState();
  const [emailaddress, setEmailAddress] = useState();
  const [phonenumber, setPhoneNumber] = useState();

  const [isMobile] = useState(false);

  const saveStudent = async () => {
    try {
      const studentID = localStorage.getItem("studentID");

      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const students = await axios({
        method: "patch",
        url: baseURL + "admin/student/" + studentID,
        headers: {
          // created headers with Bearer token
          // Without bearer token, api will not allow user to make changes
          Authorization: "Bearer " + token,
        },
        data: {
          firstName: studentfirstname,
          middleName: studentmiddlename,
          lastName: studentlastname,
          birthDate: birthdate,
          address: address,
          phoneNumber: phonenumber,
          email: emailaddress,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(() => {
            window.location = "/student";
          });
        })
        .catch((error) => {
          Swal.fire("Oops!", error.data.message, "error");
        });
    } catch (error) {
      Swal.fire("Oops!", error.message, "error");
    }
  };

  let history = useNavigate();
  return (
    <div>
      <div className="top">
        <h3>Edit Student</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/student");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveStudent}>
            SAVE
          </button>
        </div>
      </div>
      <div className="informationver2">
        <div className="leftside">
          <label>First Name</label>
          <input
            type="text"
            onChange={(event) => {
              setStudentFirstName(event.target.value);
            }}
          />
          <label>Middle Name</label>
          <input
            type="text"
            onChange={(event) => {
              setStudentMiddleName(event.target.value);
            }}
          />
          <label>Last Name</label>
          <input
            type="text"
            onChange={(event) => {
              setStudentLastName(event.target.value);
            }}
          />
          <label>Birth Date</label>
          <input
            type="date"
            onChange={(event) => {
              setBirthDate(event.target.value);
            }}
          />
          <label>Address</label>
          <input
            type="text"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </div>
        <div className="rightside">
          <label>Email Address</label>
          <input
            type="text"
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
          />
          <label>Phone Number</label>
          <input
            type="text"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button
            className="cancelbutton"
            onClick={() => {
              history("/student");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveStudent}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
