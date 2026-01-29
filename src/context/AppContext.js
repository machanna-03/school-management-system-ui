import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  users: [
    { id: 1, name: 'Dr. John Doe', role: 'Doctor', status: 'Active', email: 'john.doe@hospital.com', phone: '+1234567890', avatar: 'https://via.placeholder.com/40', department: 'Cardiology', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Nurse', role: 'Nurse', status: 'Active', email: 'jane.nurse@hospital.com', phone: '+1234567891', avatar: 'https://via.placeholder.com/40', department: 'Emergency', joinDate: '2023-03-20' },
    { id: 3, name: 'Patient Smith', role: 'Patient', status: 'Active', email: 'patient.smith@email.com', phone: '+1234567892', avatar: 'https://via.placeholder.com/40', department: 'N/A', joinDate: '2024-01-10' },
  ],
  patients: [
    { id: 1, name: 'Alice Johnson', age: 35, gender: 'Female', condition: 'Hypertension', doctor: 'Dr. John Doe', lastVisit: '2025-12-15', status: 'Stable', avatar: 'https://via.placeholder.com/40', phone: '+1234567893', address: '123 Main St', bloodType: 'A+', allergies: 'Penicillin' },
    { id: 2, name: 'Bob Wilson', age: 42, gender: 'Male', condition: 'Diabetes', doctor: 'Dr. John Doe', lastVisit: '2025-12-14', status: 'Under Treatment', avatar: 'https://via.placeholder.com/40', phone: '+1234567894', address: '456 Oak Ave', bloodType: 'B-', allergies: 'None' },
    { id: 3, name: 'Carol Davis', age: 28, gender: 'Female', condition: 'Asthma', doctor: 'Dr. Sarah Lee', lastVisit: '2025-12-13', status: 'Stable', avatar: 'https://via.placeholder.com/40', phone: '+1234567895', address: '789 Pine Rd', bloodType: 'O+', allergies: 'Dust' },
  ],
  appointments: [
    { id: 1, patient: 'Alice Johnson', doctor: 'Dr. John Doe', date: '2025-12-20', time: '10:00', type: 'Check-up', status: 'Scheduled', notes: 'Routine check-up' },
    { id: 2, patient: 'Bob Wilson', doctor: 'Dr. John Doe', date: '2025-12-21', time: '14:30', type: 'Consultation', status: 'Confirmed', notes: 'Diabetes follow-up' },
    { id: 3, patient: 'Carol Davis', doctor: 'Dr. Sarah Lee', date: '2025-12-22', time: '09:00', type: 'Follow-up', status: 'Scheduled', notes: 'Asthma management' },
  ],
  medications: [
    { id: 1, name: 'Lisinopril', category: 'Cardiovascular', stock: 150, unit: 'mg', price: 15.99, expiry: '2026-06-30', supplier: 'PharmaCorp', minStock: 20 },
    { id: 2, name: 'Metformin', category: 'Diabetes', stock: 200, unit: 'mg', price: 12.50, expiry: '2026-08-15', supplier: 'MediSupply', minStock: 25 },
    { id: 3, name: 'Albuterol', category: 'Respiratory', stock: 75, unit: 'mg', price: 25.00, expiry: '2026-04-20', supplier: 'HealthPharm', minStock: 15 },
  ],
  labTests: [
    { id: 1, patient: 'Alice Johnson', test: 'Blood Test', status: 'Completed', date: '2025-12-15', result: 'Normal', doctor: 'Dr. John Doe', avatar: 'https://via.placeholder.com/40' },
    { id: 2, patient: 'Bob Wilson', test: 'X-Ray', status: 'In Progress', date: '2025-12-20', result: 'Pending', doctor: 'Dr. Sarah Lee', avatar: 'https://via.placeholder.com/40' },
    { id: 3, patient: 'Carol Davis', test: 'MRI Scan', status: 'Scheduled', date: '2025-12-22', result: 'N/A', doctor: 'Dr. Michael Brown', avatar: 'https://via.placeholder.com/40' },
  ],
  notifications: [
    { id: 1, type: 'Appointment Reminder', message: 'Appointment with Dr. John Doe tomorrow at 10:00 AM', recipient: 'Alice Johnson', status: 'Sent', priority: 'High', date: '2025-12-15', avatar: 'https://via.placeholder.com/40' },
    { id: 2, type: 'Test Results', message: 'Your blood test results are ready', recipient: 'Bob Wilson', status: 'Delivered', priority: 'Medium', date: '2025-12-14', avatar: 'https://via.placeholder.com/40' },
    { id: 3, type: 'Medication Alert', message: 'Time to take your medication', recipient: 'Carol Davis', status: 'Pending', priority: 'High', date: '2025-12-16', avatar: 'https://via.placeholder.com/40' },
  ],
  bills: [
    { id: 1, patient: 'Alice Johnson', amount: 250.00, status: 'Paid', date: '2025-12-15', items: ['Consultation', 'Blood Test'], dueDate: '2025-12-15' },
    { id: 2, patient: 'Bob Wilson', amount: 180.50, status: 'Pending', date: '2025-12-14', items: ['Consultation', 'Medication'], dueDate: '2025-12-30' },
    { id: 3, patient: 'Carol Davis', amount: 320.75, status: 'Overdue', date: '2025-12-10', items: ['Emergency Visit', 'X-Ray'], dueDate: '2025-12-20' },
  ],
  settings: {
    theme: 'light',
    language: 'en',
    notifications: true,
    autoBackup: true,
    sessionTimeout: 30,
  },
  currentUser: null,
  isAuthenticated: false,
};

