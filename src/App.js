import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/students/Students';
import StudentDetails from './pages/students/StudentDetails';
import AddStudent from './pages/students/AddStudent';
import Teachers from './pages/teachers/Teachers';
import TeacherDetails from './pages/teachers/TeacherDetails';
import AddTeacher from './pages/teachers/AddTeacher';
import NotificationPage from './pages/Notifications/NotificationPage';
import Profile from './pages/User/Profile';
import Classes from './pages/classes/Classes';
import AddClass from './pages/classes/AddClass';
import Subjects from './pages/subjects/Subjects';
import AddSubject from './pages/subjects/AddSubject';
import Attendance from './pages/attendance/Attendance';
import StudentAttendance from './pages/attendance/StudentAttendance';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import TimeTable from './pages/timetable/TimeTable';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/details" element={<StudentDetails />} />
          <Route path="/students/add" element={<AddStudent />} />

          {/* Users */}
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Teacher Module */}
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/details" element={<TeacherDetails />} />
          <Route path="/teachers/add" element={<AddTeacher />} />

          {/* New Modules */}
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/add" element={<AddClass />} />

          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/add" element={<AddSubject />} />

          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance/student" element={<StudentAttendance />} />
          <Route path="/attendance/teacher" element={<TeacherAttendance />} />

          <Route path="/timetable" element={<TimeTable />} />

          <Route path="/courses" element={<div style={{ padding: 20 }}><h2>Courses Module</h2><p>Coming soon...</p></div>} />
          <Route path="/finance" element={<div style={{ padding: 20 }}><h2>Finance Module</h2><p>Coming soon...</p></div>} />
          <Route path="/events" element={<div style={{ padding: 20 }}><h2>Events Module</h2><p>Coming soon...</p></div>} />
          <Route path="/food" element={<div style={{ padding: 20 }}><h2>Food Module</h2><p>Coming soon...</p></div>} />


        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;