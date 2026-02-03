import React from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Stack } from '@mui/material';
import Card from '../../components/common/Card';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            className: '',
            grade: '',
            section: '',
            subject: '',
            teacherId: '',
            description: ''
        },
        validate: {
            className: (value) => (value ? null : 'Class Name is required'),
            grade: (value) => (value ? null : 'Grade is required'),
            section: (value) => (value ? null : 'Section is required'),
        },
    });

    const handleSubmit = (values) => {
        console.log(values);
        notifications.show({
            title: 'Success',
            message: 'Class added successfully',
            color: 'green',
        });
        // In a real app, you would make an API call here.
        setTimeout(() => navigate('/classes'), 1000);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>Add New Class</Typography>
                <Typography variant="body2" color="text.secondary">Create a new class by filling in the details below.</Typography>
            </Box>

            <Card sx={{ p: 4 }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Class Name *</Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. Mathematics 101"
                                variant="outlined"
                                {...form.getInputProps('className')}
                                error={!!form.errors.className}
                                helperText={form.errors.className}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject</Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. Mathematics"
                                variant="outlined"
                                {...form.getInputProps('subject')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Grade *</Typography>
                            <TextField
                                fullWidth
                                select
                                placeholder="Select Grade"
                                variant="outlined"
                                {...form.getInputProps('grade')}
                                error={!!form.errors.grade}
                                helperText={form.errors.grade}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="Grade 9">Grade 9</MenuItem>
                                <MenuItem value="Grade 10">Grade 10</MenuItem>
                                <MenuItem value="Grade 11">Grade 11</MenuItem>
                                <MenuItem value="Grade 12">Grade 12</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Section *</Typography>
                            <TextField
                                fullWidth
                                select
                                placeholder="Select Section"
                                variant="outlined"
                                {...form.getInputProps('section')}
                                error={!!form.errors.section}
                                helperText={form.errors.section}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="A">Section A</MenuItem>
                                <MenuItem value="B">Section B</MenuItem>
                                <MenuItem value="C">Section C</MenuItem>
                            </TextField>
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
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Description</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Enter any additional details..."
                                variant="outlined"
                                {...form.getInputProps('description')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button variant="outlined" color="inherit" onClick={() => navigate('/classes')} sx={{ borderRadius: '30px', px: 4 }}>
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

export default AddClass;
