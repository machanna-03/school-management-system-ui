import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar
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
                    minWidth: 0, // Fix for flex child overflow issues
                    transition: 'margin-left 0.3s, width 0.3s',
                }}
            >
                <Header
                    toggleSidebar={toggleSidebar}
                    collapsed={collapsed}
                    handleDrawerToggle={handleDrawerToggle}
                />
                <Box component="div" sx={{ p: { xs: 2, md: '30px 40px' }, flexGrow: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
