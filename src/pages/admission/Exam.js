import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

const exams = [
  { id: 1, name: "Math Test", class: "10-A", date: "12 Feb 2026", status: "Upcoming" },
  { id: 2, name: "Science Quiz", class: "9-B", date: "10 Feb 2026", status: "Completed" },
];

export default function Exams() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Exams List
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exam Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id}>
              <TableCell>{exam.name}</TableCell>
              <TableCell>{exam.class}</TableCell>
              <TableCell>{exam.date}</TableCell>
              <TableCell>{exam.status}</TableCell>
              <TableCell align="right">
                <Button size="small">View</Button>
                <Button size="small">Edit</Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
