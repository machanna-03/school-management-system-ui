import React, { useState, useEffect } from "react";
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
  Avatar,
  Chip,
  TextField,
  Paper,
  Stack,
  FormControl,
  Select,
  MenuItem
} from "@mui/material";
import Card from "../../components/common/Card";
import api from '../../services/api';
import { notifications } from '@mantine/notifications';

const TeacherAttendance = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [date]); // Reload when date changes

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/getTeacherAttendance?date=${date}`);
      if (res.data.teachers) {
        setTeachers(res.data.teachers);
      }
    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Error', message: 'Failed to fetch teacher data', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (index, value) => {
    const updated = [...teachers];
    updated[index].status = value;
    setTeachers(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...teachers];
    updated[index][field] = value;
    setTeachers(updated);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        date: date,
        teachers: teachers.map(t => ({
          teacherId: t.teacher_id,
          status: t.status,
          checkIn: t.check_in !== '-' ? t.check_in : null,
          checkOut: t.check_out !== '-' ? t.check_out : null
        }))
      };
      await api.post('/markTeacherAttendance', payload);
      notifications.show({ title: 'Success', message: 'Attendance Saved', color: 'green' });
      loadData(); // Refresh
    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Error', message: 'Failed to save', color: 'red' });
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4" color="text.primary">Teacher Attendance</Typography>
      </Box>

      {/* Controls */}
      <Paper sx={{ p: 3, mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 4 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography>Select Date:</Typography>
          <TextField
            type="date"
            size="small"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>
        <Button variant="contained" sx={{ borderRadius: "30px", px: 4 }} onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </Paper>

      {/* Teacher List */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: 600, color: "text.secondary" } }}>
                <TableCell>Teacher ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Check In</TableCell>
                <TableCell align="center">Check Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teachers.map((t, i) => (
                <TableRow key={t.teacher_id} hover sx={{ "& td": { py: 2.5 } }}>
                  <TableCell sx={{ color: "primary.main", fontWeight: 600 }}>#{t.teacher_id}</TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "#4d44b5", width: 36, height: 36, fontSize: 14 }}>
                        {t.name.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#3d4465" }}>
                        {t.name}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary" }}>{t.designation}</TableCell>

                  <TableCell align="center">
                    <FormControl size="small">
                      <Select
                        value={t.status}
                        onChange={(e) => handleStatusChange(i, e.target.value)}
                        sx={{
                          color: t.status === 'Present' ? 'green' : (t.status === 'Absent' ? 'red' : 'orange'),
                          fontWeight: 'bold'
                        }}
                      >
                        <MenuItem value="Present">Present</MenuItem>
                        <MenuItem value="Absent">Absent</MenuItem>
                        <MenuItem value="Leave">Leave</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      type="time"
                      size="small"
                      value={t.check_in !== '-' ? t.check_in : ''}
                      onChange={(e) => handleTimeChange(i, 'check_in', e.target.value)}
                      disabled={t.status === 'Absent'}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <TextField
                      type="time"
                      size="small"
                      value={t.check_out !== '-' ? t.check_out : ''}
                      onChange={(e) => handleTimeChange(i, 'check_out', e.target.value)}
                      disabled={t.status === 'Absent'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default TeacherAttendance;
