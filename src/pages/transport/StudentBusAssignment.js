import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Autocomplete,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const StudentBusAssignment = () => {
    const [userType, setUserType] = useState("Student");
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [stops, setStops] = useState([]);
    const [classes, setClasses] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [formData, setFormData] = useState({
        studentId: "",
        userId: "", // for staff
        classId: "", // filter for students
        routeId: "",
        stop_name: "",
        transport_fee: ""
    });

    useEffect(() => {
        fetchRoutes();
        fetchClasses();
        fetchStaff();
        fetchAssignments();
    }, []);

    const fetchClasses = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + apiList.getClassList, {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setClasses(response.data.classes || []);
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        }
    };

    const fetchStaff = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + "/getTeachers", {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setStaff(response.data.teachers || []);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const fetchRoutes = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + apiList.getRoutes, {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setRoutes(response.data.routes || []);
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        }
    };

    const fetchAssignments = async () => {
        try {
            let response = await invokeGetApi(config.getMySchool + apiList.getAssignments, {});
            console.log("Assignments Response:", response);
            if (response.status === 200 && response.data.responseCode === "200") {
                setAssignments(response.data.assignments || []);
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
        }
    };

    const handleClassChange = async (e) => {
        const classId = e.target.value;
        setFormData({ ...formData, classId: classId, studentId: "" });

        // Fetch students for class
        const selectedClass = classes.find(c => c.id === classId);
        if (selectedClass) {
            try {
                let response = await invokeGetApi(config.getMySchool + apiList.getStudents, { class: selectedClass.name });
                if (response.status === 200 && response.data.responseCode === "200") {
                    setStudents(response.data.students || []);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }
    };

    const handleRouteChange = async (e) => {
        const routeId = e.target.value;
        setFormData({ ...formData, routeId: routeId, stopId: "" });

        // Fetch stops
        try {
            let response = await invokeGetApi(`${config.getMySchool}/transport/stops/${routeId}`, {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setStops(response.data.stops || []);
            }
        } catch (error) {
            console.error("Error fetching stops:", error);
        }
    };

    const handleStopChange = (e) => {
        // Stop change logic removed as we use manual entry now
    };

    const handleAssign = async () => {
        const payload = {
            user_type: userType,
            student_id: userType === 'Student' ? formData.studentId : null,
            user_id: userType === 'Staff' ? formData.userId : null,
            route_id: formData.routeId,
            stop_name: formData.stop_name,
            transport_fee: formData.transport_fee
        };

        try {
            let response = await invokeApi(config.getMySchool + apiList.assignTransport, payload);
            if (response.status === 200 && response.data.responseCode === "200") {
                alert("Assignment Saved Successfully");
                fetchAssignments();
                // Optionally clear form
            } else {
                alert("Failed: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error assigning transport:", error);
        }
    };

    const handleDeleteAssignment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this assignment?")) return;
        try {
            let response = await invokeApi(config.getMySchool + apiList.deleteAssignment, { id });
            if (response.status === 200 && response.data.responseCode === "200") {
                fetchAssignments();
            } else {
                alert("Failed to delete: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error deleting assignment:", error);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const filteredAssignments = assignments.filter(assignment => {
        const searchLower = searchTerm.toLowerCase();
        const studentName = assignment.student_name ? assignment.student_name.toLowerCase() : "";
        const staffName = assignment.staff_name ? assignment.staff_name.toLowerCase() : "";
        const admission = assignment.admission_number ? assignment.admission_number.toLowerCase() : "";

        return studentName.includes(searchLower) ||
            staffName.includes(searchLower) ||
            admission.includes(searchLower);
    });

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#303972">
                Transport Assignment
            </Typography>

            <Grid container spacing={4}>
                {/* Assignment Form */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" mb={2}>New Assignment</Typography>
                            <Grid container spacing={2}>
                                { /* Form Fields */}
                                <Grid item xs={12} md={4}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">User Type</FormLabel>
                                        <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                                            <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                            <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                {userType === 'Student' ? (
                                    <>
                                        <Grid item xs={12} md={4}>
                                            <TextField select fullWidth label="Select Class" value={formData.classId} onChange={handleClassChange}>
                                                {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Autocomplete
                                                options={students}
                                                getOptionLabel={(option) => option.name || ""}
                                                value={students.find(s => s.id === formData.studentId) || null}
                                                onChange={(event, newValue) => {
                                                    setFormData({ ...formData, studentId: newValue ? newValue.id : "" });
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Select Student" />}
                                                disabled={!formData.classId}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12} md={8}>
                                        <Autocomplete
                                            options={staff}
                                            getOptionLabel={(option) => option.name || ""}
                                            value={staff.find(s => s.id === formData.userId) || null}
                                            onChange={(event, newValue) => {
                                                setFormData({ ...formData, userId: newValue ? newValue.id : "" });
                                            }}
                                            renderInput={(params) => <TextField {...params} label="Select Staff" />}
                                        />
                                    </Grid>
                                )}

                                <Grid item xs={12} md={4}>
                                    <TextField select fullWidth label="Select Route" value={formData.routeId} onChange={handleRouteChange}>
                                        {routes.map(r => <MenuItem key={r.id} value={r.id}>{r.route_name}</MenuItem>)}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    {/* Manual Stop Entry */}
                                    <TextField
                                        fullWidth
                                        label="Stop Name"
                                        value={formData.stop_name || ""}
                                        onChange={(e) => setFormData({ ...formData, stop_name: e.target.value })}
                                        disabled={!formData.routeId}
                                        placeholder="Enter stop name manually"
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <TextField
                                        fullWidth
                                        label="Transport Fee"
                                        value={formData.transport_fee}
                                        onChange={(e) => setFormData({ ...formData, transport_fee: e.target.value })}
                                        type="number"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleAssign} disabled={!formData.stop_name || (!formData.studentId && !formData.userId)}>
                                        Assign Transport
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Assignments List */}
                <Grid item xs={12}>
                    <Card sx={{ borderRadius: 2 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h6">Current Assignments</Typography>
                                <TextField
                                    size="small"
                                    label="Search Person"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    sx={{ width: 300 }}
                                />
                            </Box>

                            {/* Table of assignments */}
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><b>User</b></TableCell>
                                            <TableCell><b>Type</b></TableCell>
                                            <TableCell><b>Route</b></TableCell>
                                            <TableCell><b>Stop</b></TableCell>
                                            <TableCell><b>Bus</b></TableCell>
                                            <TableCell><b>Fee</b></TableCell>
                                            <TableCell><b>Action</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredAssignments.map((assignment) => (
                                            <TableRow key={assignment.id}>
                                                <TableCell>
                                                    {assignment.user_type === 'Student' ?
                                                        `${assignment.student_name} (${assignment.class}-${assignment.section})` :
                                                        assignment.staff_name
                                                    }
                                                </TableCell>
                                                <TableCell>{assignment.user_type}</TableCell>
                                                <TableCell>{assignment.route_name}</TableCell>
                                                <TableCell>{assignment.stop_name}</TableCell>
                                                <TableCell>{assignment.bus_number || "Unassigned"}</TableCell>
                                                <TableCell>{assignment.transport_fee}</TableCell>
                                                <TableCell>
                                                    <IconButton size="small" color="error" onClick={() => handleDeleteAssignment(assignment.id)}>
                                                        <BiTrash />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredAssignments.length === 0 && (
                                            <TableRow><TableCell colSpan={7} align="center">No assignments found</TableCell></TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentBusAssignment;
