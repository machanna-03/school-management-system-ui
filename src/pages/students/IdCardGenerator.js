import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Avatar, Select, MenuItem, FormControl, InputLabel, Divider, Stack, CircularProgress, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { BiCreditCard, BiDownload, BiUser, BiIdCard, BiCheckSquare, BiSquare } from 'react-icons/bi';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

const IdCardGenerator = () => {
    const [classes, setClasses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]); // For batch generation
    const [loading, setLoading] = useState(false);
    const [schoolInfo, setSchoolInfo] = useState({});

    useEffect(() => {
        fetchClasses();
        fetchSchoolSettings();
    }, []);

    const fetchSchoolSettings = async () => {
        try {
            const res = await invokeGetApi(config.getMySchool + apiList.getSettings);
            if (res.status === 200) setSchoolInfo(res.data.settings || {});
        } catch (e) { console.error(e); }
    };

    const fetchClasses = async () => {
        try {
            const response = await invokeGetApi(config.getMySchool + apiList.getClasses);
            if (response.data.responseCode === "200") setClasses(response.data.classes || []);
        } catch (error) { console.error(error); }
    };

    const fetchStudents = async (classId) => {
        setLoading(true);
        try {
            const response = await invokeGetApi(config.getMySchool + apiList.getStudentsByClass, { class_id: classId });
            if (response.data.responseCode === "200") setStudents(response.data.students || []);
        } catch (error) { console.error(error); }
        setLoading(false);
    };

    const handleClassChange = (e) => {
        const val = e.target.value;
        setSelectedClass(val);
        setSelectedStudent(null);
        setSelectedStudents([]);
        fetchStudents(val);
    };

    const toggleStudentSelection = (student) => {
        const currentIndex = selectedStudents.findIndex(s => s.id === student.id);
        const newSelected = [...selectedStudents];

        if (currentIndex === -1) {
            newSelected.push(student);
        } else {
            newSelected.splice(currentIndex, 1);
        }

        setSelectedStudents(newSelected);
        if (newSelected.length >= 1) setSelectedStudent(newSelected[0]);
        else setSelectedStudent(null);
    };

    const generatePDF = async (studentList) => {
        if (studentList.length === 0) return;
        try {
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.default;

            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: [85.6, 53.98]
            });

            for (let i = 0; i < studentList.length; i++) {
                const student = studentList[i];
                if (i > 0) pdf.addPage([85.6, 53.98], 'landscape');

                const width = 85.6;
                const height = 53.98;

                // Header Background
                pdf.setFillColor(77, 68, 181);
                pdf.rect(0, 0, width, 15, 'F');

                // School Name
                pdf.setTextColor(255);
                pdf.setFontSize(10);
                pdf.setFont('helvetica', 'bold');
                pdf.text(schoolInfo.school_name || "ABC PUBLIC SCHOOL", width / 2, 7, { align: 'center' });
                pdf.setFontSize(6);
                pdf.text(schoolInfo.school_tagline || "Education for Excellence", width / 2, 11, { align: 'center' });

                // Profile Picture Placeholder
                pdf.setDrawColor(220);
                pdf.setFillColor(245, 246, 250);
                pdf.roundedRect(8, 20, 22, 25, 2, 2, 'F');
                pdf.setFontSize(5);
                pdf.setTextColor(150);
                pdf.text("PHOTO", 19, 32.5, { align: 'center' });

                // Student Info
                pdf.setTextColor(48, 57, 114);
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'bold');
                pdf.text(`${student.first_name || student.name || ''} ${student.last_name || ''}`, 35, 25);

                pdf.setFontSize(6);
                pdf.setTextColor(110);
                pdf.text("STUDENT ID", 35, 30);
                pdf.setFont('helvetica', 'bold');
                pdf.text(student.admission_number || student.id.toString(), 35, 33);

                pdf.setFont('helvetica', 'normal');
                pdf.text("CLASS", 55, 30);
                pdf.setFont('helvetica', 'bold');
                const cls = classes.find(c => c.id == selectedClass);
                pdf.text(cls ? cls.class_name : "-", 55, 33);

                pdf.setFont('helvetica', 'normal');
                pdf.text("BLOOD GROUP", 35, 38);
                pdf.setFont('helvetica', 'bold');
                pdf.text(student.blood_group || "-", 35, 41);

                pdf.setFont('helvetica', 'normal');
                pdf.text("PHONE", 55, 38);
                pdf.setFont('helvetica', 'bold');
                pdf.text(student.phone_number || student.phone || "-", 55, 41);

                // QR Code Placeholder
                pdf.setDrawColor(77, 68, 181);
                pdf.setLineWidth(0.1);
                pdf.rect(width - 15, 20, 10, 10);
                pdf.setFontSize(4);
                pdf.text("VERIFY", width - 10, 32, { align: 'center' });

                // Footer
                pdf.setFillColor(245, 246, 250);
                pdf.rect(0, 48, width, 5.98, 'F');
                pdf.setFontSize(5);
                pdf.setTextColor(150);
                pdf.text(schoolInfo.address || "Bengaluru, India", width / 2, 51, { align: 'center' });
            }

            pdf.save(studentList.length === 1 ? `ID-Card-${studentList[0].first_name || studentList[0].name}.pdf` : `ID-Cards-Batch.pdf`);
        } catch (err) {
            console.error("ID Card generation failed:", err);
        }
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 1 }}>ID Card Generator</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Generate and preview printable student ID cards.</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '70vh' }}>
                        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Select Class</InputLabel>
                                <Select value={selectedClass} label="Select Class" onChange={handleClassChange}>
                                    {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.class_name}</MenuItem>)}
                                </Select>
                            </FormControl>

                            <Box sx={{ flexGrow: 1, overflow: 'auto', bgcolor: '#fcfcfd', borderRadius: 2, border: '1px solid #eee' }}>
                                {loading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress size={24} /></Box>
                                ) : (
                                    <List size="small">
                                        {students.map((student) => {
                                            const isSelected = selectedStudents.some(s => s.id === student.id);
                                            return (
                                                <ListItem key={student.id} disablePadding>
                                                    <ListItemButton onClick={() => toggleStudentSelection(student)} sx={{ py: 0.5 }}>
                                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                                            <Checkbox
                                                                edge="start"
                                                                checked={isSelected}
                                                                tabIndex={-1}
                                                                disableRipple
                                                                size="small"
                                                            />
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography variant="body2" fontWeight={500}>{student.name || `${student.first_name} ${student.last_name}`}</Typography>}
                                                            secondary={<Typography variant="caption">{student.admission_number}</Typography>}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                )}
                            </Box>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => setSelectedStudents(students)}
                                    disabled={students.length === 0}
                                    sx={{ borderRadius: 2, textTransform: 'none' }}
                                >
                                    Select All
                                </Button>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    disabled={selectedStudents.length === 0}
                                    onClick={() => generatePDF(selectedStudents)}
                                    sx={{ bgcolor: '#4d44b5', borderRadius: 2, textTransform: 'none' }}
                                >
                                    Generate ({selectedStudents.length})
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    {selectedStudent ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Card Preview ({selectedStudents.length} selected)</Typography>
                            <Box sx={{
                                width: 450,
                                height: 280,
                                bgcolor: 'white',
                                border: '1px solid #e0e0e0',
                                borderRadius: 4,
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}>
                                <Box sx={{ bgcolor: '#4d44b5', color: 'white', py: 2, textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.1rem' }}>{schoolInfo.school_name || "ABC PUBLIC SCHOOL"}</Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>{schoolInfo.school_tagline || "Education for Excellence"}</Typography>
                                </Box>

                                <Box sx={{ p: 3, display: 'flex', gap: 3 }}>
                                    <Box sx={{ width: 120, height: 140, bgcolor: '#f5f6fa', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #eee' }}>
                                        <BiUser size={50} color="#ccc" />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h5" fontWeight={700} color="#303972" sx={{ mb: 1 }}>{selectedStudent.name || `${selectedStudent.first_name} ${selectedStudent.last_name}`}</Typography>

                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>STUDENT ID</Typography>
                                                <Typography variant="body2" fontWeight={700}>{selectedStudent.admission_number}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>CLASS</Typography>
                                                <Typography variant="body2" fontWeight={700}>{classes.find(c => c.id == selectedClass)?.class_name}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>BLOOD GROUP</Typography>
                                                <Typography variant="body2" fontWeight={700}>{selectedStudent.blood_group || "-"}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>PHONE</Typography>
                                                <Typography variant="body2" fontWeight={700}>{selectedStudent.phone_number || selectedStudent.phone || "-"}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ width: 60, height: 60, border: '1px solid #eee', p: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img src={`https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=STUDENT:${selectedStudent.admission_number}`} alt="QR" style={{ width: '100%' }} />
                                        <Typography variant="caption" sx={{ fontSize: '0.5rem', mt: 0.5 }}>VERIFY</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: '#f9fafb', py: 1, textAlign: 'center', borderTop: '1px solid #eee' }}>
                                    <Typography variant="caption" color="text.secondary">{schoolInfo.address || "Bengaluru, Karnataka, India"}</Typography>
                                </Box>

                                <Box sx={{ position: 'absolute', right: -20, top: 40, width: 100, height: 100, borderRadius: '50%', bgcolor: 'rgba(77, 68, 181, 0.05)' }} />
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', borderRadius: 4, border: '2px dashed #e0e0e0' }}>
                            <BiIdCard size={60} color="#ccc" />
                            <Typography color="text.secondary" sx={{ mt: 2 }}>Select student(s) to preview and generate ID cards</Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default IdCardGenerator;
