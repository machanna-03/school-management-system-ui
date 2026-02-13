import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Paper,
  Stack
} from "@mui/material";
import Card from "../../components/common/Card";
import { BiCalendar } from "react-icons/bi";
import { useState, useEffect } from "react";
import api from '../../services/api';
import { notifications } from '@mantine/notifications';
import { useCookies } from 'react-cookie';

const StudentAttendance = () => {
  const [cookies] = useCookies(['user']);
    
  /* Filters State */
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD

  /* Data State */
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Raw data for relational filtering
  const [rawSections, setRawSections] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
        // Fetch Sections/Classes
        const cRes = await api.get('/getClasses');
        if (cRes.data.classes) {
            setRawSections(cRes.data.classes);
            // Extract Unique Classes
            const uniqueClasses = [];
            const seen = new Set();
            for (const item of cRes.data.classes) {
                if (!seen.has(item.class_id)) {
                    seen.add(item.class_id);
                    uniqueClasses.push({ id: item.class_id, name: item.class_name });
                }
            }
            setClasses(uniqueClasses);
        }
    } catch (e) {
        console.error(e);
    }
  };

  const handleClassChange = async (classId) => {
    setSelectedClassId(classId);
    setSelectedSectionId("");
    setSelectedSubjectId("");
    
    const relatedSections = rawSections.filter(s => s.class_id === classId);
    setSections(relatedSections);

    // Fetch Subjects for Class
    try {
        const subRes = await api.get(`/getClassSubjects?classId=${classId}`);
        setSubjects(subRes.data.subjects || []);
    } catch (e) { console.error(e); }
  };

  const loadData = async () => {
      if (!selectedSectionId || !date) {
          notifications.show({title:'Error', message: 'Select Section and Date', color:'red'});
          return;
      }
      setLoading(true);
      try {
          const params = {
              sectionId: selectedSectionId,
              date: date,
              subjectId: selectedSubjectId || undefined 
          };
          const res = await api.get('/getStudentAttendance', { params });
          if(res.data.students) {
              setStudents(res.data.students);
          } else {
              setStudents([]);
          }
      } catch (error) {
          console.error(error);
          notifications.show({title:'Error', message: 'Failed to fetch attendance', color:'red'});
      } finally {
          setLoading(false);
      }
  };

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const handleSave = async () => {
    if (students.length === 0) return;
    
    setLoading(true);
    try {
        const payload = {
            sectionId: selectedSectionId,
            subjectId: selectedSubjectId || null,
            date: date,
            markedBy: cookies.user?.id, // Track who marked it
            students: students.map(s => ({
                studentId: s.student_id,
                status: s.status,
                remarks: s.remarks,
                checkIn: s.check_in_time,
                checkOut: s.check_out_time
            }))
        };
        await api.post('/markStudentAttendance', payload);
        notifications.show({ title: 'Success', message: 'Attendance Saved', color: 'green' });
    } catch (error) {
        console.error(error);
        notifications.show({ title: 'Error', message: 'Failed to save attendance', color: 'red' });
    } finally {
        setLoading(false);
    }
  };
  
  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : '?';
  const avatarColors = ["#fb7d5b", "#fcc43e", "#30c7ec", "#4d44b5", "#369c5e"];

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Mark Student Attendance</Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, borderRadius: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="caption">Select Grade</Typography>
            <Select 
                fullWidth size="small" 
                value={selectedClassId} 
                onChange={(e) => handleClassChange(e.target.value)}
                displayEmpty
            >
              <MenuItem value="" disabled>Select Grade</MenuItem>
              {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="caption">Select Section</Typography>
            <Select 
                fullWidth size="small" 
                value={selectedSectionId} 
                onChange={(e) => setSelectedSectionId(e.target.value)}
                displayEmpty
                disabled={!selectedClassId}
            >
              <MenuItem value="" disabled>Select Section</MenuItem>
              {sections.map(s => <MenuItem key={s.section_id} value={s.section_id}>{s.section_name} ({s.academic_year})</MenuItem>)}
            </Select>
          </Grid>
          
           <Grid item xs={12} md={3}>
            <Typography variant="caption">Select Subject (Optional)</Typography>
            <Select 
                fullWidth size="small" 
                value={selectedSubjectId} 
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                displayEmpty
                disabled={!selectedClassId}
            >
              <MenuItem value="">None (Daily Attendance)</MenuItem>
              {subjects.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="caption">Select Date</Typography>
            <TextField 
                type="date" 
                fullWidth size="small" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
             <Button variant="contained" onClick={loadData} disabled={loading} sx={{borderRadius:'30px', px:4}}>
                 {loading ? 'Loading...' : 'Load Data'}
             </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table */}
      {students.length > 0 ? (
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roll No</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell align="center">Attendance</TableCell>
                    <TableCell>Check In</TableCell>
                    <TableCell>Check Out</TableCell>
                    <TableCell>Remarks</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {students.map((std, index) => (
                    <TableRow key={std.student_id}>
                      <TableCell>#{std.roll_number || '-'}</TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}>
                              {getInitials(std.first_name)}
                          </Avatar>
                          <Typography fontWeight={600}>{std.first_name} {std.last_name}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <RadioGroup
                          row
                          value={std.status}
                          onChange={(e) => handleChange(index, 'status', e.target.value)}
                          sx={{ justifyContent: 'center' }}
                        >
                          <FormControlLabel value="Present" control={<Radio size="small" color="success"/>} label="P" />
                          <FormControlLabel value="Absent" control={<Radio size="small" color="error"/>} label="A" />
                          <FormControlLabel value="Late" control={<Radio size="small" color="warning"/>} label="L" />
                        </RadioGroup>
                      </TableCell>
                      
                      <TableCell>
                          <TextField
                              type="time"
                              size="small"
                              value={std.check_in_time || ''}
                              onChange={(e) => handleChange(index, 'check_in_time', e.target.value)}
                              disabled={std.status === 'Absent'}
                              sx={{width: 100}}
                          />
                      </TableCell>

                      <TableCell>
                          <TextField
                              type="time"
                              size="small"
                              value={std.check_out_time || ''}
                              onChange={(e) => handleChange(index, 'check_out_time', e.target.value)}
                              disabled={std.status === 'Absent'}
                              sx={{width: 100}}
                          />
                      </TableCell>

                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Remarks"
                          value={std.remarks}
                          onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box textAlign="right" p={2}>
              <Button variant="contained" sx={{ borderRadius: "30px", px: 6 }} onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save Attendance'}
              </Button>
            </Box>
          </Card>
      ) : (
          <Typography textAlign="center" color="text.secondary">Select filters and click Load Data to view students.</Typography>
      )}
    </Box>
  );
};

export default StudentAttendance;
