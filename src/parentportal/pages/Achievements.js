import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, Chip,
    Stack, Tabs, Tab, Divider, List, ListItem, ListItemText, ListItemIcon, Avatar
} from '@mui/material';
import {
    BiTrophy, BiMedal, BiAward, BiCalendar, BiUser, BiCrown, BiStar,
    BiCheckCircle, BiImage, BiCloudDownload, BiLinkExternal, BiCommentDetail, BiLeftArrowAlt
} from 'react-icons/bi';
import { motion } from 'framer-motion';

const Achievements = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // --- Mock Data ---
    const allAchievements = [
        { id: 1, title: "1st Position - National Science Olympiad", date: "15 Dec 2023", category: "Academic", icon: <BiTrophy size={30} />, color: "#FCC43E" },
        { id: 2, title: "Best Debater - Inter-School Championship", date: "10 Nov 2023", category: "Co-Curricular", icon: <BiMedal size={30} />, color: "#4d44b5" },
        { id: 3, title: "Gold Medal - 100m Sprint", date: "05 Oct 2023", category: "Sports", icon: <BiAward size={30} />, color: "#FB7D5B" },
        { id: 4, title: "Certificate of Excellence - Art Fair", date: "20 Sep 2023", category: "Arts", icon: <BiStar size={30} />, color: "#27AE60" },
    ];

    // --- Tab 1: All Achievements Render ---
    const renderAllAchievements = () => (
        <Grid container spacing={3}>
            {allAchievements.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', cursor: 'pointer', '&:hover': { boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }, transition: 'all 0.3s ease' }} onClick={() => setTabValue(1)}>
                        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Box sx={{
                                width: 70, height: 70, borderRadius: '20px',
                                bgcolor: `${item.color}15`, color: item.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                {item.icon}
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Chip label={item.category} size="small" sx={{ bgcolor: `${item.color}15`, color: item.color, fontWeight: 700, borderRadius: 1, mb: 1 }} />
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', lineHeight: 1.3, mb: 0.5 }}>{item.title}</Typography>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <BiCalendar color="#A098AE" />
                                    <Typography variant="body2" color="text.secondary">{item.date}</Typography>
                                </Stack>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Button size="small" variant="outlined" sx={{ minWidth: 40, width: 40, height: 40, borderRadius: '50%', p: 0, borderColor: '#C1BBEB', color: '#4d44b5' }}>
                                    →
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // --- Tab 2: Achievement Details Render (Matching layout) ---
    const renderAchievementDetails = () => (
        <Box>
            <Button startIcon={<BiLeftArrowAlt />} onClick={() => setTabValue(0)} sx={{ mb: 2, color: '#A098AE' }}>
                Back to Achievements
            </Button>

            <Grid container spacing={3}>
                {/* Header Row */}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#303972' }}>🥇 MATHEMATICS OLYMPIAD DETAILS</Typography>
                    </Box>
                </Grid>

                {/* Left Column: Details & Certificate */}
                <Grid item xs={12} md={7}>
                    {/* Achievement Details */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiTrophy style={{ marginRight: 10 }} /> ACHIEVEMENT DETAILS
                            </Typography>
                            <Grid container spacing={2}>
                                {[
                                    { l: "Title", v: "1st Position - National Mathematics Olympiad" },
                                    { l: "Student", v: "Rahul Sharma | Grade: 5-A" },
                                    { l: "Date", v: "15 December 2023" },
                                    { l: "Level", v: "National Competition" },
                                    { l: "Organizer", v: "Indian Mathematics Association" },
                                    { l: "Participants", v: "5,000+ students nationwide" },
                                    { l: "Score", v: "95/100 | Rank: 1" },
                                    { l: "Award", v: "Gold Medal + Certificate + ₹10,000 Scholarship", highlight: true },
                                ].map((item, i) => (
                                    <Grid item xs={12} key={i}>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 2 }}>
                                            <Typography variant="body2" sx={{ color: '#A098AE', width: 140, flexShrink: 0 }}>{item.l}:</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600, color: item.highlight ? '#E74C3C' : '#303972' }}>{item.v}</Typography>
                                        </Stack>
                                        {i !== 7 && <Divider sx={{ my: 1.5, borderStyle: 'dashed' }} />}
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Certificate Preview */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiAward style={{ marginRight: 10 }} /> CERTIFICATE PREVIEW
                            </Typography>

                            {/* Mock Certificate Visual */}
                            <Box sx={{
                                border: '8px double #4d44b5', p: 4, textAlign: 'center', bgcolor: '#fff',
                                backgroundImage: 'radial-gradient(circle at center, #f8f9fd 0%, #fff 100%)',
                                position: 'relative', overflow: 'hidden', mb: 3
                            }}>
                                {/* Corner Decorations */}
                                <Box sx={{ position: 'absolute', top: -20, left: -20, width: 60, height: 60, bgcolor: '#FCC43E', transform: 'rotate(45deg)' }} />
                                <Box sx={{ position: 'absolute', bottom: -20, right: -20, width: 60, height: 60, bgcolor: '#FCC43E', transform: 'rotate(45deg)' }} />

                                <BiCrown size={40} color="#FCC43E" style={{ marginBottom: 16 }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#303972', letterSpacing: 2, mb: 1 }}>INDIAN MATHEMATICS ASSOCIATION</Typography>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#A098AE', mb: 4 }}>NATIONAL MATHEMATICS OLYMPIAD 2023</Typography>

                                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>This certifies that</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: '#4d44b5', mb: 2, fontFamily: 'serif' }}>RAHUL SHARMA</Typography>
                                <Typography variant="body2" sx={{ mb: 3 }}>Grade 5, Sunshine International School</Typography>

                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#303972', mb: 1 }}>has secured FIRST POSITION</Typography>
                                <Typography variant="body2" sx={{ mb: 4 }}>in the National Mathematics Olympiad held on 15th December 2023</Typography>

                                <Chip label="Score: 95/100 | Rank: 1/5000" sx={{ bgcolor: '#4d44b5', color: 'white', fontWeight: 600, mb: 4 }} />

                                <Stack direction="row" justifyContent="space-around" sx={{ mt: 2 }}>
                                    <Box><Divider sx={{ width: 100, mb: 1 }} /><Typography variant="caption">President, IMA</Typography></Box>
                                    <Box><Divider sx={{ width: 100, mb: 1 }} /><Typography variant="caption">Principal, SIS</Typography></Box>
                                </Stack>
                            </Box>

                            <Button fullWidth variant="outlined" startIcon={<BiCloudDownload />} sx={{ color: '#4d44b5', borderColor: '#4d44b5', fontWeight: 600 }}>
                                Download High-Resolution Certificate
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column: Gallery, Comments, Skills */}
                <Grid item xs={12} md={5}>
                    {/* Photo Gallery */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiImage style={{ marginRight: 10 }} /> PHOTO GALLERY
                            </Typography>
                            <Grid container spacing={1} sx={{ mb: 2 }}>
                                {['Award Ceremony', 'With Judges', 'Receiving Trophy', 'School Celebration'].map((label, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Box sx={{
                                            height: 100, bgcolor: '#F3F4FF', borderRadius: 2,
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', '&:hover': { bgcolor: '#E0E7FF' }
                                        }}>
                                            <BiImage size={24} color="#A098AE" />
                                            <Typography variant="caption" sx={{ mt: 1, color: '#303972', textAlign: 'center', fontSize: '10px' }}>{label}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Stack direction="row" spacing={1}>
                                <Button size="small" sx={{ textTransform: 'none' }}>View All Photos</Button>
                                <Button size="small" sx={{ textTransform: 'none' }}>Upload Your Photos</Button>
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Teacher's Comments */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3, bgcolor: '#FFF8F1' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#F39C12', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiCommentDetail style={{ marginRight: 10 }} /> TEACHER'S COMMENTS
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#303972', lineHeight: 1.6, mb: 2 }}>
                                "Rahul demonstrated exceptional problem-solving skills and mathematical reasoning. His dedication to practice and his natural aptitude for mathematics truly shone through in this competition."
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#F39C12' }}>MP</Avatar>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972' }}>Mr. Patel</Typography>
                                    <Typography variant="caption" sx={{ color: '#A098AE' }}>Mathematics Teacher</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Skills Demonstrated */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiCheckCircle style={{ marginRight: 10 }} /> SKILLS DEMONSTRATED
                            </Typography>
                            <Grid container spacing={1}>
                                {[
                                    "Logical Reasoning", "Problem Solving",
                                    "Analytical Thinking", "Speed & Accuracy",
                                    "Math Creativity", "Perseverance"
                                ].map((skill, i) => (
                                    <Grid item xs={6} key={i}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <BiCheckCircle color="#27AE60" size={16} />
                                            <Typography variant="caption" sx={{ fontWeight: 600, color: '#303972' }}>{skill}</Typography>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Achievements
            </Typography>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                    mb: 4,
                    '& .MuiTabs-indicator': { backgroundColor: '#4d44b5', height: 4, borderRadius: 2 },
                    '& .MuiTab-root': { textTransform: 'none', fontWeight: 700, fontSize: '1rem', mr: 4 }
                }}
            >
                <Tab label="All Achievements" icon={<BiTrophy size={20} />} iconPosition="start" />
                <Tab label="Achievement Details" icon={<BiAward size={20} />} iconPosition="start" />
            </Tabs>

            {tabValue === 0 && renderAllAchievements()}
            {tabValue === 1 && renderAchievementDetails()}
        </Box>
    );
};

export default Achievements;
