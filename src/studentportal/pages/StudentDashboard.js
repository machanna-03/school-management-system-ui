import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Stack, Chip, Avatar, LinearProgress, Divider } from "@mui/material";
import { BiBook, BiCheckCircle, BiTime, BiCalendarEvent, BiTrendingUp } from "react-icons/bi";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const StatCard = ({ title, value, icon, color, bgcolor }) => (
    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <Typography color="text.secondary" variant="body2" fontWeight={600} sx={{ mb: 1 }}>{title}</Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: '#303972' }}>{value}</Typography>
            </Box>
            <Box sx={{
                width: 60, height: 60, borderRadius: '50%',
                bgcolor: bgcolor, color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem'
            }}>
                {icon}
            </Box>
        </CardContent>
    </Card>
);

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        attendance: "96%",
        assignments: "0/0",
        exams: "0",
        grade: "-"
    });
    const [schedule, setSchedule] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("Student");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const sid = localStorage.getItem('student_id');
            const storedName = localStorage.getItem('user_name');
            if (storedName) setUserName(storedName);

            // Fetch Marks for Average Grade
            let marksRes = await invokeGetApi(config.getMySchool + apiList.getMarksHistory, { student_id: sid });
            let marks = marksRes.data.marks || [];
            const avgScore = marks.length > 0
                ? Math.round(marks.reduce((acc, m) => acc + (Number(m.marks_obtained) / Number(m.total_marks)) * 100, 0) / marks.length)
                : 0;

            // Fetch Notifications/Announcements
            let annRes = await invokeGetApi(config.getMySchool + apiList.getAnnouncements);
            let anns = annRes.data.announcements || [];

            // Fetch Timetable (assuming class_id is stored or fetched)
            // For now use a generic fetch or mock class_id
            let classId = localStorage.getItem('class_id') || 1;
            let ttRes = await invokeGetApi(config.getMySchool + apiList.getTimetable, { class_id: classId });

            setStats(prev => ({
                ...prev,
                grade: avgScore > 90 ? 'A+' : avgScore > 80 ? 'A' : avgScore > 70 ? 'B' : '-',
                exams: [...new Set(marks.map(m => m.exam_id))].length
            }));
            setSchedule(ttRes.data.timetable || []);
            setNotifications(anns.slice(0, 3));
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Student Dashboard...</Box>;

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>Hello, {userName}! 👋</Typography>
                    <Typography variant="body1" sx={{ color: '#A098AE' }}>Here's what's happening in your class today.</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 600 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
            </Box>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Attendance" value={stats.attendance} icon={<BiCheckCircle />} color="#4d44b5" bgcolor="#F3F4FF" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Assignments" value={stats.assignments} icon={<BiBook />} color="#FB7D5B" bgcolor="#FFF4DE" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Exams" value={stats.exams} icon={<BiCalendarEvent />} color="#FCC43E" bgcolor="#FEF6E6" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Average Grade" value={stats.grade} icon={<BiTrendingUp />} color="#303972" bgcolor="#E8EAF6" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Upcoming Schedule */}
                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Upcoming Schedule</Typography>
                                <Button size="small" sx={{ textTransform: 'none' }}>View Timetable</Button>
                            </Box>

                            <Stack spacing={2}>
                                {schedule.length > 0 ? schedule.map((cls, idx) => (
                                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f9fafb', borderRadius: 3 }}>
                                        <Box sx={{
                                            width: 50, height: 50, borderRadius: 3, mr: 2,
                                            bgcolor: idx === 0 ? '#4d44b5' : 'white',
                                            color: idx === 0 ? 'white' : '#A098AE',
                                            border: idx === 0 ? 'none' : '1px solid #eee',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                                        }}>
                                            {(cls.subject_name || "??").substring(0, 2)}
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" fontWeight={700} color="#303972">{cls.subject_name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{cls.teacher_name || "Subject Teacher"}</Typography>
                                        </Box>
                                        <Chip label={`${cls.start_time} - ${cls.end_time}`} size="small" />
                                    </Box>
                                )) : (
                                    <Typography color="text.secondary" align="center">No classes scheduled.</Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={12} md={4}>
                    {/* Homework Due */}
                    <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Announcements</Typography>

                            <Stack spacing={3}>
                                {notifications.length > 0 ? notifications.map((notif, idx) => (
                                    <Box key={idx}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="subtitle2" fontWeight={600} color="#303972">{notif.title}</Typography>
                                            <Typography variant="caption" color="primary">{new Date(notif.created_at).toLocaleDateString()}</Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                            {notif.content ? notif.content.substring(0, 100) + '...' : 'New announcement posted.'}
                                        </Typography>
                                        <Divider />
                                    </Box>
                                )) : (
                                    <Typography color="text.secondary">No new announcements.</Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;
