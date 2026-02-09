import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Helper to load user from storage synchronously
const loadUserFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  } catch (error) {
    console.error('Error parsing user info', error);
  }
  return null;
};

const savedUser = loadUserFromStorage();

// Initial state
const initialState = {
  users: [
    { id: 1, name: 'Admin User', role: 'Admin', status: 'Active', email: 'admin@school.com', avatar: 'https://i.pravatar.cc/150?img=3', joinDate: '2023-01-15' },
    { id: 2, name: 'Sarah Wilson', role: 'Teacher', status: 'Active', email: 'teacher@school.com', avatar: 'https://i.pravatar.cc/150?img=5', subject: 'Mathematics', joinDate: '2023-03-20' },
    { id: 3, name: 'Student User', role: 'Student', status: 'Active', email: 'student@school.com', avatar: 'https://i.pravatar.cc/150?img=12', class: 'Grade 10', joinDate: '2024-01-10' },
  ],
  notifications: [
    { id: 1, type: 'System', message: 'Welcome to School Management System', status: 'Unread', date: new Date().toISOString() }
  ],
  settings: {
    theme: 'light',
    language: 'en',
    notifications: true,
  },
  currentUser: savedUser,
  isAuthenticated: !!savedUser,
};

// Action types
const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  ADD_USER: 'ADD_USER',
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
    // Legacy support or other settings
    const savedData = localStorage.getItem('sms-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // We carefully only restore SETTINGS or other non-auth state checks here
        if (parsedData.settings) {
          dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: parsedData.settings });
        }
        // IMPORTANT: WE DO NOT OVERWRITE isAuthenticated/currentUser from 'sms-data'
        // Authentication is strictly managed via 'userInfo' key in localStorage.
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save specific data to localStorage whenever state changes
  useEffect(() => {
    // We prepare an object that excludes auth info to avoid stale overwrites if logic changes
    const stateToSave = {
      settings: state.settings,
      // users: state.users, // Optionally save users if they are local-only
      // notifications: state.notifications
    };
    localStorage.setItem('sms-data', JSON.stringify(stateToSave));
  }, [state.settings, state.users, state.notifications]);

  const login = (email, password) => {
    // Method primarily used for mock testing if needed, mainly relying on Login.js dispatch
    const user = state.users.find(u => u.email === email);
    if (user) {
      dispatch({ type: ACTIONS.LOGIN, payload: user });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('org_user'); // Also clear cookie-related storage if any

    // Optional: Clear 'sms-data' if you want a complete hard reset, but usually settings are nice to keep
    // localStorage.removeItem('sms-data'); 

    dispatch({ type: ACTIONS.LOGOUT });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions: ACTIONS, login, logout }}>
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