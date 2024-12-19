import * as THREE from 'three';

export const setupAdvancedLighting = (scene: THREE.Scene) => {
  // Ambient light for base illumination
  const ambientLight = new THREE.AmbientLight(0xff_ff_ff, 0.5);
  scene.add(ambientLight);

  // Main directional light (simulating sun)
  const mainLight = new THREE.DirectionalLight(0xff_ff_ff, 0.8);
  mainLight.position.set(5, 10, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 50;
  mainLight.shadow.bias = -0.0001;
  scene.add(mainLight);

  // Spotlights for artwork highlighting
  const createSpotlight = (x: number, z: number) => {
    const spotlight = new THREE.SpotLight(0xff_ff_ff, 1);
    spotlight.position.set(x, 4, z);
    spotlight.angle = Math.PI / 6;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1.5;
    spotlight.distance = 8;
    spotlight.castShadow = true;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    return spotlight;
  };

  // Add spotlights for each wall
  for (const x of [-4, 0, 4]) {
    scene.add(createSpotlight(x, -4.5));
  }

  // Add subtle point lights for ambient glow
  const pointLight1 = new THREE.PointLight(0xffffff, 0.3);
  pointLight1.position.set(0, 4, 0);
  scene.add(pointLight1);
};
