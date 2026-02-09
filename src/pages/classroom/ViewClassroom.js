import React, { useState } from "react";
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
  Stack
} from "@mui/material";

const ViewClassroom = () => {
  const [className, setClassName] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [classrooms, setClassrooms] = useState([
    { id: 1, name: "Class A", count: 750 },
    { id: 2, name: "Class B", count: 500 },
    { id: 3, name: "Class C", count: 850 }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!className || !studentCount) return;

    setClassrooms([
      ...classrooms,
      {
        id: classrooms.length + 1,
        name: className,
        count: studentCount
      }
    ]);

    setClassName("");
    setStudentCount("");
  };

  const handleDelete = (id) => {
    setClassrooms(classrooms.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Classroom Management
      </Typography>

      {/* Add Classroom Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add Classroom
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Classroom Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                fullWidth
              />

              <TextField
                label="Student Count"
                type="number"
                value={studentCount}
                onChange={(e) => setStudentCount(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120 }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Classroom Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            All Classrooms
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Student Count</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {classrooms.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button size="small" variant="contained">
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewClassroom;
