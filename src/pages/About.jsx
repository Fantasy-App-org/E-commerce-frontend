import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';
import api from '../api';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await api.get('/about/');
        setAboutData(response.data);
      } catch (error) {
        console.error('Failed to fetch about data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!aboutData) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" color="error">
          Failed to load about information.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          About {aboutData.app}
        </Typography>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%' }}>
          <Typography variant="body1" paragraph>
            {aboutData.about}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Version: {aboutData.version}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contact: {aboutData.contact_email}
          </Typography>
          {aboutData.feature_flags && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Coming Soon:
              </Typography>
              <ul>
                {Object.entries(aboutData.feature_flags).map(([feature, isEnabled]) => (
                  <li key={feature}>
                    {feature.charAt(0).toUpperCase() + feature.slice(1)}: {isEnabled ? 'Enabled' : 'Disabled'}
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default About;