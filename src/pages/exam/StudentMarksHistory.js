import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Autocomplete,
  Tooltip
} from "@mui/material";
import { BiDownload } from "react-icons/bi";
import { invokeGetApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const StudentMarksHistory = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const tableRef = useRef(null);

  const [filters, setFilters] = useState({
    classId: "",
    studentId: ""
  });

  const fetchMarks = async (overrideFilters = {}) => {
    const activeFilters = { ...filters, ...overrideFilters };

    if (!activeFilters.studentId) {
      setMarks([]);
      return;
    }

    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getMarksHistory, { student_id: activeFilters.studentId });
      if (response.status === 200 && response.data.responseCode === "200") {
        setMarks(response.data.marks || []);
      }
    } catch (error) {
      console.error("Error fetching marks history:", error);
    }
  };
  const fetchClasses = async () => {
    try {
      let response = await invokeGetApi(config.getMySchool + apiList.getClassList, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        setClasses(response.data.classes || []);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassChange = async (e) => {
    const classId = e.target.value;
    setFilters({ ...filters, classId: classId, studentId: "" });
    setStudents([]);
    setMarks([]);

    if (classId) {
      try {
        let response = await invokeGetApi(config.getMySchool + apiList.getStudents, { class_id: classId, limit: 500 });
        if (response.status === 200 && response.data.responseCode === "200") {
          setStudents(response.data.students || []);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  // ---- PDF Download ----
  const handleDownloadPDF = async () => {
    if (marks.length === 0) return;
    try {
      const jspdfModule = await import('jspdf');
      const jsPDF = jspdfModule.default;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const student = students.find(s => s.id === filters.studentId) || {};
      const studentName = student.name || 'Student';
      const rollNumber = marks[0]?.roll_number || '-';
      const className = marks[0]?.class_name || '-';
      const section = marks[0]?.section || '-';
      const academicYear = marks[0]?.academic_year || '-';

      // Header
      pdf.setFillColor(77, 68, 181); // #4d44b5
      pdf.rect(0, 0, 210, 40, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ACADEMIC REPORT CARD', 105, 18, { align: 'center' });

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Academic Session: ${academicYear}`, 105, 28, { align: 'center' });

      // Student Info Box
      pdf.setTextColor(48, 57, 114); // #303972
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('STUDENT INFORMATION', 20, 50);

      pdf.setDrawColor(224, 226, 255);
      pdf.line(20, 52, 190, 52);

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Name: ${studentName}`, 20, 62);
      pdf.text(`Roll No: ${rollNumber}`, 20, 68);
      pdf.text(`Class: ${className}`, 120, 62);
      pdf.text(`Section: ${section}`, 120, 68);

      // Marks Table Header
      let y = 80;
      pdf.setFillColor(244, 245, 255);
      pdf.rect(20, y, 170, 10, 'F');

      pdf.setFont('helvetica', 'bold');
      pdf.text('SUBJECT', 25, y + 6);
      pdf.text('EXAM', 70, y + 6);
      pdf.text('TOTAL', 110, y + 6);
      pdf.text('OBTAINED', 140, y + 6);
      pdf.text('RESULT', 170, y + 6);

      y += 10;
      pdf.setFont('helvetica', 'normal');

      marks.forEach((m, index) => {
        if (y > 270) { pdf.addPage(); y = 20; }

        pdf.setDrawColor(238, 240, 251);
        pdf.line(20, y + 8, 190, y + 8);

        pdf.text(m.subject_name, 25, y + 5);
        pdf.text(m.exam_name, 70, y + 5);
        pdf.text(m.total_marks.toString(), 110, y + 5);
        pdf.text(m.marks_obtained.toString(), 140, y + 5);

        const isPass = Number(m.marks_obtained) >= Number(m.passing_marks);
        pdf.setTextColor(isPass ? 0 : 200, isPass ? 128 : 0, 0);
        pdf.text(isPass ? 'PASS' : 'FAIL', 170, y + 5);
        pdf.setTextColor(48, 57, 114);

        y += 10;
      });

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(160, 152, 174);
      pdf.text('This is a computer generated report card.', 105, 285, { align: 'center' });

      pdf.save(`Report-Card-${studentName.replace(/ /g, '-')}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Student Marks History
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Select Student
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                select
                label="Class"
                name="classId"
                value={filters.classId}
                onChange={handleClassChange}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>{cls.name}</MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                disabled={!filters.classId}
                options={students}
                getOptionLabel={(option) => option.name || ""}
                value={students.find(s => s.id === filters.studentId) || null}
                onChange={(event, newValue) => {
                  const sid = newValue ? newValue.id : "";
                  setFilters({ ...filters, studentId: sid });
                  fetchMarks({ ...filters, studentId: sid });
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

            {/* Button removed as fetch is auto */}
          </Grid>
        </CardContent>
      </Card>

      {/* Marks Table */}
      <Card sx={{ borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="#4d44b5">
              Academic Performance
            </Typography>
            <Tooltip title={marks.length === 0 ? "No data to export" : "Download Report Card PDF"}>
              <span>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<BiDownload />}
                  disabled={marks.length === 0}
                  onClick={handleDownloadPDF}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Download PDF
                </Button>
              </span>
            </Tooltip>
          </Box>

          <TableContainer ref={tableRef} component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Exam</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Year</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Pass</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Obtained</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 1 }}>Remarks</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {marks.length > 0 ? (
                  marks.map((row, i) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                        '& td': { borderBottom: '1px solid #eef0fb', py: 1 },
                        '&:hover': { bgcolor: '#f0f1ff !important' },
                        '&:last-child td': { borderBottom: 0 }
                      }}
                    >
                      <TableCell>{row.student_name} ({row.roll_number})</TableCell>
                      <TableCell>{row.exam_name}</TableCell>
                      <TableCell>{row.academic_year}</TableCell>
                      <TableCell>{row.subject_name}</TableCell>
                      <TableCell>{row.total_marks}</TableCell>
                      <TableCell>{row.passing_marks}</TableCell>
                      <TableCell>
                        <Typography fontWeight="bold" color={Number(row.marks_obtained) >= Number(row.passing_marks) ? "green" : "red"}>
                          {row.marks_obtained}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentMarksHistory;
