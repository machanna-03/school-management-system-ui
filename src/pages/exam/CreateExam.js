import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid
} from "@mui/material";

const CreateExam = () => {
  const navigate = useNavigate();

  const [examData, setExamData] = useState({
    examName: "",
    academicYear: "",
    className: "",
    examType: "",
    startDate: "",
    endDate: "",
    totalMarks: "",
    subject: "",
    examDate: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/exam-timetable", {
      state: examData
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Create Exam
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>
            Exam Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Exam Info */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Exam Name"
                  name="examName"
                  value={examData.examName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Academic Year"
                  name="academicYear"
                  value={examData.academicYear}
                  onChange={handleChange}
                >
                  <MenuItem value="2023-2024">2023 - 2024</MenuItem>
                  <MenuItem value="2024-2025">2024 - 2025</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Class"
                  name="className"
                  value={examData.className}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Exam Type"
                  name="examType"
                  value={examData.examType}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Start Date"
                  name="startDate"
                  InputLabelProps={{ shrink: true }}
                  value={examData.startDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="End Date"
                  name="endDate"
                  InputLabelProps={{ shrink: true }}
                  value={examData.endDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Total Marks"
                  name="totalMarks"
                  value={examData.totalMarks}
                  onChange={handleChange}
                />
              </Grid>

              {/* Timetable Section */}
              <Grid item xs={12}>
                <Typography variant="h6" mt={2}>
                  Exam Timetable
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Subject"
                  name="subject"
                  value={examData.subject}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  label="Exam Date"
                  name="examDate"
                  InputLabelProps={{ shrink: true }}
                  value={examData.examDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="time"
                  label="Start Time"
                  name="startTime"
                  InputLabelProps={{ shrink: true }}
                  value={examData.startTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  size="small"
                  type="time"
                  label="End Time"
                  name="endTime"
                  InputLabelProps={{ shrink: true }}
                  value={examData.endTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ px: 4 }}
                >
                  Create Exam
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateExam;
