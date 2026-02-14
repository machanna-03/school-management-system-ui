import React from 'react';
import '@mantine/core/styles.css';
import { ThemeContextProvider } from './context/ThemeContext';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/students/Students';
import StudentDetails from './pages/students/StudentDetails';
import Parents from './pages/Parents';
import CreateExam from './pages/exam/CreateExam';
import ExamTimetable from './pages/exam/ExamTimetable';
import ExamTimetables from './pages/exam/ExamTimetables';
import StudentMarks from './pages/exam/StudentMarks';
import StudentMarksHistory from './pages/exam/StudentMarksHistory';
import OnlineExamDashboard from './pages/exam/OnlineExamDashboard';
import AddQuestions from './pages/exam/AddQuestions';
// import Classroom from './pages/Classroom';
// import Grades from './pages/Grades';
import FeePaymentStatus from './pages/FeeDues/FeePaymentStatus';
import CollectFees from './pages/FeeDues/CollectFees';
import FeeStructure from './pages/FeeDues/FeeStructure';
import FeeReceipts from './pages/FeeDues/FeeReceipts';
import PaymentMethods from './pages/FeeDues/PaymentMethods';
import EditParent from './pages/EditParent';
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
// import Attendance from './pages/attendance/Attendance';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import TimeTable from './pages/timetable/TimeTable';
import Login from './components/auth/Login';
import Unauthorized from './pages/Unauthorized';
// import Signup from './components/auth/Signup';
import { AppProvider, useApp } from './context/AppContext';
import { CookiesProvider } from 'react-cookie';
import AssignStudents from './pages/classes/AssignStudents';
import ParentLayout from './parentportal/layout/ParentLayout';
import ParentDashboard from './parentportal/pages/ParentDashboard';
import Homework from './parentportal/pages/Homework';
import SubjectAnalysis from './parentportal/pages/SubjectAnalysis';
import WeeklyProgress from './parentportal/pages/WeeklyProgress';
import ParentTimetable from './parentportal/pages/ParentTimetable';
import ParentAttendance from './parentportal/pages/ParentAttendance';
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
import StudentTimeTable from './studentportal/pages/StudentTimeTable';
import StudentExamSchedule from './studentportal/pages/StudentExamSchedule';
import StudentOnlineExams from './studentportal/pages/OnlineExams';
import TakeExam from './studentportal/pages/TakeExam';
// Removed duplicate StudentAttendance import to avoid collision


// Teacher Portal Imports
import TeacherLayout from './teacherportal/layout/TeacherLayout';
import TeacherDashboard from './teacherportal/pages/TeacherDashboard';
import ClassToTeacher from './pages/classes/ClassToTeacher';
import SubToTeacher from './pages/subjects/SubToTeacher';
import SubToClass from './pages/subjects/SubToClass';
import LeaveApplicant from './parentportal/pages/SchoolLife/LeaveApplicant';
import ApplicationForm from './pages/admission/ApplicationForm';
// import Admission from './pages/admission/Admission';
import StudentAttendance from './pages/attendance/StudentAttendance';

// Attendance & Leave Imports
import AttendanceDashboard from './pages/attendance/AttendanceDashboard';
import LeaveApprovals from './pages/attendance/LeaveApprovals';
import LeaveApplication from './pages/attendance/LeaveApplication'; // For Teachers
import StudentLeave from './studentportal/pages/StudentLeave';
import MyAttendance from './studentportal/pages/MyAttendance';

// Transport Module
import TransportDashboard from './pages/transport/TransportDashboard';
import RouteManagement from './pages/transport/RouteManagement';
import BusManagement from './pages/transport/BusManagement';
import StudentBusAssignment from './pages/transport/StudentBusAssignment';

