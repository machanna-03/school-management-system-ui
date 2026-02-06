import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Stack, Button } from '@mui/material';
import { BiBook, BiTime, BiCheckCircle } from 'react-icons/bi';

const Homework = () => {
    const assignments = [
        {
            id: 1,
            subject: "Mathematics",
            title: "Algebra Exercises 5.1 - 5.3",
            dueDate: "Today, 5:00 PM",
            status: "Pending",
            description: "Complete exercises on quadratic equations. Show all steps.",
            teacher: "Mr. Patel"
        },
        {
            id: 2,
            subject: "Science",
            title: "Photosynthesis Diagram",
            dueDate: "Tomorrow, 10:00 AM",
            status: "In Progress",
            description: "Draw and label the process of photosynthesis.",
            teacher: "Ms. Rao"
        },
        {
            id: 3,
            subject: "English",
            title: "Essay: My Summer Vacation",
            dueDate: "10 Feb",
            status: "Completed",
            description: "Write a 500-word essay about your summer vacation.",
            teacher: "Mrs. Kumar"
        }
    ];

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>
                Homework & Assignments
            </Typography>

            <Grid container spacing={3}>
                {assignments.map((assignment) => (
                    <Grid item xs={12} md={6} lg={4} key={assignment.id}>
                        <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip
                                        label={assignment.subject}
                                        sx={{
                                            bgcolor: '#4d44b5',
                                            color: 'white',
                                            fontWeight: 600
                                        }}
                                    />
                                    <Chip
                                        label={assignment.status}
                                        color={
                                            assignment.status === 'Completed' ? 'success' :
                                                assignment.status === 'Pending' ? 'error' : 'warning'
                                        }
                                        variant="outlined"
                                    />
                                </Box>

                                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 1 }}>
                                    {assignment.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                                    {assignment.description}
                                </Typography>

                                <Stack spacing={1.5}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#A098AE' }}>
                                        <BiTime size={20} style={{ marginRight: 8 }} />
                                        <Typography variant="body2" fontWeight={500}>Due: {assignment.dueDate}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#A098AE' }}>
                                        <BiBook size={20} style={{ marginRight: 8 }} />
                                        <Typography variant="body2" fontWeight={500}>Teacher: {assignment.teacher}</Typography>
                                    </Box>
                                </Stack>

                                {assignment.status !== 'Completed' && (
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mt: 3, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                                    >
                                        Mark as Done
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Homework;
