import "./Login.css";
import LoginHeaderPic from "./Login_Pics/Isidore.svg";
import LoginBox from "./Login_Pics/LoginBox1.svg";
import Boybg from "./Login_Pics/BG.svg";
import Line from "./Login_Pics/Line1.svg";
import Rec1 from "./Login_Pics/Rectangle1.svg";
import Rec2 from "./Login_Pics/Rectangle2.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import React from "react";

function Login() {
  const navigate = useNavigate();
  //this is the base URL for all API requests
  // this means that only the endpoint will change depending on function being done
  // example: for academic years, it is http://192.168.63.254/api/admin/academic-years
  //admin keyword is added for all endpoints that only admin can use (student can't add or change academic years)
  //CHANGE THIS TO THE IP ADDRESS OF YOUR VAGRANT
  const baseURL = "https://groupdsihs.herokuapp.com/api/";

  // saving base URL and token to session storage
  window.localStorage.setItem("baseURL", baseURL);

  const [username, setUserName] = useState();
  const [passId, getPassId] = useState();

  const displayInfo = async () => {
    try {
      if (username == null || passId == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password or email field blank. Please try again .",
        });
        return;
      }
      // logged in with POST response
      var loginResponse = await axios({
        //POST method to give data to database
        method: "post",
        url: baseURL + "login",
        // data required
        // I will share my postman workspace so you can see all data required
        // error will be thrown if data is missing, but no error if extra data is sent
        data: {
          password: passId,
          email: username,
          accountType: "admin",
        },
      })
        .then((response) => {
          var token = response.data.access_token;
          console.log(token);
          window.localStorage.setItem("token", token);
          navigate("/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: error,
            text: error.message,
          });
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Credentials Supplied",
        text: error.message,
      });
    }
  };

  return (
    <div className="LoginBg">
      <div className="LoginAreaBox">
        <div className="LoginHeaderPic">
          <img src={LoginHeaderPic} />
        </div>
        <span className="IsidoreText">St. Isidore College</span>
        <div className="BoyBg">
          <img src={Boybg} />
        </div>
        <span className="StudentText">
          Student Enrollment <br />
          System{" "}
        </span>
        <img className="LoginBox" src={LoginBox} alt="LoginBoxArea" />
        <span className="HelloText">Hello again!</span>
        <span className="Ptext">
          Enter your assigned details to <br /> log in to your account.
        </span>
        <div className="Line">
          <img src={Line} />
        </div>
        <div>
          <div>
            <img className="Rec1" src={Rec1} />
            <input
              className="Rec1Text"
              type="text"
              placeholder="Email"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <img className="Rec2" src={Rec2} />
            <input
              className="Rec2Text"
              type="password"
              placeholder="Password"
              onChange={(event) => {
                getPassId(event.target.value);
              }}
            />
          </div>
          <button onClick={displayInfo} className="LoginActionBtn">
            LOGIN
          </button>
          <a href="ForgotPassword" className="ForgotPassBtn">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
