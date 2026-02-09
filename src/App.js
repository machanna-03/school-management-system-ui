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
import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
import { AppProvider, useApp } from './context/AppContext';
import { CookiesProvider } from 'react-cookie';
import ParentLayout from './parentportal/layout/ParentLayout';
import ParentDashboard from './parentportal/pages/ParentDashboard';
import Homework from './parentportal/pages/Homework';
import SubjectAnalysis from './parentportal/pages/SubjectAnalysis';
import WeeklyProgress from './parentportal/pages/WeeklyProgress';
import Timetable from './parentportal/pages/Timetable';
import ParentAttendance from './parentportal/pages/Attendance';
import ParentFinance from './parentportal/pages/Finance';
import ParentCommunication from './parentportal/pages/Communication';
import ParentSettings from './parentportal/pages/Settings';
import ParentExamSchedule from './parentportal/pages/ExamSchedule';
import ParentAchievements from './parentportal/pages/Achievements';
import ParentReportCards from './parentportal/pages/ReportCards';
import ParentPerformance from './parentportal/pages/Performance';

// Student Portal Imports
import StudentLayout from './studentportal/layout/StudentLayout';
import StudentDashboard from './studentportal/pages/StudentDashboard';

// Teacher Portal Imports
import TeacherLayout from './teacherportal/layout/TeacherLayout';
import TeacherDashboard from './teacherportal/pages/TeacherDashboard';
import ClassToTeacher from './pages/classes/ClassToTeacher';
import SubToTeacher from './pages/subjects/SubToTeacher';
import SubToClass from './pages/subjects/SubToClass';
import LeaveApplicant from './parentportal/pages/SchoolLife/LeaveApplicant';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { state } = useApp();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Main App Content with Logic
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}

      {/* Protected Routes */}
      <Route path="/*" element={
        <ProtectedRoute>
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
              <Route path="/classes/assign" element={<ClassToTeacher />} />

              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/add" element={<AddSubject />} />
              <Route path="/subjects/assign" element={<SubToTeacher />} />
              <Route path="/subjects/class" element={<SubToClass />} />

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
        </ProtectedRoute>
      } />

      {/* Parent Portal Routes */}
      <Route path="/parent/*" element={
        <ProtectedRoute>
          <ParentLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/parent/dashboard" replace />} />
              <Route path="/dashboard" element={<ParentDashboard />} />
              <Route path="/children" element={<div style={{ padding: 20 }}><h2>My Children</h2><p>Coming soon...</p></div>} />
              <Route path="/academics" element={<div style={{ padding: 20 }}><h2>Academics</h2><p>Coming soon...</p></div>} />
              <Route path="/homework" element={<Homework />} />
              <Route path="/weekly-progress" element={<WeeklyProgress />} />
              <Route path="/subject-analysis" element={<SubjectAnalysis />} />
              <Route path="/attendance" element={<ParentAttendance />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/exam-schedule" element={<ParentExamSchedule />} />
              <Route path="/achievements" element={<ParentAchievements />} />
              <Route path="/report-cards" element={<ParentReportCards />} />
              <Route path="/performance" element={<ParentPerformance />} />
              <Route path="/fees" element={<ParentFinance initialTab="fees" />} />
              <Route path="/payments" element={<ParentFinance initialTab="payments" />} />
              <Route path="/receipts" element={<ParentFinance initialTab="receipts" />} />
              <Route path="/quickpay" element={<ParentFinance initialTab="quickpay" />} />
              <Route path="/teachers" element={<ParentCommunication initialTab="teachers" />} />
              <Route path="/office" element={<ParentCommunication initialTab="office" />} />
              <Route path="/messages" element={<ParentCommunication initialTab="messages" />} />
              <Route path="/announcements" element={<ParentCommunication initialTab="announcements" />} />
              <Route path="/events" element={<ParentCommunication initialTab="events" />} />
              <Route path="/ptm" element={<ParentCommunication initialTab="ptm" />} />
              <Route path="/settings" element={<ParentSettings initialTab="profile" />} />
              <Route path="/profile" element={<ParentSettings initialTab="profile" />} />
              <Route path="/security" element={<ParentSettings initialTab="security" />} />
              <Route path="/notifications" element={<ParentSettings initialTab="notifications" />} />
              <Route path="/help" element={<ParentSettings initialTab="help" />} />
              <Route path="/leave" element={<LeaveApplicant />} />
            </Routes>
          </ParentLayout>
        </ProtectedRoute>
      } />

      {/* Student Portal Routes */}
      <Route path="/student/*" element={
        <StudentLayout>
          <Routes>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Routes>
        </StudentLayout>
      } />

      {/* Teacher Portal Routes */}
      <Route path="/teacher/*" element={
        <TeacherLayout>
          <Routes>
            <Route path="dashboard" element={<TeacherDashboard />} />
          </Routes>
        </TeacherLayout>
      } />

    </Routes>
  );
}

function App() {
  return (
    <CookiesProvider>
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </CookiesProvider>
  );
}
export default App;