import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BiBook, BiBookReader, BiHistory, BiError } from 'react-icons/bi';
import { invokeGetApi } from '../../services/ApiServices';
import { config } from '../../config/Config';

const LibraryDashboard = () => {
    const [stats, setStats] = useState({
        issued_count: 0,
        overdue_count: 0,
        returned_count: 0,
        total_fines: 0
    });
    const [recentIssues, setRecentIssues] = useState([]);

    useEffect(() => {
        fetchStats();
        fetchRecentIssues();
    }, []);

    const fetchStats = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + "/library/stats", {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error("Error fetching library stats:", error);
        }
    };

    const fetchRecentIssues = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + "/library/issues", {});
            if (response.status === 200 && response.data.responseCode === "200") {
                // Take top 5
                setRecentIssues(response.data.issues.slice(0, 5));
            }
        } catch (error) {
            console.error("Error fetching issues:", error);
        }
    };

    const StatCard = ({ title, count, icon, color }) => (
        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2, borderRadius: 3, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}>
            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: `${color}20`, color: color, mr: 2, fontSize: '2rem', display: 'flex' }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" color="#303972">{count}</Typography>
                <Typography variant="body2" color="textSecondary">{title}</Typography>
            </Box>
        </Card>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#303972">Library Dashboard</Typography>

            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Books Issued" count={stats.issued_count} icon={<BiBookReader />} color="#4D44B5" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Overdue Books" count={stats.overdue_count} icon={<BiError />} color="#FB7D5B" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Books Returned" count={stats.returned_count} icon={<BiHistory />} color="#FCC43E" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Fines Collected" count={`₹${stats.total_fines}`} icon={<BiBook />} color="#303972" />
                </Grid>
            </Grid>

            {/* Quick Links */}
            <Grid container spacing={2} mb={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        component="a"
                        href="/library/books"
                        sx={{
                            display: 'flex', alignItems: 'center', p: 2, borderRadius: 3,
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", textDecoration: 'none',
                            cursor: 'pointer', transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(77,68,181,0.15)' }
                        }}
                    >
                        <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: '#4D44B520', color: '#4D44B5', mr: 2, fontSize: '2rem', display: 'flex' }}>
                            <BiBook />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="#303972">Books Catalog</Typography>
                            <Typography variant="body2" color="textSecondary">Manage all books</Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card
                        component="a"
                        href="/library/circulation"
                        sx={{
                            display: 'flex', alignItems: 'center', p: 2, borderRadius: 3,
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.05)", textDecoration: 'none',
                            cursor: 'pointer', transition: 'transform 0.2s',
                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(251,125,91,0.15)' }
                        }}
                    >
                        <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: '#FB7D5B20', color: '#FB7D5B', mr: 2, fontSize: '2rem', display: 'flex' }}>
                            <BiBookReader />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight="bold" color="#303972">Issue / Return</Typography>
                            <Typography variant="body2" color="textSecondary">Manage circulation</Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h6" fontWeight="bold" mb={2} color="#303972">Recent Activity</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Book Title</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Borrower</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Issue Date</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Due Date</TableCell>
                            <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentIssues.length > 0 ? recentIssues.map((issue, i) => (
                            <TableRow
                                key={issue.id}
                                hover
                                sx={{
                                    bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                    '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                    '&:hover': { bgcolor: '#f0f1ff !important' },
                                    '&:last-child td': { borderBottom: 0 }
                                }}
                            >
                                <TableCell>{issue.book_title}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">{issue.student_name || issue.staff_name || "N/A"}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {issue.user_type} {issue.class ? `(${issue.class}-${issue.section})` : ""}
                                    </Typography>
                                </TableCell>
                                <TableCell>{issue.issue_date}</TableCell>
                                <TableCell>{issue.due_date}</TableCell>
                                <TableCell>
                                    <Box component="span" sx={{
                                        px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold',
                                        bgcolor: issue.status === 'Returned' ? '#E1F7E3' : '#FFF2E5',
                                        color: issue.status === 'Returned' ? '#2DA646' : '#FB7D5B'
                                    }}>
                                        {issue.status}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow><TableCell colSpan={5} align="center">No recent activity</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default LibraryDashboard;
