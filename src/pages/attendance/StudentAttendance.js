import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import Card from "../../components/common/Card";
import { BiCalendar } from "react-icons/bi";
import { useState } from "react";

const StudentAttendance = () => {
  /* Date state */
  const [date, setDate] = useState(new Date());

  /* Students state (FIXED) */
  const [students, setStudents] = useState([
    {
      id: "S001",
      name: "Samantha William",
      roll: "101",
      status: "present",
      img: "SW",
      color: "#fb7d5b",
      remarks: "",
    },
    {
      id: "S002",
      name: "Tony Soap",
      roll: "102",
      status: "absent",
      img: "TS",
      color: "#fcc43e",
      remarks: "",
    },
    {
      id: "S003",
      name: "Karen Hope",
      roll: "103",
      status: "present",
      img: "KH",
      color: "#30c7ec",
      remarks: "",
    },
    {
      id: "S004",
      name: "Jordan Nico",
      roll: "104",
      status: "late",
      img: "JN",
      color: "#4d44b5",
      remarks: "",
    },
    {
      id: "S005",
      name: "Nadila Adja",
      roll: "105",
      status: "present",
      img: "NA",
      color: "#369c5e",
      remarks: "",
    },
  ]);

  /* Dialog state */
  const [openDialog, setOpenDialog] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
  });

  /* Avatar colors */
  const avatarColors = ["#fb7d5b", "#fcc43e", "#30c7ec", "#4d44b5", "#369c5e"];

  /* Get initials */
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  /* Add student */
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.roll) return;

    const newEntry = {
      id: `S${students.length + 1}`,
      name: newStudent.name,
      roll: newStudent.roll,
      status: "present",
      img: getInitials(newStudent.name),
      color: avatarColors[students.length % avatarColors.length],
      remarks: "",
    };

    setStudents([...students, newEntry]);

    setNewStudent({
      name: "",
      roll: "",
    });

    setOpenDialog(false);
  };

  /* Handle attendance change */
  const handleStatusChange = (index, value) => {
    const updated = [...students];
    updated[index].status = value;
    setStudents(updated);
  };

  /* Handle remarks change */
  const handleRemarksChange = (index, value) => {
    const updated = [...students];
    updated[index].remarks = value;
    setStudents(updated);
  };

  /* Save attendance */
  const handleSave = () => {
    console.log("Attendance Saved:", students);
    alert("Attendance Saved Successfully");
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteStudent, setDeleteStudent] = useState({
    name: "",
    roll: "",
  });

  const handleDeleteStudent = () => {
    const filtered = students.filter(
      (std) =>
        !(
          std.name.toLowerCase() === deleteStudent.name.toLowerCase() &&
          std.roll === deleteStudent.roll
        ),
    );

    setStudents(filtered);

    setDeleteStudent({
      name: "",
      roll: "",
    });

    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Student Attendance
        </Typography>

        {/* RIGHT SIDE BUTTONS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ borderRadius: "30px", px: 4 }}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Student
          </Button>

          <Button
            variant="contained"
            sx={{ borderRadius: "30px", px: 4 }}
            onClick={() => setOpenDialog(true)}
          >
            New Student
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          bgcolor: "white",
          mt:2,
          p: 3,
          borderRadius: 4,
          mb: 4,
          boxShadow: "0px 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="caption">Select Class</Typography>
            <Select fullWidth size="small" defaultValue="VII A">
              <MenuItem value="VII A">Class VII A</MenuItem>
              <MenuItem value="VII B">Class VII B</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption">Select Section</Typography>
            <Select fullWidth size="small" defaultValue="A">
              <MenuItem value="A">Section A</MenuItem>
              <MenuItem value="B">Section B</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption">Select Date</Typography>
            <Button fullWidth variant="outlined" startIcon={<BiCalendar />}>
              {date.toLocaleDateString()}
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption">Teacher Name</Typography>
            <Select fullWidth size="small" defaultValue="Mr John">
              <MenuItem value="Mr John">Mr. John</MenuItem>
              <MenuItem value="Mrs Smith">Mrs. Smith</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption">Select Subject</Typography>
            <Select fullWidth size="small" defaultValue="Mathematics">
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="English">English</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="caption">Select Timing</Typography>
            <Select fullWidth size="small" defaultValue="9:00 to 10:00">
              <MenuItem value="9:00 to 10:00">9:00 to 10:00</MenuItem>
              <MenuItem value="10:00 to 11:00">10:00 to 11:00</MenuItem>
            </Select>
          </Grid>
        </Grid>

        {/* LOAD BUTTON RIGHT BOTTOM */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "30px",
              px: 5,
              py: 1,
              fontWeight: 600,
            }}
            onClick={() => {
              console.log("Load clicked");
            }}
          >
            Load Data
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell align="center">Attendance</TableCell>
                <TableCell>Remarks</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((std, index) => (
                <TableRow key={std.id}>
                  <TableCell>#{std.roll}</TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: std.color }}>{std.img}</Avatar>

                      <Typography fontWeight={600}>{std.name}</Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <RadioGroup
                      row
                      value={std.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="present"
                        control={<Radio size="small" />}
                        label="Present"
                      />

                      <FormControlLabel
                        value="absent"
                        control={<Radio size="small" />}
                        label="Absent"
                      />

                      <FormControlLabel
                        value="late"
                        control={<Radio size="small" />}
                        label="Late"
                      />
                    </RadioGroup>
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Enter remarks"
                      value={std.remarks}
                      onChange={(e) =>
                        handleRemarksChange(index, e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box textAlign="right" p={2}>
          <Button
            variant="contained"
            sx={{ borderRadius: "30px", px: 6 }}
            onClick={handleSave}
          >
            Save Attendance
          </Button>
        </Box>
      </Card>

      {/* Add Student Dialog */}

      <Dialog open={openDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Student</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    name: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Roll Number"
                value={newStudent.roll}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    roll: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleAddStudent}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Student Dialog */}
      <Dialog open={openDeleteDialog} fullWidth maxWidth="sm">
        <DialogTitle>Delete Student</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Student Name"
                value={deleteStudent.name}
                onChange={(e) =>
                  setDeleteStudent({
                    ...deleteStudent,
                    name: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Roll Number"
                value={deleteStudent.roll}
                onChange={(e) =>
                  setDeleteStudent({
                    ...deleteStudent,
                    roll: e.target.value,
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
            onClick={handleDeleteStudent}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentAttendance;
