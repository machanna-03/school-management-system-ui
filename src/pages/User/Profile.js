import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  TextField,
  Card,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";

const Profile = () => {
  return (
    <Box sx={{ background: "#eef2f5", minHeight: "100vh", p: 3 }}>
      {/* ================= HEADER CARD ================= */}
      <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
        {/* Cover Image */}
        <Box
          sx={{
            height: 220,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Profile Info */}
        <Box sx={{ p: 3 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                src="https://randomuser.me/api/portraits/women/44.jpg"
                sx={{ width: 80, height: 80 }}
              />
            </Grid>

            <Grid item xs>
              <Typography fontWeight={600} fontSize={18}>
                Mitchell C. Shay
              </Typography>
              <Typography variant="body2" color="text.secondary">
                UX / UI Designer
              </Typography>
              <Typography variant="body2" color="primary">
                info@example.com
              </Typography>
            </Grid>

            <Grid item>
              <MoreVertIcon />
            </Grid>
          </Grid>
        </Box>
      </Card>

      {/* ================= MAIN CONTENT ================= */}
      <Grid container spacing={3}>
        {/* -------- LEFT SECTION -------- */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Grid container spacing={2} textAlign="center">
              <Grid item xs={4}>
                <Typography fontWeight={600}>150</Typography>
                <Typography variant="body2">Follower</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={600}>140</Typography>
                <Typography variant="body2">Place Stay</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={600}>45</Typography>
                <Typography variant="body2">Reviews</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button fullWidth variant="contained">
                Follow
              </Button>
              <Button fullWidth variant="contained">
                Send Message
              </Button>
            </Box>
          </Card>

          <Card sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Typography fontWeight={600}>Today Highlights</Typography>
          </Card>
        </Grid>

        {/* -------- RIGHT SECTION -------- */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Tabs value={0} textColor="primary" indicatorColor="primary">
              <Tab label="Posts" />
              <Tab label="About Me" />
              <Tab label="Setting" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Please type what you want..."
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Button variant="outlined">
                  <LinkIcon />
                </Button>
                <Button variant="outlined">
                  <ImageIcon />
                </Button>
                <Button variant="contained">Post</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
