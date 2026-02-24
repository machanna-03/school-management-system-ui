import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Card, CardContent, Select, MenuItem, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, CircularProgress, TextField
} from "@mui/material";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const TeacherTimetable = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [slots, setSlots] = useState([]);
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(false);

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const COLORS = ["#4d44b5", "#fb7d5b", "#30c7ec", "#fcc43e", "#369c5e"];

    useEffect(() => {
        invokeGetApi(config.getMySchool + apiList.getClassList, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setClasses(res.data.classes || []);
        });
    }, []);

    const fetchTimetable = useCallback(async (classId) => {
        if (!classId) { setSlots([]); setTimes([]); return; }
        setLoading(true);
        const res = await invokeGetApi(config.getMySchool + apiList.getTimetable, { class_id: classId });
        if (res.status === 200 && res.data?.responseCode === "200") {
            setSlots(res.data.slots || []);
            setTimes(res.data.times || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => { fetchTimetable(selectedClass); }, [selectedClass, fetchTimetable]);

    // Build colour map
    const colourMap = {};
    let ci = 0;
    slots.forEach(s => { if (s.subject && !s.is_break && !colourMap[s.subject]) colourMap[s.subject] = COLORS[ci++ % COLORS.length]; });

    // Build grid
    const grid = {};
    times.forEach(t => { grid[t.start_time] = {}; });
    slots.forEach(s => {
        if (!grid[s.start_time]) grid[s.start_time] = {};
        grid[s.start_time][s.day] = s;
    });

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} color="#303972">Class Timetable</Typography>
                <Typography variant="body2" color="#A098AE">View the weekly schedule for any class.</Typography>
            </Box>

            <Card sx={{ borderRadius: 4, mb: 3 }}>
                <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Select size="small" value={selectedClass} displayEmpty onChange={e => setSelectedClass(e.target.value)} sx={{ minWidth: 220, borderRadius: 3 }}>
                        <MenuItem value="">— Select Class —</MenuItem>
                        {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                    {slots.length > 0 && <Chip label={`${slots.length} slots`} color="primary" size="small" />}
                </CardContent>
            </Card>

            {loading ? (
                <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
            ) : !selectedClass ? (
                <Box sx={{ textAlign: "center", py: 6 }}><Typography color="text.secondary">Select a class to view its timetable.</Typography></Box>
            ) : times.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}><Typography color="text.secondary">No timetable defined for this class yet.</Typography></Box>
            ) : (
                <Card sx={{ borderRadius: 4, overflow: "auto" }}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Day / Time</TableCell>
                                {times.map((t, i) => (
                                    <TableCell key={i} align="center" sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>
                                        {t.start_time?.slice(0, 5)} – {t.end_time?.slice(0, 5)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {DAYS.map(day => (
                                <TableRow key={day} sx={{ "& td": { borderBottom: "1px solid #f0f1f5", py: 2 } }}>
                                    <TableCell sx={{ fontWeight: 600, color: "#3d4465" }}>{day}</TableCell>
                                    {times.map((t, i) => {
                                        const slot = grid[t.start_time]?.[day];
                                        return (
                                            <TableCell key={i} align="center">
                                                {slot ? (
                                                    slot.is_break ? (
                                                        <Box sx={{ bgcolor: "#f0f1f5", py: 1, borderRadius: 2, color: "#a1a5b7", fontSize: 12 }}>BREAK</Box>
                                                    ) : (
                                                        <Box sx={{ bgcolor: (colourMap[slot.subject] || "#4d44b5") + "18", py: 1, px: 1, borderRadius: 2, borderLeft: `3px solid ${colourMap[slot.subject] || "#4d44b5"}` }}>
                                                            <Typography fontWeight={700} fontSize={12} color={colourMap[slot.subject] || "#4d44b5"}>{slot.subject}</Typography>
                                                            {slot.room && <Typography fontSize={11} color="text.secondary">Room {slot.room}</Typography>}
                                                        </Box>
                                                    )
                                                ) : (
                                                    <Box sx={{ height: 36, bgcolor: "#fafafa", borderRadius: 1 }} />
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </Box>
    );
};

export default TeacherTimetable;
