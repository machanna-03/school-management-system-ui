import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { BiPlus, BiTrash, BiEdit, BiMap } from "react-icons/bi";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const RouteManagement = () => {
    const [routes, setRoutes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        route_name: "",
        route_number: "",
        start_location: "",
        end_location: ""
    });

    // Stops Management within Route
    const [openStopsDialog, setOpenStopsDialog] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [stops, setStops] = useState([]);
    const [stopData, setStopData] = useState({
        stop_name: "",
        stop_order: 1,
        pickup_fee: 0,
        estimated_arrival_time: ""
    });

    useEffect(() => {
        fetchRoutes();
    }, []);

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveRoute = async () => {
        try {
            let response = await invokeApi(config.getMySchool + apiList.addRoute, formData);
            if (response.status === 200 && response.data.responseCode === "200") {
                setOpenDialog(false);
                fetchRoutes();
                setFormData({ route_name: "", route_number: "", start_location: "", end_location: "" });
            } else {
                alert("Failed to add route: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error saving route:", error);
        }
    };

    // --- Stops Logic ---

    const handleOpenStops = async (route) => {
        setSelectedRoute(route);
        setOpenStopsDialog(true);
        fetchStops(route.id);
    };

    const fetchStops = async (routeId) => {
        try {
            // Construct URL manually since apiList stop is base
            let response = await invokeGetApi(`${config.getMySchool}/transport/stops/${routeId}`, {});
            if (response.status === 200 && response.data.responseCode === "200") {
                setStops(response.data.stops || []);
                // Set next order logic default
                setStopData(prev => ({ ...prev, stop_order: (response.data.stops.length || 0) + 1 }));
            }
        } catch (error) {
            console.error("Error fetching stops:", error);
        }
    };

    const handleSaveStop = async () => {
        if (!selectedRoute) return;

        const payload = { ...stopData, route_id: selectedRoute.id };

        try {
            let response = await invokeApi(config.getMySchool + apiList.addStop, payload);
            if (response.status === 200 && response.data.responseCode === "200") {
                fetchStops(selectedRoute.id);
                setStopData({
                    stop_name: "",
                    stop_order: stops.length + 2,
                    pickup_fee: 0,
                    estimated_arrival_time: ""
                });
            }
        } catch (error) {
            console.error("Error saving stop:", error);
        }
    };


    const handleDeleteRoute = async (id) => {
        if (!window.confirm("Are you sure you want to delete this route?")) return;
        try {
            let response = await invokeApi(config.getMySchool + apiList.deleteRoute, { id });
            if (response.status === 200 && response.data.responseCode === "200") {
                fetchRoutes();
            } else {
                alert("Failed to delete route: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error deleting route:", error);
        }
    };

    const handleDeleteStop = async (id) => {
        if (!window.confirm("Are you sure you want to delete this stop?")) return;
        try {
            let response = await invokeApi(config.getMySchool + apiList.deleteStop, { id });
            if (response.status === 200 && response.data.responseCode === "200") {
                if (selectedRoute) fetchStops(selectedRoute.id);
            } else {
                alert("Failed to delete stop: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error deleting stop:", error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#303972">
                    Route Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<BiPlus />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ bgcolor: "#4d44b5", borderRadius: 2 }}
                >
                    Add New Route
                </Button>
            </Box>

            {/* Routes Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f8f9fa" }}>
                        <TableRow>
                            <TableCell><b>Route Name</b></TableCell>
                            <TableCell><b>Route Number</b></TableCell>
                            <TableCell><b>Start</b></TableCell>
                            <TableCell><b>End</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {routes.map((route) => (
                            <TableRow key={route.id}>
                                <TableCell>{route.route_name}</TableCell>
                                <TableCell>{route.route_number}</TableCell>
                                <TableCell>{route.start_location}</TableCell>
                                <TableCell>{route.end_location}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenStops(route)}>
                                        <BiMap />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteRoute(route.id)}>
                                        <BiTrash />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Route Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            fullWidth margin="normal" label="Route Name" name="route_name"
                            value={formData.route_name} onChange={handleChange} required
                        />
                        <TextField
                            fullWidth margin="normal" label="Route Number" name="route_number"
                            value={formData.route_number} onChange={handleChange} required
                        />
                        <TextField
                            fullWidth margin="normal" label="Start Location" name="start_location"
                            value={formData.start_location} onChange={handleChange}
                        />
                        <TextField
                            fullWidth margin="normal" label="End Location" name="end_location"
                            value={formData.end_location} onChange={handleChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveRoute} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Manage Stops Dialog */}
            <Dialog open={openStopsDialog} onClose={() => setOpenStopsDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Manage Stops for {selectedRoute?.route_name}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center" sx={{ mt: 1, mb: 3 }}>
                        <Grid item xs={3}>
                            <TextField
                                label="Stop Name" size="small" fullWidth
                                value={stopData.stop_name}
                                onChange={(e) => setStopData({ ...stopData, stop_name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Order" type="number" size="small" fullWidth
                                value={stopData.stop_order}
                                onChange={(e) => setStopData({ ...stopData, stop_order: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Fee" type="number" size="small" fullWidth
                                value={stopData.pickup_fee}
                                onChange={(e) => setStopData({ ...stopData, pickup_fee: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Est. Time" type="time" size="small" fullWidth InputLabelProps={{ shrink: true }}
                                value={stopData.estimated_arrival_time}
                                onChange={(e) => setStopData({ ...stopData, estimated_arrival_time: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" fullWidth onClick={handleSaveStop}>Add</Button>
                        </Grid>
                    </Grid>

                    {/* Stops List */}
                    <TableContainer component={Paper} elevation={0} variant="outlined">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Stop Name</TableCell>
                                    <TableCell>Fee</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {stops.map((stop) => (
                                    <TableRow key={stop.id}>
                                        <TableCell>{stop.stop_order}</TableCell>
                                        <TableCell>{stop.stop_name}</TableCell>
                                        <TableCell>{stop.pickup_fee}</TableCell>
                                        <TableCell>{stop.estimated_arrival_time}</TableCell>
                                        <TableCell>
                                            <IconButton size="small" color="error" onClick={() => handleDeleteStop(stop.id)}><BiTrash /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {stops.length === 0 && (
                                    <TableRow><TableCell colSpan={5} align="center">No stops added yet</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenStopsDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default RouteManagement;
