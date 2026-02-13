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
  CircularProgress,
  IconButton,
  Chip
} from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { notifications } from '@mantine/notifications';
import { invokeApi, invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const ExamTimetable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const [formData, setFormData] = useState({
    subjectName: "",
    examDate: "",
    startTime: "",
    endTime: "",
    totalMarks: "100",
    passingMarks: "35",
  });

  useEffect(() => {
    if (!state || !state.examId) {
      notifications.show({
        title: 'Error',
        message: 'No exam selected. Please create an exam first.',
        color: 'red',
      });
      navigate("/create-exam");
      return;
    }
    fetchSubjects();
    fetchSchedule();
  }, [state]);

  const fetchSubjects = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getClassSubjects, { classId: state.classId });
      if (response.status === 200 && response.data.responseCode === "200") {
        setSubjects(response.data.subjects || []);
      }
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
  };

  const fetchSchedule = async () => {
    if (!state?.examId) return;
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getExamSchedule + "/" + state.examId);
      if (response.status === 200 && response.data.responseCode === "200") {
        setSchedule(response.data.schedule || []);
      }
    } catch (error) {
      console.error("Error fetching schedule", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = {
        exam_id: state.examId,
        subject_name: formData.subjectName,
        exam_date: formData.examDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
        total_marks: formData.totalMarks,
        passing_marks: formData.passingMarks
      };

      let response = await invokeApi(config.getMySchool + apiList.addExamSchedule, payload);

      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({
          title: 'Success',
          message: 'Schedule added successfully!',
          color: 'green',
        });
        fetchSchedule();
        setFormData({
          ...formData,
          subjectName: "",
          examDate: "",
          startTime: "",
          endTime: ""
        });
      } else {
        notifications.show({
          title: 'Error',
          message: response.data.responseMessage || 'Failed to add schedule',
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Exam Timetable Setup
      </Typography>

      {/* Exam Info Card */}
      <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">Exam Name</Typography>
              <Typography variant="h6" color="#303972">{state?.examName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="textSecondary">Academic Year</Typography>
              <Typography variant="h6" color="#303972">{state?.academicYear}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Add Schedule Form */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" mb={2} color="#4d44b5">Add Schedule</Typography>
              <form onSubmit={handleAddSchedule}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Subject"
                      name="subjectId"
                      value={formData.subjectId}
                      onChange={handleChange}
                      required
                      size="small"
                    >
                      {subjects.map((sub) => (
                        <MenuItem key={sub.id} value={sub.id}>{sub.name} ({sub.code})</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Date"
                      name="examDate"
                      value={formData.examDate}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="time"
                      label="Start Time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="time"
                      label="End Time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Total Marks"
                      name="totalMarks"
                      value={formData.totalMarks}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Passing Marks"
                      name="passingMarks"
                      value={formData.passingMarks}
                      onChange={handleChange}
                      required
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{ bgcolor: "#4d44b5", "&:hover": { bgcolor: "#3d34a5" } }}
                    >
                      {loading ? "Adding..." : "Add to Timetable"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Schedule List */}
        <Grid item xs={12} md={8}>
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
                      <TableCell><b>Marks</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schedule.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No schedules added yet.</TableCell>
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
              <Box mt={3} textAlign="right">
                <Button variant="outlined" onClick={() => navigate("/create-exam")}>Done</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ExamTimetable;
