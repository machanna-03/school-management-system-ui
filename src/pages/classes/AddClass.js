import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Stack, Paper, Alert } from '@mui/material';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { apiList } from '../../services/ApiServices';
import api from '../../services/api';

const AddClass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        className: '',
        section: '',
        academicYear: '2025-2026',
        teacherId: '',
        capacity: 40
    });

    useEffect(() => {
        fetchTeachers();
        if (isEdit) {
            fetchClassDetails();
        }
    }, [id]);

    const fetchTeachers = async () => {
        try {
            const response = await api.get('/getTeachers');
            if (response.data.teachers) {
                setTeachers(response.data.teachers);
            }
        } catch (error) {
            console.error("Failed to fetch teachers:", error);
            notifications.show({
                title: 'Error',
                message: 'Failed to load teachers list',
                color: 'red',
            });
        }
    };

    const fetchClassDetails = async () => {
        try {
            const response = await api.get(apiList.getClass + '/' + id);
            const data = response.data.classes;
            if (data) {
                setFormData({
                    className: data.class_name,
                    section: data.section_name,
                    academicYear: data.academic_year,
                    teacherId: data.teacher_id || '',
                    capacity: data.capacity
                });
            }
        } catch (error) {
            console.error("Failed to fetch class details:", error);
            notifications.show({
                title: 'Error',
                message: 'Failed to load class details',
                color: 'red',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.className || !formData.section || !formData.academicYear) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        try {
            if (isEdit) {
                await api.post(apiList.updateClass, { ...formData, sectionId: id });
                notifications.show({
                    title: 'Success',
                    message: 'Class Section updated successfully',
                    color: 'green',
                });
            } else {
                await api.post('/addClass', formData);
                notifications.show({
                    title: 'Success',
                    message: 'Class Section added successfully',
                    color: 'green',
                });
            }
            setTimeout(() => navigate('/classes'), 1000);
        } catch (error) {
            console.error(error);
            const msg = error.response?.data?.responseMessage || 'Failed to save class';
            setError(msg);
            notifications.show({
                title: 'Error',
                message: msg,
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 1 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">
                    {isEdit ? 'Edit Class Section' : 'Add New Class Section'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isEdit ? 'Update class section details below.' : 'Create a new class section linked to an academic year.'}
                </Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Class Name (Grade) <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                select
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                placeholder="Select Class"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="Class 1">Class 1</MenuItem>
                                <MenuItem value="Class 2">Class 2</MenuItem>
                                <MenuItem value="Class 3">Class 3</MenuItem>
                                <MenuItem value="Class 4">Class 4</MenuItem>
                                <MenuItem value="Class 5">Class 5</MenuItem>
                                <MenuItem value="Class 6">Class 6</MenuItem>
                                <MenuItem value="Class 7">Class 7</MenuItem>
                                <MenuItem value="Class 8">Class 8</MenuItem>
                                <MenuItem value="Class 9">Class 9</MenuItem>
                                <MenuItem value="Class 10">Class 10</MenuItem>
                                <MenuItem value="Class 11">Class 11</MenuItem>
                                <MenuItem value="Class 12">Class 12</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Section <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                select
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                placeholder="Select Section"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="A">Section A</MenuItem>
                                <MenuItem value="B">Section B</MenuItem>
                                <MenuItem value="C">Section C</MenuItem>
                                <MenuItem value="D">Section D</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Academic Year <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChange}
                                placeholder="e.g. 2025-2026"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Capacity</Typography>
                            <TextField
                                fullWidth
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                placeholder="40"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Assign Class Teacher</Typography>
                            <TextField
                                fullWidth
                                select
                                name="teacherId"
                                value={formData.teacherId}
                                onChange={handleChange}
                                placeholder="Select Teacher"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.name} ({teacher.designation})
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button variant="outlined" color="inherit" onClick={() => navigate('/classes')} sx={{ borderRadius: '30px', px: 4 }}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ borderRadius: '30px', px: 4, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                                >
                                    {loading ? 'Saving...' : (isEdit ? 'Update' : 'Submit')}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddClass;
