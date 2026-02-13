import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    TextField,
    MenuItem,
    Button,
    Typography,
    Stack,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from '../../services/api';
import { notifications } from '@mantine/notifications';

export default function SubToTeacher() {
    const [classes, setClasses] = useState([]);      // List of Parent Classes (Grades) with ID
    const [sections, setSections] = useState([]);    // List of Sections for selected Class
    const [subjects, setSubjects] = useState([]);    // List of Subjects assigned to Selected Class
    const [teachers, setTeachers] = useState([]);

    const [selectedClassId, setSelectedClassId] = useState("");
    const [selectedSectionId, setSelectedSectionId] = useState("");
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Temp store to hold all raw section data to filter relationally
    const [rawSections, setRawSections] = useState([]);

    useEffect(() => {
        fetchInitialData();
        fetchAssignments();
    }, []);

    // Refresh assignments list
    const fetchAssignments = async () => {
        try {
            const res = await api.get('/getAssignments');
            if (res.data.assignments) {
                setAssignments(res.data.assignments);
            }
        } catch (e) { console.error(e); }
    };

    const fetchInitialData = async () => {
        try {
            // 1. Fetch Teachers
            const tRes = await api.get('/getTeachers');
            if (tRes.data.teachers) setTeachers(tRes.data.teachers);

            // 2. Fetch Classes/Sections
            const cRes = await api.get('/getClasses');
            if (cRes.data.classes) {
                setRawSections(cRes.data.classes);
                // Extract unique Parent Classes
                const uniqueClasses = [];
                const seen = new Set();
                for (const item of cRes.data.classes) {
                    if (!seen.has(item.class_id)) {
                        seen.add(item.class_id);
                        uniqueClasses.push({ id: item.class_id, name: item.class_name });
                    }
                }
                setClasses(uniqueClasses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // When Class Changes, Filter Sections and Fetch Subjects
    const handleClassChange = async (classId) => {
        setSelectedClassId(classId);
        setSelectedSectionId("");
        setSelectedSubjectId("");

        // Filter sections for this class
        const relatedSections = rawSections.filter(s => s.class_id === classId);
        setSections(relatedSections);

        // Fetch Subjects for this Class (Curriculum)
        try {
            const subRes = await api.get(`/getClassSubjects?classId=${classId}`);
            if (subRes.data.subjects) {
                setSubjects(subRes.data.subjects);
            } else {
                setSubjects([]);
            }
        } catch (e) {
            console.error(e);
            setSubjects([]);
        }
    };

    const handleSave = async () => {
        if (!selectedSectionId || !selectedSubjectId || !selectedTeacherId) {
            notifications.show({ title: 'Error', message: 'All fields are required', color: 'red' });
            return;
        }
        setLoading(true);
        try {
            await api.post('/assignSubjectTeacher', {
                sectionId: selectedSectionId,
                subjectId: selectedSubjectId,
                teacherId: selectedTeacherId
            });
            notifications.show({ title: 'Success', message: 'Teacher Assigned Successfully', color: 'green' });
            fetchAssignments(); // Refresh list
            // clear form?
        } catch (error) {
            notifications.show({ title: 'Error', message: 'Failed to assign teacher', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={2}>
            {/* LEFT CARD */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: 0 }}>
                    <Typography variant="h6" mb={2}>
                        Assign Subject Teacher
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            select
                            label="Class *"
                            value={selectedClassId}
                            onChange={(e) => handleClassChange(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Select</MenuItem>
                            {classes.map((cls) => (
                                <MenuItem key={cls.id} value={cls.id}>
                                    {cls.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Section *"
                            value={selectedSectionId}
                            onChange={(e) => setSelectedSectionId(e.target.value)}
                            fullWidth
                            disabled={!selectedClassId}
                        >
                            <MenuItem value="">Select</MenuItem>
                            {sections.map((sec) => (
                                <MenuItem key={sec.section_id} value={sec.section_id}>
                                    {sec.section_name} ({sec.academic_year})
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Subject *"
                            value={selectedSubjectId}
                            onChange={(e) => setSelectedSubjectId(e.target.value)}
                            fullWidth
                            disabled={!selectedClassId}
                        >
                            <MenuItem value="">Select</MenuItem>
                            {subjects.map((sub) => (
                                <MenuItem key={sub.id} value={sub.id}>{sub.name} ({sub.code})</MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            label="Teacher *"
                            value={selectedTeacherId}
                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Select</MenuItem>
                            {teachers.map((t) => (
                                <MenuItem key={t.id} value={t.id}>
                                    {t.name} ({t.designation})
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box textAlign="right">
                            <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                                {loading ? 'Saving...' : 'Save'}
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
            </Grid>

            {/* RIGHT CARD */}
            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, borderRadius: 0 }}>
                    <Typography variant="h6" mb={2}>
                        Subject Teacher List
                    </Typography>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Class</TableCell>
                                <TableCell>Section</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {assignments.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.class_name}</TableCell>
                                    <TableCell>{row.section_name}</TableCell>
                                    <TableCell>{row.subject_name}</TableCell>
                                    <TableCell>{row.teacher_name}</TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to unassign this teacher?')) {
                                                    api.post('/deleteAssignment', { id: row.id })
                                                        .then(() => {
                                                            notifications.show({ title: 'Success', message: 'Assignment Removed', color: 'green' });
                                                            fetchAssignments();
                                                        })
                                                        .catch(e => console.error(e));
                                                }
                                            }}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
    );
}
