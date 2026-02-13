import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete
} from "@mui/material";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";
import { notifications } from '@mantine/notifications';

const StudentMarks = () => {
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    examId: "",
    classId: "",
    className: "", // For display
    studentId: "",
    subjectId: "",
    marks: "",
    remarks: ""
  });

  const [marksList, setMarksList] = useState([]); // Local list of added marks for this session

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getExams, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        setExams(response.data.exams || []);
      }
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleExamChange = async (e) => {
    const examId = e.target.value;
    const selectedExam = exams.find(ex => ex.id === examId);

    setFormData({
      ...formData,
      examId: examId,
      classId: selectedExam?.class_id || "",
      className: selectedExam?.class_name || "",
      studentId: "",
      subjectId: ""
    });

    if (selectedExam) {
      setFormData({
        ...formData,
        examId: examId,
        classId: selectedExam.class_id || "",
        className: selectedExam.class_name || "", // class_name includes section usually e.g. "Class 10 A"
        studentId: "",
        subjectId: ""
      });
      // Pass the class name to filter students
      fetchStudents(selectedExam.class_name);
      fetchExamSubjects(examId);
    } else {
      setFormData({
        ...formData,
        examId: examId,
        classId: "",
        className: "",
        studentId: "",
        subjectId: ""
      });
    }
  };

  const fetchStudents = async (examClassName) => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getStudents, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        const allStudents = response.data.students || [];

        // Filter students where their class + section matches the exam's class name
        // The examClassName is usually like "Class 1 A"
        // The student object has `class` (e.g. "Class 1") and `section` (e.g. "A")
        // We need to construct the student's full class string to compare, or do a loose match.
        // Let's list all students if no match found, or try to filter strictly.

        if (examClassName) {
          const filtered = allStudents.filter(s => {
            // Construct string roughly: "Class" + "Section"
            // Case 1: examClassName is exact match to s.class ? (No, exam usually includes section)
            // Case 2: s.class + " " + s.section === examClassName ?
            // Let's try to normalize and check inclusion
            const studentFullClass = `${s.class} ${s.section}`.trim();
            const studentFullClass2 = `${s.class}-${s.section}`.trim();

            return studentFullClass === examClassName ||
              studentFullClass2 === examClassName ||
              examClassName.includes(s.class) && examClassName.includes(s.section);
          });
          setStudents(filtered.length > 0 ? filtered : allStudents); // Fallback to all if filter fails to match any (safety)
        } else {
          setStudents(allStudents);
        }
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchExamSubjects = async (examId) => {
    try {
      // We can get subjects from exam schedule
      let response = await invokeGetApi(config.getMySchool + apiList.getExamSchedule + "/" + examId);
      if (response.status === 200 && response.data.responseCode === "200") {
        // Extract unique subjects from schedule
        const schedule = response.data.schedule || [];
        // Map to subject list
        const subs = schedule.map(s => ({
          id: s.subject_id,
          name: s.subject_name
        }));
        // Remove duplicates if any (though schedule usually has unique subjects per exam)
        setSubjects(subs);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.examId || !formData.studentId || !formData.subjectId || !formData.marks) {
      notifications.show({ title: 'Error', message: 'Please fill all fields', color: 'red' });
      return;
    }

    try {
      let payload = {
        exam_id: formData.examId,
        student_id: formData.studentId,
        subject_id: formData.subjectId,
        marks_obtained: formData.marks,
        remarks: formData.remarks
      };

      console.log("Submitting Marks Payload:", payload); // Debugging
      console.log("Subjects List:", subjects); // Debugging to check subject IDs

      let response = await invokeApi(config.getMySchool + apiList.enterMarks, payload);

      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({ title: 'Success', message: 'Marks Saved', color: 'green' });

        // Add to local list for visual confirmation
        const examName = exams.find(e => e.id === formData.examId)?.exam_name;
        const studentName = students.find(s => s.id === formData.studentId)?.first_name;
        const subjectName = subjects.find(s => s.id === formData.subjectId)?.name;

        setMarksList([
          {
            id: Date.now(),
            exam: examName,
            studentName: studentName,
            subject: subjectName,
            marks: formData.marks,
            remarks: formData.remarks
          },
          ...marksList
        ]);

        // Clear marks input only, allowing rapid entry for same student/subject
        setFormData({ ...formData, marks: "", remarks: "" });
      } else {
        notifications.show({ title: 'Error', message: response.data.responseMessage || 'Failed', color: 'red' });
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      notifications.show({ title: 'Error', message: 'Something went wrong', color: 'red' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Enter Student Exam Marks
      </Typography>

      {/* Add Marks Form */}
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={3} color="#4d44b5">
            Marks Entry Form
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Select Exam"
                  name="examId"
                  value={formData.examId}
                  onChange={handleExamChange}
                >
                  {exams.map((ex) => (
                    <MenuItem key={ex.id} value={ex.id}>{ex.exam_name} ({ex.class_name})</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Class"
                  value={formData.className}
                  disabled
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disabled={!formData.classId}
                  options={students}
                  getOptionLabel={(option) => option.name || ""}
                  value={students.find(s => s.id === formData.studentId) || null}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      studentId: newValue ? newValue.id : ""
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Student"
                      size="small"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Select Subject"
                  name="subjectId"
                  value={formData.subjectId}
                  onChange={handleChange}
                  disabled={!formData.examId}
                >
                  {subjects.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Marks Obtained"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Remarks (Optional)"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button type="submit" variant="contained" sx={{ bgcolor: "#4d44b5" }}>
                  Submit Marks
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Recent Entries Table */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Recent Entries (Session)
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
            <Table size="small">
              <TableHead sx={{ bgcolor: "#f1f1f1" }}>
                <TableRow>
                  <TableCell><b>Exam</b></TableCell>
                  <TableCell><b>Student</b></TableCell>
                  <TableCell><b>Subject</b></TableCell>
                  <TableCell><b>Marks</b></TableCell>
                  <TableCell><b>Remarks</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {marksList.length === 0 ? (
                  <TableRow><TableCell colSpan={5} align="center">No marks entered yet.</TableCell></TableRow>
                ) : (
                  marksList.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.exam}</TableCell>
                      <TableCell>{row.studentName}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.marks}</TableCell>
                      <TableCell>{row.remarks}</TableCell>
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

export default StudentMarks;
