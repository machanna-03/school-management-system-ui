import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { BiUser, BiLock, BiHide, BiShow, BiEnvelope, BiPhone } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { notifications } from '@mantine/notifications';
import { config } from '../../config/Config';
import { invokeApi, apiList } from '../../services/ApiServices';

const Signup = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([config.cookieName]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    let params = {
      email: formData.email,
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    try {
      let response = await invokeApi(
        config.getMySchool + apiList.signup,
        params,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          notifications.show({
            title: 'Success',
            message: 'User Registered Successfully. Please Login.',
            color: 'green',
          });
          navigate("/login");
        } else if (response.data.responseCode === "GM001") {
          notifications.show({
            title: 'Error',
            message: "Email already exists.",
            color: 'red',
          });
        }
        else if (response.data.responseCode === "HE001") {
          notifications.show({
            title: 'Error',
            message: "Invalid credentials. Please check your email and password.",
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Error',
            message: "Something went wrong. Please try again later!",
            color: 'red',
          });
        }
      } else if (response.data.responseCode === "GM001") {
        notifications.show({
          title: 'Error',
          message: "Email already exists.",
          color: 'red',
        });
      } else if (
        response.data.responseMessage?.includes("Password missMatch")
      ) {
        notifications.show({
          title: 'Error',
          message: "Password mismatch.",
          color: 'red',
        });
      } else if (
        response.data.responseMessage?.includes("No user found")
      ) {
        notifications.show({
          title: 'Error',
          message: "No user found.",
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Error',
          message: "Something went wrong. Please try again later!!",
          color: 'red',
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      notifications.show({
        title: 'Error',
        message: "Something went wrong. Please try again later!!",
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #4d44b5 0%, #fb7d5b 100%)',
        p: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 5,
            maxWidth: 500,
            width: '100%',
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              bgcolor: '#fb7d5b',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              mb: 1,
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 4px 20px rgba(251, 125, 91, 0.4)'
            }}
          >
            G
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#303972', textAlign: 'center' }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: '#A098AE', textAlign: 'center', mb: 2 }}>
            Sign up to get started.
          </Typography>

          <form onSubmit={handleSignup} style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiUser color="#A098AE" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiEnvelope color="#A098AE" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiPhone color="#A098AE" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiLock color="#A098AE" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <BiShow /> : <BiHide />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 3,
                bgcolor: '#4d44b5',
                py: 1.5,
                fontSize: '1rem',
                '&:hover': { bgcolor: '#3d34a5' }
              }}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2, color: '#A098AE' }}>
            Already have an account? <Link to="/login" style={{ color: '#4d44b5', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Signup;
