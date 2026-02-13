
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  CircularProgress,
  Tabs,
  Tab,
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
  IconButton
} from "@mui/material";
import { notifications } from '@mantine/notifications';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'; // Make sure to have @mui/icons-material installed
import { invokeApi, invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const CreateExam = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  // Data for Dropdowns
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [examTypes, setExamTypes] = useState([]);

  // Exam Details State
  const [examData, setExamData] = useState({
    examName: "",
    examTypeId: "",
    academicYear: "2024-2025",
    classId: "",
    startDate: "",
    endDate: "",
  });

  // Timetable State: Array of manual entries
  const [timetable, setTimetable] = useState([
    { subjectName: "", date: "", startTime: "", endTime: "", totalMarks: "100", passingMarks: "35" }
  ]);

  // Dialog for Submit Confirmation
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  useEffect(() => {
    fetchClasses();
    fetchExamTypes();
  }, []);

  // Fetch Classes
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

  // Fetch Exam Types
  const fetchExamTypes = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getExamTypes, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        setExamTypes(response.data.exam_types || []);
      }
    } catch (error) {
      console.error("Error fetching exam types:", error);
    }
  };


  // Fetch Subjects when Class Changes
  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setExamData({ ...examData, classId: classId });
    // setTimetable([]); // Keep existing rows or reset? User might want to keep rows if just switching class slightly? 
    // Better to reset if class effectively changes to avoid invalid subjects.
    setTimetable([{ subjectName: "", date: "", startTime: "", endTime: "", totalMarks: "100", passingMarks: "35" }]);
    setSubjects([]);

    if (classId) {
      try {
        let response = await invokeGetApi(config.getMySchool + apiList.getClassSubjects, { classId: classId });
        if (response.status === 200 && response.data.responseCode === "200") {
          setSubjects(response.data.subjects || []);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
  };

  const handleExamDataChange = (e) => {
    setExamData({ ...examData, [e.target.name]: e.target.value });
  };

  const handleTimetableChange = (index, field, value) => {
    const updatedTimetable = [...timetable];
    updatedTimetable[index][field] = value;
    setTimetable(updatedTimetable);
  };

  const handleAddRow = () => {
    setTimetable([
      ...timetable,
      { subjectName: "", date: "", startTime: "", endTime: "", totalMarks: "100", passingMarks: "35" }
    ]);
  };

  const handleRemoveRow = (index) => {
    if (timetable.length > 1) {
      const updatedTimetable = timetable.filter((_, i) => i !== index);
      setTimetable(updatedTimetable);
    }
  };

  const handleTabChange = (event, newValue) => {
    // Validation before moving to next tab
    if (activeTab === 0 && newValue === 1) {
      if (!examData.examName || !examData.examTypeId || !examData.classId || !examData.startDate || !examData.endDate) {
        notifications.show({ title: 'Error', message: 'Please fill all Exam Details first.', color: 'red' });
        return;
      }
    }
    setActiveTab(newValue);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setOpenSubmitDialog(false);

    try {
      // 1. Create Exam
      let examPayload = {
        exam_name: examData.examName,
        academic_year: examData.academicYear,
        class_id: examData.classId,
        start_date: examData.startDate,
        end_date: examData.endDate,
        exam_type_id: examData.examTypeId
      };

      let examResponse = await invokeApi(config.getMySchool + apiList.createExam, examPayload);

      if (examResponse.status === 200 && examResponse.data.responseCode === "200") {
        const newExamId = examResponse.data.exam_id;

        // 2. Add Schedules
        // Filter valid rows
        const validSchedules = timetable.filter(row => row.subjectName && row.date && row.startTime && row.endTime);

        for (const row of validSchedules) {
          let schedulePayload = {
            exam_id: newExamId,
            subject_name: row.subjectName,
            exam_date: row.date,
            start_time: row.startTime,
            end_time: row.endTime,
            total_marks: row.totalMarks,
            passing_marks: row.passingMarks
          };
          await invokeApi(config.getMySchool + apiList.addExamSchedule, schedulePayload);
        }

        notifications.show({ title: 'Success', message: 'Exam and Timetable Created Successfully!', color: 'green' });
        navigate("/exam-timetables", { state: { examId: newExamId, examName: examData.examName, classId: examData.classId, academicYear: examData.academicYear } });
      } else {
        notifications.show({ title: 'Error', message: 'Failed to create exam.', color: 'red' });
      }

    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Error', message: 'Something went wrong.', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "80vh" }}>
      <Box sx={{ width: "100%", maxWidth: 1100 }}>
        <Typography variant="h5" fontWeight="bold" mb={3} color="#303972" textAlign="center">
          Create New Exam & Timetable
        </Typography>

        <Card elevation={3} sx={{ borderRadius: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="1. Exam Details" />
              <Tab label="2. Set Timetable" disabled={!examData.classId} />
              <Tab label="3. Verify & Submit" disabled={!examData.classId} />
            </Tabs>
          </Box>

          <CardContent sx={{ p: 4 }}>

            {/* TAB 1: EXAM DETAILS */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Exam Name"
                    name="examName"
                    placeholder="e.g. Final Exam 2024"
                    value={examData.examName}
                    onChange={handleExamDataChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Exam Type"
                    name="examTypeId"
                    value={examData.examTypeId}
                    onChange={handleExamDataChange}
                    required
                  >
                    {examTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>{type.exam_name}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Academic Year"
                    name="academicYear"
                    value={examData.academicYear}
                    onChange={handleExamDataChange}
                  >
                    <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                    <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                    <MenuItem value="2025-2026">2025 - 2026</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Select Class"
                    name="classId"
                    value={examData.classId}
                    onChange={handleClassChange} // Custom handler to fetch subjects
                    required
                  >
                    {classes.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    value={examData.startDate}
                    onChange={handleExamDataChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    value={examData.endDate}
                    onChange={handleExamDataChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Button variant="contained" onClick={() => handleTabChange(null, 1)} sx={{ bgcolor: "#4d44b5" }}>
                    Next: Timetable
                  </Button>
                </Grid>
              </Grid>
            )}

            {/* TAB 2: TIMETABLE */}
            {activeTab === 1 && (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" color="#4d44b5">Schedule Subjects</Typography>
                  <Button
                    variant="containerd"
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                    sx={{ color: "#4d44b5", fontWeight: "bold" }}
                  >
                    Add Subject
                  </Button>
                </Box>

                <TableContainer component={Paper} elevation={1} sx={{ maxHeight: 500 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell width="25%">Subject</TableCell>
                        <TableCell width="20%">Date</TableCell>
                        <TableCell width="15%">Start Time</TableCell>
                        <TableCell width="15%">End Time</TableCell>
                        <TableCell width="20%">Marks (Total/Pass)</TableCell>
                        <TableCell width="5%">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timetable.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              fullWidth
                              size="small"
                              value={row.subjectName}
                              onChange={(e) => handleTimetableChange(index, 'subjectName', e.target.value)}
                              placeholder="Subject Name"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="date"
                              fullWidth
                              size="small"
                              value={row.date}
                              onChange={(e) => handleTimetableChange(index, 'date', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="time"
                              fullWidth
                              size="small"
                              value={row.startTime}
                              onChange={(e) => handleTimetableChange(index, 'startTime', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              type="time"
                              fullWidth
                              size="small"
                              value={row.endTime}
                              onChange={(e) => handleTimetableChange(index, 'endTime', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" gap={1}>
                              <TextField
                                label="Total" size="small"
                                value={row.totalMarks}
                                onChange={(e) => handleTimetableChange(index, 'totalMarks', e.target.value)}
                              />
                              <TextField
                                label="Pass" size="small"
                                value={row.passingMarks}
                                onChange={(e) => handleTimetableChange(index, 'passingMarks', e.target.value)}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleRemoveRow(index)} color="error" disabled={timetable.length === 1}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddRow}
                    fullWidth
                    sx={{ borderStyle: 'dashed' }}
                  >
                    Add Another Subject
                  </Button>
                </Box>

                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handleTabChange(null, 0)}>Back</Button>
                  <Button variant="contained" onClick={() => handleTabChange(null, 2)} sx={{ bgcolor: "#4d44b5" }}>Next: Verify</Button>
                </Box>
              </Box>
            )}

            {/* TAB 3: VERIFY */}
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" mb={2} color="#4d44b5">Verify Exam Details</Typography>

                <Grid container spacing={2} mb={3}>
                  <Grid item xs={6}><Typography><b>Exam:</b> {examData.examName}</Typography></Grid>
                  <Grid item xs={6}><Typography><b>Class:</b> {classes.find(c => c.id === examData.classId)?.name}</Typography></Grid>
                  <Grid item xs={6}><Typography><b>Start Date:</b> {examData.startDate}</Typography></Grid>
                  <Grid item xs={6}><Typography><b>End Date:</b> {examData.endDate}</Typography></Grid>
                </Grid>

                <Typography variant="h6" mb={2} color="#4d44b5">Timetable Preview</Typography>
                {/* Filter only scheduled items for preview */}
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Marks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timetable.filter(r => r.subjectName && r.date).length === 0 ? (
                        <TableRow><TableCell colSpan={3} align="center">No subjects scheduled properly.</TableCell></TableRow>
                      ) : (
                        timetable.filter(r => r.subjectName && r.date).map((row, idx) => {
                          return (
                            <TableRow key={idx}>
                              <TableCell>{row.subjectName}</TableCell>
                              <TableCell>{row.date} {row.startTime && `(${row.startTime} - ${row.endTime})`}</TableCell>
                              <TableCell>{row.passingMarks}/{row.totalMarks}</TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box mt={3} display="flex" justifyContent="space-between">
                  <Button variant="outlined" onClick={() => handleTabChange(null, 1)}>Back</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setOpenSubmitDialog(true)}
                    size="large"
                  >
                    Verify & Submit
                  </Button>
                </Box>
              </Box>
            )}

          </CardContent>
        </Card>

        {/* Submit Confirmation Dialog */}
        <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)}>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to create this exam? <br />
              <b>{timetable.filter(r => r.subjectName && r.date).length}</b> subjects will be scheduled.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSubmitDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>
              {loading ? "Creating..." : "Confirm & Create"}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
  );
};

export default CreateExam;
