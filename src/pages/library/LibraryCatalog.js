import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, Typography, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Modal, Backdrop, Fade, Paper, TablePagination,
    InputAdornment, Menu, MenuItem, Dialog, DialogTitle, DialogContent,
    DialogActions, FormControl, InputLabel, Select, MenuItem as SelectItem
} from '@mui/material';
import {
    BiSearch, BiPlus, BiDotsVerticalRounded, BiEditAlt,
    BiTrash, BiBook, BiPurchaseTagAlt, BiBuildings
} from 'react-icons/bi';
import { apiList, invokeGetApi, invokePostApi } from '../../services/ApiServices';
import { config } from '../../config/Config';
import { toast } from 'react-toastify';

const LibraryCatalog = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Pagination
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Modal / Dialog State
    const [openModal, setOpenModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        publisher: '',
        published_year: new Date().getFullYear(),
        total_copies: 1,
        location: '',
        description: ''
    });

    // Menu state for actions
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedBookForMenu, setSelectedBookForMenu] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, [page, rowsPerPage, searchTerm]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            let res = await invokeGetApi(config.getMySchool + apiList.getLibraryBooks, {
                page: page + 1,
                limit: rowsPerPage,
                search: searchTerm
            });
            if (res.status === 200 && res.data.responseCode === "200") {
                setBooks(res.data.books || []);
                setTotalCount(res.data.pagination?.total_count || 0);
            }
        } catch (e) {
            toast.error("Failed to load catalog");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (book = null) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.title || '',
                author: book.author || '',
                isbn: book.isbn || '',
                category: book.category || '',
                publisher: book.publisher || '',
                published_year: book.published_year || new Date().getFullYear(),
                total_copies: book.total_copies || 1,
                location: book.location || '',
                description: book.description || ''
            });
        } else {
            setEditingBook(null);
            setFormData({
                title: '', author: '', isbn: '', category: '',
                publisher: '', published_year: new Date().getFullYear(),
                total_copies: 1, location: '', description: ''
            });
        }
        setOpenModal(true);
    };

    const handleSaveBook = async () => {
        if (!formData.title) {
            toast.error("Title is required");
            return;
        }

        try {
            let res;
            if (editingBook) {
                res = await invokePostApi(config.getMySchool + apiList.updateLibraryBook, {
                    ...formData,
                    id: editingBook.id
                });
            } else {
                res = await invokePostApi(config.getMySchool + apiList.addLibraryBook, formData);
            }

            if (res.status === 200 && res.data.responseCode === "200") {
                toast.success(editingBook ? "Book updated" : "Book added");
                setOpenModal(false);
                fetchBooks();
            } else {
                toast.error(res.data.responseMessage);
            }
        } catch (e) {
            toast.error("An error occurred");
        }
    };

    const handleDeleteBook = async () => {
        try {
            let res = await invokePostApi(config.getMySchool + apiList.deleteLibraryBook, { id: confirmDelete.id });
            if (res.status === 200 && res.data.responseCode === "200") {
                toast.success("Book deleted");
                setConfirmDelete(null);
                fetchBooks();
            } else {
                toast.error(res.data.responseMessage);
            }
        } catch (e) {
            toast.error("Error deleting book");
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold" color="#303972">Library Catalog</Typography>
                <Button
                    variant="contained"
                    startIcon={<BiPlus />}
                    onClick={() => handleOpenModal()}
                    sx={{ bgcolor: '#4d44b5', '&:hover': { bgcolor: '#3f36a3' }, borderRadius: 2, px: 3 }}
                >
                    Add New Book
                </Button>
            </Box>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center', bgcolor: '#fff' }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search by title, author, isbn..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                    sx={{ width: 400 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BiSearch color="#4d44b5" size={20} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Book Details</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Copies</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Location</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: '#4d44b5' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.length > 0 ? books.map((book) => (
                                <TableRow key={book.id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Box sx={{ p: 1, bgcolor: '#f0f1ff', borderRadius: 1 }}>
                                                <BiBook size={24} color="#4d44b5" />
                                            </Box>
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">{book.title}</Typography>
                                                <Typography variant="caption" color="textSecondary">By {book.author || 'Unknown'} | ISBN: {book.isbn || 'N/A'}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{book.category || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            <b>{book.available_copies}</b> / {book.total_copies}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{book.location || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Box component="span" sx={{
                                            px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 'bold',
                                            bgcolor: book.available_copies > 0 ? '#E1F7E3' : '#FFF2E5',
                                            color: book.available_copies > 0 ? '#2DA646' : '#FB7D5B'
                                        }}>
                                            {book.available_copies > 0 ? 'Available' : 'Out of Stock'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleOpenModal(book)} size="small" color="primary">
                                            <BiEditAlt />
                                        </IconButton>
                                        <IconButton onClick={() => setConfirmDelete(book)} size="small" color="error">
                                            <BiTrash />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                        {loading ? "Loading..." : "No books found in catalog"}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={totalCount}
                    page={page}
                    onPageChange={(e, p) => setPage(p)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                />
            </Card>

            {/* Add/Edit Modal */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ color: '#303972', fontWeight: 700 }}>
                    {editingBook ? 'Edit Book' : 'Add New Book'}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Book Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Author" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="ISBN" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth label="Publisher" value={formData.publisher} onChange={(e) => setFormData({ ...formData, publisher: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField fullWidth type="number" label="Published Year" value={formData.published_year} onChange={(e) => setFormData({ ...formData, published_year: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth type="number" label="Total Copies" value={formData.total_copies} onChange={(e) => setFormData({ ...formData, total_copies: e.target.value })} />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <TextField fullWidth label="Location (Rack/Shelf)" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline rows={3} label="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenModal(false)} color="inherit">Cancel</Button>
                    <Button variant="contained" onClick={handleSaveBook} sx={{ bgcolor: '#4d44b5' }}>
                        {editingBook ? 'Update Book' : 'Add Book'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete <b>{confirmDelete?.title}</b>? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
                    <Button onClick={handleDeleteBook} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LibraryCatalog;
