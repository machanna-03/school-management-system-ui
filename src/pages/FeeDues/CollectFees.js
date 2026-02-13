import React, { useState, useEffect } from "react";
// (Make sure to import Divider if not already)
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    MenuItem,
    Stack,
    Divider,
    Alert,
    CircularProgress
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { apiList, invokeApi, invokeGetApi } from "../../services/ApiServices";
import { notifications } from '@mantine/notifications';

const CollectFees = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null); // Full details including installments
    const [loading, setLoading] = useState(false);

    // Payment Form State
    const [paymentMode, setPaymentMode] = useState("Cash");
    const [amountPaying, setAmountPaying] = useState("");
    const [remarks, setRemarks] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [collectedBy, setCollectedBy] = useState("Admin"); // Default or fetch from user context
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (location.state && location.state.student) {
            fetchStudentFeeDetails(location.state.student.student_id);
        }
    }, [location.state]);

    const fetchStudentFeeDetails = async (studentId) => {
        setLoading(true);
        try {
            // Using student_id is safer if available, else structure_id might be needed if not fully linked
            // But getStudentFeeDetails expects studentId. 
            // If studentId matches what we have, good.
            const url = studentId ? `${apiList.getStudentFeeDetails}/${studentId}` : null;

            if (url) {
                const res = await invokeGetApi(url);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setStudentData(res.data[0]);
                    const due = parseFloat(res.data[0].due_calculated);
                    // Pre-fill amount paying with total due, or leave empty/0
                    if (due > 0) setAmountPaying(due.toString());
                } else {
                    notifications.show({ title: 'Info', message: 'No fee assignment found for this student', color: 'blue' });
                    // Fallback: use basic info if no details returned
                    setStudentData(location.state.student);
                }
            } else {
                // No student ID (orphan structure case). Use basic info.
                setStudentData(location.state.student);
            }
        } catch (error) {
            notifications.show({ title: 'Error', message: 'Failed to fetch fee details', color: 'red' });
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!amountPaying || parseFloat(amountPaying) <= 0) {
            notifications.show({ title: 'Validation', message: 'Please enter a valid amount', color: 'orange' });
            return;
        }

        // We need student_id for payment. If orphan structure, we can't pay unless we link it first (which happens in FeeStructure save, but old data might lack it)
        const sid = studentData?.student_id || location.state?.student?.student_id;

        if (!sid) {
            notifications.show({ title: 'Error', message: 'Cannot collect fee for student without ID. Please update fee structure.', color: 'red' });
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                student_id: sid,
                paid_amount: amountPaying,
                payment_mode: paymentMode,
                transaction_id: transactionId,
                remarks: remarks,
                collected_by: collectedBy
            };

            await invokeApi(apiList.collectFee, payload);
            notifications.show({ title: 'Success', message: 'Payment recorded successfully', color: 'green' });
            navigate("/fees/receipts");
        } catch (error) {
            notifications.show({ title: 'Error', message: 'Failed to record payment', color: 'red' });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <Box p={3} display="flex" justifyContent="center"><CircularProgress /></Box>;
    }

    if (!location.state?.student) {
        return (
            <Box p={3}>
                <Alert severity="warning">No student selected. Please select a student from Fee Payments page.</Alert>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/fees/payment-status")}>
                    Go to Fee Payments
                </Button>
            </Box>
        );
    }

    const basicInfo = location.state.student;
    const academicYear = studentData?.academic_year || basicInfo.academic_year || "2025-26";

    // Calculations
    const totalDue = parseFloat(studentData?.due_calculated ||
        ((parseFloat(basicInfo.assignment_total_fee || basicInfo.total_annual_fee || 0) - parseFloat(basicInfo.paid_amount || 0))) || 0
    );
    const paying = parseFloat(amountPaying || 0);
    const remaining = totalDue - paying;

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={3}>Collect Fees</Typography>

            <Card sx={{ p: 2 }}>
                <CardContent>
                    <Grid container spacing={3}>
                        {/* Row 1 */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Student Name"
                                value={basicInfo.student_name || basicInfo.structure_name || "N/A"}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Roll Number"
                                value={basicInfo.roll_number || "N/A"}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Academic Year"
                                value={academicYear}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Row 2 */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Payment Date"
                                type="date"
                                value={new Date().toISOString().split('T')[0]}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                select
                                label="Payment Mode"
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                variant="outlined"
                            >
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="UPI">UPI</MenuItem>
                                <MenuItem value="Card">Card</MenuItem>
                                <MenuItem value="Bank">Bank Transfer</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Amount Paying"
                                type="number"
                                value={amountPaying}
                                onChange={(e) => setAmountPaying(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Row 3 */}
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Total Due"
                                value={totalDue}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Remaining After Payment"
                                value={remaining >= 0 ? remaining : 0}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Collected By"
                                value={collectedBy}
                                onChange={(e) => setCollectedBy(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Row 4 */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Remarks"
                                multiline
                                rows={2}
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} mt={2}>
                            <Button
                                variant="outlined"
                                size="large"
                                color="inherit"
                                onClick={() => navigate("/fees/payment-status")}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={handlePayment}
                                disabled={submitting}
                                sx={{ px: 4 }}
                            >
                                {submitting ? "Processing..." : "Submit Payment"}
                            </Button>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CollectFees;
