"use client";
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Container,
  InputBase,
  alpha,
  styled,
  Slide,
  Zoom,
  Paper,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  SportsFootball as JerseyIcon,
  Close as CloseIcon,
  FlashOn as FlashIcon
} from '@mui/icons-material';
import Image from 'next/image';

const GlowingSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
    transform: 'translateY(-2px)',
  },
  '&:focus-within': {
    boxShadow: '0 0 0 3px rgba(144, 202, 249, 0.4), 0 12px 40px rgba(0,0,0,0.15)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const PulsingBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    background: 'linear-gradient(45deg, #ff4081, #e91e63)',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    minWidth: '22px',
    height: '22px',
    boxShadow: '0 4px 20px rgba(233, 30, 99, 0.4)',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        boxShadow: '0 4px 20px rgba(233, 30, 99, 0.4)',
      },
      '50%': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 25px rgba(233, 30, 99, 0.6)',
      },
      '100%': {
        transform: 'scale(1)',
        boxShadow: '0 4px 20px rgba(233, 30, 99, 0.4)',
      },
    },
  },
}));

const FloatingIcon = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  '&:hover': {
    background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  '&:active': {
    transform: 'translateY(-1px) scale(0.98)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1rem',
    fontWeight: 400,
    '&::placeholder': {
      color: 'rgba(255,255,255,0.7)',
      opacity: 1,
    },
  },
}));

const DopeNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(7);
  const [searchValue, setSearchValue] = useState('');

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300, // Higher than default to ensure it stays above everything
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)', // Safari support
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)',
          animation: 'shimmer 3s infinite',
          '@keyframes shimmer': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' },
          },
        },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          py: 2,
          minHeight: { xs: 64, sm: 72 },
        }}>
          
          {/* Logo Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
          }}>
            <Box sx={{ 
              position: 'relative',
              '&:hover': {
                '& .logo-icon': {
                  transform: 'rotate(360deg) scale(1.1)',
                },
                '& .glow-effect': {
                  opacity: 1,
                  transform: 'scale(1.2)',
                },
              },
            }}>
              <Box 
                className="glow-effect"
                sx={{
                  position: 'absolute',
                  inset: -4,
                  background: 'linear-gradient(45deg, #ff4081, #3f51b5, #00bcd4)',
                  borderRadius: '50%',
                  opacity: 0,
                  filter: 'blur(8px)',
                  transition: 'all 0.4s ease',
                }}
              />
                <Image 
                  src="https://ik.imagekit.io/4bvbtnlkl/Rangers_International_FC_(logo).png?updatedAt=1752315724027" // Adjust path based on your folder structure
                  alt="Rangers Store Logo"
                  width={40}
                  height={40}
                  className="logo-icon"
                  style={{
                    transition: 'transform 0.4s ease',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                  }}
                />
            </Box>
            
            <Box sx={{ display: { xs: 'block', sm: 'block' } }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 800,
                  fontSize: { sm: '1.5rem', md: '2rem', xs: '1.2rem' },
                  background: 'linear-gradient(45deg, #fff, #90caf9, #e1bee7)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '1px',
                  textShadow: '0 0 30px rgba(255,255,255,0.5)',
                }}
              >
                RANGERS
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: { xs: '0.5rem', sm: '0.7rem', md: '1rem' },
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: -0.5,
                }}
              >
                Premium Sports Jerseys
              </Typography>
            </Box>
          </Box>

          {/* Desktop Search */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flex: 1, 
            justifyContent: 'center',
            maxWidth: '500px',
            mx: 4,
          }}>
            <GlowingSearch>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search premium jerseys..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                endAdornment={
                  searchValue && (
                    <IconButton 
                      size="small" 
                      onClick={() => setSearchValue('')}
                      sx={{ color: 'rgba(255,255,255,0.8)', mr: 1 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )
                }
              />
            </GlowingSearch>
          </Box>

          {/* Action Icons */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
          }}>
            
            {/* Mobile Search */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <FloatingIcon
                onClick={toggleSearch}
                sx={{
                  '&:hover': {
                    '& .MuiSvgIcon-root': {
                      transform: 'rotate(90deg)',
                    },
                  },
                }}
              >
                <SearchIcon sx={{ 
                  color: '#fff', 
                  transition: 'transform 0.3s ease',
                }} />
              </FloatingIcon>
            </Box>

            {/* Shopping Cart */}
            <FloatingIcon
              sx={{
                '&:hover': {
                  '& .cart-icon': {
                    transform: 'scale(1.2) rotate(-10deg)',
                  },
                },
              }}
            >
              <PulsingBadge 
                badgeContent={cartCount} 
                color="secondary"
                overlap="circular"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <CartIcon 
                  className="cart-icon"
                  sx={{ 
                    color: '#fff',
                    fontSize: 24,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} 
                />
              </PulsingBadge>
            </FloatingIcon>
          </Box>
        </Toolbar>

        {/* Mobile Search Expansion */}
        <Slide direction="down" in={searchOpen} mountOnEnter unmountOnExit>
          <Box sx={{ 
            pb: 3, 
            display: { xs: 'block', md: 'none' },
          }}>
            <GlowingSearch>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search premium jerseys..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
                endAdornment={
                  <IconButton 
                    onClick={toggleSearch}
                    sx={{ color: 'rgba(255,255,255,0.8)', mr: 1 }}
                  >
                    <CloseIcon />
                  </IconButton>
                }
              />
            </GlowingSearch>
          </Box>
        </Slide>
      </Container>
      
      {/* Background Effects */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.6,
      }}>
        <Box sx={{
          position: 'absolute',
          top: -50,
          left: '10%',
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(63, 81, 181, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(180deg)' },
          },
        }} />
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: '10%',
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 4s ease-in-out infinite reverse',
        }} />
      </Box>
    </AppBar>
  );
};

export default DopeNavbar;