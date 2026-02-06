import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, InputAdornment, IconButton, Chip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser, BiLock, BiHide, BiShow } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import { notifications } from '@mantine/notifications';
import { config } from '../../config/Config';
import { invokeApi, apiList } from '../../services/ApiServices';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, actions } = useApp();
  const [cookies, setCookie] = useCookies([config.cookieName]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let params = {
      email: email,
      password: password,
    };

    try {
      let response = await invokeApi(
        config.getMySchool + apiList.userLogin,
        params,
        cookies
      );

      if (response?.status >= 200 && response?.status < 300) {
        if (response.data.responseCode === "200") {
          setCookie(
            config.cookieName,
            JSON.stringify({
              token: response.data.token,
              loginUserId: response.data.userId,
            }),
            { path: "/", maxAge: 3000000, sameSite: "strict" }
          );

          // Update Context state so ProtectedRoute works immediately
          const userData = {
            id: response.data.userId,
            email: email,
            // We might want to fetch more user details here or decode the token
            role: 'User', // Placeholder until we get role from response
            status: 'Active'
          };
          localStorage.setItem('userInfo', JSON.stringify(userData));
          dispatch({ type: actions.LOGIN, payload: userData });

          notifications.show({
            title: 'Success',
            message: 'Logged in successfully',
            color: 'green',
          });
          navigate('/dashboard');
        } else if (response.data.responseCode === "HE001") {
          notifications.show({
            title: 'Error',
            message: "Invalid credentials. Please check your email and password.",
            color: 'red',
          });
          setError("Invalid credentials.");
        } else {
          notifications.show({
            title: 'Error',
            message: "Please try again later!",
            color: 'red',
          });
        }
      }
      else if (
        response.data.responseMessage?.includes("Password missMatch")
      ) {
        notifications.show({
          title: 'Error',
          message: "Password mismatch. Please check your password.",
          color: 'red',
        });
        setError("Password mismatch.");
      } else if (
        response.data.responseMessage?.includes("No user found")
      ) {
        notifications.show({
          title: 'Error',
          message: "No user found with the provided email.",
          color: 'red',
        });
        setError("No user found.");
      } else {
        notifications.show({
          title: 'Error',
          message: "Please try again later!!",
          color: 'red',
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      notifications.show({
        title: 'Error',
        message: "Please try again later!!",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 5,
            maxWidth: 450,
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
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: '#A098AE', textAlign: 'center', mb: 2 }}>
            Enter your credentials to access your account.
          </Typography>

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiUser color="#A098AE" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                {error}
              </Typography>
            )}

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
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 3, color: '#A098AE' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#4d44b5', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;