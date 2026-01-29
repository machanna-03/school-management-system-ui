import React, { useState } from "react";
import {
  Box,
  IconButton,
  Badge,
  Typography,
  Avatar,
  Stack,
  Menu,
  MenuItem,
  Divider,
  Button
} from "@mui/material";

import {
  BiSearch,
  BiGridAlt,
  BiMoon,
  BiFullscreen,
  BiMessageDetail,
  BiBell,
  BiCog,
  BiChevronRight,
  BiUser,
  BiLogOut
} from "react-icons/bi";

const Header = ({ toggleSidebar, collapsed }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionIcons = [
    { icon: <BiSearch />, badge: false },
    { icon: <BiGridAlt />, badge: false },
    { icon: <BiMoon />, badge: false },
    { icon: <BiFullscreen />, badge: false },
    { icon: <BiMessageDetail />, badge: 5, color: "primary" },
    { icon: <BiBell />, badge: 25, color: "warning" },
    { icon: <BiCog />, badge: false },
  ];

  return (
    <Box
      component="header"
      sx={{
        height: 90,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 5,
      }}
    >
      {/* Left */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={toggleSidebar}>
          {collapsed ? (
            <BiChevronRight size={30} color="#3d4465" />
          ) : (
            <BiGridAlt size={30} color="#3d4465" />
          )}
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: 24, color: "#3d4465" }}>
          Dashboard
        </Typography>
      </Box>

      {/* Right */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Stack direction="row" spacing={2}>
          {actionIcons.map((item, index) => (
            <IconButton
              key={index}
              sx={{
                bgcolor: "#fff",
                color: "#a1a5b7",
                width: 48,
                height: 48,
                borderRadius: "14px",
                "&:hover": { bgcolor: "#f8f9fa" },
                fontSize: 24,
              }}
            >
              {item.badge ? (
                <Badge badgeContent={item.badge} color={item.color}>
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </IconButton>
          ))}
        </Stack>

        {/* Avatar */}
        <IconButton onClick={handleAvatarClick}>
          <Avatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            sx={{ width: 48, height: 48, borderRadius: "14px" }}
          />
        </IconButton>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 260,
              borderRadius: "18px",
              p: 2,
              mt: 1,
            },
          }}
        >
          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Typography fontWeight={700}>Nella Vita</Typography>
              <Typography fontSize={13} color="text.secondary">
                Admin
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <MenuItem>
            <BiUser size={18} style={{ marginRight: 10 }} /> Profile
          </MenuItem>
          <MenuItem>
            <BiMessageDetail size={18} style={{ marginRight: 10 }} /> Message
          </MenuItem>
          <MenuItem>
            <BiBell size={18} style={{ marginRight: 10 }} /> Notification
          </MenuItem>
          <MenuItem>
            <BiCog size={18} style={{ marginRight: 10 }} /> Settings
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <Button
            fullWidth
            startIcon={<BiLogOut />}
            sx={{
              bgcolor: "#f3f4ff",
              color: "#5b5fe3",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              py: 1,
            }}
          >
            Logout
          </Button>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
