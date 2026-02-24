import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
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
  IconButton,
  TablePagination
} from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material';
import { notifications } from '@mantine/notifications';
import { invokeApi, invokeGetApi, invokeDeleteApi, apiList } from "../services/ApiServices";
import { config } from "../config/Config";

const Grades = () => {
  const [grade, setGrade] = useState("");
  const [admissionFee, setAdmissionFee] = useState("");
  const [hallCharge, setHallCharge] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchGrades();
  }, [page, rowsPerPage]);

  const fetchGrades = async () => {
    try {
      let response = await invokeGetApi(`${config.getMySchool + apiList.getGrades}?page=${page + 1}&limit=${rowsPerPage}`);
      if (response.status === 200 && response.data.responseCode === "200") {
        setGrades(response.data.grades || []);
        if (response.data.pagination) {
          setTotalCount(response.data.pagination.total_count);
        } else {
          setTotalCount(response.data.grades.length);
        }
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!grade) {
      notifications.show({ title: 'Error', message: 'Grade Name is required', color: 'red' });
      return;
    }

    setLoading(true);
    try {
      let payload = {
        grade_name: grade,
        admission_fee: admissionFee,
        hall_charge: hallCharge
      };
      let response = await invokeApi(config.getMySchool + apiList.addGrade, payload);

      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({ title: 'Success', message: 'Grade added successfully', color: 'green' });
        setGrade("");
        setAdmissionFee("");
        setHallCharge("");
        fetchGrades();
      } else {
        notifications.show({ title: 'Error', message: response.data.responseMessage, color: 'red' });
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to add grade', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this grade?")) return;

    try {
      let response = await invokeDeleteApi(config.getMySchool + apiList.deleteGrade + "/" + id, {});
      if (response.status === 200 && response.data.responseCode === "200") {
        notifications.show({ title: 'Success', message: 'Grade deleted successfully', color: 'green' });
        fetchGrades();
      } else {
        notifications.show({ title: 'Error', message: 'Failed to delete grade', color: 'red' });
      }
    } catch (error) {
      console.error("Error deleting grade:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2} color="#303972">
        Grade Management
      </Typography>

      {/* Add Grade Form */}
      <Card sx={{ mb: 4, borderRadius: 3 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            Add Grade
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
              <TextField
                label="Grade"
                size="small"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Admission Fee"
                type="number"
                size="small"
                value={admissionFee}
                onChange={(e) => setAdmissionFee(e.target.value)}
                fullWidth
              />

              <TextField
                label="Hall Charge (%)"
                type="number"
                size="small"
                value={hallCharge}
                onChange={(e) => setHallCharge(e.target.value)}
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 120, bgcolor: "#4d44b5", "&:hover": { bgcolor: "#3d34a5" } }}
                disabled={loading}
              >
                {loading ? "Adding..." : "Submit"}
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      {/* Grade Table */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2} color="#4d44b5">
            All Grades
          </Typography>

          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Grade</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Admission Fee (₹)</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Hall Charge (%)</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {grades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No Grades Found</TableCell>
                  </TableRow>
                ) : (
                  grades.map((row, i) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{
                        bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                        '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                        '&:hover': { bgcolor: '#f0f1ff !important' },
                        '&:last-child td': { borderBottom: 0 }
                      }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.grade_name}</TableCell>
                      <TableCell>{row.admission_fee}</TableCell>
                      <TableCell>{row.hall_charge}</TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={parseInt(totalCount, 10)}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Grades;
