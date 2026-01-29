import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { Box, Typography, IconButton } from '@mui/material';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';

const SchoolCalendar = () => {
    const [date, setDate] = React.useState(new Date());

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" fontWeight={700}>{dayjs(date).format('MMMM YYYY')}</Typography>
                <Box>
                    <IconButton size="small" onClick={() => setDate(d => dayjs(d).subtract(1, 'month').toDate())}><BiChevronLeft /></IconButton>
                    <IconButton size="small" onClick={() => setDate(d => dayjs(d).add(1, 'month').toDate())}><BiChevronRight /></IconButton>
                </Box>
            </Box>

            <MantineProvider>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Calendar
                        value={date}
                        onChange={setDate}
                        size="md"
                        styles={{
                            calendarHeader: { display: 'none' }, // Check if this hides the header as we built a custom one
                            day: { borderRadius: '50%' },
                        }}
                    />
                </Box>
            </MantineProvider>
        </Box>
    );
};

export default SchoolCalendar;
