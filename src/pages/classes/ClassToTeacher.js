import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const classes = ["Class 1", "Class 2"];
const sections = ["A", "B"];

const teachers = [
  { id: 9002, name: "Shivam Verma" },
  { id: 9001, name: "Jason Sharlton" },
  { id: 22, name: "Vidhu" },
];

export default function ClassToTeacher() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const [list] = useState([
    {
      class: "Class 1",
      section: "A",
      teacher: "Shivam Verma (9002)",
    },
  ]);

  const handleTeacherChange = (id) => {
    setSelectedTeachers((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id]
    );
  };

  const handleSave = () => {
    console.log({
      class: selectedClass,
      section: selectedSection,
      teachers: selectedTeachers,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* LEFT: Assign Class Teacher */}
      <Paper sx={{ p: 3, width: "35%" }}>
        <Typography variant="h6" mb={2}>
          Assign Class Teacher
        </Typography>

        <Stack spacing={2}>
          <TextField
            select
            label="Class *"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Section *"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select</MenuItem>
            {sections.map((sec) => (
              <MenuItem key={sec} value={sec}>
                {sec}
              </MenuItem>
            ))}
          </TextField>

          <Box>
            <Typography variant="subtitle1">
              Class Teacher *
            </Typography>
            {teachers.map((t) => (
              <FormControlLabel
                key={t.id}
                control={
                  <Checkbox
                    checked={selectedTeachers.includes(t.id)}
                    onChange={() => handleTeacherChange(t.id)}
                  />
                }
                label={`${t.name} (${t.id})`}
              />
            ))}
          </Box>

          <Box textAlign="right">
            <Button variant="contained" color="inherit" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Stack>
      </Paper>

      {/* RIGHT: Class Teacher List */}
      <Paper sx={{ p: 3, width: "65%" }}>
        <Typography variant="h6" mb={2}>
          Class Teacher List
        </Typography>

        <TextField
          placeholder="Search..."
          size="small"
          sx={{ mb: 2, width: 250 }}
        />

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Class Teacher</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.class}</TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell>{row.teacher}</TableCell>
                <TableCell align="center">
                  <IconButton size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography variant="caption" display="block" mt={1}>
          Records: 1 to 1 of 1
        </Typography>
      </Paper>
    </Box>
  );
}
