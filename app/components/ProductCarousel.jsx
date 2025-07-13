'use client';
import React, { useState, useRef, Suspense, useMemo, useEffect } from 'react';
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
  CircularProgress,
  Skeleton
} from '@mui/material';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Male,
  Female
} from '@mui/icons-material';
import dynamic from 'next/dynamic';

// LAZY LOAD 3D COMPONENTS FOR MOBILE PERFORMANCE
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <MobileFallback />
});

const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), {
  ssr: false
});

const PerspectiveCamera = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.PerspectiveCamera })), {
  ssr: false
});

// MOBILE-FIRST OPTIMIZATION SYSTEM
const modelCache = new Map();
const loadingPromises = new Map();
const modelPaths = [
  "/Rangers_FC_Jersey_Red.glb",
  "/Rangers_FC_Jersey_White.glb"
];

// Mobile-optimized preloading with connection-aware loading
const preloadModels = async (onProgress, isMobile = false) => {
  if (typeof window === 'undefined') return;
  
  // Check connection speed (mobile optimization)
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  if (isMobile && slowConnection) {
    console.log('Slow connection detected, loading models sequentially');
    // Load models one by one on slow connections
    for (let i = 0; i < modelPaths.length; i++) {
      await loadSingleModel(modelPaths[i], onProgress, i, modelPaths.length);
    }
    return;
  }
  
  // Normal parallel loading for fast connections
  const GLTFLoader = (await import('three/examples/jsm/loaders/GLTFLoader')).GLTFLoader;
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
      
      // AGGRESSIVE MOBILE OPTIMIZATION
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = true;
          
          // Reduce geometry complexity on mobile
          if (child.geometry && isMobile) {
            child.geometry.computeBoundingSphere();
            // Reduce vertex count if too complex
            if (child.geometry.attributes.position.count > 10000) {
              console.warn('Complex geometry detected, consider using LOD models');
            }
          }
          
          // Optimize materials for mobile
          if (child.material) {
            child.material.envMapIntensity = isMobile ? 0.3 : 0.5;
            child.material.needsUpdate = true;
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
      return null;
    });
    
    loadingPromises.set(path, promise);
    return promise;
  });
  
  await Promise.all(promises);
};

// Single model loading for slow connections
const loadSingleModel = async (path, onProgress, index, total) => {
  if (modelCache.has(path)) {
    onProgress?.((index + 1) / total);
    return;
  }
  
  const GLTFLoader = (await import('three/examples/jsm/loaders/GLTFLoader')).GLTFLoader;
  const loader = new GLTFLoader();
  
  try {
    const gltf = await loader.loadAsync(path);
    const scene = gltf.scene.clone();
    
    // Mobile optimization
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        if (child.material) {
          child.material.envMapIntensity = 0.2;
        }
      }
    });
    
    modelCache.set(path, scene);
    onProgress?.((index + 1) / total);
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    onProgress?.((index + 1) / total);
  }
};

// MOBILE FALLBACK COMPONENT
function MobileFallback() {
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: 2,
      bgcolor: 'grey.100',
      borderRadius: 2
    }}>
      <Skeleton variant="rectangular" width="80%" height="60%" animation="wave" />
      <Typography variant="body2" color="text.secondary">
        Loading 3D Model...
      </Typography>
    </Box>
  );
}

