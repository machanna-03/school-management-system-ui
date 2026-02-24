import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import { BiMoney, BiHistory, BiReceipt, BiCreditCard, BiDownload, BiCalendar, BiCheckCircle, BiTimeFive } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { invokeGetApi, apiList } from '../../services/ApiServices';
import { config } from '../../config/Config';

const Finance = ({ initialTab = 'fees' }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [feeAssignments, setFeeAssignments] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(true);

    const studentId = localStorage.getItem('student_id') || 1; // Fallback for dev

    // Map routes to tab values
    const getTabFromPath = (path) => {
        if (path.includes('/fees')) return 'fees';
        if (path.includes('/payments')) return 'payments';
        if (path.includes('/receipts')) return 'receipts';
        if (path.includes('/quickpay')) return 'quickpay';
        return 'fees';
    };

    const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

    useEffect(() => {
        setActiveTab(getTabFromPath(location.pathname));
    }, [location.pathname]);

    useEffect(() => {
        fetchData();
    }, [studentId]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [feeRes, receiptRes] = await Promise.all([
                invokeGetApi(`${config.getMySchool}${apiList.getStudentFeeDetails}/${studentId}`),
                invokeGetApi(`${config.getMySchool}${apiList.getFeeReceipts}`, { student_id: studentId, limit: 100 })
            ]);

            if (feeRes.status === 200) setFeeAssignments(feeRes.data || []);
            if (receiptRes.status === 200) setReceipts(receiptRes.data.receipts || []);
        } catch (err) {
            console.error("Error fetching finance data:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        navigate(`/parent/${newValue}`);
    };

    const handleDownloadReceipt = async (receipt) => {
        try {
            const jspdfModule = await import('jspdf');
            const jsPDF = jspdfModule.default;
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });

            // Header
            pdf.setFillColor(77, 68, 181);
            pdf.rect(0, 0, 148, 30, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.setFontSize(16);
            pdf.text('FEE RECEIPT', 74, 15, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text('Official Payment Confirmation', 74, 22, { align: 'center' });

            // Content
            pdf.setTextColor(48, 57, 114);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Receipt Details', 15, 40);
            pdf.setDrawColor(224, 226, 255);
            pdf.line(15, 42, 133, 42);

            pdf.setFont('helvetica', 'normal');
            pdf.text(`Student: ${receipt.student_name}`, 15, 50);
            pdf.text(`Roll No: ${receipt.roll_number || '-'}`, 15, 56);
            pdf.text(`Class: ${receipt.class_name || '-'}`, 15, 62);

            pdf.text(`Receipt ID: ${receipt.id}`, 80, 50);
            pdf.text(`Date: ${receipt.payment_date}`, 80, 56);
            pdf.text(`Method: ${receipt.payment_mode}`, 80, 62);

            // Amount Box
            pdf.setFillColor(244, 245, 255);
            pdf.rect(15, 75, 118, 20, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(12);
            pdf.text('Total Amount Paid:', 25, 87);
            pdf.text(`INR ${receipt.paid_amount}`, 123, 87, { align: 'right' });

            // Footer
            pdf.setFontSize(8);
            pdf.setTextColor(160, 152, 174);
            pdf.text('Thank you for your payment.', 74, 130, { align: 'center' });
            pdf.text('This is a system generated document.', 74, 135, { align: 'center' });

            pdf.save(`Receipt-${receipt.id}.pdf`);
        } catch (err) {
            console.error("Receipt PDF generation failed:", err);
        }
    };


    const totalDue = feeAssignments.reduce((acc, curr) => acc + (Number(curr.amount) - Number(curr.paid_amount || 0)), 0);
    const currency = '₹';

    if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Finance Details...</Box>;

    const renderFeeDetails = () => (
        <Box>
            <Grid container spacing={3} sx={{ mb: 1 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, bgcolor: '#4d44b5', color: 'white', overflow: 'hidden', position: 'relative' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9, mb: 1 }}>Total Amount Due</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>{currency} {totalDue.toLocaleString()}</Typography>
                                <Chip
                                    label={`Balance Amount`}
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
                                />
                            </Box>
                            <Box sx={{ position: 'absolute', right: -20, bottom: -20, width: 150, height: 150, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => setActiveTab('quickpay')}
                                sx={{
                                    bgcolor: '#fb7d5b',
                                    borderRadius: 3,
                                    px: 5, py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 16px rgba(251, 125, 91, 0.25)',
                                    '&:hover': { bgcolor: '#e06c4d' }
                                }}
                                startIcon={<BiCreditCard />}
                            >
                                Pay Now
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 2 }}>Fee Breakdown</Typography>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f4f5ff' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2 }}>Fee Type</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'right' }}>Total</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'right' }}>Paid</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'right' }}>Balance</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'center' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feeAssignments.map((item, i) => {
                                    const balance = Number(item.amount) - Number(item.paid_amount || 0);
                                    return (
                                        <TableRow key={item.id} sx={{ bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff' }}>
                                            <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{item.category_name}</TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>{currency} {Number(item.amount).toLocaleString()}</TableCell>
                                            <TableCell sx={{ textAlign: 'right' }}>{currency} {Number(item.paid_amount || 0).toLocaleString()}</TableCell>
                                            <TableCell sx={{ textAlign: 'right', fontWeight: 700, color: balance > 0 ? '#fb7d5b' : '#4caf50' }}>{currency} {balance.toLocaleString()}</TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip
                                                    label={balance <= 0 ? 'Paid' : 'Pending'}
                                                    size="small"
                                                    color={balance <= 0 ? 'success' : 'warning'}
                                                    sx={{ fontWeight: 600, minWidth: 80 }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );

    const renderPaymentHistory = () => (
        <Box>
            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Recent Transactions</Typography>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f4f5ff' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2 }}>Receipt No</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2 }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2 }}>Mode</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'right' }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', py: 2, textAlign: 'center' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {receipts.map((txn, i) => (
                                    <TableRow key={txn.id} sx={{ bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff' }}>
                                        <TableCell sx={{ fontWeight: 500, color: '#4d44b5' }}>#{txn.id}</TableCell>
                                        <TableCell sx={{ color: '#A098AE' }}>{txn.payment_date}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{txn.payment_mode}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972', textAlign: 'right' }}>{currency} {Number(txn.paid_amount).toLocaleString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Chip label="Success" size="small" color="success" sx={{ fontWeight: 600 }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {receipts.length === 0 && <TableRow><TableCell colSpan={5} align="center">No transactions found</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );

    const renderReceipts = () => (
        <Box>
            <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700, mb: 3 }}>Receipts & Invoices</Typography>
            <Grid container spacing={3}>
                {receipts.map((receipt) => (
                    <Grid item xs={12} md={6} key={receipt.id}>
                        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                            <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Box sx={{ bgcolor: '#4d44b520', p: 1, borderRadius: '50%', mr: 2, color: '#4d44b5' }}>
                                            <BiReceipt size={24} />
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>#{receipt.id}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>Date: {receipt.payment_date}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>Mode: {receipt.payment_mode}</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4d44b5', mb: 1 }}>{currency} {Number(receipt.paid_amount).toLocaleString()}</Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<BiDownload />}
                                        onClick={() => handleDownloadReceipt(receipt)}
                                        sx={{ borderRadius: 2, textTransform: 'none' }}
                                    >
                                        Download
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                {receipts.length === 0 && <Grid item xs={12}><Typography align="center">No receipts found</Typography></Grid>}
            </Grid>
        </Box>
    );

    const renderQuickPay = () => (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ color: '#303972', fontWeight: 700, mb: 1, textAlign: 'center' }}>Quick Pay</Typography>
                    <Typography variant="body2" sx={{ color: '#A098AE', textAlign: 'center', mb: 4 }}>Securely pay pending fees for your child</Typography>

                    <Box sx={{ mb: 4, bgcolor: '#f9fafb', p: 3, borderRadius: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: '#A098AE', mb: 1 }}>Pending Amount</Typography>
                        <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>{currency} {totalDue.toLocaleString()}</Typography>
                    </Box>

                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Amount to Pay"
                            defaultValue={totalDue}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                            }}
                            sx={{ borderRadius: 3 }}
                        />
                        <TextField
                            fullWidth
                            label="Remarks (Optional)"
                            placeholder="e.g. Tuition Fee Payment"
                        />

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                bgcolor: '#4d44b5',
                                height: 50,
                                borderRadius: 3,
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                textTransform: 'none',
                                boxShadow: '0 8px 16px rgba(77, 68, 181, 0.25)',
                                '&:hover': { bgcolor: '#3d3495' }
                            }}
                        >
                            Proceed to Pay
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );


    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '1rem', minWidth: 120 },
                        '& .Mui-selected': { color: '#4d44b5' },
                        '& .MuiTabs-indicator': { bgcolor: '#4d44b5', height: 3, borderRadius: '3px 3px 0 0' }
                    }}
                >
                    <Tab icon={<BiMoney size={20} />} iconPosition="start" label="Fee Details" value="fees" />
                    <Tab icon={<BiHistory size={20} />} iconPosition="start" label="History" value="payments" />
                    <Tab icon={<BiReceipt size={20} />} iconPosition="start" label="Receipts" value="receipts" />
                    <Tab icon={<BiCreditCard size={20} />} iconPosition="start" label="Quick Pay" value="quickpay" />
                </Tabs>
                <Box sx={{ height: 1, bgcolor: '#e0e0e0', mt: -0.2 }} />
            </Box>

            {activeTab === 'fees' && renderFeeDetails()}
            {activeTab === 'payments' && renderPaymentHistory()}
            {activeTab === 'receipts' && renderReceipts()}
            {activeTab === 'quickpay' && renderQuickPay()}
        </Box>
    );
};

export default Finance;
