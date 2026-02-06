import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tab, Tabs, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, TextField, InputAdornment } from '@mui/material';
import { BiMale, BiHomeAlt, BiMessageDetail, BiBell, BiCalendarEvent, BiConversation, BiSearch, BiPhone, BiEnvelope, BiTime } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

const Communication = ({ initialTab = 'teachers' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Map routes to tab values
    const getTabFromPath = (path) => {
        if (path.includes('/teachers')) return 'teachers';
        if (path.includes('/office')) return 'office';
        if (path.includes('/messages')) return 'messages';
        if (path.includes('/announcements')) return 'announcements';
        if (path.includes('/events')) return 'events';
        if (path.includes('/ptm')) return 'ptm';
        return 'teachers';
    };

    const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

    useEffect(() => {
        const tab = getTabFromPath(location.pathname);
        setActiveTab(tab);
    }, [location.pathname]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        navigate(`/parent/${newValue}`);
    };

    // --- Mock Data ---

    const teachers = [
        { id: 1, name: "Mr. Sarah Wilson", role: "Class Teacher", subject: "Mathematics", email: "sarah.wilson@school.com", phone: "+1 234 567 890" },
        { id: 2, name: "Mr. James Bond", role: "Subject Teacher", subject: "Science", email: "james.bond@school.com", phone: "+1 234 567 891" },
        { id: 3, name: "Ms. Emily Clarke", role: "Subject Teacher", subject: "English", email: "emily.clarke@school.com", phone: "+1 234 567 892" },
    ];

    const adminContacts = [
        { id: 1, department: "Principal's Office", contact: "Mrs. Anderson", email: "principal@school.com", phone: "+1 000 111 222" },
        { id: 2, department: "Accounts Department", contact: "Mr. Roberts", email: "accounts@school.com", phone: "+1 000 111 223" },
        { id: 3, department: "Transport Office", contact: "Mr. Singh", email: "transport@school.com", phone: "+1 000 111 224" },
    ];

    const messages = [
        { id: 1, sender: "Mr. Sarah Wilson", subject: "Regarding Homework Submission", date: "Today, 10:30 AM", preview: "Please ensure John submits his math homework by tomorrow...", unread: true },
        { id: 2, sender: "School Admin", subject: "Fee Payment Reminder", date: "Yesterday, 2:00 PM", preview: "This is a reminder to pay the pending tuition fees...", unread: false },
        { id: 3, sender: "Ms. Emily Clarke", subject: "English Project Update", date: "04 Feb", preview: "The topic for the English project has been finalized...", unread: false },
    ];

    const announcements = [
        { id: 1, title: "Annual Sports Day", date: "10 Feb 2024", type: "Event", description: "The Annual Sports Day will be held on 20th Feb. All parents are invited." },
        { id: 2, title: "School Holiday", date: "08 Feb 2024", type: "Urgent", description: "School will remain closed on 14th Feb due to a public holiday." },
        { id: 3, title: "Exam Schedule Released", date: "05 Feb 2024", type: "General", description: "The final term examination schedule has been uploaded to the portal." },
    ];

    const events = [
        { id: 1, title: "Science Fair", date: "25 Feb 2024", time: "09:00 AM - 02:00 PM", location: "School Auditorium", status: "Upcoming" },
        { id: 2, title: "Parent Workshop", date: "28 Feb 2024", time: "10:00 AM - 12:00 PM", location: "Conference Hall", status: "Open for RSVP" },
    ];

    const ptms = [
        { id: 1, date: "25 Jan 2024", teacher: "Mr. Sarah Wilson", status: "Completed", notes: "Discussed math performance. Needs improvement in algebra." },
        { id: 2, date: "15 Mar 2024", teacher: "All Subject Teachers", status: "Scheduled", notes: "Term 2 Review" },
    ];

    // --- Render Functions ---

    const renderTeachers = () => (
        <Grid container spacing={3}>
            {teachers.map((teacher) => (
                <Grid item xs={12} md={4} key={teacher.id}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#4d44b5' }}>{teacher.name[0]}</Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>{teacher.name}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{teacher.role} • {teacher.subject}</Typography>

                            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
                                <Button variant="outlined" startIcon={<BiEnvelope />} size="small" sx={{ borderRadius: 2 }}>Email</Button>
                                <Button variant="outlined" startIcon={<BiPhone />} size="small" sx={{ borderRadius: 2 }}>Call</Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderOffice = () => (
        <Grid container spacing={3}>
            {adminContacts.map((contact) => (
                <Grid item xs={12} md={4} key={contact.id}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>{contact.department}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <BiMale size={20} color="#A098AE" style={{ marginRight: 10 }} />
                                <Typography variant="body2">{contact.contact}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <BiEnvelope size={20} color="#A098AE" style={{ marginRight: 10 }} />
                                <Typography variant="body2">{contact.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <BiPhone size={20} color="#A098AE" style={{ marginRight: 10 }} />
                                <Typography variant="body2">{contact.phone}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderMessages = () => (
        <Grid container spacing={3} sx={{ height: 'calc(100vh - 200px)' }}>
            <Grid item xs={12} md={4} sx={{ height: '100%' }}>
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                    <CardContent sx={{ p: 2 }}>
                        <Button variant="contained" fullWidth sx={{ mb: 2, bgcolor: '#4d44b5', borderRadius: 2 }}>Compose New</Button>
                        <TextField
                            fullWidth
                            placeholder="Search messages..."
                            size="small"
                            InputProps={{ startAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment> }}
                            sx={{ mb: 2 }}
                        />
                        <List>
                            {messages.map((msg) => (
                                <Box key={msg.id}>
                                    <ListItem alignItems="flex-start" button sx={{ borderRadius: 2, bgcolor: msg.unread ? '#f0f7ff' : 'transparent' }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: msg.unread ? '#4d44b5' : '#e0e0e0' }}>{msg.sender[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: msg.unread ? 700 : 500 }}>{msg.sender}</Typography>
                                                    <Typography variant="caption" color="text.secondary">{msg.date}</Typography>
                                                </Box>
                                            }
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="text.primary" sx={{ display: 'block', mt: 0.5, fontWeight: 600 }}>
                                                        {msg.subject}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                        {msg.preview}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </Box>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={8} sx={{ height: '100%' }}>
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <BiMessageDetail size={60} color="#e0e0e0" />
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Select a message to read</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );

    const renderAnnouncements = () => (
        <Stack spacing={2}>
            {announcements.map((item) => (
                <Card key={item.id} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderLeft: `6px solid ${item.type === 'Urgent' ? '#fb7d5b' : '#4d44b5'}` }}>
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Chip
                                label={item.type}
                                size="small"
                                sx={{ bgcolor: item.type === 'Urgent' ? '#fb7d5b20' : '#4d44b520', color: item.type === 'Urgent' ? '#fb7d5b' : '#4d44b5', fontWeight: 700 }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                <BiCalendarEvent style={{ marginRight: 4 }} /> {item.date}
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 1 }}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );

    const renderEvents = () => (
        <Grid container spacing={3}>
            {events.map((event) => (
                <Grid item xs={12} md={6} key={event.id}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Box sx={{ height: 140, bgcolor: '#4d44b5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <BiCalendarEvent size={50} />
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 1 }}>{event.title}</Typography>
                            <Stack spacing={1} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', color: '#A098AE', alignItems: 'center' }}>
                                    <BiCalendarEvent style={{ marginRight: 8 }} /> {event.date}
                                </Box>
                                <Box sx={{ display: 'flex', color: '#A098AE', alignItems: 'center' }}>
                                    <BiTime style={{ marginRight: 8 }} /> {event.time}
                                </Box>
                                <Box sx={{ display: 'flex', color: '#A098AE', alignItems: 'center' }}>
                                    <BiHomeAlt style={{ marginRight: 8 }} /> {event.location}
                                </Box>
                            </Stack>
                            <Button variant="contained" fullWidth sx={{ borderRadius: 2, bgcolor: '#4d44b5' }}>View Details</Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    const renderPTM = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Meeting Schedule</Typography>
                <Button variant="contained" sx={{ bgcolor: '#4d44b5', borderRadius: 2 }}>Request Meeting</Button>
            </Box>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f9fafb' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Teacher / Department</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Status</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ptms.map((meeting) => (
                                    <TableRow key={meeting.id}>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{meeting.teacher}</TableCell>
                                        <TableCell sx={{ color: '#A098AE' }}>{meeting.date}</TableCell>
                                        <TableCell>
                                            <Chip label={meeting.status} size="small" color={meeting.status === 'Completed' ? 'success' : 'primary'} variant={meeting.status === 'Completed' ? 'filled' : 'outlined'} />
                                        </TableCell>
                                        <TableCell sx={{ color: '#A098AE', maxWidth: 300 }}>{meeting.notes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1rem', minWidth: 'auto', mr: 2 },
                        '& .Mui-selected': { color: '#4d44b5' },
                        '& .MuiTabs-indicator': { bgcolor: '#4d44b5', height: 3, borderRadius: '3px 3px 0 0' }
                    }}
                >
                    <Tab icon={<BiMale size={20} />} iconPosition="start" label="Teachers" value="teachers" />
                    <Tab icon={<BiHomeAlt size={20} />} iconPosition="start" label="School Office" value="office" />
                    <Tab icon={<BiMessageDetail size={20} />} iconPosition="start" label="Messages" value="messages" />
                    <Tab icon={<BiBell size={20} />} iconPosition="start" label="Announcements" value="announcements" />
                    <Tab icon={<BiCalendarEvent size={20} />} iconPosition="start" label="Events" value="events" />
                    <Tab icon={<BiConversation size={20} />} iconPosition="start" label="PTM" value="ptm" />
                </Tabs>
                <Box sx={{ height: 1, bgcolor: '#e0e0e0', mt: -0.2 }} />
            </Box>

            {activeTab === 'teachers' && renderTeachers()}
            {activeTab === 'office' && renderOffice()}
            {activeTab === 'messages' && renderMessages()}
            {activeTab === 'announcements' && renderAnnouncements()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'ptm' && renderPTM()}
        </Box>
    );
};

export default Communication;
