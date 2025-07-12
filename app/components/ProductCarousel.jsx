"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Chip,
  Grid,
  Container,
  Paper,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Badge,
  TextField,
  InputAdornment,
  Divider,
  Stack,
  Avatar,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  FavoriteBorder,
  Favorite,
  Search,
  Person,
  Menu,
  Star,
  StarBorder,
  LocalShipping,
  Security,
  Refresh,
  AccessTime,
  TrendingUp,
  NewReleases,
  LocalOffer,
  FilterList,
  ArrowForward,
  PlayArrow,
  Close,
} from '@mui/icons-material';
import Footer from './Footer';

const PremiumEcommerceSite = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [cart, setCart] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const dealsRef = useRef(null);
  const topRequestedRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Enhanced product data
  const newArrivals = [
    {
      id: 1,
      name: "Rangers Championship Jersey",
      price: 35000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(10).jpg?updatedAt=1752310662686",
      ],
      badge: "NEW",
      badgeColor: "success",
      rating: 4.8,
      reviews: 234,
      isNew: true
    },
    {
      id: 2,
      name: "Elite Performance Jersey",
      price: 28000,
      originalPrice: 35000,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(11).jpg?updatedAt=1752310282914",
      ],
      badge: "NEW",
      badgeColor: "success",
      rating: 4.6,
      reviews: 156,
      isNew: true
    },
    {
      id: 3,
      name: "Premium Jersey Collection",
      price: 45000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(9).jpg?updatedAt=1752310687427",
      ],
      badge: "NEW",
      badgeColor: "success",
      rating: 4.9,
      reviews: 89,
      isNew: true
    },
    {
      id: 4,
      name: "Urban Cargo Jersey",
      price: 32000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(7).jpg?updatedAt=1752310721379",
      ],
      badge: "NEW",
      badgeColor: "success",
      rating: 4.7,
      reviews: 312,
      isNew: true
    }
  ];

  const limitedDeals = [
    {
      id: 5,
      name: "Vintage Jersey",
      price: 15000,
      originalPrice: 25000,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for.jpg?updatedAt=1752311144773",
      ],
      badge: "40% OFF",
      badgeColor: "error",
      rating: 4.5,
      reviews: 445,
      timeLeft: "23:45:30",
      stock: 12
    },
    {
      id: 6,
      name: "One of One Jersey",
      price: 45000,
      originalPrice: 75000,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(4).jpg?updatedAt=1752310988163",
      ],
      badge: "LIMITED",
      badgeColor: "warning",
      rating: 4.8,
      reviews: 678,
      timeLeft: "23:45:30",
      stock: 8
    },
    {
      id: 7,
      name: "Body Fit Jersey",
      price: 38000,
      originalPrice: 55000,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(6).jpg?updatedAt=1752310958071",
      ],
      badge: "30% OFF",
      badgeColor: "error",
      rating: 4.7,
      reviews: 234,
      timeLeft: "23:45:30",
      stock: 15
    },
    {
        id: 8,
        name: "Luxury Jersey",
        price: 38000,
        originalPrice: 55000,
        currency: "NGN",
        images: [
          "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(8).jpg?updatedAt=1752310930176",
        ],
        badge: "30% OFF",
        badgeColor: "error",
        rating: 4.7,
        reviews: 234,
        timeLeft: "23:45:30",
        stock: 15
      }
  ];

  const topRequested = [
    {
      id: 8,
      name: "Signature Jersey Set",
      price: 52000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(12).jpg?updatedAt=1752312531571",
      ],
      badge: "BESTSELLER",
      badgeColor: "primary",
      rating: 4.9,
      reviews: 892,
      isTopRated: true
    },
    {
      id: 9,
      name: "Classic White Jersey",
      price: 42000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(13).jpg?updatedAt=1752312477296",
      ],
      badge: "POPULAR",
      badgeColor: "success",
      rating: 4.8,
      reviews: 1234,
      isTopRated: true
    },
    {
      id: 10,
      name: "Essential Graphic Jersey",
      price: 18000,
      originalPrice: null,
      currency: "NGN",
      images: [
        "https://ik.imagekit.io/4bvbtnlkl/Unveiling%20Our%20New%20JerseyGet%20ready%20to%20dominate%20in%20our%20new%20colours!%20Our%20latest%20jersey,designed%20for%20(14).jpg?updatedAt=1752312504967",
      ],
      badge: "ESSENTIAL",
      badgeColor: "info",
      rating: 4.6,
      reviews: 567,
      isTopRated: true
    }
  ];

  const scroll = (direction, ref) => {
    if (ref.current) {
      const container = ref.current;
      const scrollAmount = isMobile ? 280 : 320;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const addToCart = (productId) => {
    setCart(prev => new Set([...prev, productId]));
  };

  const ProductCard = ({ product, showTimer = false }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const isFavorite = favorites.has(product.id);
    const isInCart = cart.has(product.id);

    return (
      <Card
        sx={{
          minWidth: isSmallMobile ? 240 : 280,
          maxWidth: isSmallMobile ? 240 : 280,
          position: 'relative',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 3,
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[20],
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Badge */}
        <Chip
          label={product.badge}
          color={product.badgeColor}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 3,
            fontWeight: 'bold',
            fontSize: '0.75rem',
            px: 1,
          }}
        />

        {/* Wishlist Button */}
        <IconButton
          onClick={() => toggleFavorite(product.id)}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 3,
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,1)',
              transform: 'scale(1.1)',
            },
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>

        {/* Product Image */}
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height={isSmallMobile ? 300 : 400}
            image={product.images[currentImageIndex]}
            alt={product.name}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                zIndex: 2,
              }}
            >
              {product.images.map((_, index) => (
                <Box
                  key={index}
                  component="button"
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: '2px solid white',
                    bgcolor: index === currentImageIndex ? 'white' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          )}

          {/* Quick Actions */}
          <Fade in={isHovered || isMobile}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                display: 'flex',
                gap: 1,
                zIndex: 2,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={() => addToCart(product.id)}
                disabled={isInCart}
                sx={{
                  bgcolor: isInCart ? 'success.main' : 'common.black',
                  '&:hover': {
                    bgcolor: isInCart ? 'success.dark' : 'grey.800',
                  },
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 'bold',
                }}
              >
                {isInCart ? 'Added' : 'Add to Cart'}
              </Button>
            </Box>
          </Fade>
        </Box>

        {/* Product Info */}
        <CardContent sx={{ p: isSmallMobile ? 2 : 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {[...Array(5)].map((_, i) => (
                <Box key={i}>
                  {i < Math.floor(product.rating) ? (
                    <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                  ) : (
                    <StarBorder sx={{ fontSize: 16, color: 'grey.300' }} />
                  )}
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
              ({product.reviews})
            </Typography>
          </Box>

          <Typography
            variant={isSmallMobile ? "subtitle1" : "h6"}
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
              fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
            }}
          >
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant={isSmallMobile ? "subtitle1" : "h6"} component="span" sx={{ fontWeight: 'bold', color: 'text.primary', fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
              ₦{product.price.toLocaleString()}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                }}
              >
                ₦{product.originalPrice.toLocaleString()}
              </Typography>
            )}
          </Box>
          
          {product.originalPrice && (
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 , fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>
              Save ₦{(product.originalPrice - product.price).toLocaleString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {['New Arrivals', 'Limited Deals', 'Top Requested'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 'bold', 
              color: 'black', 
              mr: { xs: 1, md: 4 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
            }}>
              RANGERS STORE
            </Typography>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {['New Arrivals', 'Limited Deals', 'Top Requested'].map((item) => (
                  <Typography 
                    key={item}
                    sx={{ 
                      color: 'text.primary', 
                      cursor: 'pointer', 
                      '&:hover': { color: 'primary.main' },
                      fontSize: { md: '0.875rem', lg: '1rem' }
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {!isMobile ? (
              <TextField
                placeholder="Search..."
                size="small"
                sx={{ width: { md: 200, lg: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <IconButton>
                <Search />
              </IconButton>
            )}
            <IconButton>
              <Badge badgeContent={cart.size} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={favorites.size} color="error">
                <FavoriteBorder />
              </Badge>
            </IconButton>
            <IconButton>
              <Person />
            </IconButton>
            {isMobile && (
              <IconButton onClick={handleDrawerToggle}>
                <Menu />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Banner */}
      <Box
        sx={{
          height: { xs: 300, sm: 400, md: 500, lg: 600 },
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mt: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
          <Typography variant={isMobile ? "h3" : "h2"} component="h1" gutterBottom sx={{ 
            fontWeight: 'bold', 
            mb: 2, 
            fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}>
            Elevate Your Style
          </Typography>
          <Typography variant={isMobile ? "subtitle1" : "h5"} sx={{ 
            mb: 4, 
            opacity: 0.9, 
            fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}>
            Discover premium streetwear that defines your unique identity
          </Typography>
        </Container>
      </Box>

      {/* Features Banner */}
      <Box sx={{ bgcolor: 'black', color: 'white', py: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} sx={{ textAlign: 'center' }}>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <LocalShipping fontSize={isSmallMobile ? "small" : "medium"} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.7rem', sm: '0.875rem' }
                }}>
                  Free Shipping Over ₦50,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Refresh fontSize={isSmallMobile ? "small" : "medium"} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.7rem', sm: '0.875rem' }
                }}>
                  30-Day Returns
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Security fontSize={isSmallMobile ? "small" : "medium"} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.7rem', sm: '0.875rem' }
                }}>
                  Secure Payment
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <AccessTime fontSize={isSmallMobile ? "small" : "medium"} />
                <Typography variant="body2" sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.7rem', sm: '0.875rem' }
                }}>
                  24/7 Support
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        
        {/* New Arrivals Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <NewReleases sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main' }} />
              <Box>
                <Typography variant={isMobile ? "h4" : "h3"} component="h2" sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.primary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                }}>
                  New Arrivals
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}>
                  Fresh drops from our latest collection
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignSelf: { xs: 'flex-end', sm: 'center' } }}>
              <IconButton
                onClick={() => scroll('left', newArrivalsRef)}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.05)' },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={() => scroll('right', newArrivalsRef)}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.05)' },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              ref={newArrivalsRef}
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 3 },
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                pb: 2,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Limited Deals Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalOffer sx={{ fontSize: { xs: 30, md: 40 }, color: 'error.main' }} />
              <Box>
                <Typography variant={isMobile ? "h4" : "h3"} component="h2" sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.primary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                }}>
                  Limited Deals
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}>
                  Exclusive offers that won't last long
                </Typography>
              </Box>
            </Box>
            
            {/* Countdown Timer */}
            <Paper
              elevation={3}
              sx={{
                p: { xs: 1, sm: 2 },
                bgcolor: 'error.main',
                color: 'white',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 2 },
                width: { xs: '100%', sm: 'auto' },
                justifyContent: 'center',
                mt: { xs: 2, sm: 0 },
              }}
            >
              <AccessTime fontSize={isSmallMobile ? "small" : "medium"} />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant={isSmallMobile ? "body1" : "h6"} sx={{ 
                    fontWeight: 'bold', 
                    lineHeight: 1,
                    fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                    fontSize: { xs: '0.875rem', sm: '1.25rem' }
                  }}>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>HRS</Typography>
                </Box>
                <Typography variant={isSmallMobile ? "body1" : "h6"}>:</Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant={isSmallMobile ? "body1" : "h6"} sx={{ 
                    fontWeight: 'bold', 
                    lineHeight: 1,
                    fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                    fontSize: { xs: '0.875rem', sm: '1.25rem' }
                  }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>MIN</Typography>
                </Box>
                <Typography variant={isSmallMobile ? "body1" : "h6"}>:</Typography>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant={isSmallMobile ? "body1" : "h6"} sx={{ 
                    fontWeight: 'bold', 
                    lineHeight: 1,
                    fontSize: { xs: '0.875rem', sm: '1.25rem' }
                  }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}>SEC</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              ref={dealsRef}
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 3 },
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                pb: 2,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {limitedDeals.map((product) => (
                <ProductCard key={product.id} product={product} showTimer={true} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Top Requested Section */}
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TrendingUp sx={{ fontSize: { xs: 30, md: 40 }, color: 'success.main' }} />
              <Box>
                <Typography variant={isMobile ? "h4" : "h3"} component="h2" sx={{ 
                  fontWeight: 'bold', 
                  color: 'text.primary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                }}>
                  Top Requested
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: 'text.secondary',
                  fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}>
                  Customer favorites and bestsellers
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1, alignSelf: { xs: 'flex-end', sm: 'center' } }}>
              <IconButton
                onClick={() => scroll('left', topRequestedRef)}
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'success.dark', transform: 'scale(1.05)' },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={() => scroll('right', topRequestedRef)}
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'success.dark', transform: 'scale(1.05)' },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              ref={topRequestedRef}
              sx={{
                display: 'flex',
                gap: { xs: 2, sm: 3 },
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                pb: 2,
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {topRequested.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Newsletter Section */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: 4,
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography variant={isMobile ? "h4" : "h3"} component="h2" gutterBottom sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
          }}>
            Stay in the Loop
          </Typography>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
            mb: 4, 
            opacity: 0.9, 
            fontFamily: 'Playfair Display, Georgia, Times New Roman, serif',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}>
            Get exclusive deals, new arrivals, and style inspiration delivered to your inbox
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            maxWidth: 500, 
            mx: 'auto',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch'
          }}>
            <TextField
              fullWidth
              placeholder="Enter your email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                borderRadius: 2,
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                whiteSpace: 'nowrap',
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Container>
      {/* Footer */}
      <Footer/>
    </Box>
  );
};

export default PremiumEcommerceSite;