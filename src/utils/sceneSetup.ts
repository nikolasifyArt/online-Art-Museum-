import * as THREE from 'three';
import { artworks } from '../data/artworks';
import { setupAdvancedLighting } from './lighting';
import { createArchitecture } from './architecture';

export const setupEnvironment = (scene: THREE.Scene, renderer: THREE.WebGLRenderer) => {
  // Create environment map
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(new THREE.Scene()).texture;
  pmremGenerator.dispose();

  // Add fog for depth
  scene.fog = new THREE.Fog(0xffffff, 5, 30);

  // Setup architecture
  createArchitecture(scene);

  // Setup lighting
  setupAdvancedLighting(scene);
};

export const loadArtworks = (scene: THREE.Scene) => {
  const textureLoader = new THREE.TextureLoader();
  const frameGeometry = new THREE.BoxGeometry(2.2, 2.2, 0.1);
  
  // Create ornate frame material
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.5,
    metalness: 0.7,
    envMapIntensity: 1.0,
  });

  artworks.forEach((artwork) => {
    // Create frame with more detail
    const frameGroup = new THREE.Group();

    // Main frame
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.castShadow = true;
    frame.receiveShadow = true;
    frameGroup.add(frame);

    // Add frame details
    const innerFrameGeometry = new THREE.BoxGeometry(2.0, 2.0, 0.12);
    const innerFrame = new THREE.Mesh(innerFrameGeometry, frameMaterial);
    innerFrame.position.z = 0.01;
    frameGroup.add(innerFrame);

    frameGroup.position.set(...artwork.position);
    scene.add(frameGroup);

    // Create artwork canvas with improved material
    const artworkGeometry = new THREE.PlaneGeometry(2, 2);
    textureLoader.load(artwork.imageUrl, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const artworkMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.FrontSide,
        roughness: 0.5,
        metalness: 0.0,
      });
      const artworkMesh = new THREE.Mesh(artworkGeometry, artworkMaterial);
      artworkMesh.position.set(
        artwork.position[0],
        artwork.position[1],
        artwork.position[2] + 0.06
      );
      scene.add(artworkMesh);
    });
  });
};