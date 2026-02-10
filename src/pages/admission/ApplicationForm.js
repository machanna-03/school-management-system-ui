import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  MenuItem,
  Select,
  TextField,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";

const ApplicationForm = () => {
  const [value, setValue] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [uploadStatus, setUploadStatus] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_, newValue) => setValue(newValue);

  const [student, setStudent] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    category: "",
    // other fields...
  });
  const [documents, setDocuments] = useState({
    photo: null,
    birthCertificate: null,
    aadhaar: null,
    transferCertificate: null,
  });

  const [preview, setPreview] = useState({});
  const [progress, setProgress] = useState({});

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);

    setDocuments((prev) => ({
      ...prev,
      [field]: file,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]: fileURL,
    }));

    // Set initial status
    setUploadStatus((prev) => ({
      ...prev,
      [field]: "Uploading",
    }));

    let percent = 0;

    const interval = setInterval(() => {
      percent += 20;

      setProgress((prev) => ({
        ...prev,
        [field]: percent,
      }));

      if (percent >= 100) {
        clearInterval(interval);

        setUploadStatus((prev) => ({
          ...prev,
          [field]: "Completed",
        }));
      }
    }, 300);
  };

  const removeFile = (field) => {
    setDocuments((prev) => ({
      ...prev,
      [field]: null,
    }));

    setPreview((prev) => ({
      ...prev,
      [field]: null,
    }));

    setProgress((prev) => ({
      ...prev,
      [field]: 0,
    }));

    setUploadStatus((prev) => ({
      ...prev,
      [field]: "Not Uploaded",
    }));
  };

  const sectionStyle = {
    p: isMobile ? 2.5 : 4,
    borderRadius: 3,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    mb: 3,
  };

  const fieldSize = isMobile ? 12 : 6;

  return (
    <Paper elevation={0} sx={{ borderRadius: 3 }}>
      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
      >
        <Tab label="Class Selection" />
        <Tab label="Student Details" />
        <Tab label="Documents" />
        <Tab label="Submit" />
      </Tabs>

      <Box sx={{ p: isMobile ? 2 : 4 }}>
        {/* CLASS SELECTION */}
        {value === 0 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Select Class *
            </Typography>

            <FormControl fullWidth sx={{ maxWidth: 400 }}>
              <InputLabel>Select Class</InputLabel>
              <Select
                label="Select Class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <MenuItem value="Nursery">Nursery</MenuItem>
                <MenuItem value="LKG">LKG</MenuItem>
                <MenuItem value="UKG">UKG</MenuItem>

                {[...Array(12)].map((_, i) => (
                  <MenuItem key={i} value={`Class ${i + 1}`}>
                    Class {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box mt={3}>
              <Button
                variant="contained"
                fullWidth={isMobile}
                onClick={() => {
                  if (!selectedClass) {
                    alert("Select class");
                    return;
                  }
                  setValue(1);
                }}
              >
                Continue
              </Button>
            </Box>
          </Paper>
        )}

        {/* STUDENT DETAILS */}
        {value === 1 && (
          <>
            {/* STUDENT INFO */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>
                Student Information
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} sm={4}>
                  <TextField label="First Name *" fullWidth required />
                </Grid>

                {/* Middle Name */}
                <Grid item xs={12} sm={4}>
                  <TextField label="Middle Name" fullWidth />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={4}>
                  <TextField label="Last Name *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField
                    label="Date of Birth *"
                    type="date"
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={fieldSize}>
                  <FormControl fullWidth required>
                    <InputLabel>Gender</InputLabel>
                    <Select label="Gender">
                      <MenuItem>Male</MenuItem>
                      <MenuItem>Female</MenuItem>
                      <MenuItem>Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Blood Group" fullWidth />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Student Aadhaar *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Nationality *" fullWidth required />
                </Grid>
                <Grid item xs={fieldSize}>
                  <FormControl fullWidth>
                    <InputLabel id="category-label">Category *</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={student.category}
                      label="Category *"
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">Select Category</MenuItem>

                      {/* General */}
                      <MenuItem value="OC">OC (Open Category)</MenuItem>
                      <MenuItem value="General">General</MenuItem>

                      {/* Backward Classes */}
                      <MenuItem value="BC-A">BC-A</MenuItem>
                      <MenuItem value="BC-B">BC-B</MenuItem>
                      <MenuItem value="BC-C">BC-C</MenuItem>
                      <MenuItem value="BC-D">BC-D</MenuItem>
                      <MenuItem value="BC-E">BC-E</MenuItem>

                      {/* Reserved Categories */}
                      <MenuItem value="SC">SC (Scheduled Caste)</MenuItem>
                      <MenuItem value="ST">ST (Scheduled Tribe)</MenuItem>

                      {/* Others */}
                      <MenuItem value="OBC">OBC</MenuItem>
                      <MenuItem value="EWS">EWS</MenuItem>
                      <MenuItem value="Minority">Minority</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* PARENT DETAILS */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>
                Parent Details
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={fieldSize}>
                  <TextField label="Father Name *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Father Occupation" fullWidth />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Mother Name *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Mother Occupation" fullWidth />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Primary Contact *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Secondary Contact" fullWidth />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Emergency Contact *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Email" fullWidth />
                </Grid>
              </Grid>
            </Paper>

            {/* ACADEMIC */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6">Academic Details</Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={fieldSize}>
                  <TextField
                    label="Class Applying For"
                    value={selectedClass}
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Previous School" fullWidth />
                </Grid>
              </Grid>
            </Paper>

            {/* ADDRESS */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6">Address Details</Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Address Line 1 *" fullWidth required />
                </Grid>

                <Grid item xs={12}>
                  <TextField label="Address Line 2" fullWidth />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="City *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="State *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Pincode *" fullWidth required />
                </Grid>

                <Grid item xs={fieldSize}>
                  <TextField label="Landmark" fullWidth />
                </Grid>
              </Grid>
            </Paper>

            {/* BUTTONS */}
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              gap={2}
            >
              <Button variant="outlined" fullWidth onClick={() => setValue(0)}>
                Back
              </Button>

              <Button variant="contained" fullWidth onClick={() => setValue(2)}>
                Continue
              </Button>
            </Box>
          </>
        )}

        {/* DOCUMENT */}
        {value === 2 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6" fontWeight={600}>
              Upload Required Documents
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Accepted formats: JPG, PNG, PDF (Max size: 2MB)
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {/* Upload Component */}
              {[
                { label: "Student Photo", key: "photo" },
                { label: "Birth Certificate", key: "birthCertificate" },
                { label: "Aadhaar Card", key: "aadhaar" },
                { label: "Transfer Certificate", key: "transferCertificate" },
                { label: "Previous Marksheet", key: "marksheet" },
                { label: "Address Proof", key: "addressProof" },
              ].map((doc) => (
                <Grid item xs={12} sm={6} key={doc.key}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      textAlign: "center",
                    }}
                  >
                    {!documents[doc.key] ? (
                      <Button fullWidth variant="outlined" component="label">
                        Upload {doc.label}
                        <input
                          hidden
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, doc.key)}
                        />
                      </Button>
                    ) : (
                      <>
                        {/* Preview Container */}
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: 130,
                            borderRadius: 2,
                            overflow: "hidden",
                            bgcolor: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                          }}
                        >
                          {/* Image Preview */}
                          {preview[doc.key]?.includes("image") ? (
                            <Box
                              component="img"
                              src={preview[doc.key]}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <Typography variant="body2">
                              PDF Selected
                            </Typography>
                          )}

                          {/* Tick Icon Overlay when completed */}
                          {uploadStatus[doc.key] === "Completed" && (
                            <CheckCircleOutlineIcon
                              sx={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                color: "green",
                                bgcolor: "white",
                                borderRadius: "50%",
                                fontSize: 28,
                              }}
                            />
                          )}
                        </Box>

                        {/* File Name */}
                        <Typography variant="body2" noWrap>
                          {documents[doc.key].name}
                        </Typography>

                        {/* Progress bar ONLY while uploading */}
                        {uploadStatus[doc.key] === "Uploading" && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption">
                              Upload Progress: {progress[doc.key] || 0}%
                            </Typography>

                            <Box
                              sx={{
                                height: 6,
                                bgcolor: "#eee",
                                borderRadius: 5,
                                mt: 0.5,
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${progress[doc.key] || 0}%`,
                                  height: "100%",
                                  bgcolor: "primary.main",
                                  borderRadius: 5,
                                  transition: "0.3s",
                                }}
                              />
                            </Box>
                          </Box>
                        )}

                        {/* Status Text */}
                        <Typography
                          variant="caption"
                          sx={{
                            display: "block",
                            mt: 0.5,
                            fontWeight: 500,
                            color:
                              uploadStatus[doc.key] === "Completed"
                                ? "green"
                                : uploadStatus[doc.key] === "Uploading"
                                  ? "orange"
                                  : "text.secondary",
                          }}
                        >
                          Status: {uploadStatus[doc.key] || "Not Uploaded"}
                        </Typography>

                        {/* Remove Button */}
                        <Button
                          color="error"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => removeFile(doc.key)}
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* Navigation */}
            <Box mt={4} display="flex" gap={2}>
              <Button fullWidth onClick={() => setValue(1)}>
                Back
              </Button>

              <Button fullWidth variant="contained" onClick={() => setValue(3)}>
                Continue
              </Button>
            </Box>
          </Paper>
        )}

        {/* SUBMIT */}
        {value === 3 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6">Final Step</Typography>

            <Box mt={3} display="flex" gap={2}>
              <Button fullWidth variant="outlined">
                Save Draft
              </Button>

              <Button fullWidth variant="contained">
                Submit Application
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

export default ApplicationForm;
