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
    Stack
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

const ParentHeader = ({ toggleSidebar, handleDrawerToggle }) => {
    const navigate = useNavigate();
    const { toggleColorMode } = useThemeContext();
    const [, , removeCookie] = useCookies([config.cookieName]);

    const [profileAnchor, setProfileAnchor] = useState(null);
    const [msgAnchor, setMsgAnchor] = useState(null);
    const [notiAnchor, setNotiAnchor] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const parentName = userInfo.name || "Parent";

    const handleLogout = () => {
        removeCookie(config.cookieName, { path: "/" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("sms-data");
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
                    <IconButton
                        onClick={toggleColorMode}
                        sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
                    >
                        <BiMoon />
                    </IconButton>

                    {/* Fullscreen */}
                    <IconButton
                        onClick={toggleFullscreen}
                        sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
                    >
                        <BiFullscreen />
                    </IconButton>

                    {/* Messages */}
                    <IconButton
                        onClick={(e) => setMsgAnchor(e.currentTarget)}
                        sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
                    >
                        <Badge badgeContent={2} color="primary">
                            <BiMessageDetail />
                        </Badge>
                    </IconButton>

                    <Menu
                        anchorEl={msgAnchor}
                        open={Boolean(msgAnchor)}
                        onClose={() => setMsgAnchor(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                navigate("/parent/messages");
                                setMsgAnchor(null);
                            }}
                        >
                            View Messages
                        </MenuItem>
                    </Menu>

                    {/* Notifications */}
                    <IconButton
                        onClick={(e) => setNotiAnchor(e.currentTarget)}
                        sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
                    >
                        <Badge badgeContent={3} color="error">
                            <BiBell />
                        </Badge>
                    </IconButton>

                    <Menu
                        anchorEl={notiAnchor}
                        open={Boolean(notiAnchor)}
                        onClose={() => setNotiAnchor(null)}
                    >
                        <MenuItem
                            onClick={() => {
                                navigate("/parent/notifications");
                                setNotiAnchor(null);
                            }}
                        >
                            View Notifications
                        </MenuItem>
                    </Menu>

                    {/* Settings */}
                    <IconButton
                        onClick={() => navigate("/parent/settings")}
                        sx={{ bgcolor: "action.hover", borderRadius: "12px" }}
                    >
                        <BiCog />
                    </IconButton>

                    {/* Avatar Only */}
                    <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "12px",
                                bgcolor: "#4d44b5"
                            }}
                            src="/static/images/avatar/1.jpg"
                        >
                            {parentName.charAt(0)}
                        </Avatar>
                    </IconButton>

                    {/* Large Profile Dropdown */}
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
                                sx={{ width: 50, height: 50, mr: 2, bgcolor: "#4d44b5" }}
                            >
                                {parentName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography fontWeight={700}>
                                    {parentName}
                                </Typography>
                                <Typography fontSize={13} color="text.secondary">
                                    Parent
                                </Typography>
                            </Box>
                        </Box>

                        <Divider />

                        <MenuItem onClick={() => navigate("/parent/profile")}>
                            My Profile
                        </MenuItem>

                        <MenuItem onClick={() => navigate("/parent/messages")}>
                            Message
                        </MenuItem>

                        <MenuItem onClick={() => navigate("/parent/notifications")}>
                            Notification
                        </MenuItem>

                        <MenuItem onClick={() => navigate("/parent/settings")}>
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

export default ParentHeader;