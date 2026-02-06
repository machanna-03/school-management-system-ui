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

/* ---------- Static Data (Replace with API later) ---------- */
const classes = ["Class 1", "Class 2"];
const sections = ["A", "B"];
const subjectGroups = ["Science", "Arts"];

const subjects = [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "English" },
];

const teachers = [
    { id: 9002, name: "Shivam Verma" },
    { id: 9001, name: "Jason Sharlton" },
];

/* --------------------------------------------------------- */

export default function SubToTeacher() {
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");

    const [list] = useState([
        {
            class: "Class 1",
            section: "A",
            subject: "Mathematics",
            teacher: "Shivam Verma (9002)",
        },
    ]);

    const handleSubjectChange = (id) => {
        setSelectedSubjects((prev) =>
            prev.includes(id)
                ? prev.filter((s) => s !== id)
                : [...prev, id]
        );
    };

    const handleSave = () => {
        console.log({
            class: selectedClass,
            section: selectedSection,
            subjectGroup: selectedGroup,
            subjects: selectedSubjects,
            teacher: selectedTeacher,
        });
    };
    const oneLineCell = {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 160, // adjust per column
    };


    return (
        <Grid container spacing={2}>
            {/* LEFT CARD */}
            <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3, borderRadius: 0 }}>
                    <Typography variant="h6" mb={2}>
                        Assign Subject Teacher
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

                        <TextField
                            select
                            label="Subject Group"
                            value={selectedGroup}
                            onChange={(e) => setSelectedGroup(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Select</MenuItem>
                            {subjectGroups.map((grp) => (
                                <MenuItem key={grp} value={grp}>
                                    {grp}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Box>
                            <Typography variant="subtitle1">Subjects *</Typography>
                            {subjects.map((sub) => (
                                <FormControlLabel
                                    key={sub.id}
                                    control={
                                        <Checkbox
                                            checked={selectedSubjects.includes(sub.id)}
                                            onChange={() => handleSubjectChange(sub.id)}
                                        />
                                    }
                                    label={sub.name}
                                />
                            ))}
                        </Box>

                        <TextField
                            select
                            label="Teacher *"
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Select</MenuItem>
                            {teachers.map((t) => (
                                <MenuItem key={t.id} value={t.id}>
                                    {t.name} ({t.id})
                                </MenuItem>
                            ))}
                        </TextField>

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
                        Subject Teacher List
                    </Typography>

                    <TextField
                        size="small"
                        placeholder="Search..."
                        sx={{ mb: 2, width: 250 }}
                    />

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Class</TableCell>
                                <TableCell>Section</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {list.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={oneLineCell}>{row.class}</TableCell>

                                    <TableCell sx={oneLineCell}>{row.section}</TableCell>

                                    <TableCell sx={{ ...oneLineCell, maxWidth: 180 }}>
                                        {row.subject}
                                    </TableCell>

                                    <TableCell sx={{ ...oneLineCell, maxWidth: 220 }}>
                                        {row.teacher}
                                    </TableCell>

                                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
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
            </Grid>
        </Grid>
    );
}
