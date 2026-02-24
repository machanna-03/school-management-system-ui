import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Container, CircularProgress, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@mui/material';
import { BiChevronDown, BiTime, BiFile, BiPlayCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

const StudentOnlineExams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [schedules, setSchedules] = useState({}); // { examId: [schedules] }
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const classId = localStorage.getItem('class_id');
            const response = await invokeGetApi(config.getMySchool + apiList.getExams, { class_id: classId, exam_mode: 'Online' });
            if (response.data.responseCode === "200") {
                setExams(response.data.exams || []);
                // Fetch schedules for each exam
                response.data.exams.forEach(exam => fetchSchedule(exam.id));
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSchedule = async (examId) => {
        try {
            const response = await invokeGetApi(config.getMySchool + apiList.getExamSchedule + `/${examId}`);
            if (response.data.responseCode === "200") {
                setSchedules(prev => ({ ...prev, [examId]: response.data.schedule }));
            }
        } catch (error) {
            console.error(`Error fetching schedule for exam ${examId}:`, error);
        }
    };

    const handleTakeExam = (scheduleId) => {
        navigate(`/student/take-exam/${scheduleId}`);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 1 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} color="#303972" gutterBottom>
                    Online Exams
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and take your scheduled online examinations.
                </Typography>
            </Box>

            {exams.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 4 }}>
                    <BiFile size={40} color="#ccc" />
                    <Typography sx={{ mt: 2 }} color="text.secondary">No online exams scheduled for your class.</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {exams.map((exam) => (
                        <Grid item xs={12} key={exam.id}>
                            <Accordion sx={{ borderRadius: '16px !important', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 2 }}>
                                <AccordionSummary expandIcon={<BiChevronDown />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                        <Box sx={{ bgcolor: exam.status === 'Ongoing' ? '#4caf5022' : '#4d44b522', p: 1, borderRadius: 2, color: exam.status === 'Ongoing' ? '#4caf50' : '#4d44b5' }}>
                                            <BiFile size={24} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight={700} color="#303972">{exam.exam_name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{exam.type_name} • {exam.start_date} to {exam.end_date}</Typography>
                                        </Box>
                                        <Chip
                                            label={exam.status}
                                            color={exam.status === 'Ongoing' ? 'success' : 'primary'}
                                            size="small"
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails sx={{ bgcolor: '#fcfcfd', borderTop: '1px solid #f0f0f0' }}>
                                    <List>
                                        {(schedules[exam.id] || []).length === 0 ? (
                                            <Typography variant="body2" sx={{ p: 2 }} color="text.secondary">No papers scheduled for this exam.</Typography>
                                        ) : (
                                            schedules[exam.id].map((sched) => (
                                                <ListItem key={sched.id} divider sx={{ py: 2 }}>
                                                    <ListItemText
                                                        primary={<Typography fontWeight={600} color="#303972">{sched.subject_name}</Typography>}
                                                        secondary={
                                                            <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                    <BiTime size={14} />
                                                                    <Typography variant="caption">{sched.exam_date} • {sched.start_time} - {sched.end_time}</Typography>
                                                                </Box>
                                                                <Typography variant="caption" fontWeight={600}>Marks: {sched.total_marks}</Typography>
                                                            </Box>
                                                        }
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<BiPlayCircle />}
                                                            onClick={() => handleTakeExam(sched.id)}
                                                            disabled={exam.status !== 'Ongoing'}
                                                            sx={{
                                                                bgcolor: '#4d44b5',
                                                                borderRadius: 2,
                                                                textTransform: 'none',
                                                                '&:disabled': { bgcolor: '#e0e0e0' }
                                                            }}
                                                        >
                                                            Start Exam
                                                        </Button>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))
                                        )}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default StudentOnlineExams;