// Action types
const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  ADD_PATIENT: 'ADD_PATIENT',
  UPDATE_PATIENT: 'UPDATE_PATIENT',
  DELETE_PATIENT: 'DELETE_PATIENT',
  ADD_APPOINTMENT: 'ADD_APPOINTMENT',
  UPDATE_APPOINTMENT: 'UPDATE_APPOINTMENT',
  DELETE_APPOINTMENT: 'DELETE_APPOINTMENT',
  ADD_MEDICATION: 'ADD_MEDICATION',
  UPDATE_MEDICATION: 'UPDATE_MEDICATION',
  DELETE_MEDICATION: 'DELETE_MEDICATION',
  ADD_LAB_TEST: 'ADD_LAB_TEST',
  UPDATE_LAB_TEST: 'UPDATE_LAB_TEST',
  DELETE_LAB_TEST: 'DELETE_LAB_TEST',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  ADD_BILL: 'ADD_BILL',
  UPDATE_BILL: 'UPDATE_BILL',
  DELETE_BILL: 'DELETE_BILL',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  LOAD_DATA: 'LOAD_DATA',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, isAuthenticated: true, currentUser: action.payload };
    case ACTIONS.LOGOUT:
      return { ...state, isAuthenticated: false, currentUser: null };
    case ACTIONS.ADD_USER:
      return { ...state, users: [...state.users, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        )
      };
    case ACTIONS.DELETE_USER:
      return { ...state, users: state.users.filter(user => user.id !== action.payload) };
    case ACTIONS.ADD_PATIENT:
      return { ...state, patients: [...state.patients, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? { ...patient, ...action.payload } : patient
        )
      };
    case ACTIONS.DELETE_PATIENT:
      return { ...state, patients: state.patients.filter(patient => patient.id !== action.payload) };
    case ACTIONS.ADD_APPOINTMENT:
      return { ...state, appointments: [...state.appointments, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? { ...appointment, ...action.payload } : appointment
        )
      };
    case ACTIONS.DELETE_APPOINTMENT:
      return { ...state, appointments: state.appointments.filter(appointment => appointment.id !== action.payload) };
    case ACTIONS.ADD_MEDICATION:
      return { ...state, medications: [...state.medications, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_MEDICATION:
      return {
        ...state,
        medications: state.medications.map(medication =>
          medication.id === action.payload.id ? { ...medication, ...action.payload } : medication
        )
      };
    case ACTIONS.DELETE_MEDICATION:
      return { ...state, medications: state.medications.filter(medication => medication.id !== action.payload) };
    case ACTIONS.ADD_LAB_TEST:
      return { ...state, labTests: [...state.labTests, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_LAB_TEST:
      return {
        ...state,
        labTests: state.labTests.map(test =>
          test.id === action.payload.id ? { ...test, ...action.payload } : test
        )
      };
    case ACTIONS.DELETE_LAB_TEST:
      return { ...state, labTests: state.labTests.filter(test => test.id !== action.payload) };
    case ACTIONS.ADD_NOTIFICATION:
      return { ...state, notifications: [...state.notifications, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload.id ? { ...notification, ...action.payload } : notification
        )
      };
    case ACTIONS.DELETE_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(notification => notification.id !== action.payload) };
    case ACTIONS.ADD_BILL:
      return { ...state, bills: [...state.bills, { ...action.payload, id: Date.now() }] };
    case ACTIONS.UPDATE_BILL:
      return {
        ...state,
        bills: state.bills.map(bill =>
          bill.id === action.payload.id ? { ...bill, ...action.payload } : bill
        )
      };
    case ACTIONS.DELETE_BILL:
      return { ...state, bills: state.bills.filter(bill => bill.id !== action.payload) };
    case ACTIONS.UPDATE_SETTINGS:
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case ACTIONS.LOAD_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('hms-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ACTIONS.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('hms-data', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch, actions: ACTIONS }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}