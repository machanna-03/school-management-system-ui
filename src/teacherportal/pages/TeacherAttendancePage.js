import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Card, CardContent, Select, MenuItem, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, CircularProgress
} from "@mui/material";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const STATUS_COLOR = { Present: "success", Absent: "error", Late: "warning" };

const TeacherAttendance = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        invokeGetApi(config.getMySchool + apiList.getClassList, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setClasses(res.data.classes || []);
        });
    }, []);

    const loadStudents = useCallback(async (classId) => {
        if (!classId) return;
        setLoading(true);
        // Use class_id for reliable DB-join filtering (no fragile text matching)
        const res = await invokeGetApi(config.getMySchool + apiList.getStudents, { class_id: classId, limit: 500 });
        if (res.status === 200 && res.data?.responseCode === "200") {
            const list = res.data.students || [];
            setStudents(list);
            const init = {};
            list.forEach(s => { init[s.id] = "Present"; });
            setAttendance(init);
        }
        setLoading(false);
        setSaved(false);
    }, []);

    useEffect(() => { loadStudents(selectedClass); }, [selectedClass, loadStudents]);

    const handleMark = (studentId, status) => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        const records = students.map(s => ({
            student_id: s.id,
            date: today,
            status: attendance[s.id] || "Present"
        }));
        // Use existing attendance endpoint
        await invokeApi(config.getMySchool + "/saveAttendance", { records });
        setSaving(false);
        setSaved(true);
    };

    const counts = {
        Present: students.filter(s => attendance[s.id] === "Present").length,
        Absent: students.filter(s => attendance[s.id] === "Absent").length,
        Late: students.filter(s => attendance[s.id] === "Late").length,
    };

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} color="#303972">Mark Attendance</Typography>
                <Typography variant="body2" color="#A098AE">{today}</Typography>
            </Box>

            <Card sx={{ borderRadius: 4, mb: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                    <Select size="small" value={selectedClass} displayEmpty onChange={e => setSelectedClass(e.target.value)} sx={{ minWidth: 220, borderRadius: 3 }}>
                        <MenuItem value="">— Select Class —</MenuItem>
                        {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                    {students.length > 0 && (
                        <>
                            <Chip label={`${counts.Present} Present`} color="success" size="small" />
                            <Chip label={`${counts.Absent} Absent`} color="error" size="small" />
                            <Chip label={`${counts.Late} Late`} color="warning" size="small" />
                            <Box ml="auto">
                                <Button variant="contained" onClick={handleSubmit} disabled={saving || saved}>
                                    {saved ? "✓ Saved" : saving ? "Saving..." : "Submit Attendance"}
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>

            {loading ? (
                <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
            ) : !selectedClass ? (
                <Box sx={{ textAlign: "center", py: 6 }}><Typography color="text.secondary">Select a class to begin.</Typography></Box>
            ) : students.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}><Typography color="text.secondary">No students in this class.</Typography></Box>
            ) : (
                <Card sx={{ borderRadius: 4 }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>#</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Student Name</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Roll No</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((s, idx) => (
                                    <TableRow
                                        key={s.id}
                                        hover
                                        sx={{
                                            bgcolor: idx % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                            '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                            '&:hover': { bgcolor: '#f0f1ff !important' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{s.name}</TableCell>
                                        <TableCell>{s.roll_number || "—"}</TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                                {["Present", "Absent", "Late"].map(status => (
                                                    <Chip
                                                        key={status}
                                                        label={status}
                                                        clickable
                                                        color={attendance[s.id] === status ? STATUS_COLOR[status] : "default"}
                                                        variant={attendance[s.id] === status ? "filled" : "outlined"}
                                                        size="small"
                                                        onClick={() => handleMark(s.id, status)}
                                                    />
                                                ))}
                                            </Box>
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

export default TeacherAttendance;
