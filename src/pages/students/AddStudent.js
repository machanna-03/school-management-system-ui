import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, MenuItem, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

const AddStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null); // { studentPass, parentPass }
    const [error, setError] = useState('');

    // Student State
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        blood_group: '',
        religion: '',
        caste: '',
        admission_number: '',
        admission_date: new Date().toISOString().split('T')[0],
        class: '',
        section: '',
        roll_number: '',
        email: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        father_name: '',
        mother_name: '',
        guardian_name: ''
    });

    // Parent State
    const [parent, setParent] = useState({
        name: '',
        relation: '', // Father, Mother, Guardian
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
        if (isEditMode) {
            fetchStudentDetails();
        }
    }, [id]);

    const fetchStudentDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/getStudent/${id}`);
            const data = response.data.student;

            // Split name into First and Last
            const nameParts = data.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');

            setStudent({
                firstName: firstName || '',
                lastName: lastName || '',
                dob: data.dob || '',
                gender: data.gender || '',
                blood_group: data.blood_group || '',
                religion: data.religion || '',
                caste: data.caste || '',
                admission_number: data.admission_number || '',
                admission_date: data.admission_date || '',
                class: data.class || '',
                section: data.section || '',
                roll_number: data.roll_number || '',
                email: data.email || '', // From Users table
                phoneNumber: data.phone_number || '', // From Users table
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                zip_code: data.zip_code || '',
                country: data.country || '',
                father_name: data.father_name || '',
                mother_name: data.mother_name || '',
                guardian_name: data.guardian_name || ''
            });

            // Populate Parent if available (taking the first one for simplicity for now)
            if (data.parents && data.parents.length > 0) {
                const p = data.parents[0];
                setParent({
                    name: p.name || '',
                    relation: p.relationship || '',
                    email: p.email || '',
                    phoneNumber: p.phone_number || '',
                    occupation: p.occupation || '',
                    annual_income: p.annual_income || '',
                    address: p.address || '',
                    city: p.city || '',
                    state: p.state || '',
                    zip_code: p.zip_code || '',
                    gender: p.gender || ''
                });
            }

        } catch (error) {
            console.error("Failed to fetch student details:", error);
            notifications.show({ title: 'Error', message: 'Failed to load student details', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        if (section === 'student') {
            setStudent(prev => ({ ...prev, [name]: value }));
        } else {
            setParent(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        setSuccessData(null);

        try {
            const studentPayload = {
                ...student,
                name: `${student.firstName} ${student.lastName}`.trim(),
                father_name: parent.relation === 'Father' ? parent.name : student.father_name,
                mother_name: parent.relation === 'Mother' ? parent.name : student.mother_name,
                guardian_name: parent.relation === 'Guardian' ? parent.name : student.guardian_name,
            };

            if (isEditMode) {
                // UPDATE MODE
                await api.post('/updateStudent', { ...studentPayload, id });
                notifications.show({ title: 'Success', message: 'Student updated successfully', color: 'green' });
                navigate('/students'); // Go back to list
            } else {
                // ADD MODE
                // 1. Add Student
                const studentRes = await api.post('/addStudent', studentPayload);
                const studentId = studentRes.data.studentId;
                const studentPass = studentRes.data.password;

                // 2. Add Parent
                const parentPayload = {
                    ...parent,
                    address: parent.address || student.address,
                    city: parent.city || student.city,
                    state: parent.state || student.state,
                    zip_code: parent.zip_code || student.zip_code,
                };

                const parentRes = await api.post('/addParent', parentPayload);
                const parentId = parentRes.data.parentId;
                const parentPass = parentRes.data.password;

                // 3. Map Student to Parent
                const mapPayload = {
                    student_id: studentId,
                    parent_id: parentId,
                    relationship: parent.relation,
                    is_emergency_contact: true
                };

                await api.post('/mapStudentParent', mapPayload);

                // Success
                setSuccessData({ studentPass, parentPass });
            }

        } catch (err) {
            console.error(err);
            let msg = err.response?.data?.responseMessage || err.message || "An error occurred";
            if (msg.includes("Email already exists")) {
                msg = "A user with this email already exists.";
            }
            setError(msg);
            notifications.show({ title: 'Error', message: msg, color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" color="text.primary" fontWeight="bold">{isEditMode ? 'Edit Student' : 'Add New Student'}</Typography>
                <Typography variant="body2" color="text.secondary">Home / Students / {isEditMode ? 'Edit' : 'Add'} Student</Typography>
            </Box>

            {error && (
                <Paper sx={{ p: 2, mb: 3, bgcolor: '#ffebee', color: '#c62828' }}>
                    <Typography>{error}</Typography>
                </Paper>
            )}

            <Box component="form" noValidate autoComplete="off">

                {/* 1. Academic Details */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Academic Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth required label="Admission Number" name="admission_number" value={student.admission_number} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth required label="Admission Date" type="date" name="admission_date" value={student.admission_date} onChange={(e) => handleChange(e, 'student')} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth required label="Class" name="class" value={student.class} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth required label="Section" name="section" value={student.section} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Roll Number" name="roll_number" value={student.roll_number} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                    </Grid>
                </Paper>

                {/* 2. Personal Details */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Personal Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="First Name" name="firstName" value={student.firstName} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Last Name" name="lastName" value={student.lastName} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth required label="Date of Birth" type="date" name="dob" value={student.dob} onChange={(e) => handleChange(e, 'student')} InputLabelProps={{ shrink: true }} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Gender" name="gender" value={student.gender} onChange={(e) => handleChange(e, 'student')}>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField select fullWidth label="Blood Group" name="blood_group" value={student.blood_group} onChange={(e) => handleChange(e, 'student')}>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <MenuItem key={bg} value={bg}>{bg}</MenuItem>)}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Religion" name="religion" value={student.religion} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth label="Caste" name="caste" value={student.caste} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Email" name="email" value={student.email} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Phone" name="phoneNumber" value={student.phoneNumber} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>Address</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Address Line" name="address" value={student.address} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="City" name="city" value={student.city} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="State" name="state" value={student.state} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="Zip Code" name="zip_code" value={student.zip_code} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="Country" name="country" value={student.country} onChange={(e) => handleChange(e, 'student')} />
                        </Grid>
                    </Grid>
                </Paper>

                {/* 3. Parent Details (Only show in Add mode for now, or read-only in Edit) */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4, border: '1px solid #e0e0e0' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#4d44b5' }}>Parent / Guardian Details {isEditMode && "(Read Only)"}</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Parent Name" name="name" value={parent.name} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField select fullWidth required label="Relationship" name="relation" value={parent.relation} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode}>
                                <MenuItem value="Father">Father</MenuItem>
                                <MenuItem value="Mother">Mother</MenuItem>
                                <MenuItem value="Guardian">Guardian</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Parent Email" name="email" value={parent.email} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth required label="Parent Phone" name="phoneNumber" value={parent.phoneNumber} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Occupation" name="occupation" value={parent.occupation} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Annual Income" name="annual_income" value={parent.annual_income} onChange={(e) => handleChange(e, 'parent')} disabled={isEditMode} />
                        </Grid>
                    </Grid>
                </Paper>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', pb: 4 }}>
                    <Button variant="outlined" onClick={() => navigate('/students')} sx={{ borderRadius: 5, px: 4, py: 1.5, borderColor: '#4d44b5', color: '#4d44b5' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{ borderRadius: 5, px: 6, py: 1.5, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Student' : 'Submit')}
                    </Button>
                </Box>
            </Box>

            {/* Success Dialog */}
            <Dialog open={!!successData} onClose={() => setSuccessData(null)}>
                <DialogTitle sx={{ bgcolor: '#4caf50', color: 'white' }}>Registration Successful</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Typography variant="body1">Student and Parent accounts have been created successfully.</Typography>
                    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold">Student Password:</Typography>
                        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>{successData?.studentPass}</Typography>

                        <Divider />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold">Parent Password:</Typography>
                            <Typography variant="h6" color="primary">{successData?.parentPass}</Typography>
                        </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                        Please share these credentials with the users immediately.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessData(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddStudent;
