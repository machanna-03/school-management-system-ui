import React from 'react';
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
    Badge
} from '@mui/material';
import { BiCheckDouble, BiMessageDetail, BiBell } from 'react-icons/bi';

const mockMessages = [
    {
        id: 1,
        sender: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        message: "Are you available for a quick meeting?",
        time: "2m ago",
        unread: true
    },
    {
        id: 2,
        sender: "David Smith",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        message: "I've sent the report you asked for.",
        time: "15m ago",
        unread: false
    },
    {
        id: 3,
        sender: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        message: "Thanks for your help!",
        time: "1h ago",
        unread: false
    }
];

const mockNotifications = [
    {
        id: 1,
        title: "New Exam Scheduled",
        description: "Math Midterm has been scheduled for tomorrow.",
        time: "10m ago",
        type: "exam",
        unread: true
    },
    {
        id: 2,
        title: "Fee Payment Received",
        description: "Payment of $500 confirmed.",
        time: "2h ago",
        type: "finance",
        unread: false
    },
    {
        id: 3,
        title: "System Update",
        description: "System maintenance at midnight.",
        time: "5h ago",
        type: "system",
        unread: false
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
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="caption" sx={{ bgcolor: 'primary.main', color: 'white', px: 1, borderRadius: 1 }}>5 New</Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{ p: 0 }}>
                {mockNotifications.map((notif) => (
                    <React.Fragment key={notif.id}>
                        <ListItem alignItems="flex-start" button onClick={onClose} sx={{ bgcolor: notif.unread ? 'action.hover' : 'transparent' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: notif.type === 'exam' ? 'error.light' : notif.type === 'finance' ? 'success.light' : 'info.light', color: 'white' }}>
                                    {notif.type === 'exam' ? <BiCheckDouble /> : notif.type === 'finance' ? '$' : <BiBell />}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="subtitle2" fontWeight={600}>{notif.title}</Typography>
                                        <Typography variant="caption" color="text.secondary">{notif.time}</Typography>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {notif.description}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <Button fullWidth size="small" sx={{ textTransform: 'none' }}>View All Notifications</Button>
            </Box>
        </Menu>
    );
};
