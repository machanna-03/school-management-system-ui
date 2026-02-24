import React, { useState, useEffect, useCallback } from "react";
import {
    Box, Typography, Card, CardContent, Grid, TextField, Button,
    CircularProgress, Divider, Alert, Snackbar, Avatar, InputAdornment, Stack
} from "@mui/material";
import { BiSave, BiBuildings, BiPhone, BiEnvelope, BiMap, BiCog } from "react-icons/bi";
import { invokeGetApi, invokeApi, apiList } from "../services/ApiServices";
import { config } from "../config/Config";

const FieldGroup = ({ label, icon, children }) => (
    <Box>
        <Typography variant="subtitle2" fontWeight={700} color="#4d44b5" sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
            {icon} {label}
        </Typography>
        {children}
    </Box>
);

const Settings = () => {
    const [settings, setSettings] = useState({
        school_name: "",
        address: "",
        phone: "",
        email: "",
        logo_url: "",
        academic_year: "",
        currency: "INR",
        currency_symbol: "₹",
        timezone: "Asia/Kolkata",
        grading_system: "letter",
        working_days: "Mon,Tue,Wed,Thu,Fri",
        school_tagline: "",
        smtp_host: "",
        smtp_port: "",
        smtp_user: "",
        smtp_pass: "",
        smtp_encryption: "tls",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tableReady, setTableReady] = useState(true);
    const [snack, setSnack] = useState({ open: false, msg: "", sev: "success" });

    const fetchSettings = useCallback(async () => {
        setLoading(true);
        const res = await invokeGetApi(config.getMySchool + apiList.getSettings, {});
        if (res.status === 200 && res.data?.responseCode === "200") {
            setSettings(prev => ({ ...prev, ...(res.data.settings || {}) }));
            setTableReady(true);
        } else if (res.data?.responseMessage?.toLowerCase().includes("exist")) {
            setTableReady(false);
        }
        setLoading(false);
    }, []);

    useEffect(() => { fetchSettings(); }, [fetchSettings]);

    const handleInit = async () => {
        await invokeGetApi(config.getMySchool + apiList.createSettingsTable, {});
        fetchSettings();
    };

    const handleSave = async () => {
        setSaving(true);
        const res = await invokeApi(config.getMySchool + apiList.updateSettings, { settings });
        setSaving(false);
        if (res.status === 200 && res.data?.responseCode === "200") {
            setSnack({ open: true, msg: "Settings saved successfully!", sev: "success" });
        } else {
            setSnack({ open: true, msg: res.data?.responseMessage || "Failed to save", sev: "error" });
        }
    };

    const f = (key) => ({ value: settings[key] || "", onChange: e => setSettings(p => ({ ...p, [key]: e.target.value })) });

    if (loading) return <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}><CircularProgress /></Box>;

    if (!tableReady) return (
        <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography mb={2} color="text.secondary">Settings table not initialized yet.</Typography>
            <Button variant="contained" onClick={handleInit}>Initialize Settings</Button>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Box>
                    <Typography variant="h1" color="text.primary" mb={0.5}>School Settings</Typography>
                    <Typography variant="body2" color="text.secondary">Configure your school profile and system preferences.</Typography>
                </Box>
                <Button variant="contained" startIcon={<BiSave />} onClick={handleSave} disabled={saving} sx={{ borderRadius: "30px", px: 3 }}>
                    {saving ? "Saving..." : "Save Settings"}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* School Profile */}
                <Grid item xs={12} md={8}>
                    <Stack spacing={3}>
                        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight={700} color="#303972" mb={3} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <BiBuildings /> School Profile
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                                    <FieldGroup label="School Name" icon={<BiBuildings size={15} />}>
                                        <TextField fullWidth {...f("school_name")} size="small" placeholder="e.g. ABC Public School" />
                                    </FieldGroup>
                                    <FieldGroup label="Tagline" icon={<BiCog size={15} />}>
                                        <TextField fullWidth {...f("school_tagline")} size="small" placeholder="e.g. Education for Excellence" />
                                    </FieldGroup>
                                    <Divider />
                                    <FieldGroup label="Address" icon={<BiMap size={15} />}>
                                        <TextField fullWidth {...f("address")} size="small" multiline rows={2} placeholder="Full address" />
                                    </FieldGroup>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <FieldGroup label="Phone" icon={<BiPhone size={15} />}>
                                                <TextField fullWidth {...f("phone")} size="small" placeholder="+91 98765 43210" InputProps={{ startAdornment: <InputAdornment position="start"><BiPhone size={14} /></InputAdornment> }} />
                                            </FieldGroup>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <FieldGroup label="Email" icon={<BiEnvelope size={15} />}>
                                                <TextField fullWidth {...f("email")} size="small" type="email" placeholder="admin@school.edu" InputProps={{ startAdornment: <InputAdornment position="start"><BiEnvelope size={14} /></InputAdornment> }} />
                                            </FieldGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* SMTP Configuration */}
                        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h6" fontWeight={700} color="#303972" mb={3} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <BiEnvelope /> SMTP Server Configuration (Email)
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <FieldGroup label="SMTP Host" icon={<BiCog size={15} />}>
                                            <TextField fullWidth {...f("smtp_host")} size="small" placeholder="smtp.gmail.com" />
                                        </FieldGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FieldGroup label="SMTP Port" icon={<BiCog size={15} />}>
                                            <TextField fullWidth {...f("smtp_port")} size="small" placeholder="587" />
                                        </FieldGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FieldGroup label="SMTP Username" icon={<BiCog size={15} />}>
                                            <TextField fullWidth {...f("smtp_user")} size="small" placeholder="user@gmail.com" />
                                        </FieldGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FieldGroup label="SMTP Password" icon={<BiCog size={15} />}>
                                            <TextField fullWidth {...f("smtp_pass")} type="password" size="small" placeholder="••••••••" />
                                        </FieldGroup>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FieldGroup label="Encryption" icon={<BiCog size={15} />}>
                                            <TextField select fullWidth {...f("smtp_encryption")} size="small" SelectProps={{ native: true }}>
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="none">None</option>
                                            </TextField>
                                        </FieldGroup>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>

                {/* Logo + Academic */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {/* Logo Preview */}
                        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>School Logo</Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                    <Avatar
                                        src={settings.logo_url}
                                        sx={{ width: 90, height: 90, bgcolor: "#4d44b5", fontSize: "2rem" }}
                                    >
                                        {settings.school_name?.[0] || "S"}
                                    </Avatar>
                                    <TextField
                                        fullWidth size="small"
                                        label="Logo URL"
                                        {...f("logo_url")}
                                        placeholder="https://..."
                                    />
                                    <Typography variant="caption" color="text.secondary">Paste a public URL or upload logo in future update.</Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Academic Settings */}
                        <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} color="#303972" mb={2}>Academic Settings</Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <TextField fullWidth size="small" label="Academic Year" {...f("academic_year")} placeholder="2025-26" />
                                    <TextField fullWidth size="small" label="Currency Code" {...f("currency")} placeholder="INR" />
                                    <TextField fullWidth size="small" label="Currency Symbol" {...f("currency_symbol")} placeholder="₹" />
                                    <TextField fullWidth size="small" label="Timezone" {...f("timezone")} placeholder="Asia/Kolkata" />
                                    <TextField fullWidth size="small" label="Working Days (csv)" {...f("working_days")} placeholder="Mon,Tue,Wed,Thu,Fri" helperText="Comma-separated day abbreviations" />
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(p => ({ ...p, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert severity={snack.sev} onClose={() => setSnack(p => ({ ...p, open: false }))}>{snack.msg}</Alert>
            </Snackbar>
        </Box>
    );
};

export default Settings;
