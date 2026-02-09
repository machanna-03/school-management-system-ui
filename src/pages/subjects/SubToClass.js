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
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/* ---------- Static Data ---------- */
const classes = ["Class 1", "Class 2"];
const sections = ["A", "B"];
const subjects = [
  { id: 1, name: "Mathematics" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Chemistry" },
  { id: 4, name: "History" },
  { id: 5, name: "Political Science" },
];

export default function SubToClass() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [list] = useState([
    {
      class: "Class 1",
      section: "A",
      subjects: "Mathematics, Physics",
    },
  ]);

  const handleSubjectChange = (id) => {
    setSelectedSubjects((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const selectedSubjectNames = subjects.filter((s) =>
    selectedSubjects.includes(s.id)
  );

  const handleSave = () => {
    console.log({
      class: selectedClass,
      section: selectedSection,
      subjects: selectedSubjectNames.map((s) => s.name),
    });
  };

  return (
    <Grid container spacing={2}>
      {/* LEFT CARD */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" mb={2}>
            Assign Subject to Class
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

            {/* SUBJECT DROPDOWN */}
            <TextField
              select
              label="Subjects *"
              fullWidth
              value={selectedSubjects}   // ✅ REQUIRED
              SelectProps={{
                multiple: true,
                renderValue: () => "Select Subjects",
              }}
            >
              {subjects.map((sub) => (
                <MenuItem
                  key={sub.id}
                  value={sub.id}
                  onClick={() => handleSubjectChange(sub.id)}
                >
                  <Checkbox checked={selectedSubjects.includes(sub.id)} />
                  <Typography>{sub.name}</Typography>
                </MenuItem>
              ))}
            </TextField>



            {/* SELECTED SUBJECTS DISPLAY */}
            {selectedSubjects.length > 0 && (
              <Box>
                <Typography variant="subtitle1">Selected Subjects</Typography>
                {selectedSubjectNames.map((sub) => (
                  <FormControlLabel
                    key={sub.id}
                    control={
                      <Checkbox
                        checked
                        onChange={() => handleSubjectChange(sub.id)}
                      />
                    }
                    label={sub.name}
                  />
                ))}
              </Box>
            )}

            <Box textAlign="right">
              <Button variant="contained" color="inherit" onClick={handleSave}>
                Save
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {/* RIGHT CARD */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" mb={2}>
            Subject – Class List
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.class}</TableCell>
                  <TableCell>{row.section}</TableCell>
                  <TableCell>{row.subjects}</TableCell>
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
        </Paper>
      </Grid>
    </Grid>
  );
}
