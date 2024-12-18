import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const useStreetViewControls = (
  camera: THREE.PerspectiveCamera | null,
  domElement: HTMLElement | null
) => {
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!camera || !domElement) return;

    const controls = new OrbitControls(camera, domElement);
    
    // Configure controls for street view-like experience
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    
    // Limit vertical rotation
    controls.minPolarAngle = Math.PI / 4; // 45 degrees
    controls.maxPolarAngle = Math.PI / 1.5; // 120 degrees
    
    // Limit zoom
    controls.minDistance = 2;
    controls.maxDistance = 10;
    
    // Enable smooth rotation
    controls.rotateSpeed = 0.5;
    
    controlsRef.current = controls;

    return () => {
      controls.dispose();
    };
  }, [camera, domElement]);

  // Update controls in animation loop
  const update = () => {
    controlsRef.current?.update();
  };

  return { update };
};