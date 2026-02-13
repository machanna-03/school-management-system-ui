import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Autocomplete
} from "@mui/material";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const StudentMarksHistory = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);

  const [filters, setFilters] = useState({
    classId: "",
    studentId: ""
  });

  const fetchMarks = async (overrideFilters = {}) => {
    const activeFilters = { ...filters, ...overrideFilters };

    let params = {};
    if (activeFilters.classId) params.class_id = activeFilters.classId;
    if (activeFilters.studentId) params.student_id = activeFilters.studentId;

    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getStudentMarks, params);
      if (response.status === 200 && response.data.responseCode === "200") {
        setMarks(response.data.marks || []);
      }
    } catch (error) {
      console.error("Error fetching marks history:", error);
    }
  };

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

  useEffect(() => {
    fetchClasses();
    fetchMarks(); // Fetch all on load
  }, []);

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    const selectedClass = classes.find(c => c.id === classId);

    setFilters({ ...filters, classId: classId, studentId: "" });
    setStudents([]);

    // Fetch marks for this class immediately
    fetchMarks({ classId: classId, studentId: "" });

    if (classId && selectedClass) {
      try {
        // Fetch students filtered by class name from API (Server-Side Filtering)
        let response = await invokeGetApi(config.getMySchool + apiList.getStudents, { class: selectedClass.name });
        if (response.status === 200 && response.data.responseCode === "200") {
          setStudents(response.data.students || []);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    } else {
      // If class cleared, fetch all marks again
      fetchMarks({ classId: "", studentId: "" });
    }
  };

  const handleStudentChange = (e) => {
    setFilters({ ...filters, studentId: e.target.value });
  };

  const handleSearch = async () => {
    if (!filters.studentId) return;

    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getStudentMarks, { student_id: filters.studentId });
      if (response.status === 200 && response.data.responseCode === "200") {
        setMarks(response.data.marks || []);
      }
    } catch (error) {
      console.error("Error fetching marks history:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Student Marks History
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Select Student
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="Class"
                name="classId"
                value={filters.classId}
                onChange={handleClassChange}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                disabled={!filters.classId}
                options={students}
                getOptionLabel={(option) => option.name || ""}
                value={students.find(s => s.id === filters.studentId) || null}
                onChange={(event, newValue) => {
                  const sid = newValue ? newValue.id : "";
                  setFilters({ ...filters, studentId: sid });
                  fetchMarks({ ...filters, studentId: sid });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Student"
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Button removed as fetch is auto */}
          </Grid>
        </CardContent>
      </Card>

      {/* Marks Table */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Academic Performance
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f1f1f1" }}>
                <TableRow>
                  <TableCell><b>Student</b></TableCell>
                  <TableCell><b>Exam</b></TableCell>
                  <TableCell><b>Year</b></TableCell>
                  <TableCell><b>Subject</b></TableCell>
                  <TableCell><b>Total Marks</b></TableCell>
                  <TableCell><b>Pass Marks</b></TableCell>
                  <TableCell><b>Obtained</b></TableCell>
                  <TableCell><b>Remarks</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {marks.length > 0 ? (
                  marks.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.student_name} ({row.roll_number})</TableCell>
                      <TableCell>{row.exam_name}</TableCell>
                      <TableCell>{row.academic_year}</TableCell>
                      <TableCell>{row.subject_name}</TableCell>
                      <TableCell>{row.total_marks}</TableCell>
                      <TableCell>{row.passing_marks}</TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color={Number(row.marks_obtained) >= Number(row.passing_marks) ? "green" : "red"}>
                          {row.marks_obtained}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentMarksHistory;
