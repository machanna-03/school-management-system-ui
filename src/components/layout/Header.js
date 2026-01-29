import React from 'react';
import { Box, IconButton, Badge, Typography, Avatar, Stack } from '@mui/material';
import { BiSearch, BiGridAlt, BiMoon, BiFullscreen, BiMessageDetail, BiBell, BiCog, BiChevronRight } from 'react-icons/bi';

const Header = ({ toggleSidebar, collapsed }) => {
    const actionIcons = [
        { icon: <BiSearch />, badge: false },
        { icon: <BiGridAlt />, badge: false },
        { icon: <BiMoon />, badge: false },
        { icon: <BiFullscreen />, badge: false },
        { icon: <BiMessageDetail />, badge: 5, color: 'primary' },
        { icon: <BiBell />, badge: 25, color: 'warning' },
        { icon: <BiCog />, badge: false },
    ];

    return (
        <Box
            component="header"
            sx={{
                height: 90, // Match sidebar logo area height
                bgcolor: 'transparent', // Transparent to show body bg? Or matches body bg.
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 5,
            }}
        >
            {/* Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={toggleSidebar}>
                    {collapsed ? <BiChevronRight size={30} color="#3d4465" /> : <BiGridAlt size={30} color="#3d4465" />}
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#3d4465', fontSize: '24px' }}>
                    Dashboard
                </Typography>
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Stack direction="row" spacing={2}>
                    {actionIcons.map((item, index) => (
                        <IconButton
                            key={index}
                            sx={{
                                bgcolor: '#fff',
                                color: '#a1a5b7',
                                width: 48,
                                height: 48,
                                borderRadius: '14px',
                                '&:hover': { bgcolor: '#f8f9fa', transform: 'translateY(-2px)' },
                                transition: 'all 0.2s',
                                fontSize: 24
                            }}
                        >
                            {item.badge ? (
                                <Badge badgeContent={item.badge} color={item.color || 'error'} sx={{ '& .MuiBadge-badge': { fontSize: 9, minWidth: 15, height: 15, p: 0 } }}>
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )}
                        </IconButton>
                    ))}
                </Stack>

                {/* Profile */}
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        cursor: 'pointer',
                        ml: 1
                    }}
                >
                    <Avatar
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '14px' // Rounded square
                        }}
                    >
                        NA
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
