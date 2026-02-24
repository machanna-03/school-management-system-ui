import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TablePagination,
    TextField,
    MenuItem,
    Grid,
    IconButton
} from "@mui/material";
import { BiPlus, BiBus, BiTrash } from "react-icons/bi";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const BusManagement = () => {
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [drivers, setDrivers] = useState([]); // Fetch users with role 'driver' ideally, or all staff
    const [conductors, setConductors] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        bus_number: "",
        registration_number: "",
        capacity: "",
        route_id: "",
        driver_name: "",
        conductor_name: "",
        gps_device_id: ""
    });

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchBuses();
        fetchRoutes();
        fetchStaff();
    }, [page, rowsPerPage]);

    const fetchBuses = async () => {
        try {
            let response = await invokeGetApi(`${config.getMySchool + apiList.getBuses}?page=${page + 1}&limit=${rowsPerPage}`, {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setBuses(response.data.buses || []);
                if (response.data.pagination) {
                    setTotalCount(response.data.pagination.total_count);
                } else {
                    setTotalCount(response.data.buses.length);
                }
            }
        } catch (error) {
            console.error("Error fetching buses:", error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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

    const fetchStaff = async () => {
        // For now, using getTeachers as a proxy or if there is a getStaff endpoint.
        // If none, we might need to add one. valid-user logic.
        // Assuming getTeachers returns users who can be drivers.
        try {
            let response = await invokeGetApi(config.getMySchool + "/getTeachers", {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setDrivers(response.data.teachers || []);
                setConductors(response.data.teachers || []);
            }
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveBus = async () => {
        try {
            let response = await invokeApi(config.getMySchool + apiList.addBus, formData);
            if (response.status === 200 && response.data.responseCode === "200") {
                setOpenDialog(false);
                fetchBuses();
                setFormData({
                    bus_number: "", registration_number: "", capacity: "",
                    route_id: "", driver_name: "", conductor_name: "", gps_device_id: ""
                });
            } else {
                alert("Failed to save bus: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error saving bus:", error);
        }
    };

    const handleDeleteBus = async (id) => {
        if (!window.confirm("Are you sure you want to delete this bus?")) return;
        try {
            let response = await invokeApi(config.getMySchool + apiList.deleteBus, { id });
            if (response.status === 200 && response.data.responseCode === "200") {
                fetchBuses();
            } else {
                alert("Failed to save bus: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error saving bus:", error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#303972">
                    Bus Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<BiPlus />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ bgcolor: "#4d44b5", borderRadius: 2 }}
                >
                    Add New Bus
                </Button>
            </Box>

            <Paper sx={{ mb: 2 }}>
                <TablePagination
                    component="div"
                    count={parseInt(totalCount, 10)}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </Paper>
            <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0", overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Bus No.</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Reg. No.</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Route</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Driver</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Conductor</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Capacity</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buses.map((bus, i) => (
                                <TableRow
                                    key={bus.id}
                                    hover
                                    sx={{
                                        bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                        '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                        '&:hover': { bgcolor: '#f0f1ff !important' },
                                        '&:last-child td': { borderBottom: 0 }
                                    }}
                                >
                                    <TableCell>{bus.bus_number}</TableCell>
                                    <TableCell>{bus.registration_number}</TableCell>
                                    <TableCell>{bus.route_name || "-"}</TableCell>
                                    <TableCell>{bus.driver_name || "-"}</TableCell>
                                    <TableCell>{bus.conductor_name || "-"}</TableCell>
                                    <TableCell>{bus.capacity}</TableCell>
                                    <TableCell>
                                        {bus.is_active ?
                                            <Typography color="green" variant="caption" fontWeight="bold">Active</Typography> :
                                            <Typography color="error" variant="caption">Inactive</Typography>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleDeleteBus(bus.id)}>
                                            <BiTrash />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add New Bus</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Bus Number" name="bus_number" value={formData.bus_number} onChange={handleChange} required />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Registration Number" name="registration_number" value={formData.registration_number} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="GPS Device ID" name="gps_device_id" value={formData.gps_device_id} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth select label="Assign Route" name="route_id" value={formData.route_id} onChange={handleChange}>
                                {routes.map((r) => <MenuItem key={r.id} value={r.id}>{r.route_name} ({r.route_number})</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Driver Name" name="driver_name" value={formData.driver_name || ""} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Conductor Name" name="conductor_name" value={formData.conductor_name || ""} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSaveBus}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BusManagement;
