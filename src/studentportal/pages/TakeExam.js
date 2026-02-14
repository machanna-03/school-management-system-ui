import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, CircularProgress, Container, Grid, TextField, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { invokeGetApi, invokeApi, apiList } from '../../services/ApiServices';

const TakeExam = () => {
    const { scheduleId } = useParams(); // Removed unused examId
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // { questionId: selectedOptionIndex }
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3600); // 1 hour default, should fetch from exam settings

    const studentId = localStorage.getItem('student_id');

    const fetchQuestions = React.useCallback(async () => {
        try {
            const url = `${apiList.getQuestions}/${scheduleId}`;
            const res = await invokeGetApi(url);

            if (res.data.responseCode === "200") {
                setQuestions(res.data.questions);
            } else {
                alert("Failed to load questions");
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setLoading(false);
        }
    }, [scheduleId]);

    const handleOptionChange = (questionId, optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex // For MCQ index (int), for Descriptive text (string)
        }));
    };

    const handleSubmit = React.useCallback(async () => {
        try {
            const formattedAnswers = Object.keys(answers).map(qid => {
                const question = questions.find(q => q.id === parseInt(qid));
                const isDescriptive = question && question.question_type === 'Descriptive';
                return {
                    question_id: qid,
                    selected_option: isDescriptive ? null : parseInt(answers[qid]),
                    answer_text: isDescriptive ? answers[qid] : null
                };
            });

            const payload = {
                student_id: studentId,
                schedule_id: scheduleId,
                answers: formattedAnswers
            };

            const response = await invokeApi(apiList.submitExam, payload);
            if (response.data.responseCode === "200") {
                alert(`Exam Submitted! Your Score: ${response.data.score}`);
                navigate('/student/online-exams');
            } else {
                alert("Submission Failed: " + response.data.responseMessage);
            }
        } catch (error) {
            console.error("Error submitting exam:", error);
            alert("Error submitting exam.");
        }
    }, [answers, questions, scheduleId, studentId, navigate]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    useEffect(() => {
        // Timer Logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit(); // Auto-submit
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [questions, handleSubmit]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    if (questions.length === 0) return <Container><Typography>No questions found for this exam.</Typography></Container>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" fontWeight={700} color="#303972">
                    Online Exam
                </Typography>
                <Typography variant="h6" color={timeLeft < 300 ? 'error' : 'primary'}>
                    Time Left: {formatTime(timeLeft)}
                </Typography>
            </Box>

            <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, fontWeight: 500, fontSize: '1.1rem' }}>
                        {currentQuestion.question_text}
                    </Typography>

                    {currentQuestion.question_type === 'Descriptive' ? (
                        <Paper elevation={3} sx={{ p: 3, minHeight: '300px' }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={10}
                                variant="standard" // Or "outlined" but "standard" looks more like writing on lines
                                placeholder="Type your answer here..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
                                InputProps={{
                                    disableUnderline: true, // Make it look like a blank page
                                    style: { fontSize: '1.1rem', lineHeight: '1.6' }
                                }}
                            />
                        </Paper>
                    ) : (
                        <FormControl component="fieldset">
                            <RadioGroup
                                name={`question-${currentQuestion.id}`}
                                value={answers[currentQuestion.id] !== undefined ? answers[currentQuestion.id] : ''}
                                onChange={(e) => handleOptionChange(currentQuestion.id, e.target.value)}
                            >
                                {currentQuestion.options.map((opt, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={idx}
                                        control={<Radio />}
                                        label={opt}
                                        sx={{ mb: 1 }}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                </CardContent>
            </Card>

            <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                    <Button
                        variant="outlined"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    >
                        Previous
                    </Button>
                </Grid>
                <Grid item>
                    {currentQuestionIndex < questions.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                            sx={{ bgcolor: '#4d44b5' }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit}
                        >
                            Submit Exam
                        </Button>
                    )}
                </Grid>
            </Grid>

            {/* Question Palette (Optional) */}
            <Box sx={{ mt: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {questions.map((q, idx) => (
                    <Button
                        key={q.id}
                        variant={currentQuestionIndex === idx ? "contained" : "outlined"}
                        color={answers[q.id] !== undefined ? "success" : "primary"}
                        size="small"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        sx={{ minWidth: 40 }}
                    >
                        {idx + 1}
                    </Button>
                ))}
            </Box>
        </Container>
    );
};

export default TakeExam;
