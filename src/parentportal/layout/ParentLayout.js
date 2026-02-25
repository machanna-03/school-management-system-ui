import React, { useState, useEffect, createContext, useContext } from 'react';
import { Box, CssBaseline, CircularProgress } from '@mui/material';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import ParentSidebar from './ParentSidebar';
import ParentHeader from './ParentHeader';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

// Context for sharing student data across portal pages
export const StudentContext = createContext();
export const useStudent = () => useContext(StudentContext);

const ParentLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const parentId = userInfo.id;

    useEffect(() => {
        if (!parentId) {
            navigate('/login');
            return;
        }
        fetchStudents();
    }, [parentId]);

    const fetchStudents = async () => {
        try {
            const response = await invokeGetApi(`${config.getMySchool}${apiList.getStudentsByParent}/${parentId}`);
            if (response.status === 200) {
                const fetchedStudents = response.data.students || [];
                setStudents(fetchedStudents);

                // Handle student selection from URL or default
                const urlSid = searchParams.get('studentId');
                if (urlSid) {
                    const found = fetchedStudents.find(s => s.id == urlSid);
                    if (found) setSelectedStudent(found);
                    else if (fetchedStudents.length > 0) setSelectedStudent(fetchedStudents[0]);
                } else if (fetchedStudents.length > 0) {
                    setSelectedStudent(fetchedStudents[0]);
                }
            }
        } catch (error) {
            console.error("Error fetching portal students:", error);
        } finally {
            setLoading(false);
        }
    };

    // Update selected student when URL studentId changes
    useEffect(() => {
        const urlSid = searchParams.get('studentId');
        if (urlSid && students.length > 0) {
            const found = students.find(s => s.id == urlSid);
            if (found) setSelectedStudent(found);
        }
    }, [searchParams, students]);

    const toggleSidebar = () => setCollapsed(!collapsed);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: '#f4f6fa' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <StudentContext.Provider value={{ students, selectedStudent, setSelectedStudent }}>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6fa' }}>
                <CssBaseline />

                <ParentSidebar
                    collapsed={collapsed}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    students={students}
                    selectedStudent={selectedStudent}
                />

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        transition: 'margin-left 0.3s',
                    }}
                >
                    <ParentHeader
                        collapsed={collapsed}
                        toggleSidebar={toggleSidebar}
                        handleDrawerToggle={handleDrawerToggle}
                    />

                    <Box component="div" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
                        {children ? children : <Outlet context={{ students, selectedStudent }} />}
                    </Box>
                </Box>
            </Box>
        </StudentContext.Provider>
    );
};

export default ParentLayout;
