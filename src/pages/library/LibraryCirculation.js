import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Tabs, Tab, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
    Autocomplete, Modal, Backdrop, Fade, Paper
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
    }, []);

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
            let res = await invokeGetApi(config.getMySchool + "/library/issues", {});
            if (res.status === 200 && res.data.responseCode === "200") setIssues(res.data.issues || []);
        } catch (e) {
            toast.error("Failed to load issues");
        }
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
                <Card sx={{ borderRadius: 2, p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by Student/Staff Name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>

                    {/* Active Issues Table */}
                    <Typography variant="h6" fontWeight="bold" mb={2} color="#FB7D5B">
                        Books Currently Issued {searchTerm && `to "${searchTerm}"`}
                    </Typography>
                    <TableContainer component={Paper} sx={{ mb: 4, boxShadow: "none", border: "1px solid #e0e0e0" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Book</b></TableCell>
                                    <TableCell><b>Borrower</b></TableCell>
                                    <TableCell><b>Issue Date</b></TableCell>
                                    <TableCell><b>Due Date</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                    <TableCell><b>Action</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeIssues.length > 0 ? activeIssues.map((issue) => (
                                    <TableRow key={issue.id}>
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
                                <TableRow>
                                    <TableCell><b>Book</b></TableCell>
                                    <TableCell><b>Borrower</b></TableCell>
                                    <TableCell><b>Issue Date</b></TableCell>
                                    <TableCell><b>Return Date</b></TableCell>
                                    <TableCell><b>Fine</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historyIssues.length > 0 ? historyIssues.map((issue) => (
                                    <TableRow key={issue.id}>
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
            </Modal>
        </Box>
    );
};

export default LibraryCirculation;
