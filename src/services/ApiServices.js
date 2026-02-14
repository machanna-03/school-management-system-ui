import api from "./api"; // Import the new axios instance


const packageJson = require("../../package.json");

export const invokeApi = async (url, params, cookies) => {
    try {
        // 'cookies' argument is now optional/ignored as the interceptor handles it
        // We use the 'api' instance which has the base URL and interceptors configured
        // url should be relative to baseURL if possible, but if it's absolute, axios handles it.
        // The original code passed full URL (config.getMySchool + apiList.signup). 
        // If the passed URL is absolute, axios uses it. If relative, it appends to baseURL.
        // We can just pass 'url' as is.

        return await api.post(url, params);
    } catch (error) {
        // Return the error response to maintain backward compatibility with components checks
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokePostApi = invokeApi;

export const invokePutApi = async (url, params) => {
    try {
        return await api.put(url, params);
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeGetApi = async (url, params) => {
    try {
        return await api.get(url, { params: params });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeFormDataApi = async (url, formData, cookies) => {
    try {
        // Content-Type: multipart/form-data is usually automatically set by axios when data is FormData
        // But we can explicit set it if needed, or let the interceptor handle common headers.
        // appversion and platform are already handled.

        return await api.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const invokeDeleteApi = async (url, params) => {
    try {
        return await api.delete(url, { data: params });
    } catch (error) {
        return error.response || { status: 500, data: { responseMessage: "Network Error" } };
    }
};

export const apiList = {
    //User
    userLogin: "/login",
    userAdd: "/addUser",
    getUsers: "/getUsers",
    getUser: "/getUser",
    updateUser: "/updateUser",
    updateUserRoles: "/updateUserRoles",
    deleteUser: "/deleteUser",

    //Sign-Up
    signup: "/register",

    // traffic tracking
    addWebTraffic: "/web/addWebTraffic",

    //change password api
    changePassword: "/changePassword",

    // Examination Module
    addExamType: "/addExamType",
    getExamTypes: "/getExamTypes",
    createExam: "/createExam",
    getExams: "/getExams",
    addExamSchedule: "/addExamSchedule",
    getExamSchedule: "/getExamSchedule", // Appended with /:id
    enterMarks: "/enterMarks",
    getStudentMarks: "/getStudentMarks",

    // Transport Module
    getRoutes: "/transport/routes",
    addRoute: "/transport/addRoute",
    getStops: "/transport/stops", // requires /{route_id}
    addStop: "/transport/addStop",
    getBuses: "/transport/buses",
    addBus: "/transport/addBus",
    updateBusLocation: "/transport/updateLocation",
    assignTransport: "/transport/assignMember",
    getAssignments: "/transport/assignments",
    deleteRoute: "/transport/deleteRoute",
    deleteStop: "/transport/deleteStop",
    deleteBus: "/transport/deleteBus",
    deleteAssignment: "/transport/deleteAssignment",

    // Classes & Subjects (if missing)
    getClasses: "/getClasses", // Returns sections
    getClass: "/getClass", // Appended with /:id
    updateClass: "/updateClass",
    deleteClass: "/deleteClass",
    getStudentsForAssignment: "/getStudentsForAssignment",
    assignStudentsToSection: "/assignStudentsToSection",
    updateStudent: "/updateStudent",
    deleteStudent: "/deleteStudent",
    getClassList: "/getClassList", // Returns classes table
    getSubjects: "/getSubjects",
    getClassSubjects: "/getClassSubjects",

    // Classrooms
    addClassroom: "/addClassroom",
    getClassrooms: "/getClassrooms",
    deleteClassroom: "/deleteClassroom",
    getStudents: "/getStudents",

    // Fees
    getFeeDues: "/getFeeDues",
    collectFee: "/collectFee",
    getFeeStructure: "/getFeeStructure", // by classId
    getFeeStructures: "/getFeeStructures", // All structures with details
    addFeeStructure: "/addFeeStructure",
    getFeeComponents: "/getFeeComponents",
    addFeeComponent: "/addFeeComponent",
    saveStudentFeeStructure: "/saveStudentFeeStructure", // New endpoint for student-centric fee creation
    assignFeeToStudent: "/assignFeeToStudent",
    getStudentFeeDetails: "/getStudentFeeDetails", // :studentId
    getFeeReceipts: "/getFeeReceipts",

    // Grades
    addGrade: "/addGrade",
    getGrades: "/getGrades",
    deleteGrade: "/deleteGrade",

    // Online Exams
    addQuestion: "/addQuestion",
    getQuestions: "/getQuestions", // /{schedule_id}
    submitExam: "/submitExam",
    getOnlineExamResult: "/getOnlineExamResult",
    updateQuestion: "/updateQuestion",
    deleteQuestion: "/deleteQuestion", // /{id}
    getQuestion: "/getQuestion", // /{id}
};
