import { useCallback } from 'react';
import * as THREE from 'three';

export const useGalleryControls = (camera: THREE.PerspectiveCamera | null) => {
  const moveLeft = useCallback(() => {
    if (!camera) return;
    camera.position.x -= 2;
  }, [camera]);

  const moveRight = useCallback(() => {
    if (!camera) return;
    camera.position.x += 2;
  }, [camera]);

  const zoomIn = useCallback(() => {
    if (!camera) return;
    camera.position.z -= 1;
  }, [camera]);

  const zoomOut = useCallback(() => {
    if (!camera) return;
    camera.position.z += 1;
  }, [camera]);

  return {
    moveLeft,
    moveRight,
    zoomIn,
    zoomOut,
  };
};