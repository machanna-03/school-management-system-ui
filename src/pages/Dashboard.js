import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import Card from '../components/common/Card';
import { BiUser, BiBook, BiCalendar, BiDish, BiMoney } from 'react-icons/bi';
import SchoolPerformanceChart from '../components/dashboard/SchoolPerformanceChart';
import SchoolOverviewChart from '../components/dashboard/SchoolOverviewChart';
import SchoolCalendar from '../components/dashboard/SchoolCalendar';
import TeacherDetailsTable from '../components/dashboard/TeacherDetailsTable';
import UnpaidStudentTuitionTable from '../components/dashboard/UnpaidStudentTuitionTable';
import api from '../services/api';

import StudentGenderChart from '../components/dashboard/StudentGenderChart';
import TodaysAttendance from '../components/dashboard/TodaysAttendance';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/getDashboardStats');
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  const stats = [
    { title: 'Students', count: data?.stats?.students || 0, color: '#4d44b5', icon: <BiUser /> },
    { title: 'Teachers', count: data?.stats?.teachers || 0, color: '#fb7d5b', icon: <BiBook /> },
    { title: 'Parents', count: data?.stats?.parents || 0, color: '#fcc43e', icon: <BiUser /> },
    { title: 'Earnings', count: data?.stats?.earnings || 0, color: '#30c7ec', icon: <BiMoney /> },
    { title: 'Classes', count: data?.stats?.classes || 0, color: '#4d44b5', icon: <BiBook /> },
    { title: 'Subjects', count: data?.stats?.subjects || 0, color: '#fb7d5b', icon: <BiCalendar /> },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" color="text.primary">Dashboard</Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              p: 2.5,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: stat.color, // Solid color as per image
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: '#3d4465' }}>{stat.count}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card title="School Performance" sx={{ height: '100%' }}>
            <SchoolPerformanceChart data={data?.attendanceChart || []} />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card title="School Overview" sx={{ height: '100%' }}>
            <SchoolOverviewChart data={data?.overviewChart || []} />
          </Card>
        </Grid>
      </Grid>

      {/* Gender, Attendance, Calendar */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card title="" sx={{ height: '100%', p: 0 }}>
            <StudentGenderChart data={data?.genderDistribution || {}} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card title="" sx={{ height: '100%', p: 0 }}>
            <TodaysAttendance data={data?.todaysAttendance || {}} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card title="School Calendar" sx={{ height: '100%' }}>
            <SchoolCalendar />
          </Card>
        </Grid>
      </Grid>

      {/* Teacher Details */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Card title="Teacher Details" sx={{ height: '100%' }}>
            <TeacherDetailsTable teachers={data?.teachersList || []} />
          </Card>
        </Grid>
      </Grid>

      {/* Unpaid Student Tuition */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Unpaid Student Intuition">
            <UnpaidStudentTuitionTable students={data?.unpaidStudents || []} />
          </Card>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Dashboard;
