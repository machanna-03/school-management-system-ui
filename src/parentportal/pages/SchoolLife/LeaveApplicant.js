import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Grid,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const students = [{ id: 1, name: "Rahul Sharma (Grade 5-A)" }];

export default function ApplyStudentLeave() {
  const [student, setStudent] = useState("");
  const [leaveType, setLeaveType] = useState("Sick");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveList, setLeaveList] = useState([]);

  const leaveDays =
    fromDate && toDate
      ? Math.floor(
          (new Date(toDate) - new Date(fromDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  const handleSubmit = () => {
    if (!student || !fromDate || !toDate || !reason) return;

    setLeaveList((prev) => [
      ...prev,
      {
        id: Date.now(),
        student,
        leaveType,
        fromDate,
        toDate,
        days: leaveDays,
        reason,
        status: "Pending",
        approvedBy: "—",
      },
    ]);

    setFromDate("");
    setToDate("");
    setReason("");
    setLeaveType("Sick");
  };

  return (
    <Grid container spacing={2}>
      {/* FORM */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2.5, maxWidth: 1000, mx: "auto" }}>
          <Typography variant="h6" mb={2}>
            Apply Leave For Student
          </Typography>

          <Stack spacing={2}>
            <TextField
              select
              size="small"
              label="Student"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              fullWidth
            >
              {students.map((stu) => (
                <MenuItem key={stu.id} value={stu.name}>
                  {stu.name}
                </MenuItem>
              ))}
            </TextField>

            <RadioGroup
              row
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              {["Sick", "Medical", "Family Event", "Other"].map((t) => (
                <FormControlLabel
                  key={t}
                  value={t}
                  control={<Radio size="small" />}
                  label={t}
                />
              ))}
            </RadioGroup>

            <Stack direction="row" spacing={2}>
              <TextField
                type="date"
                size="small"
                label="From"
                InputLabelProps={{ shrink: true }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                fullWidth
              />
              <TextField
                type="date"
                size="small"
                label="To"
                InputLabelProps={{ shrink: true }}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                fullWidth
              />
            </Stack>

            {leaveDays > 0 && (
              <Typography variant="body2">
                Total Days: <b>{leaveDays}</b>
              </Typography>
            )}

            <TextField
              multiline
              rows={3}
              size="small"
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
            />

            <Divider />

            <Typography variant="body2">
              <b>Parent:</b> Mr. Rajesh Sharma (Father)
            </Typography>
            <Typography variant="body2">
              <b>Contact:</b> +91 98765 43210
            </Typography>

            {leaveDays > 2 && (
              <Typography variant="caption" color="warning.main">
                ⚠️ For leaves more than 2 days, medical certificate is mandatory
              </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => {
                  setStudent("");
                  setFromDate("");
                  setToDate("");
                  setReason("");
                  setLeaveType("Sick");
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!reason || !fromDate || !toDate}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>

      {/* TABLE */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2.5, maxWidth: 1000, mx: "auto" }}>
          <Typography variant="h6" mb={2}>
            Leave Applications
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Approved By</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {leaveList.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.student}</TableCell>
                  <TableCell>
                    {row.fromDate} → {row.toDate}
                  </TableCell>
                  <TableCell>{row.days}</TableCell>
                  <TableCell>{row.approvedBy}</TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={row.status}
                      color={
                        row.status === "Approved"
                          ? "success"
                          : row.status === "Rejected"
                          ? "error"
                          : "warning"
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
