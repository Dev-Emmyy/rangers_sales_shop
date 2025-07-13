"use client";
import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Container,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Male,
  Female
} from '@mui/icons-material';

function JerseyModel({ glbPath, position, rotation, scale = 1 }) {
  const { scene } = useGLTF(glbPath);
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={position} 
      rotation={rotation}
      scale={scale}
    />
  );
}

function JerseyFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color="#e0e0e0" />
    </mesh>
  );
}

const jerseyData = [
  {
    id: 1,
    name: "Rangers FC Home Jersey",
    price: 35000,
    glbPath: "/Rangers_FC_Jersey_Red.glb",
    description: "Official match jersey with breathable fabric technology"
  },
  {
    id: 2,
    name: "Rangers FC Away Jersey",
    price: 38000,
    glbPath: "/Rangers_FC_Jersey_White.glb",
    description: "High-performance away jersey with moisture control"
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function JerseyCarousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedSize, setSelectedSize] = useState('M');

  const currentJersey = jerseyData[currentIndex];

  const nextJersey = () => {
    setCurrentIndex((prev) => (prev + 1) % jerseyData.length);
  };

  const prevJersey = () => {
    setCurrentIndex((prev) => (prev - 1 + jerseyData.length) % jerseyData.length);
  };

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8 }}>
      <Grid container spacing={isMobile ? 2 : 6} alignItems="center">
        {/* 3D Model Section - Always comes first in DOM but ordered differently */}
        <Grid item xs={12} md={6} order={isMobile ? 0 : 0}>
          <Box sx={{ 
            position: 'relative', 
            height: isMobile ? 400 : 600,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Canvas style={{
              width: '100%',
              height: '100%',
              margin: '0 auto'
            }}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls 
                enableZoom={true} 
                enablePan={false} 
                enableRotate={!isMobile}
              />
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.2} />
              <pointLight position={[-10, -10, -10]} intensity={0.4} />
              
              <Suspense fallback={<JerseyFallback />}>
                <JerseyModel 
                  glbPath={currentJersey.glbPath}
                  position={[0, 0, 0]} 
                  rotation={[0, 0, 0]}
                  scale={isMobile ? 1.5 : 2}
                />
              </Suspense>
            </Canvas>
            
            <IconButton
              onClick={prevJersey}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.1)',
                color: 'black',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' },
                zIndex: 1,
                width: 40,
                height: 40
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>
            
            <IconButton
              onClick={nextJersey}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.1)',
                color: 'black',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' },
                zIndex: 1,
                width: 40,
                height: 40
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Product Details Section - Comes after 3D viewer in DOM */}
        <Grid item xs={12} md={6} order={isMobile ? 1 : 0}>
          <Box sx={{ 
            maxWidth: 500, 
            mx: 'auto',
            px: isMobile ? 2 : 0,
            mt: isMobile ? 4 : 0
          }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h2" 
              gutterBottom 
              fontWeight={600}
              sx={{ 
                fontFamily: 'Inter, Arial, sans-serif',
                mb: 3,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {currentJersey.name}
            </Typography>
            
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{ 
                mb: 4, 
                fontWeight: 700,
                fontFamily: 'Inter, Arial, sans-serif',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              ₦{currentJersey.price.toLocaleString()}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                lineHeight: 1.8,
                fontFamily: 'Inter, Arial, sans-serif',
                color: 'text.secondary',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {currentJersey.description}
            </Typography>

            {/* Gender Selection */}
            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel component="legend">
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600} 
                  sx={{ 
                    fontFamily: 'Inter, Arial, sans-serif',
                    mb: 1,
                    textAlign: isMobile ? 'center' : 'left'
                  }}
                >
                  Gender
                </Typography>
              </FormLabel>
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <RadioGroup
                  row
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Inter, Arial, sans-serif' }}>
                        <Male fontSize="small" /> Male
                      </Box>
                    }
                    sx={{ mr: 3 }}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontFamily: 'Inter, Arial, sans-serif' }}>
                        <Female fontSize="small" /> Female
                      </Box>
                    }
                  />
                </RadioGroup>
              </Box>
            </FormControl>

            {/* Size Selection */}
            <Box sx={{ mb: 5 }}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                sx={{ 
                  mb: 2,
                  fontFamily: 'Inter, Arial, sans-serif',
                  textAlign: isMobile ? 'center' : 'left'
                }}
              >
                Size
              </Typography>
              <Grid container spacing={1} justifyContent={isMobile ? 'center' : 'flex-start'}>
                {sizes.map((size) => (
                  <Grid item xs={4} sm={2} key={size}>
                    <Button
                      variant={selectedSize === size ? 'contained' : 'outlined'}
                      onClick={() => setSelectedSize(size)}
                      fullWidth
                      size="small"
                      sx={{
                        py: 1,
                        fontWeight: 600,
                        fontFamily: 'Inter, Arial, sans-serif',
                        borderRadius: 1
                      }}
                    >
                      {size}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Add to Cart Button */}
            <Box sx={{ px: isMobile ? 4 : 0 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 1,
                  fontFamily: 'Inter, Arial, sans-serif',
                  textTransform: 'none'
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}