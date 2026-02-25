import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, ButtonGroup, Chip, Stack, CircularProgress } from '@mui/material';
import { BiCalendar, BiTime, BiCalendarWeek, BiCalendarEvent } from 'react-icons/bi';
import { useStudent } from '../layout/ParentLayout';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

const ParentTimetable = () => {
    const { selectedStudent } = useStudent();
    const [viewMode, setViewMode] = useState('weekly'); // 'daily', 'weekly', 'monthly'
    const [timetableData, setTimetableData] = useState({});
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        if (selectedStudent?.class_id || selectedStudent?.class) {
            const classId = selectedStudent.class_id || (selectedStudent.class === '5' ? 1 : 2);
            fetchTimetable(classId);
        }
    }, [selectedStudent]);

    const fetchTimetable = async (classId) => {
        setLoading(true);
        try {
            const response = await invokeGetApi(config.getMySchool + apiList.getTimetable, {
                class_id: classId
            });
            if (response.status === 200) {
                setTimetableData(response.data.grouped || {});
                // Extract unique time slots
                const slots = response.data.times || [];
                setTimeSlots(slots.map(s => `${s.start_time.substring(0, 5)} - ${s.end_time.substring(0, 5)}`));
            }
        } catch (error) {
            console.error("Error fetching timetable:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderDailyView = () => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const daySlots = timetableData[today] || [];

        return (
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 0 }}>
                    {loading ? (
                        <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>
                    ) : daySlots.length > 0 ? daySlots.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 3,
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: index !== daySlots.length - 1 ? '1px solid #f0f0f0' : 'none',
                                bgcolor: item.is_break ? '#f9fafb' : 'transparent'
                            }}
                        >
                            <Box sx={{ width: 140 }}>
                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#303972' }}>
                                    {item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#303972' }}>{item.subject}</Typography>
                                {!item.is_break && (
                                    <Typography variant="body2" color="text.secondary">
                                        Room: {item.room}
                                    </Typography>
                                )}
                            </Box>
                            <Chip
                                label={item.is_break ? 'Recess' : 'Class'}
                                color={item.is_break ? 'default' : 'primary'}
                                variant={item.is_break ? 'filled' : 'outlined'}
                            />
                        </Box>
                    )) : (
                        <Box sx={{ p: 4, textAlign: 'center' }}>
                            <Typography color="text.secondary">No classes scheduled for today ({today})</Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
        );
    };

    const renderWeeklyView = () => (
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
            <CardContent sx={{ p: 3, minWidth: 800 }}>
                {loading ? (
                    <Box sx={{ py: 4, textAlign: 'center' }}><CircularProgress /></Box>
                ) : (
                    <>
                        {/* Header Row */}
                        <Box sx={{ display: 'flex', mb: 2 }}>
                            <Box sx={{ width: 120, flexShrink: 0, fontWeight: 700, color: '#A098AE' }}>Time</Box>
                            {weekDays.map(day => (
                                <Box key={day} sx={{ flex: 1, textAlign: 'center', fontWeight: 700, color: '#303972' }}>{day}</Box>
                            ))}
                        </Box>

                        {/* Time Slots */}
                        {timeSlots.map((time, slotIdx) => (
                            <Box key={slotIdx} sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                                <Box sx={{ width: 120, flexShrink: 0, fontSize: '0.85rem', color: '#A098AE', fontWeight: 500 }}>{time}</Box>
                                {weekDays.map(day => {
                                    const daySlots = timetableData[day] || [];
                                    const slot = daySlots[slotIdx]; // Simple direct mapping assuming data is normalized
                                    return (
                                        <Box key={day + slotIdx} sx={{ flex: 1, px: 0.5 }}>
                                            {slot ? (
                                                <Box sx={{
                                                    p: 1.5,
                                                    borderRadius: 2,
                                                    textAlign: 'center',
                                                    bgcolor: slot.is_break ? '#f0f0f0' : '#4d44b515',
                                                    color: slot.is_break ? '#A098AE' : '#4d44b5',
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {slot.subject}
                                                </Box>
                                            ) : (
                                                <Box sx={{ p: 1.5, textAlign: 'center', color: '#eee' }}>-</Box>
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    );

    const renderMonthlyView = () => (
        <Box sx={{ textAlign: 'center', py: 5 }}>
            <BiCalendar size={60} color="#eee" />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Monthly academic calendar coming soon.</Typography>
        </Box>
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
