import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import { apiList, invokeGetApi } from "../../services/ApiServices";
import { notifications } from '@mantine/notifications';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const FeeReceipts = () => {
  const receiptRef = useRef();

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rollSearch, setRollSearch] = useState("");
  const [studentData, setStudentData] = useState(null); // Selected receipt for view

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const res = await invokeGetApi(apiList.getFeeReceipts);
      if (Array.isArray(res.data)) {
        setReceipts(res.data);
      } else {
        setReceipts([]);
        console.error("Receipts API returned non-array:", res.data);
      }
    } catch (error) {
      notifications.show({ title: 'Error', message: 'Failed to fetch receipts', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredReceipts = receipts.filter((r) => {
    if (!rollSearch) return true;
    return r.roll_number?.toLowerCase().includes(rollSearch.toLowerCase()) ||
      r.student_name?.toLowerCase().includes(rollSearch.toLowerCase());
  });

  const handlePrint = () => {
    const printContent = receiptRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Simple reload to restore state
  };

  const handleDownload = async () => {
    const element = receiptRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${studentData.payment_id}.pdf`);
      notifications.show({ title: 'Success', message: 'Receipt downloaded successfully', color: 'green' });
    } catch (error) {
      console.error("Download failed", error);
      notifications.show({ title: 'Error', message: 'Failed to download receipt', color: 'red' });
    }
  };

  if (loading) {
    return <Box p={3} display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Fee Receipt Management
      </Typography>

      {/* 🔍 Search Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Search by Name or Roll Number"
                value={rollSearch}
                onChange={(e) => setRollSearch(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 📋 Receipts Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Payment History
          </Typography>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Receipt No</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Mode</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredReceipts.map((receipt) => (
                  <TableRow key={receipt.payment_id} hover>
                    <TableCell>{receipt.payment_date}</TableCell>
                    <TableCell>{receipt.payment_id}</TableCell>
                    <TableCell>{receipt.roll_number}</TableCell>
                    <TableCell>{receipt.student_name}</TableCell>
                    <TableCell>{receipt.class_name}</TableCell>
                    <TableCell>{receipt.payment_mode}</TableCell>
                    <TableCell align="right">₹ {receipt.paid_amount}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => setStudentData(receipt)}
                        sx={{ textTransform: "none" }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredReceipts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No receipts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* 🧾 Receipt View */}
      {studentData && (
        <Box mt={4}>
          <Card ref={receiptRef} sx={{ p: 4, maxWidth: 800, mx: 'auto', border: '1px solid #ddd' }}>
            <CardContent>
              {/* Header */}
              <Box textAlign="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">ABC Public School</Typography>
                <Typography variant="body2" color="textSecondary">Bengaluru, Karnataka</Typography>
                <Typography variant="h6" sx={{ mt: 2, textDecoration: 'underline' }}>FEE RECEIPT</Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Info Grid */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Receipt No:</Typography>
                  <Typography variant="body1" fontWeight="medium">#{studentData.payment_id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Date:</Typography>
                  <Typography variant="body1" fontWeight="medium">{studentData.payment_date}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Student Name:</Typography>
                  <Typography variant="body1" fontWeight="medium">{studentData.student_name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Roll Number:</Typography>
                  <Typography variant="body1" fontWeight="medium">{studentData.roll_number}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Class:</Typography>
                  <Typography variant="body1" fontWeight="medium">{studentData.class_name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">Payment Mode:</Typography>
                  <Typography variant="body1" fontWeight="medium">{studentData.payment_mode}</Typography>
                </Grid>
                {studentData.transaction_id && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Transaction ID:</Typography>
                    <Typography variant="body1" fontWeight="medium">{studentData.transaction_id}</Typography>
                  </Grid>
                )}
                {studentData.remarks && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Remarks:</Typography>
                    <Typography variant="body1" fontWeight="medium">{studentData.remarks}</Typography>
                  </Grid>
                )}
                {studentData.collected_by && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Collected By:</Typography>
                    <Typography variant="body1" fontWeight="medium">{studentData.collected_by}</Typography>
                  </Grid>
                )}
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Amount */}
              <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="#f5f5f5" p={2} borderRadius={1}>
                <Typography variant="h6">Amount Paid</Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">₹ {parseFloat(studentData.paid_amount).toLocaleString()}</Typography>
              </Box>

              <Box mt={4} pt={4} display="flex" justifyContent="space-between">
                <Box textAlign="center">
                  <Divider sx={{ width: 150, mb: 1 }} />
                  <Typography variant="caption">Receiver Signature</Typography>
                </Box>
                <Box textAlign="center">
                  <Divider sx={{ width: 150, mb: 1 }} />
                  <Typography variant="caption">School Seal</Typography>
                </Box>
              </Box>

            </CardContent>
          </Card>

          <Stack direction="row" justifyContent="center" spacing={2} mt={3} mb={5}>
            <Button variant="outlined" onClick={() => setStudentData(null)}>Close</Button>
            <Button variant="contained" color="secondary" startIcon={<DownloadIcon />} onClick={handleDownload}>Download PDF</Button>
            <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>Print Receipt</Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default FeeReceipts;
