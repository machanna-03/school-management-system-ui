import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
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

const ExamSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [examName, setExamName] = useState("");

  // Example: get student info from localStorage
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (student?.classId && student?.sectionId) {
      fetchTimetable(student.classId, student.sectionId);
    }
  }, []);

  const fetchTimetable = async (classId, sectionId) => {
    try {
      setLoading(true);

      let response = await invokeGetApi(
        `${config.getMySchool}${apiList.getStudentExamSchedule}?classId=${classId}&sectionId=${sectionId}`
      );

      if (response.status === 200 && response.data.responseCode === "200") {
        setSchedule(response.data.schedule || []);
        setExamName(response.data.examName || "");
      }
    } catch (error) {
      console.error("Error fetching student timetable", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" color="#303972" mb={3}>
        Exam Timetable
      </Typography>

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          {examName && (
            <Typography variant="h6" mb={2} color="#4d44b5">
              {examName}
            </Typography>
          )}

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead sx={{ bgcolor: "#f4f5ff" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Marks (Pass/Total)
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      Loading timetable...
                    </TableCell>
                  </TableRow>
                ) : schedule.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No exam scheduled yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  schedule.map((row, i) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {row.subject_name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="textSecondary"
                        >
                          {row.subject_code}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {new Date(row.exam_date).toLocaleDateString("en-IN")}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={`${row.start_time} - ${row.end_time}`}
                          size="small"
                          sx={{
                            bgcolor: "#e1f5fe",
                            color: "#0288d1"
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {row.passing_marks} / {row.total_marks}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamSchedule;