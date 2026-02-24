import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Card, CardContent, Grid, TextField, Button,
    CircularProgress, Tabs, Tab, Select, MenuItem, InputLabel, FormControl, Chip
} from "@mui/material";
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { invokeGetApi, apiList } from "../services/ApiServices";
import { config } from "../config/Config";

const COLORS = ["#4d44b5", "#fb7d5b", "#fcc43e", "#30c7ec", "#369c5e", "#e91e8f"];

const StatCard = ({ label, value, sub, color }) => (
    <Card sx={{ borderRadius: 3, height: "100%" }}>
        <CardContent>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>{label}</Typography>
            <Typography variant="h4" fontWeight={700} sx={{ color: color || "#303972", my: 0.5 }}>{value}</Typography>
            {sub && <Typography variant="caption" color="text.secondary">{sub}</Typography>}
        </CardContent>
    </Card>
);

/* =================== ATTENDANCE TAB =================== */
const AttendanceReport = () => {
    const [from, setFrom] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10));
    const [to, setTo] = useState(new Date().toISOString().slice(0, 10));
    const [classes, setClasses] = useState([]);
    const [classId, setClassId] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        invokeGetApi(config.getMySchool + apiList.getClassList, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setClasses(res.data.classes || []);
        });
    }, []);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        const params = { from_date: from, to_date: to };
        if (classId) params.class_id = classId;
        const res = await invokeGetApi(config.getMySchool + apiList.getAttendanceReport, params);
        if (res.status === 200 && res.data?.responseCode === "200") setData(res.data);
        setLoading(false);
    }, [from, to, classId]);

    useEffect(() => { fetchReport(); }, [fetchReport]);

    return (
        <Box>
            {/* Filters */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "flex-end" }}>
                        <TextField size="small" type="date" label="From" InputLabelProps={{ shrink: true }} value={from} onChange={e => setFrom(e.target.value)} />
                        <TextField size="small" type="date" label="To" InputLabelProps={{ shrink: true }} value={to} onChange={e => setTo(e.target.value)} />
                        <FormControl size="small" sx={{ minWidth: 160 }}>
                            <InputLabel>Class (Optional)</InputLabel>
                            <Select label="Class (Optional)" value={classId} onChange={e => setClassId(e.target.value)}>
                                <MenuItem value="">All Classes</MenuItem>
                                {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={fetchReport}>Apply</Button>
                    </Box>
                </CardContent>
            </Card>

            {loading ? <Box sx={{ textAlign: "center", py: 8 }}><CircularProgress /></Box> : !data ? null : (
                <>
                    {/* Summary */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6} sm={3}><StatCard label="Total Records" value={data.summary.total_records} color="#303972" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Total Present" value={data.summary.total_present} color="#369c5e" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Total Absent" value={data.summary.total_absent} color="#fb7d5b" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Overall %" value={`${data.summary.overall_pct}%`} color="#4d44b5" /></Grid>
                    </Grid>

                    {/* Chart */}
                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>Daily Attendance</Typography>
                            {data.chart.length === 0 ? (
                                <Typography color="text.secondary" textAlign="center" py={4}>No attendance data for this period.</Typography>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={data.chart}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="present" name="Present" fill="#4d44b5" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="absent" name="Absent" fill="#fb7d5b" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}
        </Box>
    );
};

/* =================== FEE REPORT TAB =================== */
const FeeReport = () => {
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        const res = await invokeGetApi(config.getMySchool + apiList.getFeeReport, { year });
        if (res.status === 200 && res.data?.responseCode === "200") setData(res.data);
        setLoading(false);
    }, [year]);

    useEffect(() => { fetchReport(); }, [fetchReport]);

    const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());

    return (
        <Box>
            <Card sx={{ mb: 3, borderRadius: 3 }}>
                <CardContent>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                        <FormControl size="small">
                            <InputLabel>Year</InputLabel>
                            <Select label="Year" value={year} onChange={e => setYear(e.target.value)} sx={{ minWidth: 100 }}>
                                {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button variant="contained" onClick={fetchReport}>Apply</Button>
                    </Box>
                </CardContent>
            </Card>

            {loading ? <Box sx={{ textAlign: "center", py: 8 }}><CircularProgress /></Box> : !data ? null : (
                <>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6} sm={3}><StatCard label="Total Due" value={`₹${Number(data.summary.total_due).toLocaleString("en-IN")}`} color="#303972" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Collected" value={`₹${Number(data.summary.total_collected).toLocaleString("en-IN")}`} color="#369c5e" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Balance Due" value={`₹${Number(data.summary.balance_due).toLocaleString("en-IN")}`} color="#fb7d5b" /></Grid>
                        <Grid item xs={6} sm={3}><StatCard label="Collection %" value={`${data.summary.collection_pct}%`} color="#4d44b5" /></Grid>
                    </Grid>

                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>Monthly Fee Collection — {year}</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data.chart}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`} />
                                    <Bar dataKey="collected" name="Collected (₹)" fill="#4d44b5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </Box>
    );
};

/* =================== STUDENT SUMMARY TAB =================== */
const StudentSummary = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        invokeGetApi(config.getMySchool + apiList.getStudentsReport, {}).then(res => {
            if (res.status === 200 && res.data?.responseCode === "200") setData(res.data);
            setLoading(false);
        });
    }, []);

    if (loading) return <Box sx={{ textAlign: "center", py: 8 }}><CircularProgress /></Box>;
    if (!data) return null;

    return (
        <Box>
            <Grid container spacing={3}>
                {/* Class-wise bar chart */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>Class-wise Enrollment</Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={data.by_class}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="class_name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="male" name="Male" fill="#4d44b5" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="female" name="Female" fill="#fb7d5b" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Gender pie */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 3, height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>Gender Distribution</Typography>
                            <Typography variant="h4" fontWeight={700} color="#4d44b5" textAlign="center">{data.total_students}</Typography>
                            <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mb={2}>Total Students</Typography>
                            <ResponsiveContainer width="100%" height={180}>
                                <PieChart>
                                    <Pie data={data.gender_summary} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                        {data.gender_summary.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

/* =================== MAIN REPORTS PAGE =================== */
const Reports = () => {
    const [tab, setTab] = useState(0);

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1" color="text.primary" mb={0.5}>Reports & Analytics</Typography>
                <Typography variant="body2" color="text.secondary">School-wide data insights powered by live data.</Typography>
            </Box>

            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, "& .MuiTab-root": { textTransform: "none", fontWeight: 600 } }}>
                <Tab label="📅 Attendance Report" />
                <Tab label="💰 Fee Collection" />
                <Tab label="🎓 Student Summary" />
            </Tabs>

            {tab === 0 && <AttendanceReport />}
            {tab === 1 && <FeeReport />}
            {tab === 2 && <StudentSummary />}
        </Box>
    );
};

export default Reports;
