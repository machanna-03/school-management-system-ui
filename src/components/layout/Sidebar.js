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
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  BiHomeAlt,
  BiUser,
  BiChalkboard,
  BiBook,
  BiBookContent,
  BiCalendarCheck,
  BiBuilding,
  BiBarChart,
  BiTime,
  BiChevronRight,
  BiChevronDown,
  BiUserPlus,
  BiX,
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/GMs-logo.png";

const sidebarWidth = 280;

const Sidebar = ({ collapsed, mobileOpen, handleDrawerToggle }) => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openClasses, setOpenClasses] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openTimeTable, setOpenTimeTable] = useState(false);
  const [openAdmission, setOpenAdmission] = useState(false);
  const [openExamSchedule, setOpenExamSchedule] = useState(false);
  const [openGrades, setOpenGrades] = useState(false);
  const [openClassroom, setOpenClassroom] = useState(false);

  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Tablet portrait & Mobile (< 900px)

  const menuItems = [
    {
      name: "Dashboard",
      icon: <BiHomeAlt />,
      hasSubmenu: true,
      isOpen: openDashboard,
      onClick: () => setOpenDashboard(!openDashboard),
      children: [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Admin Dashboard", path: "/dashboard" },
      ],
    },
    {
      name: "Student",
      icon: <BiUser />,
      hasSubmenu: true,
      isOpen: openStudent,
      onClick: () => setOpenStudent(!openStudent),
      children: [
        { name: "All Students", path: "/students" },
        { name: "Student Details", path: "/students/details" },
        { name: "Add New Student", path: "/students/add" },
      ],
    },
    {
      name: "Teacher",
      icon: <BiChalkboard />,
      isOpen: openTeacher,
      hasSubmenu: true,
      onClick: () => setOpenTeacher(!openTeacher),
      children: [
        { name: "All Teachers", path: "/teachers" },
        { name: "Teacher Details", path: "/teachers/details" },
        { name: "Add New Teacher", path: "/teachers/add" },
      ],
    },

    {
      name: "Classes",
      icon: <BiBookContent />,
      hasSubmenu: true,
      isOpen: openClasses,
      onClick: () => setOpenClasses(!openClasses),
      children: [
        { name: "All Classes", path: "/classes" },
        { name: "Add New Class", path: "/classes/add" },
        { name: "Assign Class to Teacher", path: "/classes/assign" },
      ],
    },
    {
      name: "Subjects",
      icon: <BiBook />,
      hasSubmenu: true,
      isOpen: openSubjects,
      onClick: () => setOpenSubjects(!openSubjects),
      children: [
        { name: "All Subjects", path: "/subjects" },
        { name: "Add New Subject", path: "/subjects/add" },
        { name: "Assign Subject to Teacher", path: "/subjects/assign" },
        { name: "Assign Subject to Class", path: "/subjects/class" },
      ],
    },
    {
      name: "Attendance",
      icon: <BiCalendarCheck />,
      hasSubmenu: true,
      isOpen: openAttendance,
      onClick: () => setOpenAttendance(!openAttendance),
      children: [
        { name: "Attendance Dashboard", path: "/attendance" },
        { name: "Student Attendance", path: "/attendance/student" },
        { name: "Teacher Attendance", path: "/attendance/teacher" },
      ],
    },
    {
      name: "Time Table",
      icon: <BiTime />,
      hasSubmenu: true,
      isOpen: openTimeTable,
      onClick: () => setOpenTimeTable(!openTimeTable),
      children: [{ name: "View Time Table", path: "/timetable" }],
    },
    {
      name: "Admission",
      icon: <BiUserPlus />,
      hasSubmenu: true,
      isOpen: openAdmission,
      onClick: () => setOpenAdmission(!openAdmission),
      children: [
        { name: "Admission", path: "/admission" },
        { name: "Application Form", path: "/admission/application-form" },
        { name: "Application List", path: "/admission/application-list" }
      ],
    },
     {
      name: "Exam Schedule",
      icon: <BiCalendarCheck />,
      hasSubmenu: true,
      isOpen: openExamSchedule,
      onClick: () => setOpenExamSchedule(!openExamSchedule),
      children: [
        { name: "Create Exam ", path: "/create-exam" },
        { name: "Exam Timetable", path: "/exam-timetable" },
        { name: "Student Exam Marks", path: "/exam-marks  " },
        { name: "Student Exam Marks History", path: "/exam-history" }
      ],
    },
    {
      name: "Classroom",
      path: "/classroom",
      icon: <BiBuilding />,
    },
    {
      name: "Grades",
      path: "/grades",
      icon: <BiBarChart />,
    },

  ];

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#4d44b5",
        color: "#c0beea",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: 0,
        },
        scrollbarWidth: "none",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: collapsed && !isMobile ? 2.5 : 3, // Adjust padding when collapsed on desktop
          minHeight: 90,
          transition: "padding 0.3s",
        }}
      >
        <Box
          sx={{
            width: collapsed && !isMobile ? 40 : 64,
            height: collapsed && !isMobile ? 40 : 64,
            bgcolor: "#fefefe",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(251, 125, 91, 0.4)",
            flexShrink: 0,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {(!collapsed || isMobile) && (
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#fff",
                fontSize: "24px",
                whiteSpace: "nowrap",
              }}
            >
              GetMySchool
            </Typography>
          </Box>
        )}

        {/* Close Button for Mobile */}
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: "white", ml: "auto" }}>
            <BiX />
          </IconButton>
        )}
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 2, pb: 10 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ mb: 0.5, display: "block" }}>
              <ListItemButton
                component={item.path ? Link : "button"}
                to={item.path || undefined}
                onClick={item.hasSubmenu ? item.onClick : undefined}
                sx={{
                  borderRadius: "0 50px 50px 0",
                  ml: -2,
                  pl: 4,
                  px: 2,
                  py: 1.2,
                  bgcolor:
                    location.pathname === item.path
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                  color:
                    location.pathname === item.path
                      ? "#fff"
                      : "#c0beea",
                  justifyContent: collapsed && !isMobile ? "center" : "initial",
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
                    fontSize: 24,
                    justifyContent: "center",
                    mr: collapsed && !isMobile ? 0 : 2,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {(!collapsed || isMobile) && (
                  <>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{ fontSize: 16, fontWeight: 500 }}
                    />
                    {item.hasSubmenu &&
                      (item.isOpen ? <BiChevronDown /> : <BiChevronRight />)}
                  </>
                )}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            {(!collapsed || isMobile) && item.hasSubmenu && (
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
                          py: 1,
                          color: isActive ? "#fff" : "#c0beea",
                          "&:hover": { color: "#fff" },
                        }}
                      >
                        <ListItemText
                          primary={child.name}
                          primaryTypographyProps={{
                            fontSize: 14,
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
      </List>

      {/* Footer Text */}
      {(!collapsed || isMobile) && (
        <Box sx={{ p: 4, textAlign: "center", mt: "auto", mb: 2 }}>
          <Typography variant="caption" sx={{ color: "#8d87d3" }}>
            - School Admission Dashboard
            <br />
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: collapsed ? 80 : sidebarWidth }, flexShrink: { md: 0 } }}>
      {/* Mobile / Tablet Portrait Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: sidebarWidth, border: "none" },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop / Tablet Landscape Box (Reverted from Permanent Drawer) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: collapsed ? 80 : sidebarWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          height: "100vh",
          position: "fixed", // Keeping it fixed to ensure it stays in place
          top: 0,
          left: 0,
          borderRight: "none",
          bgcolor: "#4d44b5",
          zIndex: 1200
        }}
      >
        {drawerContent}
      </Box>
    </Box>
  );
};

export default Sidebar;
