import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Avatar, InputBase, Paper, Stack, Chip, Alert, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { BiSearch, BiArrowBack, BiSave } from 'react-icons/bi';
import { notifications } from '@mantine/notifications';
import api from '../../services/api';
import { apiList } from '../../services/ApiServices';
import Card from '../../components/common/Card';

const AssignStudents = () => {
    const { id } = useParams(); // sectionId
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [classDetails, setClassDetails] = useState(null);
    const [allClasses, setAllClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(id || '');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            setSelectedClassId(id);
            fetchClassDetails(id);
        } else {
            fetchAllClasses();
        }
        fetchStudents();
    }, [id]);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        const filtered = students.filter(student =>
            student.name?.toLowerCase().includes(lowerSearch) ||
            student.admission_number?.toLowerCase().includes(lowerSearch)
        );
        setFilteredStudents(filtered);
    }, [searchTerm, students]);

    const fetchAllClasses = async () => {
        try {
            const response = await api.get(apiList.getClasses);
            if (response.data.classes) {
                setAllClasses(response.data.classes);
            }
        } catch (error) {
            console.error("Failed to fetch classes:", error);
            notifications.show({ title: 'Error', message: 'Failed to load classes list', color: 'red' });
        }
    };

    const fetchClassDetails = async (sectionId) => {
        try {
            const response = await api.get(`${apiList.getClass}/${sectionId}`);
            if (response.data.classes) {
                setClassDetails(response.data.classes);
            }
        } catch (error) {
            console.error("Failed to fetch class details:", error);
            notifications.show({ title: 'Error', message: 'Failed to load class details', color: 'red' });
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await api.get(apiList.getStudentsForAssignment);
            if (response.data.students) {
                setStudents(response.data.students);
                setFilteredStudents(response.data.students);
            }
        } catch (error) {
            console.error("Failed to fetch students:", error);
            notifications.show({ title: 'Error', message: 'Failed to load students', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    const handleClassChange = (event) => {
        const newId = event.target.value;
        setSelectedClassId(newId);
        navigate(`/classes/assign-students/${newId}`);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // Only select students NOT already in this class
            const assignable = filteredStudents.filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name);
            const allIds = assignable.map(s => s.id);
            setSelectedStudents(allIds);
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectOne = (event, studentId) => {
        if (event.target.checked) {
            setSelectedStudents(prev => [...prev, studentId]);
        } else {
            setSelectedStudents(prev => prev.filter(id => id !== studentId));
        }
    };

    const handleAssign = async () => {
        if (!selectedClassId) {
            notifications.show({ title: 'Warning', message: 'Please select a class first', color: 'yellow' });
            return;
        }

        if (selectedStudents.length === 0) {
            notifications.show({ title: 'Warning', message: 'Please select at least one student', color: 'yellow' });
            return;
        }

        setSubmitting(true);
        try {
            await api.post(apiList.assignStudentsToSection, {
                sectionId: selectedClassId,
                studentIds: selectedStudents
            });
            notifications.show({ title: 'Success', message: 'Students assigned successfully', color: 'green' });

            // Redirect to students list filtered by the assigned class
            if (classDetails && classDetails.class_name) {
                setTimeout(() => navigate(`/students?class=${encodeURIComponent(classDetails.class_name)}`), 1000);
            } else {
                setTimeout(() => navigate('/classes'), 1000);
            }
        } catch (error) {
            console.error("Failed to assign students:", error);
            notifications.show({ title: 'Error', message: 'Failed to assign students', color: 'red' });
            setSubmitting(false);
        }
    };

    if (loading) return <Typography sx={{ p: 4 }}>Loading...</Typography>;

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<BiArrowBack />}
                    onClick={() => navigate('/classes')}
                    sx={{ mb: 2, color: 'text.secondary' }}
                >
                    Back to Classes
                </Button>
                <Typography variant="h4" color="text.primary" fontWeight="bold">Class Assignments</Typography>

                {!id && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Select a class section to assign students.
                    </Typography>
                )}

                {classDetails && id && (
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                        Assigning to: <strong>{classDetails.class_name} - Section {classDetails.section_name}</strong> ({classDetails.academic_year})
                    </Typography>
                )}
            </Box>

            {/* Class Selection (If no ID provided) */}
            {!id && (
                <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 4 }}>
                    <FormControl fullWidth>
                        <InputLabel>Select Class Section</InputLabel>
                        <Select
                            value={selectedClassId}
                            label="Select Class Section"
                            onChange={handleClassChange}
                        >
                            {allClasses.map((cls) => (
                                <MenuItem key={cls.section_id} value={cls.section_id}>
                                    {cls.class_name} - Section {cls.section_name} ({cls.academic_year})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
            )}

            {/* Toolbar */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f0f1f5', px: 2, py: 1, borderRadius: '30px', width: { xs: '100%', sm: 320 } }}>
                    <BiSearch style={{ fontSize: 22, color: '#a1a5b7', marginRight: 10 }} />
                    <InputBase
                        placeholder="Search by name or admission no..."
                        sx={{ ml: 1, flex: 1, color: 'text.primary', fontSize: 14 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <Button
                    variant="contained"
                    onClick={handleAssign}
                    disabled={submitting || selectedStudents.length === 0 || !selectedClassId}
                    startIcon={<BiSave />}
                    sx={{ borderRadius: '30px', px: 3, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                >
                    {submitting ? 'Assigning...' : `Assign Selected (${selectedStudents.length})`}
                </Button>
            </Paper>

            {/* Students Table - To Assign by selection */}
            <Card>
                <Typography variant="h6" sx={{ p: 2, fontWeight: 600 }}>Unassigned or Other Class Students</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ '& th': { fontWeight: 600, color: 'text.secondary' } }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedStudents.length > 0 && selectedStudents.length < filteredStudents.filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name).length}
                                        checked={filteredStudents.filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name).length > 0 && selectedStudents.length === filteredStudents.filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name).length}
                                        onChange={handleSelectAll}
                                        disabled={!selectedClassId}
                                    />
                                </TableCell>
                                <TableCell>Admission No</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Current Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name).length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ py: 3 }}>No students available to assign.</TableCell>
                                </TableRow>
                            ) : (
                                filteredStudents
                                    .filter(s => s.class !== classDetails?.class_name || s.section !== classDetails?.section_name)
                                    .map((student) => {
                                        const isSelected = selectedStudents.indexOf(student.id) !== -1;
                                        return (
                                            <TableRow key={student.id} hover selected={isSelected}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isSelected}
                                                        onChange={(event) => handleSelectOne(event, student.id)}
                                                        disabled={!selectedClassId}
                                                    />
                                                </TableCell>
                                                <TableCell>{student.admission_number}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e1f1ff', color: '#4d44b5', fontSize: 14 }}>
                                                            {student.name.charAt(0)}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {student.class ? (
                                                        <Chip label={`${student.class} - ${student.section}`} size="small" variant="outlined" />
                                                    ) : (
                                                        <Chip label="Unassigned" size="small" color="warning" variant="outlined" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Already Assigned Students Table */}
            {classDetails && (
                <Card sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ p: 2, fontWeight: 600, color: 'text.secondary' }}>Students Currently in this Class</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ '& th': { fontWeight: 600, color: 'text.secondary' } }}>
                                    <TableCell>Admission No</TableCell>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Assigned Class</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.filter(s => s.class === classDetails.class_name && s.section === classDetails.section_name).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 3 }}>No students assigned to this class yet.</TableCell>
                                    </TableRow>
                                ) : (
                                    students
                                        .filter(s => s.class === classDetails.class_name && s.section === classDetails.section_name)
                                        .map((student) => (
                                            <TableRow key={student.id} hover>
                                                <TableCell>{student.admission_number}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e1f1ff', color: '#4d44b5', fontSize: 14 }}>
                                                            {student.name.charAt(0)}
                                                        </Avatar>
                                                        <Typography variant="body2" fontWeight={500}>{student.name}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={`${student.class} - ${student.section}`} size="small" color="success" variant="outlined" />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            )}
        </Box>
    );
};

export default AssignStudents;
