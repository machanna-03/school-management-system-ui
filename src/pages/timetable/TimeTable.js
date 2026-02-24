import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, CircularProgress, Chip, Tooltip, IconButton
} from "@mui/material";
import { BiCalendarPlus, BiPrinter, BiPlus, BiTrash, BiRefresh } from "react-icons/bi";
import Card from "../../components/common/Card";
import { invokeGetApi, invokeApi, apiList } from "../../services/ApiServices";
import { config } from "../../config/Config";

const COLORS = ["#4d44b5", "#fb7d5b", "#30c7ec", "#fcc43e", "#369c5e", "#e91e8f", "#f57c00", "#0288d1"];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeTable = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [slots, setSlots] = useState([]);
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableReady, setTableReady] = useState(true);
  const [subjects, setSubjects] = useState([]);

  // Dialogs
  const [openAdd, setOpenAdd] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openBulk, setOpenBulk] = useState(false);

  const emptyRow = () => ({ day: "", start_time: "", end_time: "", subject: "", room: "" });
  const [addForm, setAddForm] = useState(emptyRow());
  const [delId, setDelId] = useState(null);
  const [bulkRows, setBulkRows] = useState([emptyRow()]);
  const [saving, setSaving] = useState(false);

  /* -------- DATA FETCHING -------- */
  const fetchClasses = useCallback(async () => {
    const res = await invokeGetApi(config.getMySchool + apiList.getClassList, {});
    if (res.status === 200 && res.data?.responseCode === "200") {
      setClasses(res.data.classes || []);
    }
  }, []);

  const fetchSubjects = useCallback(async () => {
    const res = await invokeGetApi(config.getMySchool + apiList.getSubjects, {});
    if (res.status === 200 && res.data?.responseCode === "200") {
      setSubjects(res.data.subjects || []);
    }
  }, []);

  const fetchTimetable = useCallback(async (classId) => {
    if (!classId) { setSlots([]); setTimes([]); return; }
    setLoading(true);
    try {
      const res = await invokeGetApi(config.getMySchool + apiList.getTimetable, { class_id: classId });
      if (res.status === 200 && res.data?.responseCode === "200") {
        setSlots(res.data.slots || []);
        setTimes(res.data.times || []);
        setTableReady(true);
      } else if (res.data?.responseMessage?.toLowerCase().includes("exist")) {
        setTableReady(false);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, [fetchClasses, fetchSubjects]);

  useEffect(() => { fetchTimetable(selectedClass); }, [selectedClass, fetchTimetable]);

  /* -------- GRID helpers -------- */
  // Build a colour map: subject -> colour
  const colourMap = {};
  let colIdx = 0;
  slots.forEach(s => { if (s.subject && !s.is_break && !colourMap[s.subject]) { colourMap[s.subject] = COLORS[colIdx++ % COLORS.length]; } });

  // Grid: { time: { day: slot } }
  const grid = {};
  times.forEach(t => { grid[t.start_time] = {}; });
  slots.forEach(s => {
    if (!grid[s.start_time]) grid[s.start_time] = {};
    grid[s.start_time][s.day] = s;
  });

  const handleInitTable = async () => {
    await invokeGetApi(config.getMySchool + apiList.createTimetableTable, {});
    fetchTimetable(selectedClass);
  };

  const handlePrint = () => window.print();

  /* -------- ADD / SAVE SLOT -------- */
  const handleSaveSlot = async () => {
    if (!selectedClass || !addForm.day || !addForm.start_time || !addForm.end_time) return;
    setSaving(true);
    const res = await invokeApi(config.getMySchool + apiList.saveTimetable, { ...addForm, class_id: selectedClass });
    setSaving(false);
    if (res.status === 200) { setOpenAdd(false); setAddForm(emptyRow()); fetchTimetable(selectedClass); }
  };

  /* -------- NEW SCHEDULE (BULK SAVE) -------- */
  const handleBulkSave = async () => {
    for (const row of bulkRows) {
      if (!row.day || !row.start_time || !row.end_time) return;
      await invokeApi(config.getMySchool + apiList.saveTimetable, { ...row, class_id: selectedClass });
    }
    setOpenBulk(false);
    setBulkRows([emptyRow()]);
    fetchTimetable(selectedClass);
  };

  /* -------- DELETE -------- */
  const handleDelete = async () => {
    await invokeApi(config.getMySchool + apiList.deleteTimetableSlot, { id: delId });
    setOpenDel(false);
    fetchTimetable(selectedClass);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Typography variant="h1" color="text.primary" sx={{ mb: 0.5 }}>Time Table</Typography>
          <Typography variant="body2" color="text.secondary">Class schedule management.</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button variant="outlined" startIcon={<BiPlus />} onClick={() => setOpenAdd(true)} disabled={!selectedClass}>Add Slot</Button>
          <Button variant="outlined" startIcon={<BiRefresh />} onClick={() => fetchTimetable(selectedClass)} disabled={!selectedClass}>Refresh</Button>
          <Button variant="outlined" startIcon={<BiPrinter />} sx={{ borderRadius: "30px", px: 3 }} onClick={handlePrint}>Print</Button>
          <Button variant="contained" startIcon={<BiCalendarPlus />} sx={{ borderRadius: "30px", px: 3 }} onClick={() => setOpenBulk(true)} disabled={!selectedClass}>New Schedule</Button>
        </Box>
      </Box>

      {/* Class Filter */}
      <Box sx={{ bgcolor: "white", p: 3, borderRadius: 4, mb: 4, display: "flex", gap: 3, boxShadow: "0px 10px 40px 0px rgba(50,50,50,0.08)", alignItems: "center" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>View Schedule For:</Typography>
        <Select
          size="small" value={selectedClass} displayEmpty
          onChange={e => setSelectedClass(e.target.value)}
          sx={{ minWidth: 220, borderRadius: 3 }}
        >
          <MenuItem value="">— Select Class —</MenuItem>
          {classes.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
        </Select>
        {selectedClass && slots.length > 0 && (
          <Chip label={`${slots.length} slots`} color="primary" size="small" />
        )}
      </Box>

      {/* Grid */}
      <Card sx={{ pb: 0, overflow: "hidden" }}>
        {!selectedClass ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography color="text.secondary">Select a class above to view its timetable.</Typography>
          </Box>
        ) : !tableReady ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography mb={2} color="text.secondary">Timetable table not initialised yet.</Typography>
            <Button variant="contained" onClick={handleInitTable}>Initialize Timetable</Button>
          </Box>
        ) : loading ? (
          <Box sx={{ p: 6, textAlign: "center" }}><CircularProgress /></Box>
        ) : times.length === 0 ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography color="text.secondary" mb={2}>No slots defined yet for this class.</Typography>
            <Button variant="outlined" startIcon={<BiPlus />} onClick={() => setOpenBulk(true)}>Add Schedule</Button>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f4f5ff' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>Day / Time</TableCell>
                  {times.map((t, i) => (
                    <TableCell key={i} align="center" sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#4d44b5', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e0e2ff', py: 2 }}>
                      {t.start_time?.slice(0, 5)} – {t.end_time?.slice(0, 5)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {DAYS.map(day => (
                  <TableRow key={day} sx={{ "& td": { borderBottom: "1px solid #f0f1f5", py: 2 } }}>
                    <TableCell component="th" sx={{ fontWeight: 600, color: "#3d4465", bgcolor: "#fff", position: "sticky", left: 0, minWidth: 110 }}>{day}</TableCell>
                    {times.map((t, i) => {
                      const slot = grid[t.start_time]?.[day];
                      return (
                        <TableCell key={i} align="center">
                          {slot ? (
                            slot.is_break ? (
                              <Box sx={{ bgcolor: "#f0f1f5", py: 1, borderRadius: 2, color: "#a1a5b7", fontSize: 13, fontWeight: 500 }}>BREAK</Box>
                            ) : (
                              <Box sx={{ bgcolor: (colourMap[slot.subject] || "#4d44b5") + "18", py: 1.5, px: 1, borderRadius: 3, borderLeft: `3px solid ${colourMap[slot.subject] || "#4d44b5"}`, textAlign: "center", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "translateY(-2px)" } }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: colourMap[slot.subject] || "#4d44b5", fontSize: 13 }}>{slot.subject}</Typography>
                                {slot.room && <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>Room {slot.room}</Typography>}
                                <Tooltip title="Delete slot">
                                  <IconButton size="small" sx={{ mt: 0.5, p: 0.3, color: "#fb7d5b" }} onClick={() => { setDelId(slot.id); setOpenDel(true); }}>
                                    <BiTrash size={12} />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )
                          ) : (
                            <Box sx={{ height: 40, border: "1px dashed #e0e0e0", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { bgcolor: "#f4f6ff" } }}
                              onClick={() => { setAddForm({ ...emptyRow(), day, start_time: t.start_time }); setOpenAdd(true); }}>
                              <BiPlus size={14} color="#b0b0b0" />
                            </Box>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* ---- ADD SLOT DIALOG ---- */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
        <DialogTitle>Add Timetable Slot</DialogTitle>
        <DialogContent sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Select fullWidth value={addForm.day} displayEmpty onChange={e => setAddForm(p => ({ ...p, day: e.target.value }))}>
            <MenuItem value="">Select Day</MenuItem>
            {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>
          <TextField fullWidth type="time" label="Start Time" InputLabelProps={{ shrink: true }} value={addForm.start_time} onChange={e => setAddForm(p => ({ ...p, start_time: e.target.value }))} />
          <TextField fullWidth type="time" label="End Time" InputLabelProps={{ shrink: true }} value={addForm.end_time} onChange={e => setAddForm(p => ({ ...p, end_time: e.target.value }))} />
          <Select fullWidth value={addForm.subject} displayEmpty onChange={e => setAddForm(p => ({ ...p, subject: e.target.value }))}>
            <MenuItem value="">Select Subject</MenuItem>
            {subjects.map(s => <MenuItem key={s.id} value={s.subject_name}>{s.subject_name}</MenuItem>)}
          </Select>
          <TextField fullWidth label="Room No" value={addForm.room} onChange={e => setAddForm(p => ({ ...p, room: e.target.value }))} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveSlot} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </DialogActions>
      </Dialog>

      {/* ---- DELETE CONFIRM DIALOG ---- */}
      <Dialog open={openDel} onClose={() => setOpenDel(false)}>
        <DialogTitle>Delete Slot</DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete this timetable slot?</Typography></DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDel(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* ---- BULK SCHEDULE DIALOG ---- */}
      <Dialog open={openBulk} onClose={() => setOpenBulk(false)} fullWidth maxWidth="lg">
        <DialogTitle>New Schedule — Multiple Slots</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {bulkRows.map((row, idx) => (
            <Box key={idx} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr auto auto", gap: 1.5, mb: 2, alignItems: "center" }}>
              <Select value={row.day} displayEmpty onChange={e => { const r = [...bulkRows]; r[idx].day = e.target.value; setBulkRows(r); }}>
                <MenuItem value="">Day</MenuItem>
                {DAYS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
              <TextField type="time" InputLabelProps={{ shrink: true }} value={row.start_time} onChange={e => { const r = [...bulkRows]; r[idx].start_time = e.target.value; setBulkRows(r); }} />
              <TextField type="time" InputLabelProps={{ shrink: true }} value={row.end_time} onChange={e => { const r = [...bulkRows]; r[idx].end_time = e.target.value; setBulkRows(r); }} />
              <Select value={row.subject} displayEmpty onChange={e => { const r = [...bulkRows]; r[idx].subject = e.target.value; setBulkRows(r); }}>
                <MenuItem value="">Subject</MenuItem>
                {subjects.map(s => <MenuItem key={s.id} value={s.subject_name}>{s.subject_name}</MenuItem>)}
              </Select>
              <TextField label="Room" value={row.room} onChange={e => { const r = [...bulkRows]; r[idx].room = e.target.value; setBulkRows(r); }} />
              <Button variant="contained" color="success" onClick={() => setBulkRows([...bulkRows, emptyRow()])} sx={{ minWidth: 40, height: 40 }}><BiPlus size={20} /></Button>
              {bulkRows.length > 1 && <Button variant="contained" color="error" onClick={() => setBulkRows(bulkRows.filter((_, i) => i !== idx))} sx={{ minWidth: 40, height: 40 }}><BiTrash size={18} /></Button>}
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBulk(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleBulkSave}>Save All</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTable;
