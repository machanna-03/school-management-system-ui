import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, Paper } from '@mui/material';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

const EditParent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [parent, setParent] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        occupation: '',
        annual_income: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        gender: ''
    });

    useEffect(() => {
        fetchParentDetails();
    }, [id]);

    const fetchParentDetails = async () => {
        try {
            setLoading(true);
            // We need a getParent endpoint or filter from getParents. 
            // Since getParent/{id} wasn't explicitly created, we might need to rely on getParents and filter, 
            // OR finding if there's a getParent endpoint. 
            // Looking at parent.php, there was NOT a getParent/{id} endpoint.
            // I should add `getParent/{id}` to parent.php as well for efficiency, 
            // but for now let's assume I can get it from the list or I'll add the endpoint.
            // Let's add the endpoint quickly in the backend task or just use getParents if list is small.
            // To be robust, I should add getParent/{id} to parent.php. 
            // I will do that in a moment. For now let's write this to use it.
            const response = await api.get(`/getParents`); // Temporary: Fetch all and find. detailed view logic might need a specific endpoint.
            if (response.data.parents) {
                const found = response.data.parents.find(p => p.id == id);
                if (found) {
                    setParent({
                        name: found.name || '',
                        email: found.email || '',
                        phoneNumber: found.phone_number || '',
                        occupation: found.occupation || '',
                        annual_income: found.annual_income || '',
                        address: found.address || '',
                        city: found.city || '',
                        state: found.state || '',
                        zip_code: found.zip_code || '',
                        gender: found.gender || ''
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch parent:", error);
            notifications.show({ title: 'Error', message: 'Failed to load parent details', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            await api.post('/updateParent', { ...parent, id });
            notifications.show({ title: 'Success', message: 'Parent updated successfully', color: 'green' });
            navigate('/parents');
        } catch (err) {
            console.error(err);
            let msg = err.response?.data?.responseMessage || err.message || "An error occurred";
            setError(msg);
            notifications.show({ title: 'Error', message: msg, color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Edit Parent</Typography>
                <Typography variant="body2" color="text.secondary">Home / Parents / Edit Parent</Typography>
            </Box>

            {error && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee', color: '#c62828' }}>
                    <Typography>{error}</Typography>
                </Paper>
            )}

            <Box component="form" noValidate autoComplete="off">
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Name" name="name" value={parent.name} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Email" name="email" value={parent.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Phone" name="phoneNumber" value={parent.phoneNumber} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Occupation" name="occupation" value={parent.occupation} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Annual Income" name="annual_income" value={parent.annual_income} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="City" name="city" value={parent.city} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Address" name="address" value={parent.address} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Paper>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pb: 4 }}>
                    <Button variant="outlined" onClick={() => navigate('/parents')} sx={{ borderRadius: 5, px: 4, py: 1.5, borderColor: '#4d44b5', color: '#4d44b5' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ borderRadius: 5, px: 6, py: 1.5, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        {loading ? 'Saving...' : 'Update Parent'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditParent;
