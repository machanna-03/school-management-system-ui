import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Stack,
  Divider
} from "@mui/material";

const CollectFees = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [amountPaying, setAmountPaying] = useState("");

  // Dummy student (directly loaded)
  const student = {
    roll: "101",
    name: "Rahul Kumar",
    class: "10-A",
    parent: "Mr. Kumar",
    contact: "9876543210",
    fees: [
      { head: "Tuition Fee", amount: 20000, paid: 10000 },
      { head: "Transport", amount: 5000, paid: 0 },
      { head: "Exam Fee", amount: 3000, paid: 0 }
    ]
  };

  const calculateTotal = () => {
    return student.fees.reduce((sum, f) => sum + f.amount, 0);
  };

  const calculatePaid = () => {
    return student.fees.reduce((sum, f) => sum + f.paid, 0);
  };

  const calculateDue = () => {
    return calculateTotal() - calculatePaid();
  };

  const remainingAfterPayment =
    calculateDue() - Number(amountPaying || 0);

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Collect Fees
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Student Name"
                type= 'text'
               
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Roll Number"
                type= 'text'
                
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Academic Year"
                value="2025-26"
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Payment Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                size="small"
                label="Payment Mode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Bank">Bank Transfer</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Amount Paying"
                type="number"
                value={amountPaying}
                onChange={(e) => setAmountPaying(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Total Due"
                value={calculateDue()}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Remaining After Payment"
                value={remainingAfterPayment < 0 ? 0 : remainingAfterPayment}
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Collected By"
              />
            </Grid>

            {/* Dynamic Fields */}
            {paymentMode === "UPI" && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="UPI Transaction ID"
                />
              </Grid>
            )}

            {paymentMode === "Card" && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Card Last 4 Digits"
                />
              </Grid>
            )}

            {paymentMode === "Bank" && (
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Bank Transaction ID"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Remarks"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained">
              Submit Payment
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CollectFees;
