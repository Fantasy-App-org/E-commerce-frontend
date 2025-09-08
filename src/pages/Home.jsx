import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import api from '../api';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await api.get('/home/');
        setHomeData(response.data);
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!homeData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" color="error">
          Failed to load home page content.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome to Inway Shopy
      </Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sections
        </Typography>
        <List>
          {homeData.sections.map((section, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText primary={section} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <List>
            {Object.entries(homeData.feature_flags).map(([feature, isEnabled]) => (
              <ListItem key={feature} disablePadding>
                <ListItemText
                  primary={`${feature.charAt(0).toUpperCase() + feature.slice(1)}: ${isEnabled ? 'Enabled' : 'Disabled'}`}
                  secondary={!isEnabled ? "Coming soon!" : ""}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;