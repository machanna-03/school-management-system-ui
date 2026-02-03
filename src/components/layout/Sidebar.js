import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse } from '@mui/material';
import { BiHomeAlt, BiUser, BiChalkboard, BiDish, BiFolder, BiGridAlt, BiBarChartSquare, BiHeart, BiExtension, BiTable, BiChevronRight, BiChevronDown, BiBookContent, BiBook, BiCalendarCheck, BiTime } from 'react-icons/bi';
import { IoMdListBox } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
    const [openDashboard, setOpenDashboard] = useState(false);
    const [openStudent, setOpenStudent] = useState(true);
    const [openTeacher, setOpenTeacher] = useState(true);

    const [openClasses, setOpenClasses] = useState(false);
    const [openSubjects, setOpenSubjects] = useState(false);
    const [openAttendance, setOpenAttendance] = useState(false);
    const [openTimeTable, setOpenTimeTable] = useState(false);

    const location = useLocation();

    const menuItems = [
        {
            name: 'Dashboard',
            icon: <BiHomeAlt />,
            hasSubmenu: true,
            isOpen: openDashboard,
            onClick: () => setOpenDashboard(!openDashboard),
            children: [
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Admin Dashboard', path: '/dashboard' },
            ]
        },
        {
            name: 'Student',
            icon: <BiUser />,
            hasSubmenu: true,
            isOpen: openStudent,
            onClick: () => setOpenStudent(!openStudent),
            children: [
                { name: 'All Students', path: '/students' },
                { name: 'Student Details', path: '/students/details' },
                { name: 'Add New Student', path: '/students/add' },
            ]
        },
        {
            name: 'Teacher', icon: <BiChalkboard />,
            isOpen: openTeacher,
            hasSubmenu: true,
            onClick: () => setOpenTeacher(!openTeacher),
            children: [
                { name: 'All Teachers', path: '/teachers' },
                { name: 'Teacher Details', path: '/teachers/details' },
                { name: 'Add New Teacher', path: '/teachers/add' },
                { name: 'Sub To Teachers', path: '/teachers/sub-to-teachers' },
            ]
            
        },
        {
            name: 'Classes',
            icon: <BiBookContent />,
            hasSubmenu: true,
            isOpen: openClasses,
            onClick: () => setOpenClasses(!openClasses),
            children: [
                { name: 'All Classes', path: '/classes' },
                { name: 'Add New Class', path: '/classes/add' },
            ]
        },
        {
            name: 'Subjects',
            icon: <BiBook />,
            hasSubmenu: true,
            isOpen: openSubjects,
            onClick: () => setOpenSubjects(!openSubjects),
            children: [
                { name: 'All Subjects', path: '/subjects' },
                { name: 'Add New Subject', path: '/subjects/add' },
            ]
        },
        {
            name: 'Attendance',
            icon: <BiCalendarCheck />,
            hasSubmenu: true,
            isOpen: openAttendance,
            onClick: () => setOpenAttendance(!openAttendance),
            children: [
                { name: 'Attendance Dashboard', path: '/attendance' },
                { name: 'Student Attendance', path: '/attendance/student' },
                { name: 'Teacher Attendance', path: '/attendance/teacher' },
            ]
        },
        {
            name: 'Time Table',
            icon: <BiTime />,
            hasSubmenu: true,
            isOpen: openTimeTable,
            onClick: () => setOpenTimeTable(!openTimeTable),
            children: [
                { name: 'View Time Table', path: '/timetable' },
            ]
        },
        { name: 'Food', icon: <BiDish />, hasArrow: true },
        { name: 'File Manager', icon: <BiFolder />, hasArrow: true },
        { name: 'Apps', icon: <BiGridAlt />, hasArrow: true },
        { name: 'Charts', icon: <BiBarChartSquare />, hasArrow: true },
        { name: 'Bootstrap', icon: <BiHeart />, hasArrow: true },
        { name: 'Plugins', icon: <BiExtension />, hasArrow: true },
        { name: 'Widget', icon: <BiGridAlt />, hasArrow: true },
        { name: 'Forms', icon: <IoMdListBox />, hasArrow: true },
        { name: 'Table', icon: <BiTable />, hasArrow: true },
    ];

    return (
        <Box
            sx={{
                width: collapsed ? 80 : 280,
                height: '100vh',
                bgcolor: '#4d44b5',
                color: '#c0beea',
                position: 'fixed',
                left: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1200,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: 0,
                margin: 0,
                transition: 'width 0.3s',
                '&::-webkit-scrollbar': {
                    width: 0,
                },
                scrollbarWidth: 'none',

            }}
        >
            {/* Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: collapsed ? 2.5 : 4, minHeight: 90, transition: 'padding 0.3s' }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: '#fb7d5b',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: 28,
                        boxShadow: '0 4px 10px rgba(251, 125, 91, 0.4)',
                        flexShrink: 0
                    }}
                >
                    G
                </Box>
                {!collapsed && (
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff', fontSize: '24px', whiteSpace: 'nowrap' }}>
                        GetMySchool
                    </Typography>
                )}
            </Box>

            {/* Navigation List */}
            <List sx={{ px: 2, pb: 10 }}>
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem disablePadding sx={{ mb: 0.5, display: 'block' }}>
                            <ListItemButton
                                onClick={item.onClick}
                                sx={{
                                    borderRadius: item.name === 'Dashboard' ? '0 50px 50px 0' : '0 50px 50px 0',
                                    ml: -2,
                                    pl: 4,
                                    px: 2,
                                    py: 1.2,
                                    bgcolor: item.name === 'Dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    color: item.name === 'Dashboard' ? '#fff' : '#c0beea',
                                    justifyContent: collapsed ? 'center' : 'initial',
                                    '&:hover': {
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 34, fontSize: 24, justifyContent: 'center', mr: collapsed ? 0 : 2 }}>
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && (
                                    <>
                                        <ListItemText
                                            primary={item.name}
                                            primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
                                        />
                                        {item.hasSubmenu && (item.isOpen ? <BiChevronDown /> : <BiChevronRight />)}
                                        {item.hasArrow && <BiChevronRight style={{ opacity: 0.5 }} />}
                                    </>
                                )}
                            </ListItemButton>
                        </ListItem>

                        {/* Submenu */}
                        {!collapsed && item.hasSubmenu && (
                            <Collapse in={item.isOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {item.children.map((child, idx) => {
                                        const isActive = location.pathname === child.path;
                                        return (
                                            <ListItemButton
                                                key={idx}
                                                component={Link}
                                                to={child.path || '#'}
                                                sx={{
                                                    pl: 9,
                                                    py: 1,
                                                    color: isActive ? '#fff' : '#c0beea',
                                                    '&:hover': { color: '#fff' }
                                                }}
                                            >
                                                <ListItemText
                                                    primary={child.name}
                                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 400 }}
                                                />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </Collapse>
                        )}
                    </React.Fragment>
                ))}
            </List>

            {/* Footer Text */}
            {!collapsed && (
                <Box sx={{ p: 4, textAlign: 'center', mt: 'auto', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#8d87d3' }}>
                        Akademi - School Admission Dashboard
                        <br />
                        Made with ♥ by Peterdraw
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Sidebar;
