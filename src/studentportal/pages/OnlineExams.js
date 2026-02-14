import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { invokeGetApi, apiList } from '../../services/ApiServices';

const StudentOnlineExams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const studentId = localStorage.getItem('student_id'); // Assuming student_id is stored

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            // Fetch exams for the student's class
            // This endpoint might need adjustment depending on how we filter by class/student
            const classId = localStorage.getItem('class_id');
            const response = await invokeGetApi(apiList.getExams, { class_id: classId });
            if (response.data.responseCode === "200") {
                // Filter exams that are "Published" or "Ongoing" and are Online Exams (if distinction exists)
                // For now, assuming all exams fetched here are candidates for online taking if they have questions
                setExams(response.data.exams);
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTakeExam = (examId, scheduleId) => {
        navigate(`/student/take-exam/${examId}/${scheduleId}`);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#303972', fontWeight: 700 }}>
                Online Exams
            </Typography>
            <Grid container spacing={3}>
                {exams.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography>No exams available at the moment.</Typography>
                    </Grid>
                ) : (
                    exams.map((exam) => (
                        <Grid item xs={12} md={6} lg={4} key={exam.id}>
                            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6" fontWeight={700} color="#303972">
                                            {exam.exam_name}
                                        </Typography>
                                        <Chip label={exam.status} color={exam.status === 'Ongoing' ? 'success' : 'default'} size="small" />
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Date: {exam.start_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Type: {exam.type_name}
                                    </Typography>

                                    <Box sx={{ mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{ bgcolor: '#4d44b5', borderRadius: 2 }}
                                            onClick={() => handleTakeExam(exam.id, 999)} // Placeholder schedule ID for now, need logic to fetch schedule
                                        >
                                            View Papers
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
};

export default StudentOnlineExams;
