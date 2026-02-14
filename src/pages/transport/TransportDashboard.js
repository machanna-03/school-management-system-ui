import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { BiBus, BiMap, BiUserCheck, BiMapAlt } from "react-icons/bi";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const TransportDashboard = () => {
    const [stats, setStats] = useState({
        totalBuses: 0,
        activeRoutes: 0,
        totalStops: 0,
        assignedStudents: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Parallel-ish fetching for dashboard stats
            // In a real scenario, we might have a specific dashboard API
            // For now, let's fetch lists and count. 
            // Optimization: Create a /transport/stats endpoint later.

            const [busesRes, routesRes, assignRes] = await Promise.all([
                invokeGetApi(config.getMySchool + apiList.getBuses, {}),
                invokeGetApi(config.getMySchool + apiList.getRoutes, {}),
                invokeGetApi(config.getMySchool + apiList.getAssignments, {})
            ]);

            setStats({
                totalBuses: busesRes.data?.buses?.length || 0,
                activeRoutes: routesRes.data?.routes?.length || 0,
                totalStops: 0, // Need to sum up stops or fetch all
                assignedStudents: assignRes.data?.assignments?.length || 0
            });

        } catch (error) {
            console.error("Error fetching transport stats:", error);
        }
    };

    const StatCard = ({ title, value, icon, color }) => (
        <Card sx={{ height: "100%", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center", p: 3 }}>
                <Box sx={{
                    p: 2,
                    borderRadius: 3,
                    bgcolor: `${color}20`,
                    color: color,
                    display: "flex",
                    mr: 3
                }}>
                    {icon}
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary" fontWeight="500">
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="#303972">
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#303972">
                Transport Overview
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Buses"
                        value={stats.totalBuses}
                        icon={<BiBus size={32} />}
                        color="#FB7D5B"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Routes"
                        value={stats.activeRoutes}
                        icon={<BiMapAlt size={32} />}
                        color="#FCC43E"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Assigned Students"
                        value={stats.assignedStudents}
                        icon={<BiUserCheck size={32} />}
                        color="#303972"
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Avg. Efficiency"
                        value="Coming Soon"
                        icon={<BiMap size={32} />}
                        color="#4D44B5"
                    />
                </Grid> */}
            </Grid>

            {/* TODO: Add Map View Here */}
            <Box sx={{ mt: 4, p: 3, bgcolor: "#fff", borderRadius: 4, minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed #ccc" }}>
                <Typography color="text.secondary">Real-time Bus Tracking Map (Coming Soon)</Typography>
            </Box>
        </Box>
    );
};

export default TransportDashboard;
