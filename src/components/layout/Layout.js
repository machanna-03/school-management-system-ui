import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Sidebar collapsed={collapsed} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: { xs: 0, md: collapsed ? '80px' : '280px' }, // Dynamic Sidebar width
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: `calc(100% - ${collapsed ? '80px' : '280px'})` },
                    transition: 'margin-left 0.3s, width 0.3s'
                }}
            >
                <Header toggleSidebar={toggleSidebar} collapsed={collapsed} />
                <Box component="div" sx={{ p: '30px 40px', flexGrow: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
