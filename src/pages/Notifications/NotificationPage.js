import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  Checkbox,
  IconButton,
  Divider,
  Button
} from "@mui/material";

import {
  FiStar,
  FiTrash2,
  FiSettings,
  FiClock
} from "react-icons/fi";

import {
  BiLogoGmail,
  BiSend,
  BiStar,
  BiFileBlank,
  BiLabel,
  BiTime,
  BiTrash,
  BiArchive,
} from "react-icons/bi";

/* ---------------- Sidebar Items ---------------- */
const sidebarItems = [
  { label: "Inbox", key: "inbox", icon: <BiLogoGmail size={18} /> },
  { label: "Sent", key: "sent", icon: <BiSend size={18} /> },
  { label: "Favorite", key: "favorite", icon: <BiStar size={18} /> },
  { label: "Draft", key: "draft", icon: <BiFileBlank size={18} /> },
  { label: "Important", key: "important", icon: <BiLabel size={18} /> },
  { label: "Scheduled", key: "scheduled", icon: <BiTime size={18} /> },
  { label: "Trash", key: "trash", icon: <BiTrash size={18} /> },
  { label: "Archive", key: "archive", icon: <BiArchive size={18} /> },
];

/* ---------------- Notifications ---------------- */
const notifications = [
  {
    title: "UI Design Beginner",
    message: "working time in this pandemic situation...",
    time: "11:43 AM",
  },
  {
    title: "How to be Freelancer",
    message: "How to manage your working hours...",
    time: "11:43 AM",
  },
  {
    title: "Karen Hope",
    message: "Join Now and Get Discount...",
    time: "11:43 AM",
  },
  {
    title: "Ms. Samantha William",
    message: "Full-Stack Web Developer fresher...",
    time: "11:43 AM",
  },
  {
    title: "UI Design Beginner",
    message: "working time in this pandemic situation...",
    time: "11:43 AM",
  },
];

const NotificationPage = () => {
  const [activeMenu, setActiveMenu] = useState("inbox");

  return (
    <Box display="flex" height="100vh" overflow="hidden" bgcolor="#f6f7fb">

      {/* ================= LEFT SIDEBAR ================= */}
      <Paper
        sx={{
          width: 250,
          height: "100vh",
          p: 2,
          borderRadius: 0,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cfcfe3",
            borderRadius: "4px",
          },
        }}
      >
        <Button
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "#9b96b4",
            color: "#fff",
            borderRadius: "10px",
            py: 1.2,
            textTransform: "none",
            "&:hover": { bgcolor: "#8b86a5" },
          }}
        >
          + Compose Notification
        </Button>

        <Stack spacing={1.5}>
          {sidebarItems.map((item) => {
            const isActive = activeMenu === item.key;

            return (
              <Stack
                key={item.key}
                direction="row"
                spacing={2}
                alignItems="center"
                onClick={() => setActiveMenu(item.key)}
                sx={{
                  p: 1.2,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: 15,
                  color: isActive ? "#ff6b4a" : "#555",
                  bgcolor: isActive ? "#fff2ee" : "transparent",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    bgcolor: "#fff2ee",
                    color: "#ff6b4a",
                  },
                  "&:hover svg": {
                    color: "#ff6b4a",
                  },
                }}
              >
                {item.icon}
                <Typography fontWeight={500}>{item.label}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Paper>

      {/* ================= RIGHT CONTENT ================= */}
      <Box flex={1} overflow="hidden">
        <Paper
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          {/* TOP ACTION BAR */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: "#ffffff",
              borderBottom: "1px solid #e6e8f0",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox />
              <Typography fontWeight={600}>
                {sidebarItems.find(item => item.key === activeMenu)?.label}
              </Typography>

              <Box ml="auto">
                <IconButton size="small">
                  <FiClock />
                </IconButton>
                <IconButton size="small">
                  <FiTrash2 />
                </IconButton>
                <IconButton size="small">
                  <FiSettings />
                </IconButton>
              </Box>
            </Stack>
          </Box>

          {/* NOTIFICATION LIST */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "#f4f6fb",
              overflowY: "auto",
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": { backgroundColor: "#d0d2e0" },
            }}
          >
            {notifications.map((item, index) => (
              <Box key={index}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                  sx={{
                    px: 2,
                    py: 1.2,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#eef1f8" },
                  }}
                >
                  <Checkbox size="small" />
                  <FiStar size={14} color="#b5b7c5" />

                  <Typography sx={{ fontWeight: 600, fontSize: "13px", width: 200 }}>
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: "12px",
                      color: "#7a7d9c",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.message}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#9a9cb3",
                    }}
                  >
                    {item.time}
                  </Typography>
                </Stack>
                <Divider />
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default NotificationPage;
