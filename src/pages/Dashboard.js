import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Card from '../components/common/Card';
import { BiUser, BiBook, BiCalendar, BiDish } from 'react-icons/bi';
import SchoolPerformanceChart from '../components/dashboard/SchoolPerformanceChart';
import SchoolOverviewChart from '../components/dashboard/SchoolOverviewChart';
import SchoolCalendar from '../components/dashboard/SchoolCalendar';
import TeacherDetailsTable from '../components/dashboard/TeacherDetailsTable';
import UnpaidStudentTuitionTable from '../components/dashboard/UnpaidStudentTuitionTable';

const Dashboard = () => {
  const stats = [
    { title: 'Students', count: '932', color: '#4d44b5', icon: <BiUser /> },
    { title: 'Teachers', count: '754', color: '#fb7d5b', icon: <BiBook /> },
    { title: 'Events', count: '40', color: '#fcc43e', icon: <BiCalendar /> },
    { title: 'Foods', count: '32k', color: '#30c7ec', icon: <BiDish /> },
    // Using image color #3d4465 for Events icon bg in image is actually Yellow/Orange.
    // Image: Students(Purple), Teachers(Orange/Red), Events(Yellow), Foods(Dark Blue/Purple).
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
              gap: 2.5,
              p: 3,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
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
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={6}>
          <Card title="School Performance" sx={{ height: '100%' }}>
            <SchoolPerformanceChart />
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card title="School Overview" sx={{ height: '100%' }}>
            <SchoolOverviewChart />
          </Card>
        </Grid>
      </Grid>

      {/* Calendar and Teachers Details */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card title="School Calendar" sx={{ height: '100%' }}>
            <SchoolCalendar />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card title="Teacher Details" sx={{ height: '100%' }}>
            <TeacherDetailsTable />
          </Card>
        </Grid>
      </Grid>

      {/* Unpaid Student Tuition */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card title="Unpaid Student Intuition">
            <UnpaidStudentTuitionTable />
          </Card>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Dashboard;
