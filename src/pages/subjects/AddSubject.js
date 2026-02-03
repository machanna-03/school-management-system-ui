import React from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            subjectName: '',
            subjectCode: '',
            grade: '',
            teacherId: '',
            sessions: ''
        },
        validate: {
            subjectName: (value) => (value ? null : 'Subject Name is required'),
            subjectCode: (value) => (value ? null : 'Subject Code is required'),
        },
    });

    const handleSubmit = (values) => {
        console.log(values);
        notifications.show({
            title: 'Success',
            message: 'Subject added successfully',
            color: 'green',
        });
        setTimeout(() => navigate('/subjects'), 1000);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Add New Subject</Typography>
                <Typography variant="body2" color="text.secondary">Add a new subject the curriculum.</Typography>
            </Box>

            <Card sx={{ p: 4 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject Name *</Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. Mathematics"
                                variant="outlined"
                                {...form.getInputProps('subjectName')}
                                error={!!form.errors.subjectName}
                                helperText={form.errors.subjectName}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject Code *</Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. MATH101"
                                variant="outlined"
                                {...form.getInputProps('subjectCode')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Grade Level</Typography>
                            <TextField
                                fullWidth
                                select
                                placeholder="Select Grade"
                                variant="outlined"
                                {...form.getInputProps('grade')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="Grade 9">Grade 9</MenuItem>
                                <MenuItem value="Grade 10">Grade 10</MenuItem>
                                <MenuItem value="Grade 11">Grade 11</MenuItem>
                                <MenuItem value="Grade 12">Grade 12</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Sessions Per Week</Typography>
                            <TextField
                                fullWidth
                                type="number"
                                placeholder="e.g. 5"
                                variant="outlined"
                                {...form.getInputProps('sessions')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Assign Teacher</Typography>
                            <TextField
                                fullWidth
                                select
                                placeholder="Select Teacher"
                                variant="outlined"
                                {...form.getInputProps('teacherId')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="T001">John Doe</MenuItem>
                                <MenuItem value="T002">Jane Smith</MenuItem>
                                <MenuItem value="T003">Alice Johnson</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button variant="outlined" color="inherit" onClick={() => navigate('/subjects')} sx={{ borderRadius: '30px', px: 4 }}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: '30px', px: 4 }}>
                                    Submit
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
};

export default AddSubject;
