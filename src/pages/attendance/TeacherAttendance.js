import React, { useState } from "react";
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
  Checkbox,
  Avatar,
  Select,
  MenuItem,
  Stack,
  Chip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import Card from "../../components/common/Card";
import { BiCalendar } from "react-icons/bi";

const TeacherAttendance = () => {
  const [date, setDate] = useState(new Date());

  /* Add Teacher Dialog state */
  const [openDialog, setOpenDialog] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    id: "",
    name: "",
  });

  /* Delete Teacher Dialog state */
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteTeacher, setDeleteTeacher] = useState({
    id: "",
    name: "",
  });

  /* Teachers list */
  const [teachers, setTeachers] = useState([
    {
      id: "T001",
      name: "John Doe",
      subject: "Math",
      status: true,
      timeIn: "08:00 AM",
      timeOut: "04:00 PM",
      color: "#4d44b5",
    },
    {
      id: "T002",
      name: "Jane Smith",
      subject: "Physics",
      status: true,
      timeIn: "08:15 AM",
      timeOut: "04:00 PM",
      color: "#fb7d5b",
    },
    {
      id: "T003",
      name: "Alice Johnson",
      subject: "English",

      status: false,
      timeIn: "-",
      timeOut: "-",
      color: "#30c7ec",
    },
    {
      id: "T004",
      name: "Robert Brown",
      subject: "History",
      status: true,
      timeIn: "07:55 AM",
      timeOut: "03:30 PM",
      color: "#fcc43e",
    },
  ]);

  const handleAddTeacher = () => {
    if (!newTeacher.id || !newTeacher.name) {
      alert("Please enter Teacher ID and Name");
      return;
    }

    setTeachers([...teachers, newTeacher]);

    alert("Teacher Added Successfully");

    setNewTeacher({
      id: "",
      name: "",
    });

    setOpenDialog(false);
  };

  const handleDeleteTeacher = () => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher.id !== deleteTeacher.id || teacher.name !== deleteTeacher.name,
    );

    if (filtered.length === teachers.length) {
      alert("Teacher not found");
      return;
    }

    setTeachers(filtered);

    alert("Teacher Deleted Successfully");

    setDeleteTeacher({
      id: "",
      name: "",
    });

    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        {/* TOP ROW */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {/* LEFT SIDE TITLE */}
          <Typography variant="h4" color="text.primary">
            Teacher Attendance
          </Typography>

          {/* RIGHT SIDE BUTTONS */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ borderRadius: "30px", px: 4 }}
              // onClick={() => setOpenDeleteDialog(true)}
            >
              Delete Teacher
            </Button>

            <Button
              variant="contained"
              sx={{ borderRadius: "30px", px: 4 }}
              // onClick={() => setOpenDialog(true)}
            >
              New Teacher
            </Button>
          </Box>
        </Box>

        {/* DAILY LOG BELOW TITLE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Daily Log
          </Typography>

          <Typography variant="body2" color="text.secondary">
            •
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {date.toDateString()}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 4,
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 10px 40px 0px rgba(50, 50, 50, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<BiCalendar />}
            sx={{
              color: "text.primary",
              borderColor: "#c4c4c4",
              borderRadius: 3,
              px: 3,
            }}
          >
            {date.toLocaleDateString()}
          </Button>
        </Box>
        <Button variant="contained" sx={{ borderRadius: "30px", px: 4 }}>
          Download Report
        </Button>
      </Box>

      {/* Teacher List */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{ "& th": { fontWeight: 600, color: "text.secondary" } }}
              >
                <TableCell>Teacher ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Check In</TableCell>
                <TableCell align="center">Check Out</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((teacher, i) => (
                <TableRow key={i} hover sx={{ "& td": { py: 2.5 } }}>
                  <TableCell sx={{ color: "primary.main", fontWeight: 600 }}>
                    {teacher.id}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: teacher.color,
                          width: 36,
                          height: 36,
                          fontSize: 14,
                        }}
                      >
                        {teacher.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, color: "#3d4465" }}
                      >
                        {teacher.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {teacher.subject}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={teacher.status ? "Present" : "Absent"}
                      size="small"
                      sx={{
                        bgcolor: teacher.status ? "#e6fffa" : "#fff5f5",
                        color: teacher.status ? "#369c5e" : "#ff5b5b",
                        fontWeight: 600,
                        minWidth: 80,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    {teacher.timeIn}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "text.secondary" }}>
                    {teacher.timeOut}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    >
                      Log Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={openDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Teacher</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teacher ID"
                value={newTeacher.id}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    id: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teacher Name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleAddTeacher}>
            Add Teacher
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} fullWidth maxWidth="sm">
        <DialogTitle>Delete Teacher</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teacher ID"
                value={deleteTeacher.id}
                onChange={(e) =>
                  setDeleteTeacher({
                    ...deleteTeacher,
                    id: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teacher Name"
                value={deleteTeacher.name}
                onChange={(e) =>
                  setDeleteTeacher({
                    ...deleteTeacher,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTeacher}
          >
            Delete Teacher
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeacherAttendance;
