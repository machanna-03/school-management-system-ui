import React from 'react';
import { Box, Typography, Grid, TextField, Button, Stack, Avatar } from '@mui/material';
import Card from '../../components/common/Card';

const AddTeacher = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h1" color="text.primary">Add New Teacher</Typography>
            </Box>

            {/* Personal Details */}
            <Box sx={{ mb: 4 }}>
                {/* Note: Card component handles the white background/padding. We might need to wrap in Card or use it as container */}
                {/* The image shows a label "Personal Details" maybe implied or just the fields? 
            Actually image 3 starts with "First Name", "Last Name" inside a card. 
            There isn't an explicit "Personal Details" header visible in the crop, but "Education" is visible below.
            I will Assume the first block is Personal Details.
        */}
                <Card title="">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>First Name<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="James" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Last Name<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="Lee" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Email<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="hello@example.com" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Phone Number<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="+123456789" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Address<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth multiline rows={5} placeholder="" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Photo<span style={{ color: 'red' }}>*</span></Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Avatar sx={{ width: 100, height: 100, bgcolor: '#f0f1f5' }} /> {/* Placeholder image likely user icon */}
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" sx={{ bgcolor: '#4d44b5', textTransform: 'none', borderRadius: 2 }}>Choose File</Button>
                                    <Button variant="contained" sx={{ bgcolor: '#ffeaea', color: '#ff3d57', textTransform: 'none', borderRadius: 2, boxShadow: 'none' }}>Remove</Button>
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Date of Birth<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="01/29/2026" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Place of Birth<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="USA" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                    </Grid>
                </Card>
            </Box>

            {/* Education */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" color="text.primary" sx={{ mb: 2, fontWeight: 700 }}>Education</Typography>
                <Card>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>University<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="University of Oxford" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Degree<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="B.Tech" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>Start & End Date<span style={{ color: 'red' }}>*</span></Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField fullWidth placeholder="01/29/2026" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                                <TextField fullWidth placeholder="01/29/2026" variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography gutterBottom sx={{ color: '#3d4465', fontWeight: 600 }}>City<span style={{ color: 'red' }}>*</span></Typography>
                            <TextField fullWidth placeholder="USA" variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                        </Grid>
                    </Grid>
                </Card>
            </Box>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="contained" size="large" sx={{ bgcolor: '#4d44b5', borderRadius: 3, px: 4, py: 1.5, textTransform: 'none' }}>Save</Button>
            </Stack>

        </Box>
    );
};

export default AddTeacher;
