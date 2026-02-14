import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, TextField, Grid, IconButton, FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Tab, InputAdornment } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { invokeApi, invokeGetApi, invokeDeleteApi, invokePutApi, apiList } from '../../services/ApiServices';

const AddQuestions = () => {
    const { scheduleId } = useParams();
    // const navigate = useNavigate(); // Unused
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        question_text: '',
        question_type: 'MCQ',
        options: ['', '', '', ''],
        correct_option: 0,
        marks: 1
    });
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredQuestions = questions.filter(q => {
        const matchesSearch = q.question_text.toLowerCase().includes(searchTerm.toLowerCase());
        const isMCQ = !q.question_type || q.question_type === 'MCQ';
        const isDescriptive = q.question_type === 'Descriptive';

        if (tabValue === 0) return isMCQ && matchesSearch;
        if (tabValue === 1) return isDescriptive && matchesSearch;
        return matchesSearch;
    });

    const fetchQuestions = React.useCallback(async () => {
        try {
            const url = `${apiList.getQuestions}/${scheduleId}`;
            const response = await invokeGetApi(url);
            if (response.data.responseCode === "200") {
                setQuestions(response.data.questions);
            }
        } catch (error) {
            console.error(error);
        }
    }, [scheduleId]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion({ ...newQuestion, options: updatedOptions });
    };

    const handleEdit = (question) => {
        setNewQuestion({
            question_text: question.question_text,
            question_type: question.question_type || 'MCQ',
            options: question.options || ['', '', '', ''],
            correct_option: question.correct_option,
            marks: question.marks
        });
        setEditingId(question.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setNewQuestion({ question_text: '', question_type: 'MCQ', options: ['', '', '', ''], correct_option: 0, marks: 1 });
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (!newQuestion.question_text) {
            alert("Please enter question text");
            return;
        }
        if (newQuestion.question_type === 'MCQ' && newQuestion.options.some(opt => !opt)) {
            alert("Please fill all options for MCQ");
            return;
        }

        setLoading(true);
        try {
            if (editingId) {
                // Update
                const payload = {
                    id: editingId,
                    ...newQuestion
                };
                const response = await invokePutApi(apiList.updateQuestion, payload);
                if (response.data.responseCode === "200") {
                    alert("Question Updated Successfully");
                    handleCancelEdit();
                    fetchQuestions();
                } else {
                    alert("Failed to update question");
                }

            } else {
                // Add
                const payload = {
                    schedule_id: scheduleId,
                    ...newQuestion
                };
                const response = await invokeApi(apiList.addQuestion, payload);
                if (response.data.responseCode === "200") {
                    alert("Question Added Successfully");
                    setNewQuestion({ question_text: '', question_type: 'MCQ', options: ['', '', '', ''], correct_option: 0, marks: 1 });
                    fetchQuestions();
                } else {
                    alert("Failed to add question");
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const url = `${apiList.deleteQuestion}/${id}`;
            const response = await invokeDeleteApi(url);
            if (response.data.responseCode === "200") {
                fetchQuestions();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1000, margin: 'auto' }}>
            <Typography variant="h5" fontWeight={700} color="#303972" gutterBottom>
                Manage Questions for Exam Schedule ID: {scheduleId}
            </Typography>

            <Card sx={{ mb: 4, p: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>{editingId ? "Edit Question" : "Add New Question"}</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Question Type</InputLabel>
                                <Select
                                    label="Question Type"
                                    value={newQuestion.question_type}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, question_type: e.target.value })}
                                >
                                    <MenuItem value="MCQ">Multiple Choice (MCQ)</MenuItem>
                                    <MenuItem value="Descriptive">Q&A (Long Answer)</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Marks"
                                value={newQuestion.marks}
                                onChange={(e) => setNewQuestion({ ...newQuestion, marks: parseInt(e.target.value) })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Question Text"
                                value={newQuestion.question_text}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
                                multiline
                                rows={2}
                            />
                        </Grid>

                        {/* MCQ Options */}
                        {newQuestion.question_type === 'MCQ' && (
                            <>
                                {newQuestion.options.map((opt, idx) => (
                                    <Grid item xs={6} key={idx}>
                                        <TextField
                                            fullWidth
                                            label={`Option ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                                        />
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Correct Option</InputLabel>
                                        <Select
                                            value={newQuestion.correct_option}
                                            label="Correct Option"
                                            onChange={(e) => setNewQuestion({ ...newQuestion, correct_option: e.target.value })}
                                        >
                                            {newQuestion.options.map((_, idx) => (
                                                <MenuItem key={idx} value={idx}>Option {idx + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{ bgcolor: '#4d44b5' }}
                            >
                                {loading ? "Processing..." : (editingId ? "Update Question" : "Add Question")}
                            </Button>
                            {editingId && (
                                <Button
                                    variant="outlined"
                                    onClick={handleCancelEdit}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Existing Questions</Typography>
                <TextField
                    size="small"
                    placeholder="Search Questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Paper sx={{ mb: 2 }}>
                <Tabs value={tabValue} onChange={(e, val) => setTabValue(val)} indicatorColor="primary" textColor="primary">
                    <Tab label="MCQ Questions" />
                    <Tab label="Q&A (Descriptive)" />
                </Tabs>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Options</TableCell>
                            <TableCell>Marks</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredQuestions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No questions found.</TableCell>
                            </TableRow>
                        ) : (
                            filteredQuestions.map((q, idx) => (
                                <TableRow key={q.id}>
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{q.question_text} <br /><small style={{ color: '#666', background: '#eee', padding: '2px 4px', borderRadius: '4px' }}>{q.question_type || 'MCQ'}</small></TableCell>
                                    <TableCell>
                                        {q.question_type === 'Descriptive' ? (
                                            <em style={{ color: 'gray' }}>Descriptive Answer</em>
                                        ) : (
                                            <ul>
                                                {q.options.map((opt, i) => (
                                                    <li key={i} style={{ color: i === q.correct_option ? 'green' : 'inherit', fontWeight: i === q.correct_option ? 'bold' : 'normal' }}>
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </TableCell>
                                    <TableCell>{q.marks}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEdit(q)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteQuestion(q.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AddQuestions;
