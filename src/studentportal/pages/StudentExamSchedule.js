import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, Chip,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, Tab, RadioGroup, FormControlLabel, Radio, Divider, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import {
    BiCalendar, BiListUl, BiTime, BiMap, BiBook, BiDownload, BiCloudDownload,
    BiErrorCircle, BiCheckCircle, BiAlarm, BiCalendarCheck, BiPencil, BiInfoCircle
} from 'react-icons/bi';
import { motion } from 'framer-motion';

const ExamSchedule = () => {
    const [tabValue, setTabValue] = useState(0);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
    const [term, setTerm] = useState('term1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // --- Tab 1: Upcoming Exams Data ---
    const upcomingExams = [
        { subject: "Mathematics", date: "20 Jan", time: "9-11 AM", room: "Hall A", syllabus: "Ch 1-5", status: "Upcoming", weightage: "20%" },
        { subject: "Science", date: "22 Jan", time: "9-11 AM", room: "Lab 3", syllabus: "Ch 1-4", status: "Upcoming", weightage: "20%" },
        { subject: "English", date: "25 Jan", time: "9-11 AM", room: "Hall B", syllabus: "Units 1-3", status: "Upcoming", weightage: "20%" },
        { subject: "Hindi", date: "27 Jan", time: "9-11 AM", room: "Hall A", syllabus: "पाठ 1-5", status: "Upcoming", weightage: "20%" },
    ];

    // --- Tab 1: Render Upcoming Exams ---
    const renderUpcomingExams = () => (
        <Box>
            {/* Header Controls */}
            <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#A098AE' }}>TERM:</Typography>
                        <RadioGroup row value={term} onChange={(e) => setTerm(e.target.value)}>
                            <FormControlLabel value="term1" control={<Radio size="small" sx={{ color: '#4d44b5', '&.Mui-checked': { color: '#4d44b5' } }} />} label={<Typography variant="body2" sx={{ fontWeight: term === 'term1' ? 700 : 400, color: '#303972' }}>Term 1</Typography>} />
                            <FormControlLabel value="term2" control={<Radio size="small" sx={{ color: '#4d44b5', '&.Mui-checked': { color: '#4d44b5' } }} />} label={<Typography variant="body2" sx={{ fontWeight: term === 'term2' ? 700 : 400, color: '#303972' }}>Term 2</Typography>} />
                            <FormControlLabel value="final" control={<Radio size="small" sx={{ color: '#4d44b5', '&.Mui-checked': { color: '#4d44b5' } }} />} label={<Typography variant="body2" sx={{ fontWeight: term === 'final' ? 700 : 400, color: '#303972' }}>Final Exams</Typography>} />
                        </RadioGroup>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#A098AE' }}>VIEW:</Typography>
                        <Stack direction="row" spacing={1} sx={{ bgcolor: '#F3F4FF', p: 0.5, borderRadius: 2 }}>
                            <Button
                                size="small"
                                startIcon={<BiListUl />}
                                onClick={() => setViewMode('list')}
                                sx={{
                                    bgcolor: viewMode === 'list' ? 'white' : 'transparent',
                                    boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                                    color: viewMode === 'list' ? '#4d44b5' : '#A098AE',
                                    textTransform: 'none', borderRadius: 1.5
                                }}
                            >List</Button>
                            <Button
                                size="small"
                                startIcon={<BiCalendar />}
                                onClick={() => setViewMode('calendar')}
                                sx={{
                                    bgcolor: viewMode === 'calendar' ? 'white' : 'transparent',
                                    boxShadow: viewMode === 'calendar' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                                    color: viewMode === 'calendar' ? '#4d44b5' : '#A098AE',
                                    textTransform: 'none', borderRadius: 1.5
                                }}
                            >Calendar</Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>
                        📅 UPCOMING EXAMS (Next 30 Days)
                    </Typography>

                    <TableContainer component={Card} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: '#F8F9FD' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>EXAM</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>DATE & TIME</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>ROOM</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>SYLLABUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {upcomingExams.map((row, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972' }}>{row.subject}</Typography>
                                            <Typography variant="caption" sx={{ color: '#A098AE' }}>Weightage: {row.weightage}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <BiCalendarCheck size={16} color="#4d44b5" style={{ marginRight: 8 }} />
                                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>{row.date}</Typography>
                                            </Box>
                                            <Typography variant="caption" sx={{ color: '#A098AE', ml: 3 }}>{row.time}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={row.room} size="small" sx={{ bgcolor: '#F3F4FF', color: '#4d44b5', fontWeight: 600, borderRadius: 1 }} />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: '#303972' }}>{row.syllabus}</Typography>
                                            <Button
                                                size="small"
                                                startIcon={<BiDownload />}
                                                sx={{ textTransform: 'none', p: 0, justifyContent: 'flex-start', color: '#4d44b5' }}
                                            >Download</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Mock Calendar View */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>📊 EXAM CALENDAR VIEW</Typography>
                            {/* Simple visualization of the ASCII calendar */}
                            <Box sx={{ bgcolor: '#F8F9FD', p: 2, borderRadius: 2, textAlign: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#303972', mb: 2 }}>JANUARY 2024</Typography>
                                <Grid container spacing={1}>
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                        <Grid item xs={1.7} key={d}><Typography variant="caption" sx={{ fontWeight: 700, color: '#A098AE' }}>{d}</Typography></Grid>
                                    ))}
                                    {/* Mock Dates row 1 */}
                                    {[...Array(7)].map((_, i) => (
                                        <Grid item xs={1.7} key={i}>
                                            <Typography variant="body2" sx={{ color: i < 2 ? 'transparent' : '#303972' }}>{i < 2 ? '' : i - 1}</Typography>
                                        </Grid>
                                    ))}
                                    {/* Mock Dates row 4 (Exam week) */}
                                    {/* Just showing the relevant week for brevity */}
                                    {[...Array(7)].map((_, i) => (
                                        <Grid item xs={1.7} key={i + 20}>
                                            <Box sx={{
                                                width: 30, height: 30, borderRadius: '50%', margin: '0 auto',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                bgcolor: [20, 22, 25, 27].includes(i + 14) ? '#FFDCDC' : (i + 14 === 19 ? '#FFF4DE' : 'transparent'),
                                                color: [20, 22, 25, 27].includes(i + 14) ? '#E74C3C' : '#303972',
                                                fontWeight: [20, 22, 25, 27].includes(i + 14) ? 700 : 400
                                            }}>
                                                {i + 14}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Stack direction="row" spacing={3} justifyContent="center" sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFF4DE', border: '1px solid #F39C12' }} />
                                        <Typography variant="caption">Revision Day</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFDCDC', border: '1px solid #E74C3C' }} />
                                        <Typography variant="caption">Exam Day</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, bxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', bgcolor: '#4d44b5', color: 'white' }}>
                        <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                                <BiTime size={40} />
                            </Box>
                            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>5</Typography>
                            <Typography variant="subtitle1" sx={{ opacity: 0.8, mb: 4 }}>Days until next exam</Typography>

                            <Divider sx={{ width: '100%', borderColor: 'rgba(255,255,255,0.2)', mb: 3 }} />

                            <Box sx={{ width: '100%' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>📋 EXAM PREPARATION</Typography>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Recommended Study:</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>2 hours/day</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Teacher's Tip:</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>Focus on Algebra</Typography>
                                    </Box>
                                </Stack>
                                <Button variant="contained" fullWidth sx={{ mt: 4, bgcolor: 'white', color: '#4d44b5', fontWeight: 700, '&:hover': { bgcolor: '#f5f5f5' } }}>
                                    View Study Plan
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    // --- Tab 2: Exam Details Render ---
    const renderExamDetails = () => (
        <Grid container spacing={3}>
            {/* Header / Title */}
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#303972' }}>📝 MATHEMATICS EXAM ANALYSIS</Typography>
                        <Chip label="Upcoming: 20 Jan" color="primary" sx={{ bgcolor: '#4d44b5', fontWeight: 600 }} />
                    </Box>
                    <Button variant="outlined" startIcon={<BiDownload />} sx={{ textTransform: 'none', color: '#4d44b5', borderColor: '#4d44b5' }}>
                        Download Hall Ticket
                    </Button>
                </Box>
            </Grid>

            {/* Left Column */}
            <Grid item xs={12} md={7}>
                {/* Exam Insights & Analytics */}
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                            <BiInfoCircle style={{ marginRight: 10 }} /> EXAM INSIGHTS & ANALYTICS
                        </Typography>

                        <Grid container spacing={3}>
                            {/* Key Metrics Row */}
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: '#A098AE', display: 'block', mb: 0.5 }}>Prep Status</Typography>
                                <Chip label="On Track" size="small" sx={{ bgcolor: '#E1F8E8', color: '#27AE60', fontWeight: 700 }} />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: '#A098AE', display: 'block', mb: 0.5 }}>Target Score</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>90%+</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: '#A098AE', display: 'block', mb: 0.5 }}>Last Score</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>85/100</Typography>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="caption" sx={{ color: '#A098AE', display: 'block', mb: 0.5 }}>Complexity</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#F39C12' }}>High</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 1 }} />
                            </Grid>

                            {[
                                { label: "Syllabus Coverage", value: "85% Completed", color: "#27AE60" },
                                { label: "Days Remaining", value: "5 Days", color: "#E74C3C" },
                                { label: "Exam Format", value: "80 Marks Theory + 20 Internal", color: "#303972" },
                                { label: "Important Topics", value: "Algebra, Geometry", color: "#303972" },
                            ].map((item, i) => (
                                <Grid item xs={12} sm={6} key={i}>
                                    <Typography variant="caption" sx={{ color: '#A098AE', display: 'block' }}>{item.label}</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: item.color }}>{item.value}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>

                {/* Syllabus Tracker */}
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', display: 'flex', alignItems: 'center' }}>
                                <BiBook style={{ marginRight: 10 }} /> SYLLABUS & REVISION STATUS
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#A098AE', fontStyle: 'italic' }}>Last updated: Today</Typography>
                        </Box>

                        <List disablePadding>
                            {[
                                { ch: "Chapter 1: Numbers & Operations", marks: "20", status: "Completed", color: "#27AE60" },
                                { ch: "Chapter 2: Algebra", marks: "25", status: "Revision Left", color: "#F39C12" },
                                { ch: "Chapter 3: Geometry", marks: "30", status: "Completed", color: "#27AE60" },
                                { ch: "Chapter 4: Measurements", marks: "15", status: "Completed", color: "#27AE60" },
                                { ch: "Chapter 5: Data Handling", marks: "10", status: "Pending", color: "#E74C3C" },
                            ].map((item, i) => (
                                <ListItem key={i} divider={i !== 4} disableGutters sx={{ py: 2 }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography sx={{ fontWeight: 600, color: '#303972' }}>{item.ch}</Typography>
                                            <Chip label={item.status} size="small" sx={{
                                                bgcolor: `${item.color}15`, color: item.color, fontWeight: 700, borderRadius: 1
                                            }} />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: '#A098AE' }}>Weightage: {item.marks} marks</Typography>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={5}>
                {/* Teacher's Insights / Focus Areas */}
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3, bgcolor: '#FFF8F1' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#F39C12', mb: 2, display: 'flex', alignItems: 'center' }}>
                            <BiCheckCircle style={{ marginRight: 10 }} /> TEACHER'S INSIGHTS
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#303972', mb: 2, lineHeight: 1.6 }}>
                            "Rahul is doing well in Geometry but needs more practice in Algebra word problems. Ensure he reviews the formulas for Chapter 2."
                        </Typography>
                        <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.05)' }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972', mb: 1 }}>Key Focus Areas:</Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                            {['Algebraic Expressions', 'Circle Theorems', 'Data Interpretation'].map((tag, i) => (
                                <Chip key={i} label={tag} size="small" sx={{ bgcolor: 'white', border: '1px solid #F39C12', color: '#F39C12', fontWeight: 600 }} />
                            ))}
                        </Stack>
                    </CardContent>
                </Card>

                {/* Recommended Resources */}
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                            <BiPencil style={{ marginRight: 10 }} /> RECOMMENDED PRACTICE
                        </Typography>
                        <Stack spacing={2}>
                            {[
                                { title: "Algebra Practice Sheet 3", type: "PDF" },
                                { title: "Geometry Mock Test", type: "Test" },
                                { title: "Previous Year Math Paper", type: "PDF" }
                            ].map((doc, i) => (
                                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, border: '1px solid #f0f0f0', borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: '#F3F4FF', borderColor: '#4d44b5' } }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <BiCloudDownload size={24} color="#4d44b5" />
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>{doc.title}</Typography>
                                    </Box>
                                    <Chip label={doc.type} size="small" sx={{ borderRadius: 1, height: 20, fontSize: 10 }} />
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>

                {/* Exam Logistics (Moved to bottom small card) */}
                <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                            <BiMap style={{ marginRight: 10 }} /> LOGISTICS
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">Venue</Typography>
                                <Typography variant="body2" fontWeight={600} color="#303972">Hall A, Block B</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">Reporting Time</Typography>
                                <Typography variant="body2" fontWeight={600} color="#E74C3C">8:45 AM</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary">Requirements</Typography>
                                <Typography variant="body2" fontWeight={600} color="#303972">Blue Pen, Pencil, Geometry Box, ID Card</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Grid>
        </Grid>
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Exam Schedule
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
                <Tab label="Upcoming Exams" icon={<BiCalendarCheck size={20} />} iconPosition="start" />
                <Tab label="Exam Details" icon={<BiListUl size={20} />} iconPosition="start" />
            </Tabs>

            {tabValue === 0 && renderUpcomingExams()}
            {tabValue === 1 && renderExamDetails()}
        </Box>
    );
};

export default ExamSchedule;
