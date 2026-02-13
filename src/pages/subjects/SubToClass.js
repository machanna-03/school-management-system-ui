import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from '../../services/api';
import { notifications } from '@mantine/notifications';

export default function SubToClass() {
  const [classes, setClasses] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // For the list/table view
  const [mappings, setMappings] = useState([]);

  useEffect(() => {
    fetchInitialData();
    fetchMappings();
  }, []);

  const fetchInitialData = async () => {
    try {
      const subRes = await api.get('/getSubjects');
      if (subRes.data.subjects) {
        setAllSubjects(subRes.data.subjects);
      }

      const clsRes = await api.get('/getClasses');
      if (clsRes.data.classes) {
        // Extract unique classes (Grades)
        const uniqueClasses = [];
        const seen = new Set();
        for (const item of clsRes.data.classes) {
          if (!seen.has(item.class_id)) {
            seen.add(item.class_id);
            uniqueClasses.push({ id: item.class_id, name: item.class_name });
          }
        }
        setClasses(uniqueClasses);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const fetchMappings = async () => {
    try {
      const res = await api.get('/getAllClassSubjects');
      if (res.data.data) {
        setMappings(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch curriculum:", error);
    }
  };

  const handleSubjectChange = (id) => {
    setSelectedSubjectIds((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    if (!selectedClassId || selectedSubjectIds.length === 0) {
      notifications.show({ title: 'Error', message: 'Select Class and Subjects', color: 'red' });
      return;
    }
    setLoading(true);
    try {
      await api.post('/assignSubjectToClass', {
        classId: selectedClassId,
        subjectIds: selectedSubjectIds
      });
      notifications.show({ title: 'Success', message: 'Subjects Assigned to Curriculum', color: 'green' });
      setSelectedClassId("");
      setSelectedSubjectIds([]);
      fetchMappings();
    } catch (error) {
      console.error(error);
      notifications.show({ title: 'Error', message: 'Failed to assign subjects', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  // Group mappings by Class
  const groupedMappings = mappings.reduce((acc, curr) => {
    if (!acc[curr.class_name]) {
      acc[curr.class_name] = [];
    }
    acc[curr.class_name].push(curr);
    return acc;
  }, {});

  return (
    <Grid container spacing={2}>
      {/* LEFT CARD */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" mb={2}>
            Assign Subject to Class (Curriculum)
          </Typography>

          <Stack spacing={2}>
            <TextField
              select
              label="Select Grade *"
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              fullWidth
            >
              <MenuItem value="">Select</MenuItem>
              {classes.map((cls) => (
                <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
              ))}
            </TextField>


            {/* SUBJECT DROPDOWN */}
            <Typography variant="subtitle2">Select Subjects *</Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #eee', p: 1 }}>
              {allSubjects.map((sub) => (
                <FormControlLabel
                  key={sub.id}
                  control={
                    <Checkbox
                      checked={selectedSubjectIds.includes(sub.id)}
                      onChange={() => handleSubjectChange(sub.id)}
                    />
                  }
                  label={`${sub.name} (${sub.code})`}
                  sx={{ display: 'block' }}
                />
              ))}
            </Box>

            <Box textAlign="right">
              <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Grid>

      {/* RIGHT CARD */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 0 }}>
          <Typography variant="h6" mb={2}>
            Curriculum List
          </Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell align="center">Total Subjects</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(groupedMappings).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">No curriculum assigned yet.</TableCell>
                </TableRow>
              ) : (
                Object.keys(groupedMappings).map((className, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 600 }}>{className}</TableCell>
                    <TableCell>
                      {groupedMappings[className].map(m => (
                        <span key={m.subject_id} style={{ display: 'inline-block', background: '#f0f1f5', padding: '2px 8px', borderRadius: '4px', margin: '2px', fontSize: '12px' }}>
                          {m.subject_name} ({m.subject_code})
                        </span>
                      ))}
                    </TableCell>
                    <TableCell align="center">{groupedMappings[className].length}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}
