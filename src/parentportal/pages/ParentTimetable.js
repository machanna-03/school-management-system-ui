import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, ButtonGroup, Chip, Stack } from '@mui/material';
import { BiCalendar, BiTime, BiCalendarWeek, BiCalendarEvent } from 'react-icons/bi';

const ParentTimetable = () => {
    const [viewMode, setViewMode] = useState('weekly'); // 'daily', 'weekly', 'monthly'

    const timeSlots = [
        "08:00 - 08:45", "08:45 - 09:30", "09:30 - 10:15", "10:15 - 10:30",
        "10:30 - 11:15", "11:15 - 12:00", "12:00 - 12:45"
    ];

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Mock Data
    const weeklySchedule = {
        "Monday": ["Math", "Science", "English", "Break", "History", "Geography", "Sports"],
        "Tuesday": ["Science", "Math", "English", "Break", "Computer", "Art", "Library"],
        "Wednesday": ["Math", "Physics", "Chemistry", "Break", "English", "History", "Music"],
        "Thursday": ["Biology", "Math", "English", "Break", "Geography", "Sports", "Free"],
        "Friday": ["Math", "Science", "Computer", "Break", "English", "Physics", "Chemistry"],
        "Saturday": ["Math", "Art", "Music", "Break", "Sports", "-", "-"]
    };

    const dailySchedule = [
        { time: "08:00 - 08:45", subject: "Mathematics", room: "201", teacher: "Mr. Patel" },
        { time: "08:45 - 09:30", subject: "Science", room: "Lab 3", teacher: "Ms. Rao" },
        { time: "09:30 - 10:15", subject: "English", room: "105", teacher: "Mrs. Kumar" },
        { time: "10:15 - 10:30", subject: "Break", room: "-", teacher: "-" },
        { time: "10:30 - 11:15", subject: "History", room: "202", teacher: "Mr. Singh" },
        { time: "11:15 - 12:00", subject: "Geography", room: "203", teacher: "Ms. Lee" },
        { time: "12:00 - 12:45", subject: "Sports", room: "Ground", teacher: "Coach Ray" },
    ];

    const monthlyEvents = [
        { date: 5, title: "Science Fair", type: "event" },
        { date: 12, title: "Math Test", type: "exam" },
        { date: 20, title: "Sports Day", type: "event" },
        { date: 25, title: "Parent Meeting", type: "meeting" },
    ];

    const renderDailyView = () => (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 0 }}>
                {dailySchedule.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            p: 3,
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: index !== dailySchedule.length - 1 ? '1px solid #f0f0f0' : 'none',
                            bgcolor: item.subject === 'Break' ? '#f9fafb' : 'transparent'
                        }}
                    >
                        <Box sx={{ width: 140 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: '#303972' }}>{item.time}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#303972' }}>{item.subject}</Typography>
                            {item.subject !== 'Break' && (
                                <Typography variant="body2" color="text.secondary">
                                    Room: {item.room} • Teacher: {item.teacher}
                                </Typography>
                            )}
                        </Box>
                        <Chip
                            label={item.subject === 'Break' ? 'Recess' : 'Class'}
                            color={item.subject === 'Break' ? 'default' : 'primary'}
                            variant={item.subject === 'Break' ? 'filled' : 'outlined'}
                        />
                    </Box>
                ))}
            </CardContent>
        </Card>
    );

    const renderWeeklyView = () => (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <CardContent sx={{ p: 3, minWidth: 800 }}>
                {/* Header Row */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                    <Box sx={{ width: 120, flexShrink: 0, fontWeight: 700, color: '#A098AE' }}>Time</Box>
                    {weekDays.map(day => (
                        <Box key={day} sx={{ flex: 1, textAlign: 'center', fontWeight: 700, color: '#303972' }}>{day}</Box>
                    ))}
                </Box>

                {/* Time Slots */}
                {timeSlots.map((time, index) => (
                    <Box key={index} sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                        <Box sx={{ width: 120, flexShrink: 0, fontSize: '0.85rem', color: '#A098AE', fontWeight: 500 }}>{time}</Box>
                        {weekDays.map(day => {
                            const subject = weeklySchedule[day][index];
                            return (
                                <Box key={day + index} sx={{ flex: 1, px: 0.5 }}>
                                    <Box sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        textAlign: 'center',
                                        bgcolor: subject === 'Break' ? '#f0f0f0' : subject === '-' ? 'transparent' : '#4d44b515',
                                        color: subject === 'Break' ? '#A098AE' : '#4d44b5',
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }}>
                                        {subject}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                ))}
            </CardContent>
        </Card>
    );

    const renderMonthlyView = () => (
        <Grid container spacing={2}>
            {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const event = monthlyEvents.find(e => e.date === day);
                return (
                    <Grid item xs={12} sm={6} md={4} lg={20} xl={2} key={day} style={{ flexBasis: '14.28%', maxWidth: '14.28%' }}>
                        <Card sx={{
                            height: 120,
                            borderRadius: 3,
                            boxShadow: 'none',
                            border: '1px solid #f0f0f0',
                            position: 'relative',
                            '&:hover': { borderColor: '#4d44b5', boxShadow: '0 4px 12px rgba(77, 68, 181, 0.1)' }
                        }}>
                            <CardContent sx={{ p: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, color: '#A098AE', mb: 1 }}>{day} Feb</Typography>
                                {event && (
                                    <Box sx={{
                                        p: 1,
                                        borderRadius: 1,
                                        bgcolor: event.type === 'exam' ? '#fb7d5b20' : '#4d44b520',
                                        color: event.type === 'exam' ? '#fb7d5b' : '#4d44b5'
                                    }}>
                                        <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
                                            {event.title}
                                        </Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700 }}>
                    Timetable
                </Typography>

                <ButtonGroup variant="outlined" sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <Button
                        onClick={() => setViewMode('daily')}
                        sx={{
                            textTransform: 'none',
                            bgcolor: viewMode === 'daily' ? '#4d44b5' : 'transparent',
                            color: viewMode === 'daily' ? 'white' : '#A098AE',
                            borderColor: 'transparent',
                            '&:hover': { bgcolor: viewMode === 'daily' ? '#3d3495' : '#f5f5f5', borderColor: 'transparent' }
                        }}
                        startIcon={<BiTime />}
                    >
                        Daily
                    </Button>
                    <Button
                        onClick={() => setViewMode('weekly')}
                        sx={{
                            textTransform: 'none',
                            bgcolor: viewMode === 'weekly' ? '#4d44b5' : 'transparent',
                            color: viewMode === 'weekly' ? 'white' : '#A098AE',
                            borderColor: 'transparent',
                            '&:hover': { bgcolor: viewMode === 'weekly' ? '#3d3495' : '#f5f5f5', borderColor: 'transparent' }
                        }}
                        startIcon={<BiCalendarWeek />}
                    >
                        Weekly
                    </Button>
                    <Button
                        onClick={() => setViewMode('monthly')}
                        sx={{
                            textTransform: 'none',
                            bgcolor: viewMode === 'monthly' ? '#4d44b5' : 'transparent',
                            color: viewMode === 'monthly' ? 'white' : '#A098AE',
                            borderColor: 'transparent',
                            '&:hover': { bgcolor: viewMode === 'monthly' ? '#3d3495' : '#f5f5f5', borderColor: 'transparent' }
                        }}
                        startIcon={<BiCalendar />}
                    >
                        Monthly
                    </Button>
                </ButtonGroup>
            </Box>

            {viewMode === 'daily' && renderDailyView()}
            {viewMode === 'weekly' && renderWeeklyView()}
            {viewMode === 'monthly' && renderMonthlyView()}

        </Box>
    );
};

export default ParentTimetable;
