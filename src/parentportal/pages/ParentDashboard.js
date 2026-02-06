import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button, Stack, Chip, Avatar, IconButton, Divider } from '@mui/material';
import {
    BiUser,
    BiBook,
    BiMoney,
    BiCalendarCheck,
    BiTime,
    BiBell,
    BiMessageDetail,
    BiPlus
} from 'react-icons/bi';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

// Mock Data matching the image exactly
const students = [
    {
        id: 1,
        name: "Rahul Sharma",
        grade: "Grade 5-A",
        roll: 23,
        stats: {
            academics: { overall: "87%", grade: "A", lastTest: "95%" },
            fees: { paid: "₹45,000", due: "₹5,000", dueDate: "25 Jan" },
            attendance: { present: "92%", leaves: "8 days", late: "3 times" }
        }
    },
    {
        id: 2,
        name: "Priya Sharma",
        grade: "Grade 2-B",
        roll: 12,
        stats: {
            academics: { overall: "91%", grade: "A+", lastTest: "98%" },
            fees: { paid: "₹40,000", due: "₹0", dueDate: "-" },
            attendance: { present: "95%", leaves: "4 days", late: "1 time" }
        }
    },
];

const quickActions = [
    { label: "Apply Leave", icon: <BiCalendarCheck />, color: "#4d44b5", path: "/parent/leave" },
    { label: "View Timetable", icon: <BiTime />, color: "#fb7d5b", path: "/parent/timetable" },
    { label: "Check Reports", icon: <BiBook />, color: "#303972", path: "/parent/report-cards" },
    { label: "Pay Fees", icon: <BiMoney />, color: "#FCC43E", path: "/parent/fees" },
    { label: "Contact Teacher", icon: <BiMessageDetail />, color: "#27AE60", path: "/parent/messages" },
];

const notifications = [
    { id: 1, title: "Rahul won 1st prize in Science Fair", date: "15 Jan", icon: "🏆", type: "achievement" },
    { id: 2, title: "Math test scheduled for 20 Jan", date: "14 Jan", icon: "📅", type: "exam" },
    { id: 3, title: "Fee payment reminder for ₹5,000", date: "13 Jan", icon: "💰", type: "alert" },
];

const schedule = [
    { time: "8:00 - 8:45", subject: "Mathematics", room: "Room 201", teacher: "Mr. Patel" },
    { time: "8:45 - 9:30", subject: "Science", room: "Lab 3", teacher: "Ms. Rao" },
    { time: "9:30 - 10:15", subject: "English", room: "Room 105", teacher: "Mrs. Kumar" },
    { time: "10:15 - 10:30", subject: "Break", room: "-", teacher: "-" },
    { time: "10:30 - 11:15", subject: "Sports", room: "Ground", teacher: "Coach Singh" },
];


