import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { invokeGetApi, apiList } from '../../services/ApiServices';

const OnlineExamDashboard = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            // Fetch all exams (admin view)
            const response = await invokeGetApi(apiList.getExams, {});
            if (response.data.responseCode === "200") {
                const onlineExams = response.data.exams.filter(exam => exam.exam_mode === 'Online');
                setExams(onlineExams);
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight={700} color="#303972">
                    Online Exams Management
                </Typography>
                <Button variant="contained" onClick={() => navigate('/create-exam')} sx={{ bgcolor: '#4d44b5' }}>
                    Create New Exam
                </Button>
            </Box>

            <Grid container spacing={3}>
                {exams.map((exam) => (
                    <Grid item xs={12} md={6} lg={4} key={exam.id}>
                        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" fontWeight={700} color="#303972">
                                        {exam.exam_name}
                                    </Typography>
                                    <Chip label={exam.status} color={exam.status === 'Ongoing' ? 'success' : 'default'} size="small" />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Class: {exam.class_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Date: {exam.start_date}
                                </Typography>

                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        // Direct link to questions for now (assuming 1 schedule per exam or passing examID to pick schedule)
                                        // For simplicity in this iteration, passing exam.id as schedule_id to show flow, 
                                        // BUT ideally we need to list schedules first. 
                                        // Let's assume the user selects a schedule ID manually or we list it.
                                        // Temporary: Navigating to questions with param.
                                        onClick={() => navigate(`/online-exam/questions/${exam.id}`)}
                                    >
                                        Manage Questions
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default OnlineExamDashboard;
