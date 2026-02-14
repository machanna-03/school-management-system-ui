import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Stack, Paper } from '@mui/material';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const AddSubject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: '',
            code: '',
            type: 'Theory'
        },
        validate: {
            name: (value) => (value ? null : 'Subject Name is required'),
            code: (value) => (value ? null : 'Subject Code is required'),
        },
    });

    useEffect(() => {
        if (isEditMode) {
            fetchSubjectDetails();
        }
    }, [id]);

    const fetchSubjectDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/getSubject/${id}`);
            if (response.data.subject) {
                form.setValues({
                    name: response.data.subject.name,
                    code: response.data.subject.code,
                    type: response.data.subject.type || 'Theory'
                });
            }
        } catch (error) {
            console.error(error);
            notifications.show({ title: 'Error', message: 'Failed to fetch subject details', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (isEditMode) {
                await api.post('/updateSubject', { ...values, id });
                notifications.show({ title: 'Success', message: 'Subject updated successfully', color: 'green' });
            } else {
                await api.post('/addSubject', values);
                notifications.show({ title: 'Success', message: 'Subject added to catalog successfully', color: 'green' });
            }
            setTimeout(() => navigate('/subjects'), 1000);
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: error.response?.data?.responseMessage || 'Failed to save subject',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">
                    {isEditMode ? 'Edit Subject' : 'Add New Subject'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isEditMode ? 'Update subject details.' : 'Add a new subject to the global curriculum catalog.'}
                </Typography>
            </Box>

            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e0e0e0' }}>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject Name <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. Mathematics"
                                variant="outlined"
                                {...form.getInputProps('name')}
                                error={!!form.errors.name}
                                helperText={form.errors.name}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject Code <span style={{ color: 'red' }}>*</span></Typography>
                            <TextField
                                fullWidth
                                placeholder="e.g. MATH101"
                                variant="outlined"
                                {...form.getInputProps('code')}
                                error={!!form.errors.code}
                                helperText={form.errors.code}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>Subject Type</Typography>
                            <TextField
                                fullWidth
                                select
                                placeholder="Select Type"
                                variant="outlined"
                                {...form.getInputProps('type')}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            >
                                <MenuItem value="Theory">Theory</MenuItem>
                                <MenuItem value="Practical">Practical</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                <Button variant="outlined" color="inherit" onClick={() => navigate('/subjects')} sx={{ borderRadius: '30px', px: 4 }}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                    sx={{ borderRadius: '30px', px: 4, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                                >
                                    {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Submit')}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default AddSubject;
