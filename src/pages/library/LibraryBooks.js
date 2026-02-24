import React, { useState, useEffect, useCallback } from 'react';
import {
    Box, Typography, Button, Grid, TextField, MenuItem, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, IconButton, Dialog, DialogTitle, DialogContent,
    DialogActions, CircularProgress, InputAdornment, Chip, Tooltip
} from '@mui/material';
import { BiPlus, BiSearch, BiEdit, BiTrash, BiBook, BiRefresh } from 'react-icons/bi';
import { notifications } from '@mantine/notifications';
import { apiList, invokeGetApi, invokeApi } from '../../services/ApiServices';

const CATEGORIES = ['Fiction', 'Non-Fiction', 'Science', 'Mathematics', 'History', 'Geography',
    'Literature', 'Reference', 'Textbook', 'Biography', 'Computer Science', 'Other'];

const defaultBook = {
    title: '', author: '', isbn: '', category: '', publisher: '',
    published_year: '', total_copies: 1, available_copies: 1, location: '', description: ''
};

const LibraryBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(defaultBook);
    const [saving, setSaving] = useState(false);

    // Table create state
    const [tableCreated, setTableCreated] = useState(true);

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page: page + 1, limit: rowsPerPage };
            if (search) params.search = search;
            const res = await invokeGetApi(apiList.getLibraryBooks, params);
            if (res?.data?.responseCode === '200') {
                setBooks(res.data.books || []);
                setTotalCount(res.data.pagination?.total_count || 0);
            } else if (res?.status === 500 && res?.data?.responseMessage?.includes('exist')) {
                setTableCreated(false);
            }
        } catch (e) {
            console.error('Error fetching books:', e);
        } finally {
            setLoading(false);
        }
    }, [page, rowsPerPage, search]);

    useEffect(() => { fetchBooks(); }, [fetchBooks]);

    const handleCreateTable = async () => {
        try {
            const res = await invokeGetApi(apiList.createLibraryBooksTable);
            if (res?.data?.responseCode === '200') {
                setTableCreated(true);
                notifications.show({ title: 'Success', message: 'Books table created', color: 'green' });
                fetchBooks();
            }
        } catch (e) {
            notifications.show({ title: 'Error', message: 'Failed to create table', color: 'red' });
        }
    };

    const openAddDialog = () => {
        setForm(defaultBook);
        setEditMode(false);
        setDialogOpen(true);
    };

    const openEditDialog = (book) => {
        setForm({ ...book });
        setEditMode(true);
        setDialogOpen(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            notifications.show({ title: 'Validation', message: 'Book title is required', color: 'yellow' });
            return;
        }
        setSaving(true);
        try {
            const endpoint = editMode ? apiList.updateLibraryBook : apiList.addLibraryBook;
            const res = await invokeApi(endpoint, form);
            if (res?.data?.responseCode === '200') {
                notifications.show({ title: 'Success', message: editMode ? 'Book updated' : 'Book added', color: 'green' });
                setDialogOpen(false);
                fetchBooks();
            } else {
                notifications.show({ title: 'Error', message: res?.data?.responseMessage || 'Operation failed', color: 'red' });
            }
        } catch (e) {
            notifications.show({ title: 'Error', message: 'Failed to save book', color: 'red' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (book) => {
        if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
        try {
            const res = await invokeApi(apiList.deleteLibraryBook, { id: book.id });
            if (res?.data?.responseCode === '200') {
                notifications.show({ title: 'Deleted', message: 'Book removed from catalog', color: 'green' });
                fetchBooks();
            }
        } catch (e) {
            notifications.show({ title: 'Error', message: 'Failed to delete book', color: 'red' });
        }
    };

    const handleSearch = () => {
        setSearch(searchInput);
        setPage(0);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    if (!tableCreated) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={300} gap={2}>
                <BiBook size={48} color="#4d44b5" />
                <Typography variant="h6">Books table not set up yet</Typography>
                <Button variant="contained" onClick={handleCreateTable} sx={{ bgcolor: '#4d44b5' }}>
                    Initialize Books Catalog
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" fontWeight="bold" color="text.primary">Books Catalog</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<BiRefresh />}
                        onClick={fetchBooks}
                        sx={{ borderRadius: 5, borderColor: '#4d44b5', color: '#4d44b5' }}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<BiPlus size={20} />}
                        onClick={openAddDialog}
                        sx={{ bgcolor: '#4d44b5', borderRadius: 5, px: 3, '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        Add Book
                    </Button>
                </Box>
            </Box>

            {/* Search Bar */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 4, mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    size="small"
                    placeholder="Search by title, author, ISBN or category..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    sx={{ flex: 1, maxWidth: 400 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><BiSearch /></InputAdornment>
                    }}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ bgcolor: '#4d44b5', borderRadius: 4, '&:hover': { bgcolor: '#3d34a5' } }}>
                    Search
                </Button>
                {search && (
                    <Button variant="text" onClick={() => { setSearch(''); setSearchInput(''); setPage(0); }}>
                        Clear
                    </Button>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                    {totalCount} book{totalCount !== 1 ? 's' : ''} found
                </Typography>
            </Paper>

            {/* Table */}
            <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Title / Author</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>ISBN</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Category</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Total Copies</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Available</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Status</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                        <CircularProgress size={28} />
                                    </TableCell>
                                </TableRow>
                            ) : books.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                        No books found. Add some books to the catalog.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                books.map((book, idx) => (
                                    <TableRow
                                        key={book.id}
                                        hover
                                        sx={{
                                            bgcolor: idx % 2 === 0 ? '#ffffff' : '#f9f9ff',
                                            '& td': { borderBottom: '1px solid #f0f1f5', py: 1.4 },
                                            '&:hover': { bgcolor: '#f0f1ff !important' },
                                            '&:last-child td': { borderBottom: 0 }
                                        }}
                                    >
                                        <TableCell sx={{ color: 'text.secondary' }}>{page * rowsPerPage + idx + 1}</TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700} color="#303972">{book.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">{book.author || '—'}</Typography>
                                            {book.published_year && <Typography variant="caption" color="text.secondary"> · {book.published_year}</Typography>}
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{book.isbn || '—'}</TableCell>
                                        <TableCell>
                                            {book.category ? (
                                                <Chip label={book.category} size="small" sx={{ bgcolor: '#4d44b515', color: '#4d44b5', fontWeight: 600 }} />
                                            ) : '—'}
                                        </TableCell>
                                        <TableCell align="center">{book.total_copies}</TableCell>
                                        <TableCell align="center">
                                            <Typography
                                                variant="body2"
                                                fontWeight={700}
                                                color={book.available_copies > 0 ? '#4caf50' : '#f44336'}
                                            >
                                                {book.available_copies}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{book.location || '—'}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={book.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: book.status === 'Available' ? '#e8f5e9' : '#ffebee',
                                                    color: book.status === 'Available' ? '#388e3c' : '#c62828',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                                <Tooltip title="Edit">
                                                    <IconButton size="small" sx={{ bgcolor: '#fff3e0', color: '#ff9800' }} onClick={() => openEditDialog(book)}>
                                                        <BiEdit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton size="small" sx={{ bgcolor: '#ffebee', color: '#f44336' }} onClick={() => handleDelete(book)}>
                                                        <BiTrash />
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
            </Paper>

            {/* Add / Edit Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
                <DialogTitle sx={{ bgcolor: '#4d44b5', color: 'white', fontWeight: 700 }}>
                    {editMode ? 'Edit Book' : 'Add New Book'}
                </DialogTitle>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid item xs={12} md={8}>
                            <TextField fullWidth required label="Book Title" name="title" value={form.title} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth label="ISBN" name="isbn" value={form.isbn} onChange={handleFormChange} placeholder="978-..." />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Author" name="author" value={form.author} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField select fullWidth label="Category" name="category" value={form.category} onChange={handleFormChange}>
                                {CATEGORIES.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Publisher" name="publisher" value={form.publisher} onChange={handleFormChange} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField fullWidth label="Year" name="published_year" type="number" value={form.published_year} onChange={handleFormChange} inputProps={{ min: 1900, max: new Date().getFullYear() }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField fullWidth required label="Total Copies" name="total_copies" type="number" value={form.total_copies} onChange={handleFormChange} inputProps={{ min: 1 }} />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <TextField fullWidth label="Available" name="available_copies" type="number" value={form.available_copies} onChange={handleFormChange} inputProps={{ min: 0 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Shelf Location" name="location" value={form.location} onChange={handleFormChange} placeholder="e.g. Row A, Shelf 2" />
                        </Grid>
                        {editMode && (
                            <Grid item xs={12} md={6}>
                                <TextField select fullWidth label="Status" name="status" value={form.status || 'Available'} onChange={handleFormChange}>
                                    <MenuItem value="Available">Available</MenuItem>
                                    <MenuItem value="Unavailable">Unavailable</MenuItem>
                                </TextField>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={2} label="Description / Notes" name="description" value={form.description} onChange={handleFormChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button variant="outlined" onClick={() => setDialogOpen(false)} sx={{ borderRadius: 5 }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={saving}
                        sx={{ borderRadius: 5, bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3d34a5' } }}
                    >
                        {saving ? 'Saving...' : (editMode ? 'Save Changes' : 'Add Book')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LibraryBooks;