// OPTIMIZED 3D JERSEY COMPONENT
function JerseyModel({ glbPath, position, rotation, scale = 1, isMobile }) {
  const meshRef = useRef();
  
  const scene = useMemo(() => {
    if (modelCache.has(glbPath)) {
      return modelCache.get(glbPath).clone();
    }
    return null;
  }, [glbPath]);
  
  // Mobile-optimized animation
  const useFrame = React.useMemo(() => {
    if (typeof window === 'undefined') return () => {};
    return require('@react-three/fiber').useFrame;
  }, []);
  
  useFrame((state, delta) => {
    if (meshRef.current && !isMobile) {
      meshRef.current.rotation.y += delta * 0.1; // Slower rotation for mobile
    }
  });

  if (!scene) return null;

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

// MAIN COMPONENT
const jerseyData = [
  {
    id: 1,
    name: "Rangers FC Home Jersey",
    price: 35000,
    glbPath: "/Rangers_FC_Jersey_Red.glb",
    description: "Official match jersey with breathable fabric technology",
    image: "/jersey-red-fallback.jpg" // Fallback image
  },
  {
    id: 2,
    name: "Rangers FC Away Jersey",
    price: 38000,
    glbPath: "/Rangers_FC_Jersey_White.glb",
    description: "High-performance away jersey with moisture control",
    image: "/jersey-white-fallback.jpg" // Fallback image
  }
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function JerseyCarousel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isVerySmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedSize, setSelectedSize] = useState('M');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [use3D, setUse3D] = useState(false);
  const [showFallback, setShowFallback] = useState(isMobile);

  // SMART LOADING STRATEGY
  useEffect(() => {
    const initializeModels = async () => {
      // Only load 3D on desktop or when user explicitly requests it
      if (!isMobile || use3D) {
        setShowFallback(false);
        await preloadModels((progress) => {
          setLoadingProgress(progress);
        }, isMobile);
        setModelsLoaded(true);
      }
    };
    
    initializeModels();
  }, [isMobile, use3D]);

  const currentJersey = jerseyData[currentIndex];

  const nextJersey = () => {
    setCurrentIndex((prev) => (prev + 1) % jerseyData.length);
  };

  const prevJersey = () => {
    setCurrentIndex((prev) => (prev - 1 + jerseyData.length) % jerseyData.length);
  };

  const enable3D = () => {
    setUse3D(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: isVerySmall ? 2 : 4 }}>
      <Grid container spacing={isVerySmall ? 2 : 4} alignItems="center">
        {/* 3D Model / Image Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            position: 'relative', 
            height: isVerySmall ? 300 : isMobile ? 400 : 600,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'grey.50',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            {/* MOBILE FALLBACK IMAGE */}
            {showFallback ? (
              <Box sx={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}>
                <Box 
                  component="img"
                  src={currentJersey.image}
                  alt={currentJersey.name}
                  sx={{ 
                    width: '80%', 
                    height: '60%', 
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <Button 
                  variant="contained" 
                  onClick={enable3D}
                  size="small"
                  sx={{ mt: 2 }}
                >
                  View in 3D
                </Button>
              </Box>
            ) : !modelsLoaded ? (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 2
              }}>
                <CircularProgress 
                  variant="determinate" 
                  value={loadingProgress * 100} 
                  size={isVerySmall ? 40 : 60} 
                />
                <Typography variant={isVerySmall ? "body2" : "h6"} color="text.secondary">
                  Loading 3D Models...
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.round(loadingProgress * 100)}% complete
                </Typography>
              </Box>
            ) : (
              <Canvas 
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto'
                }}
                performance={{ min: 0.2, max: isMobile ? 0.5 : 1 }}
                dpr={isMobile ? 1 : 2}
              >
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <OrbitControls 
                  enableZoom={!isMobile}
                  enablePan={false} 
                  enableRotate={!isMobile}
                  dampingFactor={0.05}
                  enableDamping={true}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                />
                
                {/* MOBILE-OPTIMIZED LIGHTING */}
                <ambientLight intensity={isMobile ? 0.7 : 0.5} />
                <directionalLight position={[10, 10, 5]} intensity={isMobile ? 0.5 : 0.8} />
                
                <Suspense fallback={null}>
                  <JerseyModel 
                    glbPath={currentJersey.glbPath}
                    position={[0, 0, 0]} 
                    rotation={[0, 0, 0]}
                    scale={isVerySmall ? 1 : isMobile ? 1.2 : 1.8}
                    isMobile={isMobile}
                  />
                </Suspense>
              </Canvas>
            )}
            
            {/* NAVIGATION ARROWS */}
            <IconButton
              onClick={prevJersey}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.9)',
                color: 'black',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                zIndex: 10,
                width: isVerySmall ? 32 : 40,
                height: isVerySmall ? 32 : 40,
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
                bgcolor: 'rgba(255,255,255,0.9)',
                color: 'black',
                '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                zIndex: 10,
                width: isVerySmall ? 32 : 40,
                height: isVerySmall ? 32 : 40,
                boxShadow: 2
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* PRODUCT DETAILS */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            maxWidth: 500, 
            mx: 'auto',
            px: isVerySmall ? 1 : 2,
            mt: isMobile ? 2 : 0
          }}>
            <Typography 
              variant={isVerySmall ? "h6" : isMobile ? "h5" : "h4"} 
              component="h2" 
              gutterBottom 
              fontWeight={600}
              sx={{ 
                mb: 2,
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {currentJersey.name}
            </Typography>
            
            <Typography 
              variant={isVerySmall ? "h6" : isMobile ? "h5" : "h4"} 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: 'primary.main',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              ₦{currentJersey.price.toLocaleString()}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                lineHeight: 1.6,
                color: 'text.secondary',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {currentJersey.description}
            </Typography>

            {/* GENDER SELECTION */}
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600} 
                  sx={{ 
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Male fontSize="small" /> Male
                      </Box>
                    }
                    sx={{ mr: 2 }}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="small" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Female fontSize="small" /> Female
                      </Box>
                    }
                  />
                </RadioGroup>
              </Box>
            </FormControl>

            {/* SIZE SELECTION */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="subtitle1" 
                fontWeight={600} 
                sx={{ 
                  mb: 2,
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
                        minWidth: 'auto'
                      }}
                    >
                      {size}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* ADD TO CART */}
            <Box sx={{ px: isMobile ? 2 : 0 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
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