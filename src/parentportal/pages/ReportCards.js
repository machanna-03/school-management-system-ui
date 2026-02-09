
import React, { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, Chip,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, Tab, Divider, Avatar, LinearProgress, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import {
    BiFile, BiDownload, BiBarChartAlt2, BiAward, BiBook,
    BiUserCheck, BiNote, BiCheckCircle
} from 'react-icons/bi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ReportCards = () => {
    const [tabValue, setTabValue] = useState(1); // Default to Current Report

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // --- Mock Data ---
    const academicData = [
        { subject: "Mathematics", marks: 95, grade: "A1", max: 100, average: 78 },
        { subject: "Science", marks: 88, grade: "A2", max: 100, average: 75 },
        { subject: "English", marks: 92, grade: "A1", max: 100, average: 82 },
        { subject: "Social Studies", marks: 85, grade: "A2", max: 100, average: 80 },
        { subject: "Hindi", marks: 90, grade: "A1", max: 100, average: 85 },
        { subject: "Computer", marks: 98, grade: "A1", max: 100, average: 88 },
    ];

    const coScholasticData = [
        { activity: "Art & Craft", grade: "A" },
        { activity: "Music", grade: "A" },
        { activity: "Physical Education", grade: "A" },
        { activity: "Discipline", grade: "A" },
    ];

    const archives = [
        { id: 1, term: "Term 1 Report", year: "2023-2024", date: "15 Oct 2023", result: "Pass" },
        { id: 2, term: "Final Report", year: "2022-2023", date: "20 Mar 2023", result: "Pass (Promoted)" },
        { id: 3, term: "Term 1 Report", year: "2022-2023", date: "10 Oct 2022", result: "Pass" },
    ];

    // --- Tab 1: Archives Render ---
    const renderArchives = () => (
        <Grid container spacing={3}>
            {archives.map((report) => (
                <Grid item xs={12} md={6} key={report.id}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: '#F3F4FF', color: '#4d44b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BiFile size={30} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>{report.term}</Typography>
                                    <Typography variant="body2" color="text.secondary">{report.year} • {report.date}</Typography>
                                    <Chip label={report.result} size="small" color="success" sx={{ mt: 0.5, height: 20, fontSize: 10, fontWeight: 600 }} />
                                </Box>
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<BiDownload />}
                                sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#4d44b5', color: '#4d44b5' }}
                            >
                                Download
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    // --- Tab 2: Current Report Render ---
    const renderCurrentReport = () => (
        <Box>
            {/* Header / Student Info */}
            <Card sx={{ mb: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', bgcolor: '#4d44b5', color: 'white' }}>
                <CardContent sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: '#4d44b5', fontWeight: 700, fontSize: 32 }}>RS</Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>Rahul Sharma</Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>Class: 5-A | Roll No: 23</Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>Academic Year: 2023-2024</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Typography variant="h6" sx={{ opacity: 0.9 }}>Overall Grade</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 800 }}>A1</Typography>
                        <Chip label="Promoted to Class 6" sx={{ bgcolor: 'white', color: '#4d44b5', fontWeight: 700, mt: 1 }} />
                    </Box>
                </CardContent>
            </Card>

            <Grid container spacing={3}>
                {/* Academic Performance Table */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiBook style={{ marginRight: 10 }} /> ACADEMIC PERFORMANCE
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: '#F8F9FD' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>SUBJECT</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: '#A098AE' }}>MARKS OBTAINED</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: '#A098AE' }}>MAX MARKS</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 700, color: '#A098AE' }}>GRADE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {academicData.map((row) => (
                                            <TableRow key={row.subject}>
                                                <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{row.subject}</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 700, color: '#303972' }}>{row.marks}</TableCell>
                                                <TableCell align="center" sx={{ color: '#A098AE' }}>{row.max}</TableCell>
                                                <TableCell align="center">
                                                    <Chip label={row.grade} size="small" sx={{
                                                        bgcolor: row.grade === 'A1' ? '#E1F8E8' : (row.grade.startsWith('A') ? '#FFF4DE' : '#F3F4FF'),
                                                        color: row.grade === 'A1' ? '#27AE60' : (row.grade.startsWith('A') ? '#F39C12' : '#4d44b5'),
                                                        fontWeight: 700, width: 40
                                                    }} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow sx={{ bgcolor: '#F8F9FD' }}>
                                            <TableCell sx={{ fontWeight: 800, color: '#303972' }}>Total</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 800, color: '#303972' }}>548</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 800, color: '#303972' }}>600</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 800, color: '#27AE60' }}>91.3%</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>

                    {/* Performance Analysis Chart */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 3, display: 'flex', alignItems: 'center' }}>
                                <BiBarChartAlt2 style={{ marginRight: 10 }} /> PERFORMANCE ANALYSIS
                            </Typography>
                            <Box sx={{ height: 300, width: '100%' }}>
                                <ResponsiveContainer>
                                    <BarChart data={academicData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
                                        <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#A098AE', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} />
                                        <Tooltip
                                            cursor={{ fill: '#F3F4FF' }}
                                            contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar dataKey="marks" name="Calculated Marks" fill="#4d44b5" radius={[4, 4, 0, 0]} barSize={20} />
                                        <Bar dataKey="average" name="Class Average" fill="#FFB549" radius={[4, 4, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column (Co-Scholastic, Remarks, Attendance) */}
                <Grid item xs={12} md={4}>
                    {/* Co-Scholastic Areas */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiAward style={{ marginRight: 10 }} /> CO-SCHOLASTIC
                            </Typography>
                            <List disablePadding>
                                {coScholasticData.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>{item.activity}</Typography>
                                            <Chip label={item.grade} size="small" variant="outlined" sx={{ borderColor: '#4d44b5', color: '#4d44b5', fontWeight: 700, width: 32 }} />
                                        </Box>
                                        {i !== coScholasticData.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>

                    {/* Attendance */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiUserCheck style={{ marginRight: 10 }} /> ATTENDANCE
                            </Typography>
                            <Box sx={{ textAlign: 'center', mb: 2 }}>
                                <Typography variant="h3" sx={{ fontWeight: 700, color: '#27AE60' }}>96%</Typography>
                                <Typography variant="body2" color="text.secondary">Total Attendance</Typography>
                            </Box>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={96} sx={{ height: 8, borderRadius: 5, bgcolor: '#E1F8E8', '& .MuiLinearProgress-bar': { bgcolor: '#27AE60' } }} />
                            </Box>
                            <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'center', color: '#A098AE' }}>202/210 Days Present</Typography>
                        </CardContent>
                    </Card>

                    {/* Class Teacher Remarks */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: '#F39C12', mb: 2, display: 'flex', alignItems: 'center' }}>
                                <BiNote style={{ marginRight: 10 }} /> REMARKS
                            </Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#303972', lineHeight: 1.6, mb: 2 }}>
                                "An excellent performance this term! Rahul has shown remarkable consistency in all subjects. Keep up the good work."
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#F39C12' }}>ST</Avatar>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#303972' }}>Mrs. S. Thomas</Typography>
                                    <Typography variant="caption" sx={{ color: '#A098AE' }}>Class Teacher</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Report Cards
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
                <Tab label="Report Archives" icon={<BiFile size={20} />} iconPosition="start" />
                <Tab label="Current Report" icon={<BiCheckCircle size={20} />} iconPosition="start" />
            </Tabs>

            {tabValue === 0 && renderArchives()}
            {tabValue === 1 && renderCurrentReport()}
        </Box>
    );
};

export default ReportCards;