// Library Imports
import LibraryDashboard from './pages/library/LibraryDashboard';
import LibraryCirculation from './pages/library/LibraryCirculation';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { state } = useApp();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && state.currentUser) {
    const userRoles = state.currentUser.roles || [state.currentUser.role];
    const hasRole = userRoles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

// Main App Content with Logic
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes - Admin & Staff */}
      <Route path="/*" element={
        <ProtectedRoute allowedRoles={['SuperAdmin', 'Admin', 'Accountant', 'Receptionist', 'Librarian', 'Driver']}>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/details" element={<StudentDetails />} />
              <Route path="/students/details/:id" element={<StudentDetails />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/edit/:id" element={<AddStudent />} />
              <Route path="/parents" element={<Parents />} />

              {/* Users */}
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/profile" element={<Profile />} />

              {/* Teacher Module */}
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/details" element={<TeacherDetails />} />
              <Route path="/teachers/details/:id" element={<TeacherDetails />} />
              <Route path="/teachers/add" element={<AddTeacher />} />
              <Route path="/teachers/edit/:id" element={<AddTeacher />} />

              <Route path="/parents" element={<Parents />} />
              <Route path="/parents/edit/:id" element={<EditParent />} />

              {/* New Modules */}
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/add" element={<AddClass />} />
              <Route path="/classes/edit/:id" element={<AddClass />} />
              <Route path="/classes/edit/:id" element={<AddClass />} />
              <Route path="/classes/assign-students" element={<AssignStudents />} />
              <Route path="/classes/assign-students/:id" element={<AssignStudents />} />
              <Route path="/classes/assign" element={<ClassToTeacher />} />
              <Route path="/classes/assign" element={<ClassToTeacher />} />

              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/add" element={<AddSubject />} />
              <Route path="/subjects/edit/:id" element={<AddSubject />} />
              <Route path="/subjects/assign" element={<SubToTeacher />} />
              <Route path="/subjects/class" element={<SubToClass />} />

              <Route path="/attendance" element={<AttendanceDashboard />} />
              <Route path="/attendance/student" element={<StudentAttendance />} />
              <Route path="/attendance/teacher" element={<TeacherAttendance />} />
              <Route path="/attendance/leaves" element={<LeaveApprovals />} />

              <Route path="/timetable" element={<TimeTable />} />
              <Route path="/create-exam" element={<CreateExam />} />
              <Route path="/exam-timetable" element={<ExamTimetable />} />
              <Route path="/exam-timetables" element={<ExamTimetables />} />
              <Route path="/exam-marks" element={<StudentMarks />} />
              <Route path="/exam-history" element={<StudentMarksHistory />} />

              {/* Online Exam Admin Routes */}
              <Route path="/online-exam" element={<OnlineExamDashboard />} />
              <Route path="/online-exam/questions/:scheduleId" element={<AddQuestions />} />

              {/* <Route path="/classroom" element={<Classroom />} /> */}
              {/* <Route path="/grades" element={<Grades />} /> */}
              <Route path="/fees/payment-status" element={<FeePaymentStatus />} />
              <Route path="/fees/collect" element={<CollectFees />} />
              <Route path="/fees/structure" element={<FeeStructure />} />
              <Route path="/fees/receipts" element={<FeeReceipts />} />
              <Route path="/fees/payments-methods" element={<PaymentMethods />} />

              {/* <Route path="/admission" element={<Admission />} /> */}
              <Route path="/admission/application-form" element={<ApplicationForm />} />

              {/* Transport Module */}
              <Route path="/transport" element={<TransportDashboard />} />
              <Route path="/transport/routes" element={<RouteManagement />} />
              <Route path="/transport/buses" element={<BusManagement />} />
              <Route path="/transport/assignments" element={<StudentBusAssignment />} />

              {/* Library Module */}
              <Route path="/library" element={<LibraryDashboard />} />
              <Route path="/library/circulation" element={<LibraryCirculation />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />

      {/* Parent Portal Routes */}
      <Route path="/parent/*" element={
        <ProtectedRoute allowedRoles={['Parent']}>
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
              <Route path="/timetable" element={<ParentTimetable />} />
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
        <ProtectedRoute allowedRoles={['Student']}>
          <StudentLayout>
            <Routes>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="timetable" element={<StudentTimeTable />} />
              <Route path="attendance" element={<MyAttendance />} />
              <Route path="leave" element={<StudentLeave />} />
              <Route path="examschedule" element={<StudentExamSchedule />} />
              <Route path="online-exams" element={<StudentOnlineExams />} />
              <Route path="take-exam/:examId/:scheduleId" element={<TakeExam />} />
            </Routes>
          </StudentLayout>
        </ProtectedRoute>
      } />


      {/* Teacher Portal Routes */}
      <Route path="/teacher/*" element={
        <ProtectedRoute allowedRoles={['Teacher']}>
          <TeacherLayout>
            <Routes>
              <Route path="dashboard" element={<TeacherDashboard />} />
              {/* Teacher can mark student attendance */}
              <Route path="attendance/mark" element={<StudentAttendance />} />
              <Route path="leave" element={<LeaveApplication />} />
            </Routes>
          </TeacherLayout>
        </ProtectedRoute>
      } />

    </Routes>
  );
}




function App() {
  return (
    <MantineProvider>
      <Notifications />
      <CookiesProvider>
        <AppProvider>
          <ThemeContextProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </ThemeContextProvider>
        </AppProvider>
      </CookiesProvider>
    </MantineProvider>
  );
}
export default App;