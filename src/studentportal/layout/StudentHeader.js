import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Stack,
  Paper
} from "@mui/material";
import {
  BiMenu,
  BiBell,
  BiMoon,
  BiMessageDetail,
  BiFullscreen,
  BiCog
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { config } from "../../config/Config";
import { useThemeContext } from "../../context/ThemeContext";

const StudentHeader = ({ toggleSidebar, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { toggleColorMode } = useThemeContext();
  const [, , removeCookie] = useCookies([config.cookieName]);

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [msgAnchor, setMsgAnchor] = useState(null);
  const [notiAnchor, setNotiAnchor] = useState(null);

  const handleLogout = () => {
    removeCookie(config.cookieName, { path: "/" });
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid rgba(0,0,0,0.05)"
      }}
    >
      <Toolbar sx={{ px: 3 }}>

        {/* Sidebar Toggle */}
        <IconButton onClick={handleDrawerToggle} sx={{ mr: 1 }}>
          <BiMenu size={22} />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} alignItems="center">

          {/* Dark Mode */}
          <IconButton onClick={toggleColorMode}
            sx={{ bgcolor: "action.hover", borderRadius: "12px" }}>
            <BiMoon />
          </IconButton>

          {/* Fullscreen */}
          <IconButton onClick={toggleFullscreen}
            sx={{ bgcolor: "action.hover", borderRadius: "12px" }}>
            <BiFullscreen />
          </IconButton>

          {/* Messages */}
          <IconButton
            onClick={(e) => setMsgAnchor(e.currentTarget)}
            sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
          >
            <Badge badgeContent={3} color="primary">
              <BiMessageDetail />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={msgAnchor}
            open={Boolean(msgAnchor)}
            onClose={() => setMsgAnchor(null)}
          >
            <MenuItem onClick={() => { navigate("/student/messages"); setMsgAnchor(null); }}>
              View Messages
            </MenuItem>
          </Menu>

          {/* Notifications */}
          <IconButton
            onClick={(e) => setNotiAnchor(e.currentTarget)}
            sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
          >
            <Badge badgeContent={2} color="error">
              <BiBell />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notiAnchor}
            open={Boolean(notiAnchor)}
            onClose={() => setNotiAnchor(null)}
          >
            <MenuItem onClick={() => { navigate("/student/notifications"); setNotiAnchor(null); }}>
              View Notifications
            </MenuItem>
          </Menu>

          {/* Settings */}
          <IconButton
            onClick={() => navigate("/student/settings")}
            sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
          >
            <BiCog />
          </IconButton>

          {/* Profile Avatar Only */}
          <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              sx={{ width: 40, height: 40, borderRadius: "12px" }}
            />
          </IconButton>

          {/* Profile Dropdown (Large Styled Like Image 2) */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            PaperProps={{
              sx: {
                width: 260,
                borderRadius: "18px",
                p: 2
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                sx={{ width: 50, height: 50, mr: 2 }}
              />
              <Box>
                <Typography fontWeight={700}>
                  Rahul Sharma
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  Class 5-A
                </Typography>
              </Box>
            </Box>

            <Divider />

            <MenuItem onClick={() => navigate("/student/profile")}>
              My Profile
            </MenuItem>

            <MenuItem onClick={() => navigate("/student/messages")}>
              Message
            </MenuItem>

            <MenuItem onClick={() => navigate("/student/notifications")}>
              Notification
            </MenuItem>

            <MenuItem onClick={() => navigate("/student/settings")}>
              Settings
            </MenuItem>

            <Divider sx={{ my: 1 }} />

            <MenuItem
              onClick={handleLogout}
              sx={{ color: "error.main", fontWeight: 600 }}
            >
              Logout
            </MenuItem>
          </Menu>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default StudentHeader;