import { Box, Typography, Button, Grid, TextField, Avatar } from '@mui/material';

const AddStudent = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary">Add Student</Typography>
                <Typography variant="body2" color="text.secondary">Home / Students / Add Student</Typography>
            </Box>

            <Box component="form" noValidate autoComplete="off">
                {/* Student Details Section */}
                <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 4, mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#3d4465' }}>Student Details</Typography>

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ mb: 1 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Photo *</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Box
                                        sx={{
                                            width: 150,
                                            height: 150,
                                            bgcolor: '#f0f1f5',
                                            borderRadius: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <Avatar src="" sx={{ width: '100%', height: '100%', borderRadius: 0 }} />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ width: 150, textAlign: 'center' }}>
                                        Upload a photo of the student
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={9}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>First Name *</Typography>
                                    <TextField fullWidth placeholder="First Name" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Last Name *</Typography>
                                    <TextField fullWidth placeholder="Last Name" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Date & Place of Birth *</Typography>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField type="date" fullWidth variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Parent Name *</Typography>
                                    <TextField fullWidth placeholder="Parent Name" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Email *</Typography>
                                    <TextField fullWidth placeholder="Email" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Phone *</Typography>
                                    <TextField fullWidth placeholder="Phone" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Address *</Typography>
                                    <TextField multiline rows={4} fullWidth placeholder="Address" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* Parents Details Section */}
                <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 4, mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#3d4465' }}>Parent Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Parent Name *</Typography>
                            <TextField fullWidth placeholder="First Name" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Relation *</Typography>
                            <TextField fullWidth placeholder="Relation" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Email *</Typography>
                            <TextField fullWidth placeholder="Email" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: '#3d4465', fontWeight: 600 }}>Phone *</Typography>
                            <TextField fullWidth placeholder="Phone" variant="outlined" InputProps={{ sx: { borderRadius: 2 } }} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <Button variant="outlined" sx={{ borderRadius: 5, px: 4, py: 1.5, borderColor: '#4d44b5', color: '#4d44b5' }}>Save as Draft</Button>
                    <Button variant="contained" sx={{ borderRadius: 5, px: 6, py: 1.5, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}>Save</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddStudent;
