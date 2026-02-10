import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Card from "../../components/common/Card";

import { BiCalendarPlus, BiPrinter, BiPlus, BiTrash } from "react-icons/bi";

const TimeTable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [times, setTimes] = useState([
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:30",
    "11:30 - 12:30",
    "12:30 - 13:30",
  ]);

  /* ---------------- Dialog States ---------------- */

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openNewScheduleDialog, setOpenNewScheduleDialog] = useState(false);

  /* ---------------- Add Slot State ---------------- */

  const [addForm, setAddForm] = useState({
    day: "",
    subject: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  /* ---------------- Delete Slot State ---------------- */

  const [deleteForm, setDeleteForm] = useState({
    day: "",
    subject: "",
    startTime: "",
    endTime: "",
  });

  /* ---------------- NEW SCHEDULE DIALOG STATE ---------------- */

  const [newScheduleRows, setNewScheduleRows] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
      subject: "",
      room: "",
    },
  ]);

  const [schedule, setSchedule] = useState({
    Monday: [
      { subject: "Math", room: "101", color: "#4d44b5" },
      { subject: "Physics", room: "Lab A", color: "#fb7d5b" },
      { subject: "Break", room: "", color: "#f0f1f5", isBreak: true },
      { subject: "English", room: "102", color: "#30c7ec" },
      { subject: "History", room: "103", color: "#fcc43e" },
      { subject: "Biology", room: "Lab B", color: "#369c5e" },
    ],
    Tuesday: [
      { subject: "Chemistry", room: "Lab A", color: "#30c7ec" },
      { subject: "Math", room: "101", color: "#4d44b5" },
      { subject: "Break", room: "", color: "#f0f1f5", isBreak: true },
      { subject: "Geography", room: "104", color: "#fcc43e" },
      { subject: "Physics", room: "101", color: "#fb7d5b" },
      { subject: "English", room: "102", color: "#30c7ec" },
    ],
    // ... simplistic representation, reusing data for demo
    Wednesday: [
      { subject: "Math", room: "101", color: "#4d44b5" },
      { subject: "Physics", room: "Lab A", color: "#fb7d5b" },
      { subject: "Break", room: "", color: "#f0f1f5", isBreak: true },
      { subject: "English", room: "102", color: "#30c7ec" },
      { subject: "History", room: "103", color: "#fcc43e" },
      { subject: "Biology", room: "Lab B", color: "#369c5e" },
    ],
    Thursday: [
      { subject: "Chemistry", room: "Lab A", color: "#30c7ec" },
      { subject: "Math", room: "101", color: "#4d44b5" },
      { subject: "Break", room: "", color: "#f0f1f5", isBreak: true },
      { subject: "Geography", room: "104", color: "#fcc43e" },
      { subject: "Physics", room: "101", color: "#fb7d5b" },
      { subject: "English", room: "102", color: "#30c7ec" },
    ],
    Friday: [
      { subject: "Math", room: "101", color: "#4d44b5" },
      { subject: "Physics", room: "Lab A", color: "#fb7d5b" },
      { subject: "Break", room: "", color: "#f0f1f5", isBreak: true },
      { subject: "English", room: "102", color: "#30c7ec" },
      { subject: "History", room: "103", color: "#fcc43e" },
      { subject: "Biology", room: "Lab B", color: "#369c5e" },
    ],
  });
  /* ---------------- Handlers ---------------- */

  const handleAddSlot = () => {
    if (
      !addForm.day ||
      !addForm.subject ||
      !addForm.startTime ||
      !addForm.endTime ||
      !addForm.room
    ) {
      alert("Please fill all fields");
      return;
    }

    const newTime = `${addForm.startTime} - ${addForm.endTime}`;

    // Add new time at end
    const updatedTimes = [...times, newTime];

    // Copy schedule
    const updatedSchedule = {};

    days.forEach((day) => {
      if (day === addForm.day) {
        updatedSchedule[day] = [
          ...schedule[day],
          {
            subject: addForm.subject,
            room: addForm.room,
            color: "#4d44b5",
          },
        ];
      } else {
        updatedSchedule[day] = [
          ...schedule[day],
          {
            subject: "",
            room: "",
            color: "#ccc",
            isEmpty: true,
          },
        ];
      }
    });

    setTimes(updatedTimes);
    setSchedule(updatedSchedule);

    setOpenAddDialog(false);

    setAddForm({
      day: "",
      subject: "",
      startTime: "",
      endTime: "",
      room: "",
    });
  };

  const handleDeleteSlot = () => {
    const { day, subject, startTime, endTime } = deleteForm;
    if (!day || !subject || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }
    const deleteTime = `${startTime} - ${endTime}`;
    // Find time index
    const timeIndex = times.findIndex((time) => time === deleteTime);
    if (timeIndex === -1) {
      alert("Time slot not found");
      return;
    }
    // Check subject match
    const slot = schedule[day][timeIndex];
    if (!slot || slot.subject !== subject) {
      alert("Subject not found at given time");
      return;
    }
    // Copy schedule
    const updatedSchedule = { ...schedule };
    // Clear only selected slot
    updatedSchedule[day] = [...updatedSchedule[day]];
    updatedSchedule[day][timeIndex] = {
      subject: "",
      room: "",
      color: "#ccc",
      isEmpty: true,
    };
    setSchedule(updatedSchedule);
    alert("Slot deleted successfully");
    setOpenDeleteDialog(false);
    setDeleteForm({
      day: "",
      subject: "",
      startTime: "",
      endTime: "",
    });
  };
  const handleNewScheduleChange = (index, field, value) => {
    const updatedRows = [...newScheduleRows];
    updatedRows[index][field] = value;
    setNewScheduleRows(updatedRows);
  };

  const handleAddNewScheduleRow = () => {
    setNewScheduleRows([
      ...newScheduleRows,
      {
        day: "",
        startTime: "",
        endTime: "",
        subject: "",
        room: "",
      },
    ]);
  };

  const handleRemoveNewScheduleRow = (index) => {
    const updatedRows = newScheduleRows.filter((_, i) => i !== index);
    setNewScheduleRows(updatedRows);
  };

  const handleSaveNewSchedule = () => {
    // validation
    for (let row of newScheduleRows) {
      if (
        !row.day ||
        !row.startTime ||
        !row.endTime ||
        !row.subject ||
        !row.room
      ) {
        alert("Please fill all fields in all rows");
        return;
      }
    }

    // copy existing schedule (KEEP STRUCTURE)
    const updatedSchedule = { ...schedule };

    newScheduleRows.forEach((row) => {
      const timeString = `${row.startTime} - ${row.endTime}`;

      // find matching time index from existing times
      const timeIndex = times.findIndex((t) => t === timeString);

      if (timeIndex === -1) {
        alert(`Time ${timeString} not found in timetable`);
        return;
      }

      // update ONLY subject and room
      updatedSchedule[row.day][timeIndex] = {
        ...updatedSchedule[row.day][timeIndex],
        subject: row.subject,
        room: row.room,
        color: "#4d44b5",
        isEmpty: false,
      };
    });

    // apply updated schedule
    setSchedule(updatedSchedule);

    // reset dialog
    setNewScheduleRows([
      {
        day: "",
        startTime: "",
        endTime: "",
        subject: "",
        room: "",
      },
    ]);

    setOpenNewScheduleDialog(false);

    alert("Schedule updated successfully");
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>
            Time Table
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Class schedule management.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<BiPlus />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add Extra Slot
          </Button>

          <Button
            variant="outlined"
            color="error"
            startIcon={<BiTrash />}
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete Slot
          </Button>
          <Button
            variant="outlined"
            startIcon={<BiPrinter />}
            sx={{ borderRadius: "30px", px: 3 }}
          >
            Print
          </Button>
          <Button
            variant="contained"
            startIcon={<BiCalendarPlus />}
            sx={{ borderRadius: "30px", px: 3 }}
            onClick={() => setOpenNewScheduleDialog(true)}
          >
            New Schedule
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          bgcolor: "white",
          p: 3,
          borderRadius: 4,
          mb: 4,
          display: "flex",
          gap: 3,
          boxShadow: "0px 10px 40px 0px rgba(50, 50, 50, 0.08)",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          View Schedule For:
        </Typography>
        <Select
          size="small"
          defaultValue="Grade 10 - A"
          sx={{ minWidth: 200, borderRadius: 3 }}
        >
          <MenuItem value="Grade 10 - A">Grade 10 - Section A</MenuItem>
          <MenuItem value="Grade 9 - B">Grade 9 - Section B</MenuItem>
        </Select>
      </Box>

      {/* Time Table Grid */}
      <Card sx={{ pb: 0, overflow: "hidden" }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    color: "#4d44b5",
                    borderBottom: "none",
                    py: 3,
                  }}
                >
                  Day / Time
                </TableCell>
                {times.map((time, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      fontWeight: 600,
                      color: "#3d4465",
                      borderBottom: "none",
                      py: 3,
                    }}
                  >
                    {time}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {days.map((day) => (
                <TableRow
                  key={day}
                  sx={{ "& td": { borderBottom: "1px solid #f0f1f5", py: 3 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: 600,
                      color: "#3d4465",
                      bgcolor: "#fff",
                      position: "sticky",
                      left: 0,
                    }}
                  >
                    {day}
                  </TableCell>
                  {schedule[day].map((slot, index) => (
                    <TableCell key={index} align="center">
                      {slot.isEmpty ? (
                        <Box sx={{ height: 40 }} />
                      ) : slot.subject === "Break" ? (
                        <Box
                          sx={{
                            bgcolor: "#f0f1f5",
                            py: 1,
                            borderRadius: 2,
                            color: "#a1a5b7",
                            fontSize: 13,
                            fontWeight: 500,
                          }}
                        >
                          BREAK
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            bgcolor: `${slot.color}15`,
                            py: 1.5,
                            px: 1,
                            borderRadius: 3,
                            borderLeft: `3px solid ${slot.color}`,
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "transform 0.2s",
                            "&:hover": { transform: "translateY(-2px)" },
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 700,
                              color: slot.color,
                              fontSize: 13,
                            }}
                          >
                            {slot.subject}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              display: "block",
                              mt: 0.5,
                            }}
                          >
                            Room {slot.room}
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {/* ---------------- ADD SLOT DIALOG ---------------- */}

      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
      >
        <DialogTitle>Add Extra Slot</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Select
            fullWidth
            value={addForm.day}
            onChange={(e) => setAddForm({ ...addForm, day: e.target.value })}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Day</MenuItem>

            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            label="Subject Name"
            sx={{ mb: 2 }}
            value={addForm.subject}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                subject: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            type="time"
            label="Start Time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300, // optional: 5 min interval
            }}
            value={addForm.startTime}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                startTime: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="time"
            label="End Time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300,
            }}
            value={addForm.endTime}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                endTime: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            label="Room No"
            value={addForm.room}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                room: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleAddSlot}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* ---------------- DELETE SLOT DIALOG ---------------- */}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        fullWidth
      >
        <DialogTitle>Delete Slot</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          {/* Day Select */}
          <Select
            fullWidth
            value={deleteForm.day}
            onChange={(e) =>
              setDeleteForm({
                ...deleteForm,
                day: e.target.value,
              })
            }
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select Day</MenuItem>

            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>

          {/* Subject */}
          <TextField
            fullWidth
            label="Subject Name"
            value={deleteForm.subject}
            onChange={(e) =>
              setDeleteForm({
                ...deleteForm,
                subject: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />

          {/* Start Time */}
          <TextField
            fullWidth
            type="time"
            label="Start Time"
            InputLabelProps={{ shrink: true }}
            value={deleteForm.startTime}
            onChange={(e) =>
              setDeleteForm({
                ...deleteForm,
                startTime: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />

          {/* End Time */}
          <TextField
            fullWidth
            type="time"
            label="End Time"
            InputLabelProps={{ shrink: true }}
            value={deleteForm.endTime}
            onChange={(e) =>
              setDeleteForm({
                ...deleteForm,
                endTime: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={handleDeleteSlot}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* ---------------- NEW SCHEDULE DIALOG ---------------- */}

      <Dialog
        open={openNewScheduleDialog}
        onClose={() => setOpenNewScheduleDialog(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>New Schedule</DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          {newScheduleRows.map((row, index) => (
            <Box
              key={index}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto auto",
                gap: 2,
                mb: 2,
                alignItems: "center",
              }}
            >
              {/* Day */}
              <Select
                fullWidth
                value={row.day}
                displayEmpty
                onChange={(e) =>
                  handleNewScheduleChange(index, "day", e.target.value)
                }
              >
                <MenuItem value="">Day</MenuItem>
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>

              {/* Start Time */}
              <TextField
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={row.startTime}
                onChange={(e) =>
                  handleNewScheduleChange(index, "startTime", e.target.value)
                }
              />

              {/* End Time */}
              <TextField
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={row.endTime}
                onChange={(e) =>
                  handleNewScheduleChange(index, "endTime", e.target.value)
                }
              />

              {/* Subject */}
              <TextField
                fullWidth
                label="Subject"
                value={row.subject}
                onChange={(e) =>
                  handleNewScheduleChange(index, "subject", e.target.value)
                }
              />

              {/* Room */}
              <TextField
                fullWidth
                label="Room"
                value={row.room}
                onChange={(e) =>
                  handleNewScheduleChange(index, "room", e.target.value)
                }
              />

              {/* Add Button */}
              <Button
                variant="contained"
                color="success"
                onClick={handleAddNewScheduleRow}
                sx={{ minWidth: "40px", height: "40px" }}
              >
                <BiPlus size={20} />
              </Button>

              {/* Remove Button */}
              {newScheduleRows.length > 1 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveNewScheduleRow(index)}
                  sx={{ minWidth: "40px", height: "40px" }}
                >
                  <BiTrash size={18} />
                </Button>
              )}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewScheduleDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveNewSchedule}>
            Save All
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTable;
