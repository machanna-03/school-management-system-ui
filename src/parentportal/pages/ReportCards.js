import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, Chip,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, Tab, Divider, Avatar, LinearProgress, List, ListItem, CircularProgress
} from '@mui/material';
import {
    BiFile, BiDownload, BiBarChartAlt2, BiAward, BiBook,
    BiUserCheck, BiNote, BiCheckCircle
} from 'react-icons/bi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { apiList, invokeGetApi } from '../../services/ApiServices';
import { config } from '../../config/Config';
import { useStudent } from '../layout/ParentLayout';

const ReportCards = () => {
    const { selectedStudent } = useStudent();
    const [tabValue, setTabValue] = useState(1); // Default to Current Report
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(false);

    const studentId = selectedStudent?.id;
    const studentName = selectedStudent?.name || 'Student';

    const fetchMarks = useCallback(async (sid) => {
        if (!sid) return;
        setLoading(true);
        try {
            const res = await invokeGetApi(config.getMySchool + apiList.getMarksHistory, { student_id: sid });
            if (res.data.responseCode === "200") {
                setMarks(res.data.marks);
            }
        } catch (error) {
            console.error("Error fetching marks:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (studentId) {
            fetchMarks(studentId);
        }
    }, [studentId, fetchMarks]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleDownloadPDF = async () => {
        if (marks.length === 0) return;
        try {
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.setDrawColor(77, 68, 181);
            pdf.setLineWidth(1);
            pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(22);
            pdf.setTextColor(48, 57, 114);
            pdf.text("ABC PUBLIC SCHOOL", pageWidth / 2, 25, { align: 'center' });

            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.text("Academic Progress Report", pageWidth / 2, 32, { align: 'center' });

            // Student Info
            pdf.setFillColor(248, 249, 253);
            pdf.rect(15, 45, pageWidth - 30, 25, 'F');
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Student: ${studentName}`, 20, 55);
            pdf.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 60, 55);

            // Table
            pdf.setFillColor(77, 68, 181);
            pdf.rect(15, 80, pageWidth - 30, 10, 'F');
            pdf.setTextColor(255);
            pdf.text("SUBJECT", 20, 86.5);
            pdf.text("TOTAL", 100, 86.5);
            pdf.text("OBTAINED", 140, 86.5);
            pdf.text("GRADE", 175, 86.5);

            pdf.setTextColor(50);
            pdf.setFont('helvetica', 'normal');
            let currentY = 90;
            let totalMax = 0;
            let totalObtained = 0;

            marks.forEach((mark, i) => {
                if (i % 2 === 0) {
                    pdf.setFillColor(252, 252, 252);
                    pdf.rect(15, currentY, pageWidth - 30, 10, 'F');
                }
                pdf.text(mark.subject_name, 20, currentY + 6.5);
                pdf.text(mark.total_marks.toString(), 100, currentY + 6.5);
                pdf.text(mark.marks_obtained.toString(), 140, currentY + 6.5);

                const pct = (mark.marks_obtained / mark.total_marks) * 100;
                let grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
                pdf.text(grade, 175, currentY + 6.5);

                totalMax += parseInt(mark.total_marks);
                totalObtained += parseInt(mark.marks_obtained);
                currentY += 10;
            });

            pdf.save(`Report-Card-${studentName}.pdf`);
        } catch (err) {
            console.error('PDF failed:', err);
        }
    };

    // --- Tab 1: Archives ---
    const renderArchives = () => (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <BiFile size={40} color="#A098AE" />
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>No archived reports found for current session.</Typography>
        </Box>
    );

    // --- Tab 2: Current Report ---
    const renderCurrentReport = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
        if (marks.length === 0) return <Box sx={{ p: 8, textAlign: 'center' }}><Typography>No marks available yet.</Typography></Box>;

        const totalObtained = marks.reduce((sum, m) => sum + parseInt(m.marks_obtained), 0);
        const totalMax = marks.reduce((sum, m) => sum + parseInt(m.total_marks), 0);
        const overallPct = ((totalObtained / totalMax) * 100).toFixed(1);

        return (
            <Box>
                <Card sx={{ mb: 3, borderRadius: 4, bgcolor: '#4d44b5', color: 'white' }}>
                    <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: '#4d44b5', fontWeight: 700, fontSize: 32 }}>
                                {studentName.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="h4" fontWeight={700}>{studentName}</Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>Academic Session: 2025-26</Typography>
                            </Box>
                        </Stack>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ opacity: 0.8 }}>Overall Percentage</Typography>
                            <Typography variant="h2" fontWeight={800}>{overallPct}%</Typography>
                            <Button variant="contained" startIcon={<BiDownload />} onClick={handleDownloadPDF} sx={{ bgcolor: 'white', color: '#4d44b5', mt: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
                                Download Card
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ borderRadius: 4, mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <BiBook style={{ marginRight: 10 }} /> MARKS DISTRIBUTION
                                </Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead sx={{ bgcolor: '#F8F9FD' }}>
                                            <TableRow>
                                                <TableCell fontWeight={700}>SUBJECT</TableCell>
                                                <TableCell align="center">OBTAINED</TableCell>
                                                <TableCell align="center">MAX</TableCell>
                                                <TableCell align="center">GRADE</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {marks.map((m, i) => {
                                                const pct = (m.marks_obtained / m.total_marks) * 100;
                                                let grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D';
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell fontWeight={600}>{m.subject_name}</TableCell>
                                                        <TableCell align="center" fontWeight={700}>{m.marks_obtained}</TableCell>
                                                        <TableCell align="center">{m.total_marks}</TableCell>
                                                        <TableCell align="center">
                                                            <Chip label={grade} size="small" color={grade.startsWith('A') ? 'success' : 'primary'} />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 4 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                                    <BiBarChartAlt2 style={{ marginRight: 10 }} /> PERFORMANCE CHART
                                </Typography>
                                <Box sx={{ height: 300, width: '100%' }}>
                                    <ResponsiveContainer>
                                        <BarChart data={marks}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="subject_name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="marks_obtained" fill="#4d44b5" radius={[4, 4, 0, 0]} barSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ borderRadius: 4, mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <BiAward style={{ marginRight: 10 }} /> CO-SCHOLASTIC
                                </Typography>
                                <List disablePadding>
                                    {['Art & Craft', 'Physical Ed', 'Discipline'].map((item) => (
                                        <Stack key={item} direction="row" justifyContent="space-between" sx={{ py: 1 }}>
                                            <Typography variant="body2">{item}</Typography>
                                            <Typography variant="body2" fontWeight={700}>A</Typography>
                                        </Stack>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>

                        <Card sx={{ borderRadius: 4, mb: 3 }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                    <BiUserCheck style={{ marginRight: 10 }} /> ATTENDANCE
                                </Typography>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h3" fontWeight={800} color="#27AE60">95%</Typography>
                                    <LinearProgress variant="determinate" value={95} sx={{ height: 8, borderRadius: 5, my: 1, bgcolor: '#E1F8E8', '& .MuiLinearProgress-bar': { bgcolor: '#27AE60' } }} />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Report Cards</Typography>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 4, '& .MuiTabs-indicator': { backgroundColor: '#4d44b5', height: 4 } }}>
                <Tab label="Report Archives" icon={<BiFile size={20} />} iconPosition="start" />
                <Tab label="Current Report" icon={<BiCheckCircle size={20} />} iconPosition="start" />
            </Tabs>
            {tabValue === 0 ? renderArchives() : renderCurrentReport()}
        </Box>
    );
};

export default ReportCards;
