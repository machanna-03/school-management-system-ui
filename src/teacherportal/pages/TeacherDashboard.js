import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Stack, Chip, CircularProgress } from "@mui/material";
import { BiUser, BiBook, BiCalendarEvent, BiCheckCircle } from "react-icons/bi";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const StatCard = ({ title, value, icon, color, bgcolor, loading }) => (
    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <Typography color="text.secondary" variant="body2" fontWeight={600} sx={{ mb: 1 }}>{title}</Typography>
                {loading ? <CircularProgress size={24} /> : (
                    <Typography variant="h4" fontWeight={700} sx={{ color: '#303972' }}>{value}</Typography>
                )}
            </Box>
            <Box sx={{ width: 60, height: 60, borderRadius: '50%', bgcolor, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const TeacherDashboard = () => {
    const [stats, setStats] = useState({ students: 0, classes: 0, present_today: 0, pending_marks: 0 });
    const [todaySlots, setTodaySlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(sessionStorage.getItem("userData") || "{}");
    const teacherName = user.name || user.username || "Teacher";

    useEffect(() => {
        Promise.all([
            invokeGetApi(config.getMySchool + apiList.getStudents, {}),
            invokeGetApi(config.getMySchool + apiList.getClassList, {}),
            invokeGetApi(config.getMySchool + apiList.getStudentMarks, {}),
        ]).then(([sRes, cRes, mRes]) => {
            const studentCount = (sRes.data?.students || []).length;
            const classCount = (cRes.data?.classes || []).length;
            const marksCount = (mRes.data?.marks || []).length;
            setStats({
                students: studentCount,
                classes: classCount,
                pending_marks: marksCount > 0 ? 0 : "—",
                present_today: "—"
            });
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>Welcome, {teacherName}! 👋</Typography>
                    <Typography variant="body1" sx={{ color: '#A098AE' }}>Have a great {weekday}!</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 600 }}>
                    {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Students" value={stats.students} icon={<BiUser />} color="#4d44b5" bgcolor="#F3F4FF" loading={loading} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Classes" value={stats.classes} icon={<BiBook />} color="#FB7D5B" bgcolor="#FFF4DE" loading={loading} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Today's Attendance" value={stats.present_today} icon={<BiCheckCircle />} color="#FCC43E" bgcolor="#FEF6E6" loading={loading} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Marks Submitted" value={stats.pending_marks !== "—" ? "Up to date" : "Pending"} icon={<BiCalendarEvent />} color="#303972" bgcolor="#E8EAF6" loading={loading} />
                </Grid>
            </Grid>

            {/* Quick Links */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Quick Actions</Typography>
                            <Stack spacing={2} direction="row" flexWrap="wrap" gap={1}>
                                {[
                                    { label: "📋 Mark Attendance", href: "/teacher/attendance" },
                                    { label: "🗓️ View Timetable", href: "/teacher/timetable" },
                                    { label: "📊 Student Marks", href: "/teacher/marks" },
                                    { label: "🏫 My Classes", href: "/teacher/classes" },
                                ].map((item, i) => (
                                    <Button key={i} variant={i === 0 ? "contained" : "outlined"} href={item.href}
                                        sx={{ borderRadius: 3, textTransform: "none", minWidth: 170 }}>
                                        {item.label}
                                    </Button>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>Today</Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </Typography>
                            <Stack spacing={1}>
                                <Chip icon={<BiUser />} label={`${stats.students} total students`} size="small" />
                                <Chip icon={<BiBook />} label={`${stats.classes} classes`} size="small" />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TeacherDashboard;
