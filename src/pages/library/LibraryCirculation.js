import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, Tab, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
    Autocomplete, Modal, Backdrop, Fade, Paper, TablePagination
} from '@mui/material';
import { apiList, invokeGetApi, invokePostApi } from '../../services/ApiServices';
import { config } from '../../config/Config';
import { toast } from 'react-toastify';

const LibraryCirculation = () => {
    const [tabValue, setTabValue] = useState(0);
    // const [userType, setUserType] = useState('Student'); // Removed unused state
    const [students, setStudents] = useState([]);
    const [staff, setStaff] = useState([]);
    const [issues, setIssues] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Filter issues based on search
    const filteredIssues = issues.filter(issue => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        const studentName = issue.student_name ? issue.student_name.toLowerCase() : "";
        const staffName = issue.staff_name ? issue.staff_name.toLowerCase() : "";
        return studentName.includes(term) || staffName.includes(term);
    });

    // Split into Active and History
    const activeIssues = filteredIssues.filter(i => i.status === 'Issued');
    const historyIssues = filteredIssues.filter(i => i.status === 'Returned');

    // Issue Form State
    const [issueForm, setIssueForm] = useState({
        user_type: 'Student',
        user_id: '',
        book_title: '',
        book_author: '',
        isbn: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: ''
    });

    // Return Modal State
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
    const [fine, setFine] = useState(0);

    useEffect(() => {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        setIssueForm(prev => ({ ...prev, due_date: nextWeek.toISOString().split('T')[0] }));

        fetchStudents();
        fetchStaff();
        fetchIssues();
    }, [page, rowsPerPage]);

    const fetchStudents = async () => {
        try {
            let res = await invokeGetApi(config.getMySchool + apiList.getStudents, {}); // Assuming existing endpoint works
            if (res.status === 200 && res.data.responseCode === "200") setStudents(res.data.students || []);
        } catch (e) { }
    };

    const fetchStaff = async () => {
        try {
            let res = await invokeGetApi(config.getMySchool + apiList.getTeachers, {}); // Assuming existing endpoint works
            if (res.status === 200 && res.data.responseCode === "200") setStaff(res.data.teachers || []);
        } catch (e) { }
    };

    const fetchIssues = async () => {
        try {
            let res = await invokeGetApi(`${config.getMySchool}/library/issues?page=${page + 1}&limit=${rowsPerPage}`, {});
            if (res.status === 200 && res.data.responseCode === "200") {
                setIssues(res.data.issues || []);
                if (res.data.pagination) {
                    setTotalCount(res.data.pagination.total_count);
                } else {
                    setTotalCount(res.data.issues.length);
                }
            }
        } catch (e) {
            toast.error("Failed to load issues");
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleIssueBook = async () => {
        try {
            let res = await invokePostApi(config.getMySchool + "/library/issueBook", issueForm);
            if (res.status === 200 && res.data.responseCode === "200") {
                toast.success("Book Issued Successfully");
                setIssueForm({
                    ...issueForm,
                    book_title: '', book_author: '', isbn: '',
                    user_id: '' // Reset user? optional
                });
                fetchIssues();
                setTabValue(1); // Switch to list view
            } else {
                toast.error(res.data.responseMessage || "Failed to issue book");
            }
        } catch (error) {
            toast.error("Error issuing book");
        }
    };

    const handleOpenReturn = (issue) => {
        setSelectedIssue(issue);
        setReturnDate(new Date().toISOString().split('T')[0]);
        // Calculate fine logic (e.g. 5rs per day)
        // Simple diff days
        const due = new Date(issue.due_date);
        const today = new Date();
        const diffTime = today - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            setFine(diffDays * 5); // 5 Rs per day fine
        } else {
            setFine(0);
        }
        setReturnModalOpen(true);
    };

    const handleConfirmReturn = async () => {
        try {
            let res = await invokePostApi(config.getMySchool + "/library/returnBook", {
                issue_id: selectedIssue.id,
                return_date: returnDate,
                fine: fine
            });
            if (res.status === 200 && res.data.responseCode === "200") {
                toast.success("Book Returned Successfully");
                setReturnModalOpen(false);
                fetchIssues();
            } else {
                toast.error(res.data.responseMessage);
            }
        } catch (error) {
            toast.error("Error returning book");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#303972">Circulation Management</Typography>

            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                        <Tab label="Issue Book" />
                        <Tab label="Return / History" />
                    </Tabs>
                </Box>
            </Card>

            {tabValue === 0 && (
                <Card sx={{ borderRadius: 2, p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Borrower Type</FormLabel>
                                <RadioGroup row value={issueForm.user_type} onChange={(e) => setIssueForm({ ...issueForm, user_type: e.target.value, user_id: '' })}>
                                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                    <FormControlLabel value="Staff" control={<Radio />} label="Staff" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {issueForm.user_type === 'Student' ? (
                                <Autocomplete
                                    options={students}
                                    getOptionLabel={(option) => option.name || ""}
                                    value={students.find(s => s.id === issueForm.user_id) || null}
                                    onChange={(event, newValue) => setIssueForm({ ...issueForm, user_id: newValue ? newValue.id : '' })}
                                    renderInput={(params) => <TextField {...params} label="Select Student" fullWidth />}
                                />
                            ) : (
                                <Autocomplete
                                    options={staff}
                                    getOptionLabel={(option) => option.name || ""}
                                    value={staff.find(s => s.id === issueForm.user_id) || null}
                                    onChange={(event, newValue) => setIssueForm({ ...issueForm, user_id: newValue ? newValue.id : '' })}
                                    renderInput={(params) => <TextField {...params} label="Select Staff" fullWidth />}
                                />
                            )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Book Title" value={issueForm.book_title} onChange={(e) => setIssueForm({ ...issueForm, book_title: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Author" value={issueForm.book_author} onChange={(e) => setIssueForm({ ...issueForm, book_author: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="ISBN (Optional)" value={issueForm.isbn} onChange={(e) => setIssueForm({ ...issueForm, isbn: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="date" label="Issue Date" InputLabelProps={{ shrink: true }} value={issueForm.issue_date} onChange={(e) => setIssueForm({ ...issueForm, issue_date: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="date" label="Due Date" InputLabelProps={{ shrink: true }} value={issueForm.due_date} onChange={(e) => setIssueForm({ ...issueForm, due_date: e.target.value })} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button variant="contained" size="large" onClick={handleIssueBook} disabled={!issueForm.user_id || !issueForm.book_title}>
                                Issue Book
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            )}

            {tabValue === 1 && (
                <Box>
                    <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search by Student/Staff Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ width: 300 }}
                        />
                        <TablePagination
                            component="div"
                            count={parseInt(totalCount, 10)}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25, 50]}
                        />
                    </Paper>

                    <Card sx={{ borderRadius: 2, p: 3 }}>
                        {/* Active Issues Table */}
                        <Typography variant="h6" fontWeight="bold" mb={2} color="#FB7D5B">
                            Books Currently Issued {searchTerm && `to "${searchTerm}"`}
                        </Typography>
                        <TableContainer component={Paper} sx={{ mb: 4, boxShadow: "none", border: "1px solid #e0e0e0" }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Book</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Borrower</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Issue Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Due Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {activeIssues.length > 0 ? activeIssues.map((issue, i) => (
                                        <TableRow
                                            key={issue.id}
                                            hover
                                            sx={{
                                                bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                                '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                                '&:hover': { bgcolor: '#f0f1ff !important' },
                                                '&:last-child td': { borderBottom: 0 }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body1" fontWeight="bold">{issue.book_title}</Typography>
                                                <Typography variant="caption">{issue.book_author}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                {issue.student_name || issue.staff_name || "N/A"}<br />
                                                <Typography variant="caption" color="textSecondary">{issue.user_type}</Typography>
                                            </TableCell>
                                            <TableCell>{issue.issue_date}</TableCell>
                                            <TableCell>{issue.due_date}</TableCell>
                                            <TableCell>
                                                <Box component="span" sx={{
                                                    px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold',
                                                    bgcolor: '#FFF2E5', color: '#FB7D5B'
                                                }}>
                                                    {issue.status}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Button size="small" variant="contained" color="primary" onClick={() => handleOpenReturn(issue)}>
                                                    Return
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={6} align="center">No active issues found</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Return History Table */}
                        <Typography variant="h6" fontWeight="bold" mb={2} color="#2DA646">
                            Return History
                        </Typography>
                        <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Book</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Borrower</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Issue Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Return Date</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Fine</TableCell>
                                        <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {historyIssues.length > 0 ? historyIssues.map((issue, i) => (
                                        <TableRow
                                            key={issue.id}
                                            hover
                                            sx={{
                                                bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                                '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                                '&:hover': { bgcolor: '#f0f1ff !important' },
                                                '&:last-child td': { borderBottom: 0 }
                                            }}
                                        >
                                            <TableCell>
                                                <Typography variant="body1" fontWeight="bold">{issue.book_title}</Typography>
                                                <Typography variant="caption">{issue.book_author}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                {issue.student_name || issue.staff_name || "N/A"}<br />
                                                <Typography variant="caption" color="textSecondary">{issue.user_type}</Typography>
                                            </TableCell>
                                            <TableCell>{issue.issue_date}</TableCell>
                                            <TableCell>{issue.return_date || "-"}</TableCell>
                                            <TableCell>₹{issue.fine || 0}</TableCell>
                                            <TableCell>
                                                <Box component="span" sx={{
                                                    px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold',
                                                    bgcolor: '#E1F7E3', color: '#2DA646'
                                                }}>
                                                    {issue.status}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={6} align="center">No return history found</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Box>
            )}

            {/* Return Modal */}
            <Modal open={returnModalOpen} onClose={() => setReturnModalOpen(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
                <Fade in={returnModalOpen}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
                        <Typography variant="h6" mb={2}>Return Book</Typography>
                        <TextField fullWidth type="date" label="Return Date" InputLabelProps={{ shrink: true }} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} sx={{ mb: 2 }} />
                        <TextField fullWidth type="number" label="Fine Amount" value={fine} onChange={(e) => setFine(e.target.value)} sx={{ mb: 2 }} />
                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button onClick={() => setReturnModalOpen(false)}>Cancel</Button>
                            <Button variant="contained" onClick={handleConfirmReturn}>Confirm Return</Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal >
        </Box >
    );
};

export default LibraryCirculation;
