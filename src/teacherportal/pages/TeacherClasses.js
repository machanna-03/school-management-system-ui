import React, { useState, useEffect } from "react";
import {
    Box, Typography, Card, CardContent, Grid, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Chip, CircularProgress, Button
} from "@mui/material";
import { BiBook, BiUser } from "react-icons/bi";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const TeacherClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("userData") || "{}");
        Promise.all([
            invokeGetApi(config.getMySchool + apiList.getClasses, {}),
            invokeGetApi(config.getMySchool + apiList.getStudents, {}),
        ]).then(([cRes, sRes]) => {
            const allClasses = cRes.data?.sections || cRes.data?.classes || [];
            const allStudents = sRes.data?.students || [];
            // Annotate each class with student count
            const enriched = allClasses.map(c => ({
                ...c,
                student_count: allStudents.filter(s => s.class_name === c.name || s.class === c.name).length
            }));
            setClasses(enriched);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <Box sx={{ textAlign: "center", py: 10 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" fontWeight={700} color="#303972">My Classes</Typography>
                <Typography variant="body2" color="#A098AE">Classes and sections you are assigned to.</Typography>
            </Box>

            <Grid container spacing={3}>
                {classes.length === 0 ? (
                    <Grid item xs={12}>
                        <Card sx={{ borderRadius: 4, p: 4, textAlign: "center" }}>
                            <Typography color="text.secondary">No classes found.</Typography>
                        </Card>
                    </Grid>
                ) : classes.map((cls, i) => (
                    <Grid item xs={12} sm={6} md={4} key={cls.id}>
                        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", height: "100%", transition: "transform 0.2s", "&:hover": { transform: "translateY(-3px)" } }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                    <Box sx={{ width: 50, height: 50, borderRadius: 3, bgcolor: ["#F3F4FF", "#FFF4DE", "#FEF6E6", "#E8F5E9", "#FCE4EC"][i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: ["#4d44b5", "#FB7D5B", "#FCC43E", "#369c5e", "#e91e8f"][i % 5] }}>
                                        <BiBook />
                                    </Box>
                                    <Chip label={cls.section || cls.grade || "—"} size="small" color="primary" variant="outlined" />
                                </Box>
                                <Typography variant="h6" fontWeight={700} color="#303972">{cls.name}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1, color: "#A098AE" }}>
                                    <BiUser size={14} />
                                    <Typography variant="caption">{cls.student_count} Students</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TeacherClasses;