const ParentDashboard = () => {
    const location = useLocation();
    const [selectedStudent, setSelectedStudent] = useState(students[0]);

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const studentId = params.get('studentId');
        if (studentId) {
            const student = students.find(s => s.id === parseInt(studentId));
            if (student) {
                setSelectedStudent(student);
            }
        }
    }, [location.search]);

    const StatCard = ({ title, icon, color, data, progress }) => (
        <Card sx={{ height: '100%', borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{
                        width: 40, height: 40, borderRadius: '12px', mr: 2,
                        bgcolor: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color
                    }}>
                        {icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>{title}</Typography>
                </Box>

                <Stack spacing={1.5}>
                    {Object.entries(data).map(([key, value]) => (
                        <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>
                                {value}
                            </Typography>
                        </Box>
                    ))}
                    {progress && (
                        <Box sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color }}>Progress</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: '#303972' }}>{progress}%</Typography>
                            </Box>
                            <Box sx={{ width: '100%', height: 6, bgcolor: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                                <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: color, borderRadius: 3 }} />
                            </Box>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );

    return (
        <Box>
            {/* Student Selection Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ color: '#A098AE', fontWeight: 600, letterSpacing: 1, mb: 1, display: 'block' }}>
                    SELECT STUDENT TO VIEW
                </Typography>
                <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, alignItems: 'center' }}>
                    {students.map((student) => (
                        <Card
                            key={student.id}
                            component={motion.div}
                            whileHover={{ y: -4 }}
                            onClick={() => setSelectedStudent(student)}
                            sx={{
                                minWidth: 280,
                                p: 2,
                                borderRadius: 3,
                                cursor: 'pointer',
                                border: selectedStudent.id === student.id ? '2px solid #4d44b5' : '2px solid transparent',
                                boxShadow: selectedStudent.id === student.id ? '0 8px 24px rgba(77, 68, 181, 0.2)' : '0 4px 12px rgba(0,0,0,0.05)',
                                bgcolor: selectedStudent.id === student.id ? '#fff' : 'rgba(255,255,255,0.6)'
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar sx={{ width: 50, height: 50, bgcolor: selectedStudent.id === student.id ? '#4d44b5' : '#ccc' }}>
                                    {student.name[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{student.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{student.grade}</Typography>
                                </Box>
                            </Stack>
                        </Card>
                    ))}
                    <Button
                        startIcon={<BiPlus />}
                        sx={{
                            minWidth: 160,
                            height: 60,
                            borderRadius: 3,
                            border: '2px dashed #C1BBEB',
                            color: '#A098AE',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { borderColor: '#4d44b5', color: '#4d44b5', bgcolor: 'rgba(77, 68, 181, 0.05)' }
                        }}
                    >
                        Add Another Child
                    </Button>
                </Stack>
            </Box>

            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                Current View: {selectedStudent.name} ({selectedStudent.grade}) | Roll: {selectedStudent.roll}
            </Typography>

            <Grid container spacing={3}>
                {/* Main Content Area */}
                <Grid item xs={12} md={8}>
                    {/* Stats Section */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        <Grid item xs={12} sm={4}>
                            <StatCard
                                title="Academics"
                                data={selectedStudent.stats.academics}
                                color="#4d44b5"
                                icon={<BiBook size={24} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StatCard
                                title="Fee Status"
                                data={selectedStudent.stats.fees}
                                color="#FCC43E"
                                icon={<BiMoney size={24} />}
                                progress={65} // Example based on user request "65%"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <StatCard
                                title="Attendance"
                                data={selectedStudent.stats.attendance}
                                color="#27AE60"
                                icon={<BiCalendarCheck size={24} />}
                                progress={92} // Matching user request "92%"
                            />
                        </Grid>
                    </Grid>

                    {/* Weekly Progress Chart */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>
                            Weekly Progress
                        </Typography>
                        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: 300 }}>
                            <CardContent sx={{ height: '100%', p: 3 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={[
                                            { day: 'Mon', score: 85 },
                                            { day: 'Tue', score: 88 },
                                            { day: 'Wed', score: 92 },
                                            { day: 'Thu', score: 89 },
                                            { day: 'Fri', score: 94 },
                                            { day: 'Sat', score: 90 },
                                        ]}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4d44b5" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#4d44b5" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A098AE' }} domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            cursor={{ stroke: '#4d44b5', strokeWidth: 1, strokeDasharray: '3 3' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="score"
                                            stroke="#4d44b5"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorScore)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Schedule Section */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Today's Schedule for Rahul</Typography>
                    </Box>
                    <Card sx={{ borderRadius: 4, mb: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 0 }}>
                            {schedule.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 2.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderBottom: index !== schedule.length - 1 ? '1px solid #f0f0f0' : 'none',
                                        '&:hover': { bgcolor: '#f9fafb' }
                                    }}
                                >
                                    <Box sx={{ width: 140 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#303972' }}>{item.time}</Typography>
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#303972' }}>{item.subject}</Typography>
                                        {item.room !== "-" && (
                                            <Typography variant="body2" color="text.secondary">
                                                {item.room} • {item.teacher}
                                            </Typography>
                                        )}
                                    </Box>
                                    {item.subject === "Break" ? (
                                        <Chip label="Break" size="small" />
                                    ) : (
                                        <Chip
                                            label={index === 0 ? "Now" : "Upcoming"}
                                            size="small"
                                            color={index === 0 ? "primary" : "default"}
                                            variant={index === 0 ? "filled" : "outlined"}
                                        />
                                    )}
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sidebar / Right Panel */}
                <Grid item xs={12} md={4}>
                    {/* Quick Actions */}
                    <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>Quick Actions</Typography>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {quickActions.map((action, index) => (
                            <Grid item xs={6} key={index}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ y: -2 }}
                                    sx={{
                                        borderRadius: 3, cursor: 'pointer', textAlign: 'center', py: 2.5, px: 2,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        border: '1px solid transparent',
                                        '&:hover': { borderColor: action.color, boxShadow: `0 8px 24px ${action.color}20` }
                                    }}
                                >
                                    <Box sx={{
                                        width: 50, height: 50, borderRadius: '50%', mx: 'auto', mb: 1.5,
                                        bgcolor: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.color
                                    }}>
                                        {action.icon}
                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972' }}>{action.label}</Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Recent Notifications */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Notifications</Typography>
                        <Box sx={{
                            width: 24, height: 24, borderRadius: '50%', bgcolor: '#4d44b5', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700
                        }}>
                            3
                        </Box>
                    </Box>

                    <Card sx={{ borderRadius: 4, height: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <CardContent sx={{ p: 0 }}>
                            {notifications.map((notif, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        p: 2.5,
                                        display: 'flex',
                                        gap: 2,
                                        borderBottom: index !== notifications.length - 1 ? '1px solid #f0f0f0' : 'none',
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: '#f9fafb' }
                                    }}
                                >
                                    <Box sx={{ mt: 0.5 }}>
                                        {notif.type === 'alert' && (
                                            <Box sx={{
                                                width: 20, height: 20, borderRadius: '50%', bgcolor: '#E74C3C', color: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700
                                            }}>!</Box>
                                        )}
                                        {notif.type === 'achievement' && (
                                            <Box sx={{
                                                width: 10, height: 10, borderRadius: '50%', bgcolor: '#27AE60', mt: 0.5
                                            }} />
                                        )}
                                        {notif.type === 'exam' && (
                                            <Box sx={{
                                                width: 20, height: 20, borderRadius: '50%', bgcolor: '#3498DB', color: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700
                                            }}>3</Box>
                                        )}
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#303972', lineHeight: 1.4 }}>
                                            {notif.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {notif.date}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                            <Button fullWidth sx={{ p: 2, color: '#4d44b5', fontWeight: 600, textTransform: 'none' }}>
                                View All Notifications →
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ParentDashboard;
