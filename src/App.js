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
import Profile from './pages/User/Profile';


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