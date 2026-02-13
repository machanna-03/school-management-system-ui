import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const ExamTimetables = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [schedule, setSchedule] = useState([]);

  // 1. Initialize: Check if passed from CreateExam or Direct Access
  useEffect(() => {
    // If state has exam info, set it. Otherwise fetch all exams.
    if (state && state.examId) {
      setCurrentExam({
        id: state.examId,
        name: state.examName,
        classId: state.classId,
        academicYear: state.academicYear
      });
      // Also fetch exams list anyway so user can switch
      fetchExams();
    } else {
      fetchExams();
    }
  }, [state]);

  // 2. Fetch Schedule when Current Exam changes
  useEffect(() => {
    if (currentExam?.id) {
      fetchSchedule(currentExam.id);
    }
  }, [currentExam]);

  const fetchExams = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getExams, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        setExams(response.data.exams || []);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const fetchSchedule = async (examId) => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getExamSchedule + "/" + examId);
      if (response.status === 200 && response.data.responseCode === "200") {
        setSchedule(response.data.schedule || []);
      }
    } catch (error) {
      console.error("Error fetching schedule", error);
    }
  };

  const handleExamSelect = (e) => {
    const examId = e.target.value;
    const selected = exams.find(ex => ex.id === examId);
    if (selected) {
      setCurrentExam({
        id: selected.id,
        name: selected.exam_name,
        classId: selected.class_id,
        academicYear: selected.academic_year
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold" color="#303972">
          Exam Timetables View
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/create-exam")}
          sx={{ bgcolor: "#4d44b5", "&:hover": { bgcolor: "#3d34a5" } }}
        >
          + Create New Exam
        </Button>
      </Grid>

      {/* Select Exam Dropdown */}
      <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" mb={1} color="textSecondary">Select Exam to View Timetable</Typography>
          <TextField
            fullWidth
            select
            label="Exam"
            value={currentExam?.id || ""}
            onChange={handleExamSelect}
            size="small"
          >
            {exams.map((ex) => (
              <MenuItem key={ex.id} value={ex.id}>
                {ex.exam_name} ({ex.class_name} - {ex.academic_year})
              </MenuItem>
            ))}
          </TextField>
        </CardContent>
      </Card>

      {currentExam ? (
        <>
          {/* Exam Info Card */}
          <Card elevation={2} sx={{ mb: 3, borderRadius: 3, bgcolor: "#f8f9fa" }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Selected Exam</Typography>
                  <Typography variant="h6" color="#303972">{currentExam.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Details</Typography>
                  <Typography variant="body1">Class: {currentExam.classId} | Year: {currentExam.academicYear}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Schedule List Table only */}
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" mb={2} color="#4d44b5">Scheduled Subjects</Typography>
              <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
                <Table>
                  <TableHead sx={{ bgcolor: "#f1f1f1" }}>
                    <TableRow>
                      <TableCell><b>Subject</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell><b>Time</b></TableCell>
                      <TableCell><b>Marks (Pass/Total)</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No schedules added yet for this exam.</TableCell>
                      </TableRow>
                    ) : (
                      schedule.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>
                            <Typography fontWeight={500}>{row.subject_name}</Typography>
                            <Typography variant="caption" color="textSecondary">{row.subject_code}</Typography>
                          </TableCell>
                          <TableCell>{row.exam_date}</TableCell>
                          <TableCell>
                            <Chip label={`${row.start_time} - ${row.end_time}`} size="small" sx={{ bgcolor: "#e1f5fe", color: "#0288d1" }} />
                          </TableCell>
                          <TableCell>{row.passing_marks} / {row.total_marks}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <Box textAlign="center" py={5}>
          <Typography variant="body1" color="textSecondary">Please select an exam from the dropdown above to view its timetable.</Typography>
        </Box>
      )}
    </Box>
  );
};
export default ExamTimetables;
