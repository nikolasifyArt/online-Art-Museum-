import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { setupEnvironment, loadArtworks } from '../utils/sceneSetup';

interface GallerySceneProps {
  onCameraReady: (camera: THREE.PerspectiveCamera) => void;
}

const GalleryScene: React.FC<GallerySceneProps> = ({ onCameraReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.7, 5);
    cameraRef.current = camera;
    onCameraReady(camera);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup scene environment and artworks
    setupEnvironment(scene);
    loadArtworks(scene);

    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.rotateSpeed = 0.5;
    controlsRef.current = controls;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('touchmove', handleTouchMove, { 
      passive: false 
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('touchmove', handleTouchMove);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      controls.dispose();
      renderer.dispose();
    };
  }, [onCameraReady]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default GalleryScene;