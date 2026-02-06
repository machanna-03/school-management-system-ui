import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Switch, Stack, TextField, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { BiUser, BiShield, BiBell, BiHelpCircle, BiChevronDown, BiLogOut, BiEdit, BiSave } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

const Settings = ({ initialTab = 'profile' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        // Sync tab with prop or URL if needed, similar to other modules
        if (location.pathname.includes('security')) setActiveTab('security');
        else if (location.pathname.includes('notifications')) setActiveTab('notifications');
        else if (location.pathname.includes('help')) setActiveTab('help');
        else setActiveTab('profile');
    }, [location.pathname]);

    const handleTabChange = (value) => {
        setActiveTab(value);
        navigate(`/parent/${value === 'help' ? 'help' : value}`); // Simple mapping
    };

    // --- Tab Navigation Component ---
    const SettingsTab = ({ icon, label, value }) => (
        <Button
            startIcon={icon}
            onClick={() => handleTabChange(value)}
            sx={{
                justifyContent: 'flex-start',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                color: activeTab === value ? 'white' : '#A098AE',
                bgcolor: activeTab === value ? '#4d44b5' : 'transparent',
                '&:hover': { bgcolor: activeTab === value ? '#3d3495' : '#f5f5f5' },
                textTransform: 'none',
                fontWeight: 600,
                width: '100%',
                mb: 1
            }}
        >
            {label}
        </Button>
    );

    // --- content Sections ---

    const renderProfile = () => (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: '#4d44b5', fontSize: '2.5rem' }}>JD</Avatar>
                        <Box sx={{
                            position: 'absolute', bottom: 0, right: 0,
                            bgcolor: 'white', borderRadius: '50%', p: 0.5,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)', cursor: 'pointer'
                        }}>
                            <BiEdit size={20} color="#4d44b5" />
                        </Box>
                    </Box>
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#303972' }}>John Doe</Typography>
                        <Typography variant="body1" color="text.secondary">Parent ID: P-2024-001</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3 }}>Personal Information</Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Full Name" defaultValue="John Doe" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Email Address" defaultValue="john.doe@example.com" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Phone Number" defaultValue="+1 234 567 8900" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Occupation" defaultValue="Software Engineer" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Address" multiline rows={2} defaultValue="123, Maple Street, Springfield, IL, USA" />
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'right' }}>
                    <Button variant="contained" startIcon={<BiSave />} sx={{ bgcolor: '#4d44b5', borderRadius: 2 }}>Save Changes</Button>
                </Box>
            </CardContent>
        </Card>
    );

    const renderSecurity = () => (
        <Stack spacing={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3 }}>Change Password</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" label="Current Password" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="password" label="New Password" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="password" label="Confirm New Password" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" sx={{ bgcolor: '#4d44b5', borderRadius: 2 }}>Update Password</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>Login History</Typography>
                    <List>
                        {[
                            { device: 'Chrome on Mac OS', ip: '192.168.1.1', date: 'Today, 10:30 AM', current: true },
                            { device: 'Safari on iPhone', ip: '192.168.1.5', date: 'Yesterday, 08:15 PM', current: false },
                            { device: 'Chrome on Windows', ip: '10.0.0.12', date: '05 Feb, 11:00 AM', current: false },
                        ].map((login, index) => (
                            <Box key={index}>
                                <ListItem>
                                    <ListItemText
                                        primary={<Typography fontWeight={600} color="#303972">{login.device} {login.current && <span style={{ color: '#4d44b5', fontSize: '0.8em', marginLeft: 8 }}>(Current)</span>}</Typography>}
                                        secondary={`${login.ip} • ${login.date}`}
                                    />
                                </ListItem>
                                {index < 2 && <Divider />}
                            </Box>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Stack>
    );

    const renderNotifications = () => (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 1 }}>Notification Preferences</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage how you receive updates and alerts.</Typography>

                <List>
                    {[
                        { title: "Academic Updates", desc: "Grades, homework, and report cards" },
                        { title: "Attendance Alerts", desc: "Daily attendance status and absence notifications" },
                        { title: "School Events", desc: "Announcements about sports day, annual functions, etc." },
                        { title: "Finance & Fees", desc: "Fee due reminders and payment receipts" },
                        { title: "Transport Updates", desc: "Bus delays or route changes" },
                    ].map((item, index) => (
                        <Box key={index}>
                            <ListItem>
                                <ListItemText
                                    primary={<Typography fontWeight={600} color="#303972">{item.title}</Typography>}
                                    secondary={item.desc}
                                />
                                <ListItemSecondaryAction>
                                    <Switch defaultChecked color="primary" />
                                </ListItemSecondaryAction>
                            </ListItem>
                            {index < 4 && <Divider />}
                        </Box>
                    ))}
                </List>
            </CardContent>
        </Card>
    );

    const renderHelp = () => (
        <Stack spacing={3}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3 }}>Frequently Asked Questions</Typography>
                    {[
                        "How do I reset my password?",
                        "How can I apply for leave for my child?",
                        "Where can I view the fee structure?",
                        "How do I contact the class teacher?"
                    ].map((q, i) => (
                        <Accordion key={i} elevation={0} sx={{ '&:before': { display: 'none' }, borderBottom: '1px solid #f0f0f0' }}>
                            <AccordionSummary expandIcon={<BiChevronDown />}>
                                <Typography fontWeight={600} color="#303972">{q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="text.secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>Contact Support</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Still need help? Our support team is available Mon-Fri, 9am - 5pm.</Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>Email Support</Button>
                        <Button variant="outlined" sx={{ borderRadius: 2 }}>Call Helpline</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Settings
            </Typography>

            <Grid container spacing={4}>
                {/* Sidebar Navigation */}
                <Grid item xs={12} md={3}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 2 }}>
                            <SettingsTab icon={<BiUser size={20} />} label="Profile" value="profile" />
                            <SettingsTab icon={<BiShield size={20} />} label="Security" value="security" />
                            <SettingsTab icon={<BiBell size={20} />} label="Notifications" value="notifications" />
                            <SettingsTab icon={<BiHelpCircle size={20} />} label="Help & Support" value="help" />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Content Area */}
                <Grid item xs={12} md={9}>
                    {activeTab === 'profile' && renderProfile()}
                    {activeTab === 'security' && renderSecurity()}
                    {activeTab === 'notifications' && renderNotifications()}
                    {activeTab === 'help' && renderHelp()}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;
