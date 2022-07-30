import React, { useEffect } from "react";
import "./CreateNewCSS/TextfieldPages.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const NewStudent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    }
  }, []);

  const [studentfirstname, setStudentFirstName] = useState();
  const [studentmiddlename, setStudentMiddleName] = useState();
  const [studentlastname, setStudentLastName] = useState();
  const [birthdate, setBirthDate] = useState();
  const [studentaddress, setAddress] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [emailaddress, setEmailAddress] = useState();
  const [isMobile] = useState(false);

  const saveStudentData = async () => {
    try {
      if (
        studentfirstname == null ||
        studentmiddlename == null ||
        studentlastname == null ||
        birthdate == null ||
        studentaddress == null ||
        phonenumber == null ||
        emailaddress == null
      ) {
        throw new Error("Some fields are empty!");
      }
      const baseURL = window.localStorage.getItem("baseURL");
      const token = window.localStorage.getItem("token");

      const student = await axios({
        method: "post",
        url: baseURL + "admin/student",
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
          address: studentaddress,
          phoneNumber: phonenumber,
          email: emailaddress,
        },
      })
        .then((response) => {
          Swal.fire("Good job!", response.data.message, "success").then(
            function () {
              window.location = "/student";
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
        <h3>New Student</h3>
        <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
          <button
            className="cancelbutton"
            onClick={() => {
              navigate("/student");
            }}
          >
            CANCEL
          </button>
          <button className="savebutton" onClick={saveStudentData}>
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
        </div>
        <div className="rightside">
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
          <label>Phone Number</label>
          <input
            type="text"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
          />
          <label>Email Address</label>
          <input
            type="text"
            onChange={(event) => {
              setEmailAddress(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="bottom">
        <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
          <button className="cancelbutton" onClick={() => navigate("/student")}>
            CANCEL
          </button>
          <button className="savebutton" onClick={saveStudentData}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;

// const NewStudent = () => {
//     const navigate = useNavigate()
//     useEffect(() => {
//         const token = window.localStorage.getItem('token');
//         console.log(token);
//         if (token == null) {
//             navigate('/login');
//         }
//     }, []);
// const [studentfirstname, setStudentFirstName] = useState();
// const [studentmiddlename, setStudentMiddleName] = useState();
// const [studentlastname, setStudentLastName] = useState();
// const [birthdate, setBirthDate] = useState();
// const [studentaddress, setAddress] = useState();
// const [phonenumber, setPhoneNumber] = useState();
// const [emailaddress, setEmailAddress] = useState();
//     const [isMobile] = useState(false);

//     const saveStudent = async () => {
//         try {
// if (studentfirstname == null || studentmiddlename == null || studentlastname == null) {
//     throw new Error('Some fields are empty!')
// }
// if (birthdate == null || studentaddress == null || phonenumber == null || emailaddress == null) {
//     throw new Error('Some fields are empty!')
// }

//             const baseURL = window.localStorage.getItem('baseURL');
//             const token = window.localStorage.getItem('token');

//             const studentData = await axios({
//                 method: 'post',
//                 url: baseURL + 'admin/students',
//                 headers: {
//                     // created headers with Bearer token
//                     // Without bearer token, api will not allow user to make changes
//                     Authorization: 'Bearer ' + token
//                 },
//                 data: {
// firstName: studentfirstname,
// middleName: studentmiddlename,
// lastName: studentlastname,
// birthDate: birthdate,
// address: studentaddress,
// phoneNumber: phonenumber,
// email: emailaddress,
//                 }
//             }).then((response => {
//                 Swal.fire(
//                     'Good job!',
//                     response.data.message,
//                     'success'
//                 ).then(function () {
//                     window.location = "/student";
//                 });
//             })).catch((error) => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     text: error.response.data.message,
//                 })
//             })
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: error.message
//             })
//         }
//     };

//     return (
//         <div>
//             <div className="top">
//                 <h3>New Student</h3>
//                 <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
//                     <button className="cancelbutton" onClick={() => { navigate("/student"); }}>
//                         CANCEL
//                     </button>
//                     <button className="savebutton" onClick={saveStudent}>SAVE</button>
//                 </div>
//             </div>
// <div className="informationver2">
//     <div className="leftside">
//         <label>First Name</label>
//         <input type="text"
//             onChange={(event) => {
//                 setStudentFirstName(event.target.value);
//             }}
//         />
//         <label>Middle Name</label>
//         <input type="text"
//             onChange={(event) => {
//                 setStudentMiddleName(event.target.value);
//             }}
//         />
//         <label>Last Name</label>
//         <input type="text"
//             onChange={(event) => {
//                 setStudentLastName(event.target.value);
//             }}
//         />
//     </div>
//     <div className="rightside">
//         <label>Birth Date</label>
//         <input type="date"
//             onChange={(event) => {
//                 setBirthDate(event.target.value);
//             }}
//         />
//         <label>Address</label>
//         <input type="text"
//             onChange={(event) => {
//                 setAddress(event.target.value);
//             }}
//         />
//         <label>Phone Number</label>
//         <input type="text"
//             onChange={(event) => {
//                 setPhoneNumber(event.target.value);
//             }}
//         />
//         <label>Email Address</label>
//         <input type="text"
//             onChange={(event) => {
//                 setEmailAddress(event.target.value);
//             }}
//         />
//     </div>
// </div>
//             <div className="bottom">
//                 <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
//                     <button className="cancelbutton" onClick={() => { navigate("/student"); }}>
//                         CANCEL
//                     </button>
//                     <button className="savebutton" onClick={saveStudent}>SAVE</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewStudent;
