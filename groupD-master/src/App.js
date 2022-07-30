import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AcademicYear from "./Pages/AcademicYear";
import AcademicTerm from "./Pages/AcademicTerm";
import Schedule from "./Pages/Schedule";
import Rooms from "./Pages/Rooms";
import Departments from "./Pages/Departments";
import Instructors from "./Pages/Instructors";
import Programs from "./Pages/Programs";
import Courses from "./Pages/Courses";
import Blocks from "./Pages/Blocks";
import Students from "./Pages/Students";
import Login from ".//Login";

import NewStudent from "./Pages/CreateNewPages/NewStudent";
import NewCourse from "./Pages/CreateNewPages/NewCourse";
import NewAcadTerm from "./Pages/CreateNewPages/NewAcadTerm";
import NewAcadYear from "./Pages/CreateNewPages/NewAcadYear";
import NewSchedule from "./Pages/CreateNewPages/NewSchedule";
import NewRoom from "./Pages/CreateNewPages/NewRoom";
import NewDepartment from "./Pages/CreateNewPages/NewDepartment";

import EditAcadYear from "./Pages/EditPages/EditAcadYear";
import EditAcadTerm from "./Pages/EditPages/EditAcadTerm";
import EditBlock from "./Pages/EditPages/EditBlock";
import EditCourse from "./Pages/EditPages/EditCourse";
import EditDepartment from "./Pages/EditPages/EditDepartment";
import EditInstructor from "./Pages/EditPages/EditInstructor";
import EditProgram from "./Pages/EditPages/EditProgram";
import EditRoom from "./Pages/EditPages/EditRoom";
import EditSchedule from "./Pages/EditPages/EditSchedule";
import EditStudent from "./Pages/EditPages/EditStudent";

import ViewCourse from "./Pages/ViewPages/ViewCourse";
import ViewStudent from "./Pages/ViewPages/ViewStudents";
import NotFoundPage from "./Pages/NotFoundPage";
import NewInstructor from "./Pages/CreateNewPages/NewInstructor";
import NewProgram from "./Pages/CreateNewPages/NewProgram";
import NewBlock from "./Pages/CreateNewPages/NewBlock";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import BlockCourses from "./Pages/CreateNewPages/BlockCourses";
import Enrollment from "./Pages/Enrollment";
import NewEnrollment from "./Pages/CreateNewPages/NewEnrollment";
import EditEnrollment from "./Pages/EditPages/EditEnrollment";

function App() {
  return (
    <Router>
      <Routes>
        {/* //TODO: add protected route by adding ternary operator to login: https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route */}
        <Route path="/login" element={<Login />} />
        {/* <Route element={ProtectedRoutes}>gs */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/academic-year" element={<AcademicYear />} />
        <Route path="/academic-term" element={<AcademicTerm />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/room" element={<Rooms />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/instructor" element={<Instructors />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/block" element={<Blocks />} />
        <Route path="/student" element={<Students />} />
        <Route path="/new-academic-year" element={<NewAcadYear />} />
        <Route path="/new-academic-term" element={<NewAcadTerm />} />
        <Route path="/new-schedule" element={<NewSchedule />} />
        <Route path="/new-room" element={<NewRoom />} />
        <Route path="/new-department" element={<NewDepartment />} />
        <Route path="/new-academic-year" element={<NewAcadYear />} />
        <Route path="/new-course" element={<NewCourse />} />
        <Route path="/new-student" element={<NewStudent />} />
        <Route path="/new-block" element={<NewBlock />} />
        <Route path="/new-student" element={<NewStudent />} />
        <Route path="/new-instructor" element={<NewInstructor />} />
        <Route path="/new-program" element={<NewProgram />} />
        <Route path="new-enrollment" element={<NewEnrollment />} />
        <Route path="/edit-academic-year" element={<EditAcadYear />} />
        <Route path="/edit-acadterm" element={<EditAcadTerm />} />
        <Route path="/edit-block" element={<EditBlock />} />
        <Route path="/edit-enrollment" element={<EditEnrollment />} />
        <Route path="/edit-course" element={<EditCourse />} />
        <Route path="/edit-dept" element={<EditDepartment />} />
        <Route path="/edit-instructor" element={<EditInstructor />} />
        <Route path="/edit-program" element={<EditProgram />} />
        <Route path="/edit-room" element={<EditRoom />} />
        <Route path="/edit-sched" element={<EditSchedule />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/viewcourse" element={<ViewCourse />} />
        <Route path="/viewstudent" element={<ViewStudent />} />
        <Route path="/blocks-courses" element={<BlockCourses />} />
        <Route path="/enrollment" element={<Enrollment />} />
        {/* </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
