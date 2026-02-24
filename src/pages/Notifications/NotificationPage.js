import { useState, useEffect, useCallback } from "react";
import {
  Box, Typography, Stack, Paper, Checkbox, IconButton, Divider, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select,
  MenuItem, Chip, CircularProgress, Tooltip, InputAdornment
} from "@mui/material";
import {
  FiStar, FiTrash2, FiSettings, FiClock, FiRefreshCcw
} from "react-icons/fi";
import {
  BiLogoGmail, BiSend, BiStar, BiFileBlank, BiLabel, BiTime, BiTrash, BiArchive, BiPlus, BiSearch, BiEdit
} from "react-icons/bi";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const sidebarItems = [
  { label: "All Announcements", key: "all", icon: <BiLogoGmail size={18} /> },
  { label: "Students", key: "Students", icon: <BiSend size={18} /> },
  { label: "Teachers", key: "Teachers", icon: <BiStar size={18} /> },
  { label: "Parents", key: "Parents", icon: <BiLabel size={18} /> },
];

const TARGET_COLORS = {
  All: "#4d44b5",
  Students: "#fb7d5b",
  Teachers: "#fcc43e",
  Parents: "#30c7ec",
};

const NotificationPage = () => {
  const [activeMenu, setActiveMenu] = useState("all");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  // Compose/Edit dialog
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id: null, title: "", content: "", target_audience: "All" });
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await invokeGetApi(config.getMySchool + apiList.getAnnouncements);
      if (res.status === 200 && res.data?.responseCode === "200") {
        setAnnouncements(res.data.announcements || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  const handleSave = async () => {
    if (!form.title || !form.content) return;
    setSaving(true);
    const endpoint = form.id ? apiList.updateAnnouncement : apiList.addAnnouncement;
    const res = await invokeApi(config.getMySchool + endpoint, {
      ...form,
      created_by: localStorage.getItem('user_id')
    });
    setSaving(false);
    if (res.status === 200) {
      setOpen(false);
      setForm({ id: null, title: "", content: "", target_audience: "All" });
      fetchAnnouncements();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    await invokeApi(config.getMySchool + apiList.deleteAnnouncement, { id });
    setAnnouncements(prev => prev.filter(n => n.id !== id));
  };

  const handleEdit = (item) => {
    setForm({ id: item.id, title: item.title, content: item.content, target_audience: item.target_audience });
    setOpen(true);
  };

  const filtered = announcements.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase());
    const matchesMenu = activeMenu === "all" || n.target_audience === activeMenu;
    return matchesSearch && matchesMenu;
  });

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const allSelected = filtered.length > 0 && filtered.every(n => selected.includes(n.id));

  return (
    <Box display="flex" height="calc(100vh - 80px)" overflow="hidden" bgcolor="#f6f7fb" borderRadius={4}>

      {/* ===== LEFT SIDEBAR ===== */}
      <Paper sx={{ width: 220, flexShrink: 0, p: 2, borderRadius: "16px 0 0 16px", overflowY: "auto" }}>
        <Button
          fullWidth
          onClick={() => { setForm({ id: null, title: "", content: "", target_audience: "All" }); setOpen(true); }}
          sx={{ mb: 2, bgcolor: "#4d44b5", color: "#fff", borderRadius: "10px", py: 1.2, textTransform: "none", "&:hover": { bgcolor: "#3c35a0" } }}
          startIcon={<BiPlus size={18} />}
        >
          New Announcement
        </Button>

        <Stack spacing={0.5}>
          {sidebarItems.map((item) => {
            const isActive = activeMenu === item.key;
            return (
              <Stack key={item.key} direction="row" spacing={1.5} alignItems="center"
                onClick={() => setActiveMenu(item.key)}
                sx={{ p: 1.2, borderRadius: "10px", cursor: "pointer", fontSize: 15, color: isActive ? "#4d44b5" : "#555", bgcolor: isActive ? "#f0eeff" : "transparent", transition: "all 0.2s ease", "&:hover": { bgcolor: "#f0eeff", color: "#4d44b5" } }}
              >
                {item.icon}
                <Typography fontWeight={500} fontSize={14}>{item.label}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>

      {/* ===== MAIN CONTENT ===== */}
      <Box flex={1} display="flex" flexDirection="column" overflow="hidden" sx={{ borderRadius: "0 16px 16px 0", bgcolor: "#fff" }}>
        {/* TOP BAR */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #e6e8f0" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Checkbox checked={allSelected} onChange={e => setSelected(e.target.checked ? filtered.map(n => n.id) : [])} />
            <TextField
              size="small" placeholder="Search announcements..." value={search}
              onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><BiSearch size={16} /></InputAdornment> }}
              sx={{ width: 280 }}
            />
            <Box ml="auto">
              <Tooltip title="Refresh">
                <IconButton size="small" onClick={fetchAnnouncements}><FiRefreshCcw /></IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Box>

        {/* LIST */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}><CircularProgress /></Box>
          ) : filtered.length === 0 ? (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <Typography color="text.secondary">No announcements found.</Typography>
            </Box>
          ) : (
            filtered.map((item) => (
              <Box key={item.id}>
                <Stack direction="row" alignItems="center" spacing={1.5}
                  sx={{ px: 2, py: 1.3, cursor: "pointer", "&:hover": { bgcolor: "#f4f6fb" } }}
                >
                  <Checkbox size="small" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} />

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography fontWeight={600} fontSize={14} noWrap>{item.title}</Typography>
                      <Chip label={item.target_audience} size="small" sx={{ bgcolor: TARGET_COLORS[item.target_audience] + "22", color: TARGET_COLORS[item.target_audience], fontWeight: 600, fontSize: 10 }} />
                    </Stack>
                    <Typography fontSize={12} color="#7a7d9c" noWrap>{item.content}</Typography>
                  </Box>

                  <Typography fontSize={11} color="#9a9cb3" sx={{ flexShrink: 0 }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Typography>

                  <Stack direction="row">
                    <Tooltip title="Edit">
                      <IconButton size="small" onClick={() => handleEdit(item)}>
                        <BiEdit size={16} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                        <FiTrash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
                <Divider />
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* ===== DIALOG ===== */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? "Edit Announcement" : "New Announcement"}</DialogTitle>
        <DialogContent sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth label="Title" value={form.title}
            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
          />
          <TextField
            fullWidth label="Content" multiline rows={4} value={form.content}
            onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
          />
          <TextField fullWidth select label="Target Audience" value={form.target_audience} onChange={e => setForm(p => ({ ...p, target_audience: e.target.value }))}>
            {["All", "Students", "Teachers", "Parents"].map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationPage;
