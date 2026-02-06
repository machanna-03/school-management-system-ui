import React, { useState } from "react";
import {
    Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    Typography, Collapse, Drawer, IconButton
} from "@mui/material";
import {
    BiHomeAlt, BiBook, BiCalendarCheck, BiTime, BiCheckCircle,
    BiBarChartAlt2, BiMessageDetail, BiLogOut, BiX, BiChevronDown, BiChevronRight
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assests/GMs-logo.png";

const sidebarWidth = 280;

const StudentSidebar = ({ collapsed, mobileOpen, handleDrawerToggle }) => {
    const location = useLocation();

    // State for submenus if needed (keeping structure consistent)
    const [openClasses, setOpenClasses] = useState(false);

    const menuItems = [
        {
            header: "MAIN MENU",
            items: [
                {
                    name: "Dashboard",
                    icon: <BiHomeAlt />,
                    path: "/student/dashboard",
                },
                {
                    name: "My Timetable",
                    icon: <BiTime />,
                    path: "/student/timetable"
                },
                {
                    name: "Attendance",
                    icon: <BiCalendarCheck />,
                    path: "/student/attendance"
                }
            ],
        },
        {
            header: "ACADEMICS",
            items: [
                {
                    name: "My Classes",
                    icon: <BiBook />,
                    path: "/student/classes"
                },
                {
                    name: "Homework",
                    icon: <BiBook />,
                    path: "/student/homework"
                },
                {
                    name: "Exam Schedule",
                    icon: <BiTime />,
                    path: "/student/exams"
                },
                {
                    name: "Results",
                    icon: <BiBarChartAlt2 />,
                    path: "/student/results"
                }
            ],
        },
        {
            header: "COMMUNICATION",
            items: [
                { name: "Messages", icon: <BiMessageDetail />, path: "/student/messages" },
            ]
        }
    ];

    const sidebarContent = (
        <Box
            sx={{
                width: collapsed ? 80 : sidebarWidth,
                height: "100%",
                bgcolor: "#4d44b5",
                color: "#c0beea",
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
                    <Box component="img" src={logo} alt="logo" sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </Box>

                {!collapsed && (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff", lineHeight: 1 }}>
                            GetMySchool
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#fb7d5b", fontWeight: 600, letterSpacing: 1 }}>
                            STUDENT PORTAL
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

                        {section.items.map((item, index) => (
                            <React.Fragment key={item.name}>
                                <ListItem disablePadding sx={{ mb: 0.5, display: "block" }}>
                                    <ListItemButton
                                        component={Link}
                                        to={item.path || "#"}
                                        sx={{
                                            borderRadius: "0 50px 50px 0",
                                            ml: -2,
                                            pl: 4,
                                            px: 2,
                                            py: 1,
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
                                            <ListItemText
                                                primary={item.name}
                                                primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                                            />
                                        )}
                                    </ListItemButton>
                                </ListItem>
                            </React.Fragment>
                        ))}
                    </React.Fragment>
                ))}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <ListItemButton
                    sx={{
                        borderRadius: "12px",
                        justifyContent: collapsed ? "center" : "initial",
                        color: "#ff8a80",
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

export default StudentSidebar;
