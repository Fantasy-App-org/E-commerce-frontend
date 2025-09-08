// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Paper, // Import Paper for card-like appearance
  Link as MuiLink, // Import Link from Material-UI and alias it
} from '@mui/material';
import api from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
    password2: '',
    gender: '',
    date_of_birth: '',
    referral_code: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/signup/', formData);
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Signup failed: ' + error.response?.data?.detail);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{
        p: { xs: 2, sm: 4 }, // Responsive padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
        borderRadius: 2, // Rounded corners
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900], // Light background
      }}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Join Inway Shopy!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Create your account to start shopping or selling.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small" // Compact size
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="password2"
                label="Confirm Password"
                type="password"
                value={formData.password2}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gender"
                label="Gender"
                select
                value={formData.gender}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
                <MenuItem value="O">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="date_of_birth"
                label="Date of Birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="referral_code"
                label="Referral Code (Optional)"
                value={formData.referral_code}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" sx={{ mt: 1 }}>
            <Grid item>
              <MuiLink
                component="button" // Use button component to leverage button styles
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none', // Prevent uppercase
                  color: 'primary.main', // Match theme primary color
                  fontWeight: 'bold',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Login
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;