import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid
} from "@mui/material";

const ExamTimetable = () => {
  const { state } = useLocation();

  if (!state) {
    return <Typography>No exam data found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Exam Timetable
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><b>Exam Name:</b> {state.examName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><b>Academic Year:</b> {state.academicYear}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography><b>Class:</b> {state.className}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><b>Exam Type:</b> {state.examType}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography><b>Start Date:</b> {state.startDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><b>End Date:</b> {state.endDate}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography><b>Total Marks:</b> {state.totalMarks}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamTimetable;
