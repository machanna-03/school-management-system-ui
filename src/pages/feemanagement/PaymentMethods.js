import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Button
} from "@mui/material";

const PaymentMethods = () => {
  const [method, setMethod] = useState("");
  const [formData, setFormData] = useState({});

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
    setFormData({}); // reset fields when method changes
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Data:", { method, ...formData });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Payment Method
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Method Selection */}
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Payment Method"
                  value={method}
                  onChange={handleMethodChange}
                  required
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="Bank">Bank Transfer</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                </TextField>
              </Grid>

              {/* CASH FIELDS */}
              {method === "Cash" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Amount"
                      name="amount"
                      type="number"
                      value={formData.amount || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Accountant Name"
                      name="accountantName"
                      value={formData.accountantName || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </>
              )}

              {/* BANK TRANSFER FIELDS */}
              {method === "Bank" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Account Number"
                      name="accountNumber"
                      value={formData.accountNumber || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Bank Name"
                      name="bankName"
                      value={formData.bankName || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="IFSC Code"
                      name="ifsc"
                      value={formData.ifsc || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </>
              )}

              {/* UPI FIELDS */}
              {method === "UPI" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="UPI ID"
                      name="upiId"
                      value={formData.upiId || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Account Holder Name"
                      name="holderName"
                      value={formData.holderName || ""}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </>
              )}

              {/* Submit Button */}
              {method && (
                <Grid item xs={12} textAlign="right">
                  <Button type="submit" variant="contained">
                    Save Payment
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentMethods;
