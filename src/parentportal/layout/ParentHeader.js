import React from 'react';
import { Box, IconButton, AppBar, Toolbar, Typography, Avatar, Badge, Menu, MenuItem, Stack } from '@mui/material';
import { BiMenu, BiBell, BiSearch, BiChevronDown } from 'react-icons/bi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/Config';

const ParentHeader = ({ collapsed, toggleSidebar, handleDrawerToggle }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([config.cookieName]);

    const handleLogout = () => {
        handleMenuClose();
        removeCookie(config.cookieName, { path: '/' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('sms-data');
        navigate('/login');
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: '#333'
            }}
        >

            <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
                {/* Mobile Menu
                 Button */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <BiMenu />
                </IconButton>

                {/* Desktop Sidebar Toggle */}
                <IconButton
                    color="inherit"
                    onClick={toggleSidebar}
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                >
                    <BiMenu size={24} />
                </IconButton>

                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Notifications */}
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={3} color="error">
                            <BiBell size={22} />
                        </Badge>
                    </IconButton>

                    {/* Profile Section */}
                    <Box
                        onClick={handleProfileMenuOpen}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            p: 0.5,
                            borderRadius: 2,
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                        }}
                    >
                        <Avatar
                            sx={{ width: 36, height: 36, mr: 1, bgcolor: '#4d44b5' }}
                            alt="Parent Name"
                            src="/static/images/avatar/1.jpg"
                        >
                            Mr
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                Mr. Sharma
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Parent
                            </Typography>
                        </Box>
                        <BiChevronDown size={20} style={{ marginLeft: 4, color: '#888' }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default ParentHeader;
