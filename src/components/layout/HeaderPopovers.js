import React, { useState, useEffect } from 'react';
import {
    Menu,
    MenuItem,
    Typography,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Button,
    Badge,
    CircularProgress
} from '@mui/material';
import { BiCheckDouble, BiMessageDetail, BiBell } from 'react-icons/bi';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

// Messages are still mock for now as we don't have a chat system yet
const mockMessages = [
    {
        id: 1,
        sender: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        message: "Are you available for a quick meeting?",
        time: "2m ago",
        unread: true
    }
];

export const MessagesPopover = ({ anchorEl, open, onClose }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 320,
                    maxHeight: 400,
                    borderRadius: "16px",
                    mt: 1.5,
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
                }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Messages</Typography>
                <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontWeight: 600 }}>Mark all read</Typography>
            </Box>
            <Divider />
            <List sx={{ p: 0 }}>
                {mockMessages.map((msg) => (
                    <React.Fragment key={msg.id}>
                        <ListItem alignItems="flex-start" button onClick={onClose} sx={{ bgcolor: msg.unread ? 'action.hover' : 'transparent' }}>
                            <ListItemAvatar>
                                <Badge color="success" variant="dot" overlap="circular" invisible={!msg.unread} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                    <Avatar src={msg.avatar} alt={msg.sender} />
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>{msg.sender}</Typography>
                                        <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ display: 'block' }}>
                                        {msg.message}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <Button fullWidth size="small" sx={{ textTransform: 'none' }}>View All Messages</Button>
            </Box>
        </Menu>
    );
};

export const NotificationsPopover = ({ anchorEl, open, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchNotifications();
        }
    }, [open]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await invokeGetApi(config.getMySchool + apiList.getAnnouncements);
            if (res.status === 200 && res.data?.responseCode === "200") {
                setNotifications(res.data.announcements || []);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getTimeAgo = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: 360,
                    maxHeight: 450,
                    borderRadius: "16px",
                    mt: 1.5,
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.1)"
                }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Notifications</Typography>
                {notifications.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>{notifications.length} New</Typography>
                    </Box>
                )}
            </Box>
            <Divider />
            <Box sx={{ maxHeight: 350, overflowY: 'auto' }}>
                {loading ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress size={24} /></Box>
                ) : notifications.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="body2" color="text.secondary">No new notifications</Typography></Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {notifications.map((notif) => (
                            <React.Fragment key={notif.id}>
                                <ListItem alignItems="flex-start" button onClick={onClose}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#4d44b522', color: '#4d44b5' }}>
                                            <BiBell />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="subtitle2" fontWeight={600}>{notif.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{getTimeAgo(notif.created_at)}</Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {notif.content}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Box>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <Button fullWidth size="small" sx={{ textTransform: 'none' }}>View All Notifications</Button>
            </Box>
        </Menu>
    );
};
