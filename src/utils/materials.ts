import * as THREE from 'three';

export const createMarbleMaterial = () => {
  const marbleTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/marble.jpg');
  marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
  marbleTexture.repeat.set(4, 4);
  
  return new THREE.MeshStandardMaterial({
    map: marbleTexture,
    roughness: 0.2,
    metalness: 0.1,
    envMapIntensity: 1.0,
  });
};

export const createWoodMaterial = () => {
  const woodTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/hardwood2_diffuse.jpg');
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(2, 2);

  return new THREE.MeshStandardMaterial({
    map: woodTexture,
    roughness: 0.8,
    metalness: 0.1,
  });
};

export const createGlassMaterial = () => {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95,
    transparent: true,
  });
};