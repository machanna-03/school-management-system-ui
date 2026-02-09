import React, { useState } from "react";
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
  const [examData, setExamData] = useState({
    examName: "",
    academicYear: "",
    className: "",
    examType: "",
    startDate: "",
    endDate: "",
    totalMarks: ""
  });

  const handleChange = (e) => {
    setExamData({
      ...examData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Data:", examData);
    // API call will go here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Create Exam
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={3}>
            Create New Exam
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exam Name"
                  name="examName"
                  value={examData.examName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
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
                  select
                  label="Select Class"
                  name="className"
                  value={examData.className}
                  onChange={handleChange}
                >
                  <MenuItem value="Class 5">Class 5</MenuItem>
                  <MenuItem value="Class 6">Class 6</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Exam Type"
                  name="examType"
                  value={examData.examType}
                  onChange={handleChange}
                >
                  <MenuItem value="Written Exam">Written Exam</MenuItem>
                  <MenuItem value="Online Exam">Online Exam</MenuItem>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Total Marks"
                  name="totalMarks"
                  value={examData.totalMarks}
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
