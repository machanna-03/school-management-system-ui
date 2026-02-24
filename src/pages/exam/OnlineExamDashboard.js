import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip, Container, CircularProgress, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { invokeGetApi, apiList } from '../../services/ApiServices';

const OnlineExamDashboard = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); // API is 1-indexed (based on my previous PHP changes, actually let's check. Yes, I used page in PHP as 1-based by default)
    // Wait, in PHP: $page = isset($params['page']) ? (int)$params['page'] : 1;
    // MUI Pagination component is 1-based.
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, [page]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            // Fetch online exams with pagination
            const response = await invokeGetApi(apiList.getExams, {
                exam_mode: 'Online',
                page: page,
                limit: 9 // 9 items per page fits well in 3 columns
            });
            if (response.data.responseCode === "200") {
                setExams(response.data.exams);
                if (response.data.pagination) {
                    setTotalPages(response.data.pagination.total_pages);
                }
            }
        } catch (error) {
            console.error("Error fetching exams:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="lg" sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
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

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Container>
    );
};

export default OnlineExamDashboard;
