import React, { useState, useEffect } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Box, Tabs, Tab, Typography, Button, MenuItem, Select, TextField,
  Grid, Paper, FormControl, InputLabel, useTheme, useMediaQuery,
  Divider, Switch, FormControlLabel, CircularProgress, Chip, Alert,
} from "@mui/material";
import { notifications } from "@mantine/notifications";
import { invokeFormDataApi, invokeGetApi, apiList } from "../../services/ApiServices";

// ─── Draft helpers ─────────────────────────────────────
const DRAFT_KEY = "admission_draft";
const saveDraft = (data) => localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
const loadDraft = () => { try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "null"); } catch { return null; } };
const clearDraft = () => localStorage.removeItem(DRAFT_KEY);

// ─── Initial form shape ────────────────────────────────
const INITIAL_FORM = {
  // Class
  class_applying: "", section_preference: "", academic_year: "",
  // Student
  first_name: "", middle_name: "", last_name: "",
  dob: "", gender: "", blood_group: "", nationality: "Indian",
  birth_place: "", mother_tongue: "", religion: "", caste: "", category: "",
  student_aadhaar: "",
  // Parent
  father_name: "", father_occupation: "", father_phone: "",
  mother_name: "", mother_occupation: "", mother_phone: "",
  guardian_name: "", guardian_relation: "",
  primary_contact: "", secondary_contact: "", emergency_contact: "",
  parent_email: "", parent_aadhaar: "", annual_income: "",
  // Academic
  previous_school: "", previous_school_board: "", previous_class: "", previous_percentage: "",
  // Address
  address_line1: "", address_line2: "", city: "", state: "",
  pincode: "", country: "India", landmark: "",
  // Sibling
  sibling_in_school: false, sibling_name: "", sibling_class: "",
  // Medical
  medical_condition: "", allergies: "", special_needs: "",
};

