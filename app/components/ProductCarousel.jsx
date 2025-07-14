"use client";
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
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Male,
  Female
} from '@mui/icons-material';
import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// AGGRESSIVE PRELOADING SYSTEM
const modelCache = new Map();
const loadingPromises = new Map();
const modelPaths = [
  "/Rangers_FC_Jersey_Red.glb",
  "/Rangers_FC_Jersey_White.glb"
];

// Preload models with better error handling and progress tracking
const preloadModels = async (onProgress) => {
  if (typeof window === 'undefined') return;
  
  const loader = new GLTFLoader();
  let loadedCount = 0;
  
  const promises = modelPaths.map(async (path) => {
    if (modelCache.has(path)) {
      loadedCount++;
      onProgress?.(loadedCount / modelPaths.length);
      return;
    }
    
    if (loadingPromises.has(path)) {
      return loadingPromises.get(path);
    }
    
    const promise = loader.loadAsync(path).then((gltf) => {
      const scene = gltf.scene.clone();
      // Optimize the model
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          // Reduce geometry complexity on mobile
          if (child.geometry) {
            child.geometry.computeBoundingSphere();
          }
        }
      });
      modelCache.set(path, scene);
      loadedCount++;
      onProgress?.(loadedCount / modelPaths.length);
      return scene;
    }).catch((error) => {
      console.error(`Failed to preload ${path}:`, error);
      loadedCount++;
      onProgress?.(loadedCount / modelPaths.length);
    });
    
    loadingPromises.set(path, promise);
    return promise;
  });
  
  await Promise.all(promises);
};

function JerseyModel({ glbPath, position, rotation, scale = 1, manualRotation = 0 }) { 
  const meshRef = useRef();
  
  // Use cached model with fallback
  const scene = useMemo(() => {
    if (modelCache.has(glbPath)) {
      return modelCache.get(glbPath).clone();
    }
    
    // If not cached, load normally (should be rare after preloading)
    const gltf = useLoader(GLTFLoader, glbPath);
    const clonedScene = gltf.scene.clone();
    modelCache.set(glbPath, clonedScene);
    return clonedScene;
  }, [glbPath]);
  
  // Apply manual rotation instead of auto-rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = manualRotation;
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

// Better loading fallback
function JerseyFallback() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '100%',
      gap: 2
    }}>
      <CircularProgress size={40} />
      <Typography variant="body2" color="text.secondary">
        Loading 3D Model...
      </Typography>
    </Box>
  );
}

// Custom hook for jersey rotation control
const useJerseyRotation = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [lastX, setLastX] = useState(0);

  const handleStart = (clientX) => {
    setStartX(clientX);
    setLastX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    
    const deltaX = clientX - lastX;
    const rotationSpeed = 0.01; // Adjust sensitivity
    
    setRotation(prev => prev + deltaX * rotationSpeed);
    setLastX(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(0);
    setLastX(0);
  };

  const mouseHandlers = {
    onMouseDown: (e) => {
      e.preventDefault();
      handleStart(e.clientX);
    },
    onMouseMove: (e) => {
      e.preventDefault();
      handleMove(e.clientX);
    },
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
  };

  const touchHandlers = {
    onTouchStart: (e) => {
      e.preventDefault();
      handleStart(e.touches[0].clientX);
    },
    onTouchMove: (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    onTouchEnd: handleEnd,
  };

  return {
    rotation,
    isDragging,
    handlers: {
      ...mouseHandlers,
      ...touchHandlers
    },
    resetRotation: () => setRotation(0)
  };
};

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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  // Start preloading immediately with progress tracking
  useEffect(() => {
    const loadModels = async () => {
      await preloadModels((progress) => {
        setLoadingProgress(progress);
      });
      setModelsLoaded(true);
    };
    
    loadModels();
  }, []);

  const currentJersey = jerseyData[currentIndex];

  const nextJersey = () => {
    setCurrentIndex((prev) => (prev + 1) % jerseyData.length);
  };

  const prevJersey = () => {
    setCurrentIndex((prev) => (prev - 1 + jerseyData.length) % jerseyData.length);
  };

  // Jersey rotation control
  const { rotation, isDragging, handlers, resetRotation } = useJerseyRotation();

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 4 : 8 }}>
      <Grid container spacing={isMobile ? 2 : 6} alignItems="center">
        {/* 3D Model Section - FIXED FOR MOBILE CENTERING */}
        <Grid item xs={12} md={6} order={isMobile ? 0 : 0}>
          <Box sx={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            px: isMobile ? 2 : 0, // Add padding on mobile
          }}>
            <Box sx={{ 
              position: 'relative', 
              height: isMobile ? 400 : 600,
              width: isMobile ? '100%' : 600, // Fixed width on desktop, full width on mobile
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.default',
              borderRadius: 2,
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              touchAction: 'none', // Prevent all default touch actions
              overflow: 'hidden'
            }}
            {...handlers}
            >
            {!modelsLoaded ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 2
              }}>
                <CircularProgress variant="determinate" value={loadingProgress * 100} size={60} />
                <Typography variant="h6" color="text.secondary">
                  Loading 3D Models...
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(loadingProgress * 100)}% complete
                </Typography>
              </Box>
            ) : (
              <Canvas 
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block', // Changed from margin: '0 auto' to display: 'block'
                }}
                performance={{ min: 0.1, max: 1 }}
                dpr={isMobile ? 1 : 2} // Reduce pixel ratio on mobile
                onCreated={({ gl }) => {
                  // Prevent context menu on right click
                  gl.domElement.addEventListener('contextmenu', (e) => e.preventDefault());
                }}
              >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls 
                  enabled={false} // Disable OrbitControls to use manual rotation
                />
                
                {/* Optimized lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 10, 5]} intensity={0.8} />
                
                <Suspense fallback={null}>
                  <JerseyModel 
                    glbPath={currentJersey.glbPath}
                    position={[0, 0, 0]} 
                    rotation={[0, 0, 0]}
                    scale={isMobile ? 1.2 : 1.8}
                    manualRotation={rotation}
                  />
                </Suspense>
              </Canvas>
            )}
            
            {/* Rotation instruction overlay */}
            {modelsLoaded && (
              <Box sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 1,
                fontSize: '0.75rem',
                pointerEvents: 'none',
                opacity: 0.8,
                zIndex: 10
              }}>
                {isMobile ? 'Swipe to rotate jersey' : 'Drag to rotate jersey'}
              </Box>
            )}
            
            {modelsLoaded && (
              <>
                <IconButton
                  onClick={prevJersey}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    color: 'black',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                    zIndex: 1,
                    width: 40,
                    height: 40,
                    boxShadow: 2
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
                    bgcolor: 'rgba(255,255,255,0.8)',
                    color: 'black',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                    zIndex: 1,
                    width: 40,
                    height: 40,
                    boxShadow: 2
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </>
            )}
                      </Box>
          </Box>
        </Grid>

        {/* Product Details Section */}
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
                disabled={!modelsLoaded}
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 1,
                  fontFamily: 'Inter, Arial, sans-serif',
                  textTransform: 'none'
                }}
              >
                {modelsLoaded ? 'Add to Cart' : 'Loading...'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}