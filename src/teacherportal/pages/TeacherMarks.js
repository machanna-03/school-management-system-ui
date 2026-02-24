import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Card, CardContent, Select, MenuItem, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Chip, CircularProgress,
    Autocomplete, TextField
} from "@mui/material";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const TeacherMarks = () => {
    const [classes, setClasses] = useState([]);
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        invokeGetApi(config.getMySchool + apiList.getClassList, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setClasses(res.data.classes || []);
        });
        invokeGetApi(config.getMySchool + apiList.getExams, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setExams(res.data.exams || []);
        });
    }, []);

    const fetchStudents = useCallback(async (classId) => {
        if (!classId) return;
        const cls = classes.find(c => String(c.id) === String(classId));
        const res = await invokeGetApi(config.getMySchool + apiList.getStudents, { class: cls?.name });
        if (res.status === 200 && res.data?.responseCode === "200") setStudents(res.data.students || []);
    }, [classes]);

    useEffect(() => { fetchStudents(selectedClass); setSelectedStudent(null); }, [selectedClass, fetchStudents]);

    const fetchMarks = useCallback(async () => {
        const params = {};
        if (selectedClass) params.class_id = selectedClass;
        if (selectedExam) params.exam_id = selectedExam;
        if (selectedStudent) params.student_id = selectedStudent.id;
        setLoading(true);
        const res = await invokeGetApi(config.getMySchool + apiList.getStudentMarks, params);
        if (res.status === 200 && res.data?.responseCode === "200") setMarks(res.data.marks || []);
        setLoading(false);
    }, [selectedClass, selectedExam, selectedStudent]);

    useEffect(() => { fetchMarks(); }, [fetchMarks]);

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} color="#303972">Student Marks</Typography>
                <Typography variant="body2" color="#A098AE">View marks filtered by class, exam, or student.</Typography>
            </Box>

            {/* Filters */}
            <Card sx={{ borderRadius: 4, mb: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                    <Select size="small" value={selectedClass} displayEmpty onChange={e => setSelectedClass(e.target.value)} sx={{ minWidth: 180 }}>
                        <MenuItem value="">All Classes</MenuItem>
                        {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                    <Select size="small" value={selectedExam} displayEmpty onChange={e => setSelectedExam(e.target.value)} sx={{ minWidth: 200 }}>
                        <MenuItem value="">All Exams</MenuItem>
                        {exams.map(e => <MenuItem key={e.id} value={e.id}>{e.exam_name}</MenuItem>)}
                    </Select>
                    <Autocomplete
                        size="small"
                        options={students}
                        getOptionLabel={o => o.name || ""}
                        value={selectedStudent}
                        onChange={(_, v) => setSelectedStudent(v)}
                        disabled={!selectedClass}
                        sx={{ minWidth: 200 }}
                        renderInput={params => <TextField {...params} label="Student" />}
                    />
                </CardContent>
            </Card>

            {/* Table */}
            {loading ? (
                <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
            ) : (
                <Card sx={{ borderRadius: 4 }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                    {["Student", "Exam", "Subject", "Total", "Pass", "Obtained", "Result"].map(h => (
                                        <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>{h}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {marks.length === 0 ? (
                                    <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>No marks found.</TableCell></TableRow>
                                ) : marks.map((m, i) => (
                                    <TableRow
                                        key={i}
                                        hover
                                        sx={{
                                            bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                            '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                            '&:hover': { bgcolor: '#f0f1ff !important' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>{m.student_name}</TableCell>
                                        <TableCell>{m.exam_name}</TableCell>
                                        <TableCell>{m.subject_name}</TableCell>
                                        <TableCell>{m.total_marks}</TableCell>
                                        <TableCell>{m.passing_marks}</TableCell>
                                        <TableCell>
                                            <Typography fontWeight={700} color={Number(m.marks_obtained) >= Number(m.passing_marks) ? "success.main" : "error.main"}>
                                                {m.marks_obtained}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={Number(m.marks_obtained) >= Number(m.passing_marks) ? "Pass" : "Fail"} color={Number(m.marks_obtained) >= Number(m.passing_marks) ? "success" : "error"} size="small" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            )}
        </Box>
    );
};

export default TeacherMarks;
