import React, { useState } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Collapse,
    Drawer,
    IconButton
} from "@mui/material";
import {
    BiHomeAlt,
    BiUser,
    BiBook,
    BiCalendarCheck,
    BiMoney,
    BiMessageDetail,
    BiTime,
    BiExtension,
    BiChevronRight,
    BiChevronDown,
    BiLogOut,
    BiX,
    BiShieldQuarter,
    BiBus,
    BiMale,
    BiGridAlt,
    BiBell
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assests/GMs-logo.png";

const sidebarWidth = 280;

const ParentSidebar = ({ collapsed, mobileOpen, handleDrawerToggle }) => {
    const location = useLocation();

    // State for submenus
    const [openChildren, setOpenChildren] = useState(true);
    const [openAcademics, setOpenAcademics] = useState(false);
    const [openSchoolLife, setOpenSchoolLife] = useState(false);
    const [openFinance, setOpenFinance] = useState(false);
    const [openCommunication, setOpenCommunication] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const menuItems = [
        {
            header: "MAIN MENU",
            items: [
                {
                    name: "Dashboard",
                    icon: <BiHomeAlt />,
                    path: "/parent/dashboard",
                },
                {
                    name: "My Children",
                    icon: <BiUser />,
                    hasSubmenu: true,
                    isOpen: openChildren,
                    onClick: () => setOpenChildren(!openChildren),
                    children: [
                        { name: "Rahul Sharma (5-A)", path: "/parent/children/rahul" },
                        { name: "Priya Sharma (2-B)", path: "/parent/children/priya" },
                    ],
                },
            ],
        },
        {
            header: "ACADEMICS",
            items: [
                {
                    name: "Performance",
                    icon: <BiGridAlt />, // Using generic grid for performance 
                    path: "/parent/performance",
                },
                {
                    name: "Report Cards",
                    icon: <BiExtension />, // Placeholder
                    path: "/parent/report-cards",
                },
                {
                    name: "Achievements",
                    icon: <BiCalendarCheck />,
                    path: "/parent/achievements"
                },
                {
                    name: "Exam Schedule",
                    icon: <BiTime />,
                    path: "/parent/exam-schedule"
                },
                {
                    name: "Homework",
                    icon: <BiBook />,
                    path: "/parent/homework"
                }
            ],
        },
        {
            header: "SCHOOL LIFE",
            items: [
                { name: "Timetable", icon: <BiTime />, path: "/parent/timetable" },
                { name: "Attendance", icon: <BiCalendarCheck />, path: "/parent/attendance" },
                { name: "Leave Applications", icon: <BiMessageDetail />, path: "/parent/leave" },
                { name: "Transport", icon: <BiBus />, path: "/parent/transport" },
                { name: "Meal Plan", icon: <BiExtension />, path: "/parent/meals" },
            ]
        },
        {
            header: "FINANCE",
            items: [
                { name: "Fee Details", icon: <BiMoney />, path: "/parent/fees" },
                { name: "Payment History", icon: <BiExtension />, path: "/parent/payments" },
                { name: "Generate Receipt", icon: <BiExtension />, path: "/parent/receipts" },
                { name: "Quick Pay", icon: <BiExtension />, path: "/parent/quickpay" },
            ]
        },
        {
            header: "COMMUNICATION",
            items: [
                { name: "Teachers", icon: <BiMale />, path: "/parent/teachers" },
                { name: "School Office", icon: <BiHomeAlt />, path: "/parent/office" },
                { name: "Messages", icon: <BiMessageDetail />, path: "/parent/messages" },
                { name: "Announcements", icon: <BiBell />, path: "/parent/announcements" },
            ]
        },
        {
            header: "SETTINGS",
            items: [
                { name: "Profile", icon: <BiUser />, path: "/parent/profile" },
                { name: "Security", icon: <BiShieldQuarter />, path: "/parent/security" },
                { name: "Notifications", icon: <BiBell />, path: "/parent/notifications" },
                { name: "Help & Support", icon: <BiExtension />, path: "/parent/help" },
            ]
        }
    ];

    const sidebarContent = (
        <Box
            sx={{
                width: collapsed ? 80 : sidebarWidth,
                height: "100%",
                bgcolor: "#4d44b5", // Matched with Dashboard Sidebar
                color: "#c0beea", // Matched text color
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                overflowX: "hidden",
                "&::-webkit-scrollbar": { width: 0 },
                scrollbarWidth: "none",
            }}
        >
            {/* Logo Section */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: collapsed ? 2.5 : 3,
                    minHeight: 90,
                    transition: "padding 0.3s",
                }}
            >
                <Box
                    sx={{
                        width: collapsed ? 40 : 64,
                        height: collapsed ? 40 : 64,
                        bgcolor: "#fefefe",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 10px rgba(251, 125, 91, 0.4)",
                        flexShrink: 0,
                        overflow: "hidden",
                    }}
                >
                    {/* Try to use the same logo image if available, else fallback to text/icon */}
                    <Box component="img" src={logo} alt="logo" sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </Box>

                {!collapsed && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                            GetMySchool
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#fb7d5b", fontWeight: 600, letterSpacing: 1 }}>
                            PARENT PORTAL
                        </Typography>
                    </Box>
                )}
                {mobileOpen && (
                    <IconButton onClick={handleDrawerToggle} sx={{ ml: 'auto', color: 'white' }}>
                        <BiX />
                    </IconButton>
                )}
            </Box>

            {/* Navigation List */}
            <List sx={{ px: 2, pb: 4 }}>
                {menuItems.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                        {/* Section Header */}
                        {!collapsed && (
                            <Typography
                                variant="caption"
                                sx={{
                                    display: 'block',
                                    pl: 2,
                                    mt: 2,
                                    mb: 1,
                                    color: 'rgba(255,255,255,0.5)',
                                    fontWeight: 700,
                                    letterSpacing: '0.5px'
                                }}
                            >
                                {section.header}
                            </Typography>
                        )}

                        {/* Menu Items */}
                        {section.items.map((item, index) => (
                            <React.Fragment key={item.name}>
                                <ListItem disablePadding sx={{ mb: 0.5, display: "block" }}>
                                    <ListItemButton
                                        onClick={item.onClick ? item.onClick : undefined}
                                        component={item.onClick ? "div" : Link}
                                        to={item.onClick ? undefined : (item.path || "#")}
                                        sx={{
                                            borderRadius: "0 50px 50px 0",
                                            ml: -2,
                                            pl: 4,
                                            px: 2,
                                            py: 1, // Slightly tighter vertical padding
                                            justifyContent: collapsed ? "center" : "initial",
                                            color: location.pathname === item.path ? "#fff" : "#c0beea",
                                            bgcolor: location.pathname === item.path ? "rgba(255,255,255,0.1)" : "transparent",
                                            "&:hover": {
                                                bgcolor: "rgba(255,255,255,0.05)",
                                                color: "#fff",
                                            },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                color: "inherit",
                                                minWidth: 34,
                                                fontSize: 22,
                                                justifyContent: "center",
                                                mr: collapsed ? 0 : 2,
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <>
                                                <ListItemText
                                                    primary={item.name}
                                                    primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                                                />
                                                {item.hasSubmenu &&
                                                    (item.isOpen ? <BiChevronDown /> : <BiChevronRight />)}
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
                                                        to={child.path || "#"}
                                                        sx={{
                                                            pl: 9,
                                                            py: 0.8,
                                                            color: isActive ? "#fff" : "#c0beea",
                                                            "&:hover": { color: "#fff" },
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={child.name}
                                                            primaryTypographyProps={{
                                                                fontSize: 13,
                                                                fontWeight: 400,
                                                            }}
                                                        />
                                                    </ListItemButton>
                                                );
                                            })}
                                        </List>
                                    </Collapse>
                                )}
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </List>

            {/* Logout at bottom */}
            <Box sx={{ mt: 'auto', p: 2 }}>
                <ListItemButton
                    sx={{
                        borderRadius: "12px",
                        justifyContent: collapsed ? "center" : "initial",
                        color: "#ff8a80", // Light red
                        "&:hover": { bgcolor: "rgba(255, 138, 128, 0.1)" },
                    }}
                >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 34, fontSize: 24, justifyContent: "center", mr: collapsed ? 0 : 2 }}>
                        <BiLogOut />
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary="Logout" />}
                </ListItemButton>
            </Box>

        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: collapsed ? 80 : sidebarWidth }, flexShrink: { md: 0 } }}>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: sidebarWidth },
                }}
            >
                {sidebarContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: collapsed ? 80 : sidebarWidth,
                        boxSizing: "border-box",
                        borderRight: "none",
                        bgcolor: "#4d44b5"
                    },
                }}
            >
                {sidebarContent}
            </Drawer>
        </Box>
    );
};

export default ParentSidebar;
