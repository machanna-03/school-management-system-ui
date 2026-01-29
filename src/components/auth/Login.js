import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Text, Anchor, Container, Group, Stack, Alert } from '@mantine/core';
import { FaUserMd, FaLock, FaExclamationCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Login = () => {
  const { state, dispatch, actions } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Mock authentication - check against users in state
      const user = state.users.find(u => u.email === email);
      if (user && password === 'password') { // Simple mock password
        const userData = {
          id: user.id,
          name: user.name,
          role: user.role,  
          email: user.email,
          avatar: user.avatar
        };
        dispatch({ type: actions.LOGIN, payload: userData });
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (role) => {
    const demoUsers = {
      doctor: state.users.find(u => u.role === 'Doctor'),
      nurse: state.users.find(u => u.role === 'Nurse'),
      patient: state.users.find(u => u.role === 'Patient')
    };

    const user = demoUsers[role];
    if (user) {
      const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        avatar: user.avatar
      };
      dispatch({ type: actions.LOGIN, payload: userData });
      navigate('/');
    }
  };

  return (
    <Container size="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper shadow="xl" p="xl" radius="lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', minWidth: '400px' }}>
          <Stack align="center" mb="lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <FaUserMd size={50} color="#2196f3" />
            </motion.div>
            <Title order={2} style={{ fontFamily: 'Merriweather, serif', color: '#1565c0' }}>Hospital Login</Title>
            <Text c="dimmed">Welcome back! Please sign in to your account.</Text>
          </Stack>

          {error && (
            <Alert icon={<FaExclamationCircle />} title="Error" color="red" mb="md">
              {error}
            </Alert>
          )}

          <Stack>
            <TextInput
              leftSection={<FaUserMd />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <PasswordInput
              leftSection={<FaLock />}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              fullWidth
              mt="md"
              onClick={handleLogin}
              loading={loading}
              style={{ backgroundColor: '#2196f3' }}
            >
              Sign In
            </Button>
          </Stack>

          <Group justify="center" mt="md">
            <Text size="sm">Don't have an account?</Text>
            <Anchor component={Link} to="/signup" size="sm" style={{ color: '#9c27b0' }}>
              Sign up
            </Anchor>
          </Group>

          <Text ta="center" size="sm" c="dimmed" mt="lg" mb="sm">Demo Accounts:</Text>
          <Group grow>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('doctor')}>
              Login as Doctor
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('nurse')}>
              Login as Nurse
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDemoLogin('patient')}>
              Login as Patient
            </Button>
          </Group>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;