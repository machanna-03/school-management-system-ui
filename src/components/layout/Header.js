import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    IconButton,
    Badge,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Button,
} from "@mui/material";

import {
    BiSearch,
    BiGridAlt,
    BiMoon,
    BiFullscreen,
    BiMessageDetail,
    BiBell,
    BiCog,
    BiChevronRight,
    BiUser,
    BiLogOut,
    BiMenu,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { config } from '../../config/Config';

import { useThemeContext } from '../../context/ThemeContext';
import { MessagesPopover, NotificationsPopover } from './HeaderPopovers';

const Header = ({ toggleSidebar, collapsed, handleDrawerToggle }) => {
    const { toggleColorMode } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [messagesAnchorEl, setMessagesAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const open = Boolean(anchorEl);
    const openMessages = Boolean(messagesAnchorEl);
    const openNotifications = Boolean(notificationsAnchorEl);

    const navigate = useNavigate();
    const [, , removeCookie] = useCookies([config.cookieName]);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setMessagesAnchorEl(null);
        setNotificationsAnchorEl(null);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Box
            component="header"
            sx={{
                height: 56,
                minHeight: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 2, md: 2 },
                bgcolor: 'background.paper',
                color: 'text.primary',
                transition: 'all 0.3s'
            }}
        >
            {/* Left */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: { xs: 0, md: 2 } }}>
                <IconButton onClick={handleDrawerToggle} sx={{ p: 0.5, display: { md: 'none' }, color: "inherit" }}>
                    <BiMenu size={26} />
                </IconButton>
                <IconButton onClick={toggleSidebar} sx={{ p: 0.5, display: { xs: 'none', md: 'inline-flex' }, color: "inherit" }}>
                    {collapsed ? <BiChevronRight size={26} /> : <BiGridAlt size={26} />}
                </IconButton>
                <Typography sx={{ fontWeight: 700, fontSize: 20, color: "text.primary", lineHeight: 1 }}>Menu</Typography>
            </Box>

            {/* Right */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                {/* Search */}
                {isSearchOpen ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'action.hover', borderRadius: '20px', px: 2, py: 0.5 }}>
                        <BiSearch size={20} color="inherit" />
                        <input
                            autoFocus
                            placeholder="Search..."
                            style={{ border: 'none', outline: 'none', background: 'transparent', marginLeft: '8px', width: '150px', color: 'inherit' }}
                            onBlur={() => setIsSearchOpen(false)}
                        />
                    </Box>
                ) : (
                    <IconButton onClick={() => setIsSearchOpen(true)} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                        <BiSearch />
                    </IconButton>
                )}

                {/* Apps Grid - Placeholder */}
                <IconButton sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <BiGridAlt />
                </IconButton>

                {/* Dark Mode */}
                <IconButton onClick={toggleColorMode} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <BiMoon />
                </IconButton>

                {/* Fullscreen */}
                <IconButton onClick={toggleFullscreen} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <BiFullscreen />
                </IconButton>

                {/* Messages */}
                <IconButton onClick={(e) => setMessagesAnchorEl(e.currentTarget)} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <Badge badgeContent={3} color="primary">
                        <BiMessageDetail />
                    </Badge>
                </IconButton>
                <MessagesPopover anchorEl={messagesAnchorEl} open={openMessages} onClose={handleClose} />

                {/* Notifications */}
                <IconButton onClick={(e) => setNotificationsAnchorEl(e.currentTarget)} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <Badge badgeContent={5} color="warning">
                        <BiBell />
                    </Badge>
                </IconButton>
                <NotificationsPopover anchorEl={notificationsAnchorEl} open={openNotifications} onClose={handleClose} />

                {/* Settings */}
                <IconButton onClick={() => navigate('/settings')} sx={{ p: 0.5, bgcolor: 'background.default', color: "text.secondary", width: 40, height: 40, borderRadius: "12px", "&:hover": { bgcolor: "action.hover" } }}>
                    <BiCog />
                </IconButton>

                {/* Avatar */}
                <IconButton sx={{ p: 0.5 }} onClick={handleAvatarClick}>
                    <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" sx={{ width: 40, height: 40, borderRadius: "12px" }} />
                </IconButton>

                {/* Profile Menu (Existing) */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ sx: { width: 260, borderRadius: "18px", p: 2, mt: 1 } }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" sx={{ width: 50, height: 50 }} />
                        <Box>
                            <Typography fontWeight={700}>Nella Vita</Typography>
                            <Typography fontSize={13} color="text.secondary">Admin</Typography>
                        </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={() => navigate('/profile')}><BiUser size={18} style={{ marginRight: 10 }} /> Profile</MenuItem>
                    <MenuItem><BiMessageDetail size={18} style={{ marginRight: 10 }} /> Message</MenuItem>
                    <MenuItem component={Link} to="/notifications"><BiBell size={18} style={{ marginRight: 10 }} /> Notification</MenuItem>
                    <MenuItem><BiCog size={18} style={{ marginRight: 10 }} /> Settings</MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <Button fullWidth startIcon={<BiLogOut />} onClick={() => { removeCookie(config.cookieName, { path: '/' }); localStorage.removeItem('userInfo'); window.location.href = '/login'; }} sx={{ bgcolor: "#f3f4ff", color: "#5b5fe3", borderRadius: "12px", textTransform: "none", fontWeight: 600, py: 1 }}>Logout</Button>
                </Menu>
            </Box>
        </Box>
    );
};

export default Header;
