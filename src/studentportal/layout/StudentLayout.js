import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';

const StudentLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6fa' }}>
            <CssBaseline />

            <StudentSidebar
                collapsed={collapsed}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    transition: 'margin-left 0.3s',
                }}
            >
                <StudentHeader
                    collapsed={collapsed}
                    toggleSidebar={toggleSidebar}
                    handleDrawerToggle={handleDrawerToggle}
                />

                <Box component="div" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
                    {children ? children : <Outlet />}
                </Box>
            </Box>
        </Box>
    );
};

export default StudentLayout;
