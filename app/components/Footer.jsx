import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import { Person } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 6 }}>
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
            RANGERS STORE
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.8, fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
            Elevating streetwear culture with premium quality and unmatched style.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
              <IconButton key={social} sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
              </IconButton>
            ))}
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 4, bgcolor: 'grey.600' }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
          © 2025 Rangers Store. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          {['Terms', 'Privacy', 'Cookies'].map((item) => (
            <Typography key={item} variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 }, fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
  );
}

export default Footer;