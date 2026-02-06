import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Chip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import { BiMoney, BiHistory, BiReceipt, BiCreditCard, BiDownload, BiCalendar, BiCheckCircle, BiTimeFive } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

const Finance = ({ initialTab = 'fees' }) => {
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        navigate(`/parent/${newValue}`);
    };

    // Mock Data
    const feeDetails = {
        totalDue: 5000,
        currency: '₹',
        dueDate: '15 Feb 2024',
        breakdown: [
            { id: 1, title: 'Tuition Fee (Term 2)', amount: 15000, status: 'Paid' },
            { id: 2, title: 'Transport Fee (Feb)', amount: 2500, status: 'Pending' },
            { id: 3, title: 'Annual Day Contribution', amount: 1000, status: 'Pending' },
            { id: 4, title: 'Library Fine', amount: 1500, status: 'Pending' },
        ]
    };

    const transactions = [
        { id: 'TXN12345', date: '05 Jan 2024', amount: 15000, description: 'Tuition Fee (Term 2)', status: 'Success' },
        { id: 'TXN12344', date: '10 Dec 2023', amount: 2500, description: 'Transport Fee (Dec)', status: 'Success' },
        { id: 'TXN12343', date: '10 Nov 2023', amount: 2500, description: 'Transport Fee (Nov)', status: 'Success' },
    ];

    const receipts = [
        { id: 'RCP-2024-001', date: '05 Jan 2024', amount: 15000, items: 'Tuition Fee (Term 2)' },
        { id: 'RCP-2023-012', date: '10 Dec 2023', amount: 2500, items: 'Transport Fee (Dec)' },
        { id: 'RCP-2023-011', date: '10 Nov 2023', amount: 2500, items: 'Transport Fee (Nov)' },
    ];

    const renderFeeDetails = () => (
        <Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 4, bgcolor: '#4d44b5', color: 'white', overflow: 'hidden', position: 'relative' }}>
                        <CardContent sx={{ p: 4 }}>
                            <Box sx={{ position: 'relative', zIndex: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9, mb: 1 }}>Total Amount Due</Typography>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>{feeDetails.currency} {feeDetails.totalDue.toLocaleString()}</Typography>
                                <Chip
                                    label={`Due by: ${feeDetails.dueDate}`}
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
                                />
                            </Box>
                            {/* Decorative Circle */}
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
                                onClick={() => navigate('/parent/quickpay')}
                                sx={{
                                    bgcolor: '#fb7d5b',
                                    borderRadius: 3,
                                    px: 5,
                                    py: 1.5,
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
                            <TableHead sx={{ bgcolor: '#f9fafb' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Description</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE', textAlign: 'right' }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE', textAlign: 'center' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {feeDetails.breakdown.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{item.title}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972', textAlign: 'right' }}>{feeDetails.currency} {item.amount.toLocaleString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Chip
                                                label={item.status}
                                                size="small"
                                                color={item.status === 'Paid' ? 'success' : 'warning'}
                                                variant={item.status === 'Paid' ? 'filled' : 'outlined'}
                                                sx={{ fontWeight: 600, minWidth: 80 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );

    const renderPaymentHistory = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#303972', fontWeight: 700 }}>Recent Transactions</Typography>
                <Button startIcon={<BiCalendar />} variant="outlined" sx={{ borderRadius: 2, textTransform: 'none' }}>Filter Date</Button>
            </Box>
            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: '#f9fafb' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Transaction ID</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE' }}>Description</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE', textAlign: 'right' }}>Amount</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: '#A098AE', textAlign: 'center' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((txn) => (
                                    <TableRow key={txn.id}>
                                        <TableCell sx={{ fontWeight: 500, color: '#4d44b5' }}>{txn.id}</TableCell>
                                        <TableCell sx={{ color: '#A098AE' }}>{txn.date}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972' }}>{txn.description}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, color: '#303972', textAlign: 'right' }}>{feeDetails.currency} {txn.amount.toLocaleString()}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Chip
                                                label={txn.status}
                                                size="small"
                                                color="success"
                                                sx={{ fontWeight: 600, borderRadius: 1 }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#303972' }}>{receipt.items}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>Date: {receipt.date}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>ID: {receipt.id}</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4d44b5', mb: 1 }}>{feeDetails.currency} {receipt.amount.toLocaleString()}</Typography>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<BiDownload />}
                                        sx={{ borderRadius: 2, textTransform: 'none' }}
                                    >
                                        Download
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
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
                        <Typography variant="h4" sx={{ color: '#303972', fontWeight: 700 }}>{feeDetails.currency} {feeDetails.totalDue.toLocaleString()}</Typography>
                    </Box>

                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Amount to Pay"
                            defaultValue={feeDetails.totalDue}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{feeDetails.currency}</InputAdornment>,
                            }}
                            sx={{ borderRadius: 3 }}
                        />
                        <TextField
                            fullWidth
                            label="Remarks (Optional)"
                            placeholder="e.g. Tuition Fee for March"
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

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" sx={{ h: 20 }} />
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" sx={{ h: 20 }} />
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" sx={{ h: 20 }} />
                    </Box>
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
