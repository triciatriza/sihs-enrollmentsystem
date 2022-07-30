import React from 'react';
import './ViewPage.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const NewStudent = () => {
    let history = useNavigate();
    const [studentuniversityid, setStudentUniversityID] = useState("");
    const [studentfirstname, setStudentFirstName] = useState("");
    const [studentmiddlename, setStudentMiddleName] = useState("");
    const [studentlastname, setStudentLastName] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [academicterm, setAcademicTerm] = useState("");
    const [yearlevel, setYearLevel] = useState("");
    const [studenttype, setStudentType] = useState("");
    const [block, setBlock] = useState("");
    const [emailaddress, setEmailAddress] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");

    const [isMobile] = useState(false);

    // const displayInfo = () => {
    //     console.log(studentuniversityid + studentfirstname + studentmiddlename + studentlastname + birthdate + address + academicterm + yearlevel + studenttype + block + emailaddress + phonenumber);
    // };

    return (
        <div>
            <div className="top">
                <h3>View Student</h3>
                <div className={isMobile ? "buttons-top-mobile" : "buttons-top"}>
                    <button className="backbutton" onClick={() => 
                        {history("/student");}}> 
                            BACK 
                    </button>
                </div>
            </div>
            <div className="informationver2">
                <div className="leftside">
                    <label>University ID</label>
                    <input type="text"
                        onChange={(event) => {
                            setStudentUniversityID(event.target.value);
                        }}
                    />
                    <label>First Name</label>
                    <input type="text"
                        onChange={(event) => {
                            setStudentFirstName(event.target.value);
                        }}
                    />
                    <label>Middle Name</label>
                    <input type="text"
                        onChange={(event) => {
                            setStudentMiddleName(event.target.value);
                        }}
                    />
                    <label>Last Name</label>
                    <input type="text"
                        onChange={(event) => {
                            setStudentLastName(event.target.value);
                        }}
                    />
                    <label>Birth Date</label>
                    <input type="text"
                        onChange={(event) => {
                            setBirthDate(event.target.value);
                        }}
                    />
                    <label>Address</label>
                    <input type="text"
                        onChange={(event) => {
                            setAddress(event.target.value);
                        }}
                    />
                </div>
                <div className="rightside">
                    <label>Academic Term</label>
                    <select name="academicTerm" className="selectbar"
                        onChange={(event) => {
                            setAcademicTerm(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Year Level</label>
                    <select name="yearLevel" className="selectbar"
                        onChange={(event) => {
                            setYearLevel(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Student Type</label>
                    <select name="studentType" className="selectbar"
                        onChange={(event) => {
                            setStudentType(event.target.value);
                        }}
                    >
                        <option value="Regular">Regular</option>
                        <option value="Irregular">Regular</option>
                    </select>
                    <label>Block</label>
                    <select name="set-block" className="selectbar"
                        onChange={(event) => {
                            setBlock(event.target.value);
                        }}
                    >
                        <option value=""></option>
                    </select>
                    <label>Email Address</label>
                    <input type="text"
                        onChange={(event) => {
                            setEmailAddress(event.target.value);
                        }}
                    />
                    <label>Phone Number</label>
                    <input type="text"
                        onChange={(event) => {
                            setPhoneNumber(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="bottom">
                <div className={isMobile ? "buttons-bottom-mobile" : "buttons-bottom"}>
                    <button className="backbutton" onClick={() => 
                        {history("/student");}}> 
                            BACK 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewStudent;