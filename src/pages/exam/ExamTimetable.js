import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";

export default function ExamTimetable() {
  const [form, setForm] = useState({
    exam: "",
    className: "",
    subject: "",
    date: "",
    time: "",
    room: "",
  });

  const [timetable, setTimetable] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.exam || !form.subject || !form.date || !form.time) return;

    setTimetable((prev) => [
      ...prev,
      { id: prev.length + 1, ...form },
    ]);

    setForm({
      exam: "",
      className: "",
      subject: "",
      date: "",
      time: "",
      room: "",
    });
  };

  // ✅ Date format
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  // ✅ Time format
  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const d = new Date();
    d.setHours(h, m);
    return d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Grid container spacing={3}>
      {/* FORM */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Create Exam Timetable
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  label="Exam Name"
                  name="exam"
                  value={form.exam}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  label="Class"
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  type="date"
                  label="Exam Date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>

              {/* ✅ FIXED TIME FIELD */}
              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  type="time"
                  label="Exam Time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  size="small"
                  label="Room No"
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" mt={3}>
              <Button variant="contained" onClick={handleSubmit}>
                Add Timetable
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* TABLE */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Exam Timetable List
            </Typography>

            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Exam</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Room</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {timetable.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{formatDate(row.date)}</TableCell>
                      <TableCell>{formatTime(row.time)}</TableCell>
                      <TableCell>{row.room}</TableCell>
                    </TableRow>
                  ))}

                  {timetable.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No timetable added
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
