import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Paper, Table, TableHead, TableRow, TableCell,
    TableBody, TableContainer, Chip, IconButton, Button, TextField,
    MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle,
    DialogContent, DialogActions, CircularProgress, Tooltip, Avatar,
    TablePagination,
} from "@mui/material";
import {
    Check as CheckIcon,
    Close as CloseIcon,
    Visibility as ViewIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon,
    Print as PrintIcon,
} from "@mui/icons-material";
import { notifications } from "@mantine/notifications";
import { invokeGetApi, invokeApi, invokeFormDataApi, apiList } from "../../services/ApiServices";
import api from "../../services/api";

// ── Status chip styling ───────────────────────────────
const statusColor = { Pending: "warning", Approved: "success", Rejected: "error", Draft: "default" };

const AdmissionList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // View dialog
    const [viewData, setViewData] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    // Reject dialog
    const [rejectId, setRejectId] = useState(null);
    const [rejectRemarks, setRejectRemarks] = useState("");
    const [rejectOpen, setRejectOpen] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    // ── Fetch ──────────────────────────────────────────
    const fetchApplications = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                page: page + 1,
                limit: rowsPerPage,
                status: statusFilter || undefined,
                search: search || undefined,
            };
            const res = await invokeGetApi(apiList.getAdmissions, params);
            if (res?.data?.responseCode === "200") {
                setApplications(res.data.applications || []);
                setTotalCount(res.data.pagination?.total_count || 0);
            }
        } catch (e) {
            notifications.show({ title: "Error", message: "Could not load applications", color: "red" });
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, statusFilter, search]);

    useEffect(() => { fetchApplications(); }, [fetchApplications]);

    // ── View single ────────────────────────────────────
    const handleView = async (id) => {
        setViewLoading(true);
        setViewOpen(true);
        try {
            const res = await invokeGetApi(`${apiList.getAdmission}/${id}`);
            if (res?.data?.application) setViewData(res.data.application);
        } finally {
            setViewLoading(false);
        }
    };

    // ── Approve ────────────────────────────────────────
    const handleApprove = async (id) => {
        try {
            const res = await api.post(`${apiList.approveAdmission}/${id}`);
            if (res?.data?.responseCode === "200") {
                notifications.show({ title: "Approved", message: "Application approved", color: "green" });
                fetchApplications();
            }
        } catch {
            notifications.show({ title: "Error", message: "Could not approve", color: "red" });
        }
    };

    // ── Reject ─────────────────────────────────────────
    const openReject = (id) => { setRejectId(id); setRejectRemarks(""); setRejectOpen(true); };

    const handleReject = async () => {
        setRejectLoading(true);
        try {
            const res = await api.post(`${apiList.rejectAdmission}/${rejectId}`, { remarks: rejectRemarks });
            if (res?.data?.responseCode === "200") {
                notifications.show({ title: "Rejected", message: "Application rejected", color: "orange" });
                setRejectOpen(false);
                fetchApplications();
            }
        } catch {
            notifications.show({ title: "Error", message: "Could not reject", color: "red" });
        } finally {
            setRejectLoading(false);
        }
    };

    // ── Delete ─────────────────────────────────────────
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) return;
        try {
            const res = await api.post(apiList.deleteAdmission, { id });
            if (res?.data?.responseCode === "200") {
                notifications.show({ title: "Deleted", message: "Application deleted", color: "blue" });
                fetchApplications();
            }
        } catch {
            notifications.show({ title: "Error", message: "Could not delete", color: "red" });
        }
    };

    // ── Print Application ───────────────────────────────
    const handlePrintApplication = () => {
        if (!viewData) return;
        const fields = [
            ["Application Number", viewData.application_number],
            ["Status", viewData.status],
            ["Class Applying", viewData.class_applying],
            ["Academic Year", viewData.academic_year],
            ["Student Name", `${viewData.first_name || ''} ${viewData.middle_name || ''} ${viewData.last_name || ''}`],
            ["Date of Birth", viewData.dob],
            ["Gender", viewData.gender],
            ["Blood Group", viewData.blood_group],
            ["Nationality", viewData.nationality],
            ["Religion", viewData.religion],
            ["Category", viewData.category],
            ["Student Aadhaar", viewData.student_aadhaar],
            ["Father Name", viewData.father_name],
            ["Father Occupation", viewData.father_occupation],
            ["Mother Name", viewData.mother_name],
            ["Primary Contact", viewData.primary_contact],
            ["Emergency Contact", viewData.emergency_contact],
            ["Parent Email", viewData.parent_email],
            ["Annual Income", viewData.annual_income],
            ["Previous School", viewData.previous_school],
            ["Last Class", viewData.previous_class],
            ["Address", `${viewData.city || ''}, ${viewData.state || ''} - ${viewData.pincode || ''}`],
            ["Sibling in School", viewData.sibling_in_school ? `Yes – ${viewData.sibling_name} (${viewData.sibling_class})` : 'No'],
            ["Medical Condition", viewData.medical_condition || 'None'],
            ["Allergies", viewData.allergies || 'None'],
            ["Special Needs", viewData.special_needs || 'None'],
            ["Remarks", viewData.remarks || '—'],
        ];
        const rows = fields.map(([label, value]) =>
            `<tr><td style="padding:6px 12px;border:1px solid #ccc;font-weight:600;width:40%;background:#f5f5f5">${label}</td><td style="padding:6px 12px;border:1px solid #ccc">${value || '—'}</td></tr>`
        ).join('');
        const html = `<!DOCTYPE html><html><head><title>Admission Application – ${viewData.application_number}</title><style>body{font-family:Arial,sans-serif;margin:30px}h2{color:#303972}table{width:100%;border-collapse:collapse}@media print{button{display:none}}</style></head><body><h2>Admission Application</h2><p style="color:#888">${viewData.application_number} &nbsp;|&nbsp; Applied: ${viewData.applied_date || '—'}</p><table>${rows}</table><br><p style="text-align:right;margin-top:40px">Authorized Signature: ___________________</p></body></html>`;
        const win = window.open('', '_blank');
        win.document.write(html);
        win.document.close();
        win.focus();
        setTimeout(() => win.print(), 300);
    };

    return (
        <Box>
            {/* ── Header ── */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="text.primary">Admission Applications</Typography>
                    <Typography variant="body2" color="text.secondary">{totalCount} total application(s)</Typography>
                </Box>
                <Box display="flex" gap={1}>
                    <Button variant="outlined" startIcon={<RefreshIcon />} onClick={fetchApplications}>Refresh</Button>
                    <Button variant="contained" href="/admission/application-form">+ New Application</Button>
                </Box>
            </Box>

            {/* ── Filters ── */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }}>
                <Box display="flex" gap={2} flexWrap="wrap">
                    <TextField
                        label="Search by name or application no."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                        size="small"
                        sx={{ minWidth: 260 }}
                    />
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={statusFilter} label="Status" onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Paper>

            {/* ── Table ── */}
            <Paper sx={{ borderRadius: 3 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                {["App. No.", "Student", "Class", "Academic Year", "Applied Date", "Status", "Actions"].map((h) => (
                                    <TableCell key={h} sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>{h}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                        <Typography color="text.secondary">No applications found.</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((app, i) => (
                                    <TableRow
                                        key={app.id}
                                        hover
                                        sx={{
                                            bgcolor: i % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                            '& td': { borderBottom: '1px solid #eef0fb', py: 1.4 },
                                            '&:hover': { bgcolor: '#f0f1ff !important' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell>
                                            <Typography variant="body2" fontWeight={600} color="primary.main">
                                                {app.application_number}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1.5}>
                                                <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.light", fontSize: 13 }}>
                                                    {(app.first_name?.[0] || "?").toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {app.first_name} {app.middle_name} {app.last_name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">{app.parent_email}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{app.class_applying}</TableCell>
                                        <TableCell>{app.academic_year}</TableCell>
                                        <TableCell>{app.applied_date ? new Date(app.applied_date).toLocaleDateString("en-IN") : "—"}</TableCell>
                                        <TableCell>
                                            <Chip label={app.status} color={statusColor[app.status] || "default"} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <Box display="flex" gap={0.5}>
                                                <Tooltip title="View Details">
                                                    <IconButton size="small" onClick={() => handleView(app.id)}>
                                                        <ViewIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {app.status === "Pending" && (
                                                    <>
                                                        <Tooltip title="Approve">
                                                            <IconButton size="small" color="success" onClick={() => handleApprove(app.id)}>
                                                                <CheckIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Reject">
                                                            <IconButton size="small" color="warning" onClick={() => openReject(app.id)}>
                                                                <CloseIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                )}
                                                <Tooltip title="Delete">
                                                    <IconButton size="small" color="error" onClick={() => handleDelete(app.id)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, p) => setPage(p)}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                />
            </Paper>

            {/* ── View Dialog ── */}
            <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle fontWeight={700}>Application Details</DialogTitle>
                <DialogContent dividers>
                    {viewLoading ? (
                        <Box display="flex" justifyContent="center" py={4}><CircularProgress /></Box>
                    ) : viewData ? (
                        <Box>
                            <Chip label={viewData.application_number} color="primary" sx={{ mb: 2 }} />
                            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(220px,1fr))" gap={2}>
                                {[
                                    ["Status", viewData.status],
                                    ["Class", `${viewData.class_applying} ${viewData.section_preference ? `– ${viewData.section_preference}` : ""}`],
                                    ["Academic Year", viewData.academic_year],
                                    ["Student Name", `${viewData.first_name} ${viewData.middle_name || ""} ${viewData.last_name}`],
                                    ["DOB", viewData.dob],
                                    ["Gender", viewData.gender],
                                    ["Blood Group", viewData.blood_group],
                                    ["Nationality", viewData.nationality],
                                    ["Religion", viewData.religion],
                                    ["Category", viewData.category],
                                    ["Student Aadhaar", viewData.student_aadhaar],
                                    ["Father Name", viewData.father_name],
                                    ["Father Occupation", viewData.father_occupation],
                                    ["Mother Name", viewData.mother_name],
                                    ["Primary Contact", viewData.primary_contact],
                                    ["Emergency Contact", viewData.emergency_contact],
                                    ["Email", viewData.parent_email],
                                    ["Annual Income", viewData.annual_income],
                                    ["Previous School", viewData.previous_school],
                                    ["Last Class", viewData.previous_class],
                                    ["City / State", `${viewData.city || ""}, ${viewData.state || ""}`],
                                    ["Pincode", viewData.pincode],
                                    ["Sibling in School", viewData.sibling_in_school ? `Yes – ${viewData.sibling_name} (${viewData.sibling_class})` : "No"],
                                    ["Medical Condition", viewData.medical_condition || "None"],
                                    ["Allergies", viewData.allergies || "None"],
                                    ["Special Needs", viewData.special_needs || "None"],
                                    ["Remarks", viewData.remarks || "—"],
                                ].map(([label, value]) => (
                                    <Box key={label}>
                                        <Typography variant="caption" color="text.secondary">{label}</Typography>
                                        <Typography variant="body2" fontWeight={500}>{value || "—"}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    {viewData?.status === "Pending" && (
                        <>
                            <Button color="success" onClick={() => { handleApprove(viewData.id); setViewOpen(false); }}>Approve</Button>
                            <Button color="warning" onClick={() => { openReject(viewData.id); setViewOpen(false); }}>Reject</Button>
                        </>
                    )}
                    <Button
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={handlePrintApplication}
                        sx={{ mr: 'auto' }}
                    >
                        Print Application
                    </Button>
                    <Button onClick={() => setViewOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* ── Reject Dialog ── */}
            <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Reject Application</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Reason for Rejection"
                        multiline
                        rows={3}
                        fullWidth
                        value={rejectRemarks}
                        onChange={(e) => setRejectRemarks(e.target.value)}
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setRejectOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={handleReject} disabled={rejectLoading}>
                        {rejectLoading ? <CircularProgress size={18} /> : "Confirm Reject"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdmissionList;