const ACADEMIC_YEARS = ["2024-25", "2025-26", "2026-27", "2027-28"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"];
const CLASSES = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
const SECTIONS = ["Section A", "Section B", "Section C", "Section D", "Section E"];
const CATEGORIES = ["OC", "General", "BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "SC", "ST", "OBC", "EWS", "Minority"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other"];

// ─── Validation per tab ────────────────────────────────
const validateTab = (tab, formData) => {
  const errors = {};
  if (tab === 0) {
    if (!formData.class_applying) errors.class_applying = "Required";
    if (!formData.academic_year) errors.academic_year = "Required";
  }
  if (tab === 1) {
    if (!formData.first_name) errors.first_name = "Required";
    if (!formData.last_name) errors.last_name = "Required";
    if (!formData.dob) errors.dob = "Required";
    if (!formData.gender) errors.gender = "Required";
    if (!formData.father_name) errors.father_name = "Required";
    if (!formData.primary_contact) errors.primary_contact = "Required";
    if (!formData.address_line1) errors.address_line1 = "Required";
    if (!formData.city) errors.city = "Required";
    if (!formData.state) errors.state = "Required";
    if (!formData.pincode) errors.pincode = "Required";
  }
  return errors;
};

// ─── Component ─────────────────────────────────────────
const ApplicationForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [documents, setDocuments] = useState({});
  const [preview, setPreview] = useState({});
  const [progress, setProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null); // { applicationNumber }

  // Load draft on mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) setFormData((prev) => ({ ...prev, ...draft }));
  }, []);

  const f = (key) => ({
    value: formData[key],
    onChange: (e) => {
      setFormData((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    },
    error: !!errors[key],
    helperText: errors[key] || undefined,
    fullWidth: true,
  });

  const handleFile = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setDocuments((p) => ({ ...p, [key]: file }));
    setPreview((p) => ({ ...p, [key]: URL.createObjectURL(file) }));
    setUploadStatus((p) => ({ ...p, [key]: "Uploading" }));
    let pct = 0;
    const iv = setInterval(() => {
      pct += 25;
      setProgress((p) => ({ ...p, [key]: pct }));
      if (pct >= 100) { clearInterval(iv); setUploadStatus((p) => ({ ...p, [key]: "Ready" })); }
    }, 200);
  };

  const removeFile = (key) => {
    setDocuments((p) => ({ ...p, [key]: null }));
    setPreview((p) => ({ ...p, [key]: null }));
    setProgress((p) => ({ ...p, [key]: 0 }));
    setUploadStatus((p) => ({ ...p, [key]: undefined }));
  };

  const goNext = (nextTab) => {
    const errs = validateTab(tab, formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setTab(nextTab);
  };

  const handleSaveDraft = async () => {
    saveDraft(formData);
    const fd = buildFormData(true);
    await invokeFormDataApi(apiList.submitAdmission, fd);
    notifications.show({ title: "Draft Saved", message: "Your progress has been saved.", color: "blue" });
  };

  const buildFormData = (isDraft = false) => {
    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    if (isDraft) fd.append("save_draft", "1");
    // Append files
    const docMap = {
      photo: "photo", birth_certificate: "birth_certificate",
      aadhaar: "aadhaar", transfer_certificate: "transfer_certificate",
      marksheet: "marksheet", address_proof: "address_proof",
    };
    Object.entries(docMap).forEach(([formKey, apiKey]) => {
      if (documents[formKey]) fd.append(apiKey, documents[formKey]);
    });
    return fd;
  };

  const handleSubmit = async () => {
    const errs = validateTab(tab, formData);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const fd = buildFormData(false);
      const res = await invokeFormDataApi(apiList.submitAdmission, fd);
      if (res?.data?.responseCode === "200") {
        clearDraft();
        setSubmitted({ applicationNumber: res.data.applicationNumber });
      } else {
        notifications.show({ title: "Error", message: res?.data?.responseMessage || "Submission failed", color: "red" });
      }
    } catch (err) {
      notifications.show({ title: "Network Error", message: "Could not connect to server", color: "red" });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Submitted success screen ───────────────────────────
  if (submitted) {
    return (
      <Paper elevation={0} sx={{ borderRadius: 3, p: 6, textAlign: "center" }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} mb={1}>Application Submitted!</Typography>
        <Typography color="text.secondary" mb={3}>
          Your application number is
        </Typography>
        <Chip label={submitted.applicationNumber} color="primary" sx={{ fontSize: 20, px: 3, py: 2.5, mb: 4 }} />
        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Button variant="outlined" onClick={() => { setFormData(INITIAL_FORM); setDocuments({}); setSubmitted(null); setTab(0); }}>
            New Application
          </Button>
          <Button variant="contained" href="/admission/list">
            View All Applications
          </Button>
        </Box>
      </Paper>
    );
  }

  const sectionStyle = { p: isMobile ? 2.5 : 4, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", mb: 3 };
  const half = isMobile ? 12 : 6;
  const third = isMobile ? 12 : 4;

  return (
    <Paper elevation={0} sx={{ borderRadius: 3 }}>
      {/* ── Tabs ─────────────────────────────── */}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant={isMobile ? "scrollable" : "fullWidth"}
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {["Class Selection", "Student Details", "Documents", "Review & Submit"].map((label, i) => (
          <Tab key={i} label={label} />
        ))}
      </Tabs>

      <Box sx={{ p: isMobile ? 2 : 4 }}>

        {/* ══════════════════════════════════════════════════
            TAB 0 — CLASS SELECTION
           ══════════════════════════════════════════════════ */}
        {tab === 0 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6" fontWeight={600} mb={2}>Class Selection</Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required error={!!errors.class_applying}>
                  <InputLabel>Class Applying For *</InputLabel>
                  <Select label="Class Applying For *" {...f("class_applying")}>
                    {CLASSES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                  {errors.class_applying && <Typography variant="caption" color="error">{errors.class_applying}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Section Preference</InputLabel>
                  <Select label="Section Preference" {...f("section_preference")}>
                    <MenuItem value="">No Preference</MenuItem>
                    {SECTIONS.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required error={!!errors.academic_year}>
                  <InputLabel>Academic Year *</InputLabel>
                  <Select label="Academic Year *" {...f("academic_year")}>
                    {ACADEMIC_YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                  </Select>
                  {errors.academic_year && <Typography variant="caption" color="error">{errors.academic_year}</Typography>}
                </FormControl>
              </Grid>
            </Grid>
            <Box mt={3} display="flex" gap={2}>
              <Button variant="contained" onClick={() => goNext(1)}>Continue</Button>
            </Box>
          </Paper>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 1 — STUDENT DETAILS
           ══════════════════════════════════════════════════ */}
        {tab === 1 && (
          <>
            {/* ── Student Info ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Student Information</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={third}><TextField label="First Name *" required {...f("first_name")} /></Grid>
                <Grid item xs={12} sm={third}><TextField label="Middle Name" {...f("middle_name")} /></Grid>
                <Grid item xs={12} sm={third}><TextField label="Last Name *" required {...f("last_name")} /></Grid>
                <Grid item xs={half}>
                  <TextField label="Date of Birth *" type="date" required InputLabelProps={{ shrink: true }} {...f("dob")} />
                </Grid>
                <Grid item xs={half}>
                  <FormControl fullWidth required error={!!errors.gender}>
                    <InputLabel>Gender *</InputLabel>
                    <Select label="Gender *" {...f("gender")}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={half}>
                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select label="Blood Group" {...f("blood_group")}>
                      {BLOOD_GROUPS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={half}><TextField label="Nationality" {...f("nationality")} /></Grid>
                <Grid item xs={half}><TextField label="Birth Place" {...f("birth_place")} /></Grid>
                <Grid item xs={half}><TextField label="Mother Tongue" {...f("mother_tongue")} /></Grid>
                <Grid item xs={half}>
                  <FormControl fullWidth>
                    <InputLabel>Religion</InputLabel>
                    <Select label="Religion" {...f("religion")}>
                      {RELIGIONS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={half}><TextField label="Caste" {...f("caste")} /></Grid>
                <Grid item xs={half}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" {...f("category")}>
                      {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={half}><TextField label="Student Aadhaar No." {...f("student_aadhaar")} /></Grid>
              </Grid>
            </Paper>

            {/* ── Parent / Guardian Info ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Parent / Guardian Details</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={half}><TextField label="Father Name *" required {...f("father_name")} /></Grid>
                <Grid item xs={half}><TextField label="Father Occupation" {...f("father_occupation")} /></Grid>
                <Grid item xs={half}><TextField label="Father Phone" {...f("father_phone")} /></Grid>
                <Grid item xs={half}><TextField label="Mother Name" {...f("mother_name")} /></Grid>
                <Grid item xs={half}><TextField label="Mother Occupation" {...f("mother_occupation")} /></Grid>
                <Grid item xs={half}><TextField label="Mother Phone" {...f("mother_phone")} /></Grid>
                <Grid item xs={half}><TextField label="Guardian Name (if applicable)" {...f("guardian_name")} /></Grid>
                <Grid item xs={half}><TextField label="Guardian Relation" {...f("guardian_relation")} /></Grid>
                <Grid item xs={half}><TextField label="Primary Contact *" required {...f("primary_contact")} /></Grid>
                <Grid item xs={half}><TextField label="Secondary Contact" {...f("secondary_contact")} /></Grid>
                <Grid item xs={half}><TextField label="Emergency Contact *" required {...f("emergency_contact")} /></Grid>
                <Grid item xs={half}><TextField label="Parent Email" type="email" {...f("parent_email")} /></Grid>
                <Grid item xs={half}><TextField label="Parent Aadhaar No." {...f("parent_aadhaar")} /></Grid>
                <Grid item xs={half}><TextField label="Annual Family Income (₹)" {...f("annual_income")} /></Grid>
              </Grid>
            </Paper>

            {/* ── Academic History ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Academic History</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={half}>
                  <TextField label="Class Applying For" value={formData.class_applying} disabled fullWidth />
                </Grid>
                <Grid item xs={half}><TextField label="Previous School Name" {...f("previous_school")} /></Grid>
                <Grid item xs={half}>
                  <FormControl fullWidth>
                    <InputLabel>Previous School Board</InputLabel>
                    <Select label="Previous School Board" {...f("previous_school_board")}>
                      {BOARDS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={half}><TextField label="Last Class Studied" {...f("previous_class")} /></Grid>
                <Grid item xs={half}><TextField label="Percentage / Grade Obtained" {...f("previous_percentage")} /></Grid>
              </Grid>
            </Paper>

            {/* ── Address ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Address Details</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}><TextField label="Address Line 1 *" required {...f("address_line1")} /></Grid>
                <Grid item xs={12}><TextField label="Address Line 2" {...f("address_line2")} /></Grid>
                <Grid item xs={half}><TextField label="City *" required {...f("city")} /></Grid>
                <Grid item xs={half}><TextField label="State *" required {...f("state")} /></Grid>
                <Grid item xs={half}><TextField label="Pincode *" required {...f("pincode")} /></Grid>
                <Grid item xs={half}><TextField label="Country" {...f("country")} /></Grid>
                <Grid item xs={12}><TextField label="Landmark" {...f("landmark")} /></Grid>
              </Grid>
            </Paper>

            {/* ── Sibling Info ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Sibling Information</Typography>
              <Divider sx={{ my: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.sibling_in_school}
                    onChange={(e) => setFormData((p) => ({ ...p, sibling_in_school: e.target.checked }))}
                  />
                }
                label="Does the student have any sibling currently enrolled in this school?"
              />
              {formData.sibling_in_school && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={half}><TextField label="Sibling Name" {...f("sibling_name")} /></Grid>
                  <Grid item xs={half}>
                    <FormControl fullWidth>
                      <InputLabel>Sibling's Class</InputLabel>
                      <Select label="Sibling's Class" {...f("sibling_class")}>
                        {CLASSES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Paper>

            {/* ── Medical Info ── */}
            <Paper sx={sectionStyle}>
              <Typography variant="h6" fontWeight={600}>Medical Information</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Known Medical Conditions (if any)" multiline rows={2} {...f("medical_condition")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Allergies (if any)" multiline rows={2} {...f("allergies")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Special Needs / Disability (if any)" multiline rows={2} {...f("special_needs")} />
                </Grid>
              </Grid>
            </Paper>

            <Box display="flex" gap={2} flexDirection={isMobile ? "column" : "row"}>
              <Button variant="outlined" fullWidth onClick={() => setTab(0)}>Back</Button>
              <Button variant="contained" fullWidth onClick={() => goNext(2)}>Continue</Button>
            </Box>
          </>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 2 — DOCUMENTS
           ══════════════════════════════════════════════════ */}
        {tab === 2 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6" fontWeight={600}>Upload Required Documents</Typography>
            <Typography variant="caption" color="text.secondary">Accepted: JPG, PNG, PDF · Max 2 MB each</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={3}>
              {[
                { label: "Student Photo *", key: "photo" },
                { label: "Birth Certificate *", key: "birth_certificate" },
                { label: "Aadhaar Card", key: "aadhaar" },
                { label: "Transfer Certificate", key: "transfer_certificate" },
                { label: "Previous Marksheet", key: "marksheet" },
                { label: "Address Proof", key: "address_proof" },
              ].map((doc) => (
                <Grid item xs={12} sm={6} key={doc.key}>
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                    <Typography variant="body2" fontWeight={600} mb={1}>{doc.label}</Typography>
                    {!documents[doc.key] ? (
                      <Button fullWidth variant="outlined" component="label">
                        Upload File
                        <input hidden type="file" accept="image/*,.pdf" onChange={(e) => handleFile(e, doc.key)} />
                      </Button>
                    ) : (
                      <>
                        <Box sx={{ position: "relative", height: 110, bgcolor: "#f5f5f5", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", mb: 1, overflow: "hidden" }}>
                          {preview[doc.key] && documents[doc.key]?.type?.startsWith("image") ? (
                            <Box component="img" src={preview[doc.key]} sx={{ width: "100%", height: "100%", objectFit: "contain" }} />
                          ) : (
                            <Typography variant="body2" color="text.secondary">📄 PDF</Typography>
                          )}
                          {uploadStatus[doc.key] === "Ready" && (
                            <CheckCircleOutlineIcon sx={{ position: "absolute", top: 5, right: 5, color: "success.main", bgcolor: "white", borderRadius: "50%", fontSize: 24 }} />
                          )}
                        </Box>
                        <Typography variant="caption" noWrap display="block">{documents[doc.key]?.name}</Typography>
                        {uploadStatus[doc.key] === "Uploading" && (
                          <Box sx={{ mt: 1 }}>
                            <Box sx={{ height: 5, bgcolor: "#eee", borderRadius: 5 }}>
                              <Box sx={{ width: `${progress[doc.key] || 0}%`, height: "100%", bgcolor: "primary.main", borderRadius: 5, transition: "0.2s" }} />
                            </Box>
                          </Box>
                        )}
                        <Typography variant="caption" sx={{ fontWeight: 600, color: uploadStatus[doc.key] === "Ready" ? "success.main" : "text.secondary" }}>
                          {uploadStatus[doc.key] === "Ready" ? "✓ Ready to upload" : "Uploading…"}
                        </Typography>
                        <Button size="small" color="error" sx={{ mt: 0.5, display: "block" }} onClick={() => removeFile(doc.key)}>Remove</Button>
                      </>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Box mt={4} display="flex" gap={2} flexDirection={isMobile ? "column" : "row"}>
              <Button fullWidth variant="outlined" onClick={() => setTab(1)}>Back</Button>
              <Button fullWidth variant="contained" onClick={() => goNext(3)}>Review & Submit</Button>
            </Box>
          </Paper>
        )}

        {/* ══════════════════════════════════════════════════
            TAB 3 — REVIEW & SUBMIT
           ══════════════════════════════════════════════════ */}
        {tab === 3 && (
          <Paper sx={sectionStyle}>
            <Typography variant="h6" fontWeight={600} mb={1}>Review & Submit</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Please review the information before submitting. You can go back to edit any section.
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Summary chips */}
            <Grid container spacing={2} mb={3}>
              {[
                { label: "Class", value: `${formData.class_applying} ${formData.section_preference ? `– Section ${formData.section_preference}` : ""}` },
                { label: "Academic Year", value: formData.academic_year },
                { label: "Student Name", value: `${formData.first_name} ${formData.middle_name ? formData.middle_name + " " : ""}${formData.last_name}` },
                { label: "Gender", value: formData.gender },
                { label: "DOB", value: formData.dob },
                { label: "Father Name", value: formData.father_name },
                { label: "Primary Contact", value: formData.primary_contact },
                { label: "Email", value: formData.parent_email },
                { label: "Previous School", value: formData.previous_school || "N/A" },
                { label: "City / State", value: `${formData.city}, ${formData.state}` },
                { label: "Documents", value: `${Object.values(documents).filter(Boolean).length} file(s) ready` },
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.label}>
                  <Box display="flex" gap={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 130, fontWeight: 500 }}>{item.label}:</Typography>
                    <Typography variant="body2">{item.value || "—"}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Alert severity="info" sx={{ mb: 3 }}>
              Once submitted, the application will be reviewed by the admissions team. You will be notified via the email / contact provided.
            </Alert>

            <Box display="flex" gap={2} flexDirection={isMobile ? "column" : "row"}>
              <Button fullWidth variant="outlined" onClick={() => setTab(2)}>Back</Button>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleSaveDraft} disabled={submitting}>
                Save Draft
              </Button>
              <Button fullWidth variant="contained" onClick={handleSubmit} disabled={submitting}
                startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}>
                {submitting ? "Submitting…" : "Submit Application"}
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

export default ApplicationForm;
