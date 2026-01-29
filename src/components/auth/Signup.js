import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Anchor,
  Container,
  Group,
  Stack,
  Select,
} from "@mantine/core";
import { FaUserMd, FaLock, FaEnvelope, FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const Signup = () => {
  const { dispatch, actions } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = () => {
    // Simple mock signup
    if (formData.name && formData.email && formData.password && formData.role) {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "Active",
        phone: "",
        avatar: "https://via.placeholder.com/40",
        department: formData.role === "doctor" ? "General" : "N/A",
        joinDate: new Date().toISOString().split("T")[0],
      };
      dispatch({ type: actions.ADD_USER, payload: newUser });
      dispatch({ type: actions.LOGIN, payload: newUser });
      navigate("/");
    }
  };

  return (
    <Container
      size="xl"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          shadow="xl"
          p="xl"
          radius="lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack align="center" mb="lg">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaUserMd size={50} color="#9c27b0" />
            </motion.div>
            <Title
              order={2}
              style={{ fontFamily: "Merriweather, serif", color: "#4a148c" }}
            >
              Hospital Signup
            </Title>
            <Text c="dimmed">Create your account to get started.</Text>
          </Stack>
          <Stack>
            <TextInput
              leftSection={<FaIdCard />}
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            <TextInput
              leftSection={<FaEnvelope />}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
            <Select
              leftSection={<FaUserMd />}
              placeholder="Role"
              data={[
                { value: "doctor", label: "Doctor" },
                { value: "nurse", label: "Nurse" },
                { value: "patient", label: "Patient" },
                { value: "staff", label: "Staff" },
              ]}
              value={formData.role}
              onChange={(value) => handleChange("role", value)}
              required
            />
            <PasswordInput
              leftSection={<FaLock />}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
            />
            <Button
              fullWidth
              mt="md"
              onClick={handleSignup}
              style={{ backgroundColor: "#9c27b0" }}
            >
              Sign Up
            </Button>
          </Stack>
          <Group justify="center" mt="md">
            <Text size="sm">Already have an account?</Text>
            <Anchor
              component={Link}
              to="/login"
              size="sm"
              style={{ color: "#2196f3" }}
            >
              Sign in
            </Anchor>
          </Group>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Signup;

