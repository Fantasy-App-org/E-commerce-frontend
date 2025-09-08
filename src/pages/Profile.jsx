import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../api';
import { Email, Phone, CalendarToday, Person, Store } from '@mui/icons-material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile/');
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Typography color="error" align="center" mt={6} variant="h6">
        {error || 'User profile not found.'}
      </Typography>
    );
  }

  const initials = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5 }}>
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Header Section */}
          <Box
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              py: 4,
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: 'white', color: 'primary.main', fontSize: 40, mb: 2 }}
            >
              {initials}
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
              {user.email}
            </Typography>
          </Box>

          {/* Body Section */}
          <Box sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email color="primary" />
                  <Typography>{user.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone color="primary" />
                  <Typography>{user.phone_number || 'Not provided'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" />
                  <Typography>
                    {user.gender === 'M' ? 'Male' : user.gender === 'F' ? 'Female' : 'Other'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday color="primary" />
                  <Typography>{user.date_of_birth || 'N/A'}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <strong>Referral Code:</strong> {user.referral_code || 'Not available'}
                </Typography>
              </Grid>
            </Grid>

            {/* Seller Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Seller Information
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Store color="primary" />
                <Typography>
                  {user.is_seller ? (
                    <>
                      Status: <strong>{user.seller_status}</strong>
                    </>
                  ) : (
                    'Not a Seller'
                  )}
                </Typography>
              </Box>

              {user.is_seller && user.seller_status === 'pending' && (
                <Alert severity="info">
                  Your seller application is under review. We will notify you when it's approved.
                </Alert>
              )}
              {user.is_seller && user.seller_status === 'rejected' && (
                <Alert severity="error">
                  Your seller application was rejected. Please contact support.
                </Alert>
              )}
              {!user.is_seller && (
                <Button
                  component={Link}
                  to="/seller/register"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Become a Seller
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
