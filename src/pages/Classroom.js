import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { notifications } from '@mantine/notifications';
import { invokeApi, invokeGetApi, invokeDeleteApi, apiList } from "../services/ApiServices";
import { config } from "../config/Config";

const Classroom = () => {
  const [className, setClassName] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getClassrooms, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        setClassrooms(response.data.classrooms || []);
      }
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className) return;

    setLoading(true);
    try {
      let payload = {
        room_name: className,
        capacity: studentCount
      };
      let response = await invokeApi(config.getMySchool + apiList.addClassroom, payload);

      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({ title: 'Success', message: 'Classroom added successfully', color: 'green' });
        setClassName("");
        setStudentCount("");
        fetchClassrooms();
      } else {
        notifications.show({ title: 'Error', message: response.data.responseMessage, color: 'red' });
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to add classroom', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this classroom?")) return;

    try {
      let response = await invokeDeleteApi(config.getMySchool + apiList.deleteClassroom + "/" + id, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({ title: 'Success', message: 'Classroom deleted successfully', color: 'green' });
        fetchClassrooms();
      } else {
        notifications.show({ title: 'Error', message: 'Failed to delete classroom', color: 'red' });
      }
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Classroom Management
      </Typography>

      {/* Add Classroom Form */}
      <Card sx={{ mb: 4, borderRadius: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Add Classroom
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <TextField
                size="small"
                label="Classroom Name / Number"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                fullWidth
                required
              />

              <TextField
                size="small"
                label="Capacity"
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120, bgcolor: "#4d44b5", "&:hover": { bgcolor: "#3d34a5" } }}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Classroom Table */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            All Classrooms
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f1f1f1" }}>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Room Name</b></TableCell>
                  <TableCell><b>Capacity</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {classrooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No Classrooms Found</TableCell>
                  </TableRow>
                ) : (
                  classrooms.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.room_name}</TableCell>
                      <TableCell>{row.capacity}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Classroom;
