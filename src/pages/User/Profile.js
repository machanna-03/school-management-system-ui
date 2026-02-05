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
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import BlockIcon from "@mui/icons-material/Block";

const Profile = () => {
  /* MENU */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  /* TABS STATE */
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const buttonStyle = { borderRadius: 0, minHeight: 32, px: 2 };

  return (
    <Box sx={{ background: "#eef2f5", minHeight: "100vh", p: 3 }}>
      {/* HEADER */}
      <Card sx={{ borderRadius: 3, overflow: "hidden", mb: 3 }}>
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              height: 200,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <Avatar
            src="https://randomuser.me/api/portraits/women/44.jpg"
            sx={{
              width: 90,
              height: 90,
              position: "absolute",
              bottom: -45,
              left: 30,
              border: "4px solid white",
              boxShadow: 2,
            }}
          />
        </Box>

        <Box sx={{ p: 3, pt: 6 }}>
          <Grid container alignItems="center">
            <Grid item sx={{ width: 120 }} />

            <Grid item xs={4}>
              <Typography fontWeight={700} fontSize={18} color="#4f46e5">
                Mitchell C. Shay
              </Typography>
              <Typography variant="body2" color="text.secondary">
                UX / UI Designer
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography fontWeight={600}>info@example.com</Typography>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
            </Grid>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              onClick={handleMenuOpen}
              sx={{
                background: "#e9eaf3",
                borderRadius: 2,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <MoreVertIcon />
            </Box>
          </Grid>
        </Box>
      </Card>

      {/* MENU */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <PersonOutlineIcon sx={{ mr: 1 }} /> View profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <GroupIcon sx={{ mr: 1 }} /> Add to close friends
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <AddIcon sx={{ mr: 1 }} /> Add to group
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <BlockIcon sx={{ mr: 1 }} /> Block
        </MenuItem>
      </Menu>

      {/* MAIN */}
      <Grid container spacing={3}>
        {/* LEFT */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Grid container textAlign="center">
              <Grid item xs={4}>
                <Typography fontWeight={600}>150</Typography>
                <Typography variant="body2">Follower</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={600}>140</Typography>
                <Typography variant="body2">Stay</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={600}>45</Typography>
                <Typography variant="body2">Reviews</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                size="small"
                sx={buttonStyle}
              >
                Follow
              </Button>
              <Button
                fullWidth
                variant="contained"
                size="small"
                sx={buttonStyle}
              >
                Message
              </Button>
            </Box>
          </Card>
          {/* Today Highlights */}{" "}
          <Card sx={{ p: 2, borderRadius: 3, mt: 3 }}>
            {" "}
            <Typography fontWeight={600}>Today Highlights</Typography>{" "}
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1588072432836-e10032774350"
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                my: 2,
              }}
            />{" "}
            <Typography fontWeight={600}>
              {" "}
              Proof Education Is Important{" "}
            </Typography>{" "}
            <Typography variant="body2" color="text.secondary">
              {" "}
              Education plays a key role in society development.{" "}
            </Typography>{" "}
          </Card>{" "}
          {/* Interests */}{" "}
          <Card sx={{ p: 2, borderRadius: 3, mt: 3 }}>
            {" "}
            <Typography fontWeight={600}>Interests</Typography>{" "}
            <Grid container spacing={1} mt={1}>
              {" "}
              {[1, 2, 3, 4].map((i) => (
                <Grid item xs={6} key={i}>
                  {" "}
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />{" "}
                </Grid>
              ))}{" "}
            </Grid>{" "}
          </Card>{" "}
          {/* Latest News */}{" "}
          <Card sx={{ p: 2, borderRadius: 3, mt: 3 }}>
            {" "}
            <Typography fontWeight={600}>Our Latest News</Typography>{" "}
            {[1, 2, 3].map((item) => (
              <Box key={item} sx={{ display: "flex", gap: 2, mt: 2 }}>
                {" "}
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />{" "}
                <Box>
                  {" "}
                  <Typography fontWeight={600} fontSize={14}>
                    {" "}
                    Education News Title{" "}
                  </Typography>{" "}
                  <Typography variant="body2" color="text.secondary">
                    {" "}
                    Short news description...{" "}
                  </Typography>{" "}
                </Box>{" "}
              </Box>
            ))}{" "}
          </Card>
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Posts" />
              <Tab label="About Me" />
              <Tab label="Setting" />
            </Tabs>

            {/* POSTS */}
            {tabValue === 0 && (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share something..."
                  sx={{ mt: 2 }}
                />

                <Box sx={{ display: "flex", gap: 1, mt: 2, mb: 2 }}>
                  <Button variant="outlined" size="small" sx={buttonStyle}>
                    <LinkIcon />
                  </Button>
                  <Button variant="outlined" size="small" sx={buttonStyle}>
                    <ImageIcon />
                  </Button>
                  <Button variant="contained" size="small" sx={buttonStyle}>
                    Post
                  </Button>
                </Box>

                {[1, 2, 3].map((post) => (
                  <Box key={post} sx={{ mb: 3 }}>
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                      sx={{
                        width: "100%",
                        height: 300,
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                    />

                    <Typography fontWeight={600} mt={1}>
                      How To Get A Fabulous EDUCATION On A Tight Budget
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Education difference can be solved by modern systems.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ThumbUpAltOutlinedIcon />}
                        sx={buttonStyle}
                      >
                        Like
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ShareOutlinedIcon />}
                        sx={buttonStyle}
                      >
                        Share
                      </Button>
                    </Box>
                  </Box>
                ))}
              </>
            )}

            {tabValue === 1 && (
              <Card sx={{ p: 3, borderRadius: 3 }}>
                {/* About */}
                <Typography fontWeight={700} mb={1}>
                  About Me
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my
                  whole heart. I am alone, and feel the charm of existence was
                  created for the bliss of souls like mine.
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                  A collection of textile samples lay spread out on the table —
                  Samsa was a travelling salesman — and above it there hung a
                  picture that he had recently cut out of an illustrated
                  magazine.
                </Typography>

                {/* Skills */}
                <Typography fontWeight={700} mb={1}>
                  Skills
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
                  {["Admin", "Dashboard", "Photoshop", "Bootstrap"].map(
                    (skill) => (
                      <Button
                        key={skill}
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#4f46e5",
                          color: "#fff",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "#4338ca" },
                        }}
                      >
                        {skill}
                      </Button>
                    ),
                  )}
                </Box>

                {/* Language */}
                <Typography fontWeight={700} mb={1}>
                  Language
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                  English &nbsp;&nbsp; French &nbsp;&nbsp; Bangla
                </Typography>

                {/* Personal Information */}
                <Typography fontWeight={700} mb={2}>
                  Personal Information
                </Typography>

                {[
                  ["Name", "Mitchell C. Shay"],
                  ["Email", "example@example.com"],
                  ["Availability", "Full Time (Free Lancer)"],
                  ["Age", "27"],
                  ["Location", "Rosemont Avenue Melbourne, Florida"],
                  ["Year Experience", "07 Year Experiences"],
                ].map(([label, value]) => (
                  <Grid container key={label} sx={{ mb: 1 }}>
                    <Grid item xs={4}>
                      <Typography fontWeight={600}>{label}</Typography>
                    </Grid>

                    <Grid item xs={1}>
                      <Typography fontWeight={600}>:</Typography>
                    </Grid>

                    <Grid item xs={7}>
                      <Typography color="text.secondary">{value}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Card>
            )}

            {tabValue === 2 && (
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Typography fontWeight={700} color="primary" mb={2}>
                  Account Setting
                </Typography>

                <Grid container spacing={2}>
                  {/* Email */}
                  <Grid item xs={12} md={6}>
                    <Typography>Email</Typography>
                    <TextField fullWidth placeholder="Email" />
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12} md={6}>
                    <Typography>Password</Typography>
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="Password"
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <Typography>Address</Typography>
                    <TextField fullWidth placeholder="1234 Main St" />
                  </Grid>

                  {/* Address 2 */}
                  <Grid item xs={12}>
                    <Typography>Address 2</Typography>
                    <TextField
                      fullWidth
                      placeholder="Apartment, studio, or floor"
                    />
                  </Grid>

                  {/* City */}
                  <Grid item xs={12} md={6}>
                    <Typography>City</Typography>
                    <TextField fullWidth />
                  </Grid>

                  {/* State */}
                  <Grid item xs={12} md={4}>
                    <Typography>State</Typography>
                    <TextField select fullWidth defaultValue="">
                      <MenuItem value="">Choose...</MenuItem>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="CA">California</MenuItem>
                      <MenuItem value="TX">Texas</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Zip */}
                  <Grid item xs={12} md={2}>
                    <Typography>Zip</Typography>
                    <TextField fullWidth />
                  </Grid>

                  {/* Checkbox */}
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Check me out"
                    />
                  </Grid>

                  {/* Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1,
                        textTransform: "none",
                      }}
                    >
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
