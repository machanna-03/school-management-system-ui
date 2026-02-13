import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const AddTeacher = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null);
    const [error, setError] = useState('');

    const [teacher, setTeacher] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        designation: '',
        department: '',
        qualification: '',
        joining_date: new Date().toISOString().split('T')[0],
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        dob: '',
        gender: '',
        password: '', // Only for new teachers
        confirmPassword: '' // Only for new teachers
    });

    useEffect(() => {
        if (isEditMode) {
            fetchTeacherDetails();
        }
    }, [id]);

    const fetchTeacherDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/getTeacher/${id}`);
            if (response.data.teacher) {
                const t = response.data.teacher;
                const nameParts = t.name ? t.name.split(' ') : ['', ''];
                setTeacher({
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    email: t.email || '',
                    phoneNumber: t.phone_number || '',
                    designation: t.designation || '',
                    department: t.department || '',
                    qualification: t.qualification || '',
                    joining_date: t.joining_date || '',
                    address: t.address || '',
                    city: t.city || '',
                    state: t.state || '',
                    zip_code: t.zip_code || '',
                    country: t.country || '',
                    dob: t.dob || '',
                    gender: t.gender || '',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error("Failed to fetch teacher:", error);
            setError("Failed to fetch teacher details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessData(null);

        // Basic Validation
        if (!teacher.firstName || !teacher.email || !teacher.phoneNumber) {
            setError("Please fill in all mandatory fields (First Name, Email, Phone)");
            setLoading(false);
            return;
        }

        if (!isEditMode && teacher.password !== teacher.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            if (isEditMode) {
                const payload = { ...teacher, id };
                // Remove password fields for update if empty or handle separately (API ignores them usually if not sent, but here we include them as empty strings which is fine if backend checks)
                // Backend check: teacher.php update ignores password unless we add logic. My updateTeacher logic specifically looked for status/etc in user table but didn't explicitly update password.
                // So password won't be updated here, which is safer.
                await api.post('/updateTeacher', payload);
                alert("Teacher Updated Successfully!");
                navigate('/teachers');
            } else {
                const payload = { ...teacher };
                const response = await api.post('/addTeacher', payload);
                setSuccessData({ password: response.data.password });
            }

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.responseMessage || err.message || "An error occurred";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">{isEditMode ? 'Edit Teacher' : 'Add New Teacher'}</Typography>
                <Typography variant="body2" color="text.secondary">Home / Teachers / {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}</Typography>
            </Box>

            {error && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee', color: '#c62828' }}>
                    <Typography>{error}</Typography>
                </Paper>
            )}

            <Box component="form" noValidate autoComplete="off">

                {/* Personal Details */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Personal Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="First Name" name="firstName" value={teacher.firstName} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Last Name" name="lastName" value={teacher.lastName} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Email" name="email" value={teacher.email} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Phone Number" name="phoneNumber" value={teacher.phoneNumber} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Date of Birth" type="date" name="dob" value={teacher.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField select fullWidth label="Gender" name="gender" value={teacher.gender} onChange={handleChange}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField fullWidth label="Address" multiline rows={3} name="address" value={teacher.address} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="City" name="city" value={teacher.city} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="State" name="state" value={teacher.state} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="Zip Code" name="zip_code" value={teacher.zip_code} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="Country" name="country" value={teacher.country} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Paper>

                {/* Professional Details */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Professional Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Designation" name="designation" value={teacher.designation} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Department" name="department" value={teacher.department} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Qualification" name="qualification" value={teacher.qualification} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Joining Date" type="date" name="joining_date" value={teacher.joining_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                        </Grid>
                    </Grid>
                </Paper>

                {!isEditMode && (
                    <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Account Security</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Password" type="password" name="password" value={teacher.password} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Confirm Password" type="password" name="confirmPassword" value={teacher.confirmPassword} onChange={handleChange} />
                            </Grid>
                        </Grid>
                    </Paper>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pb: 4 }}>
                    <Button variant="outlined" onClick={() => navigate('/teachers')} sx={{ borderRadius: 5, px: 4, py: 1.5, borderColor: '#4d44b5', color: '#4d44b5' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ borderRadius: 5, px: 6, py: 1.5, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Teacher' : 'Submit')}
                    </Button>
                </Box>

            </Box>

            {/* Success Dialog */}
            <Dialog open={!!successData} onClose={() => { setSuccessData(null); navigate('/teachers'); }}>
                <DialogTitle sx={{ bgcolor: '#4caf50', color: 'white' }}>Teacher Registered Successfully</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Typography variant="body1">Teacher account has been created.</Typography>
                    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold">Password:</Typography>
                        <Typography variant="h6" color="primary">{successData?.password}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Please share these credentials with the teacher.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setSuccessData(null); navigate('/teachers'); }}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddTeacher;
