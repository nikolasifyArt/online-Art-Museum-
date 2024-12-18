import * as THREE from 'three';
import { createMarbleMaterial, createWoodMaterial, createGlassMaterial } from './materials';

export const createArchitecture = (scene: THREE.Scene) => {
  // Floor
  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floor = new THREE.Mesh(floorGeometry, createMarbleMaterial());
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.5,
    metalness: 0.1,
  });

  // Create detailed wall segments with moldings
  const createWallWithMolding = (width: number, height: number, position: THREE.Vector3, rotation: THREE.Euler) => {
    const group = new THREE.Group();

    // Main wall
    const wallGeometry = new THREE.BoxGeometry(width, height, 0.2);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.castShadow = true;
    wall.receiveShadow = true;
    group.add(wall);

    // Crown molding
    const crownGeometry = new THREE.BoxGeometry(width + 0.2, 0.2, 0.3);
    const crown = new THREE.Mesh(crownGeometry, createWoodMaterial());
    crown.position.y = height / 2;
    crown.position.z = 0.1;
    crown.castShadow = true;
    group.add(crown);

    // Baseboard
    const baseboardGeometry = new THREE.BoxGeometry(width + 0.2, 0.3, 0.2);
    const baseboard = new THREE.Mesh(baseboardGeometry, createWoodMaterial());
    baseboard.position.y = -height / 2;
    baseboard.position.z = 0.05;
    group.add(baseboard);

    group.position.copy(position);
    group.setRotationFromEuler(rotation);
    return group;
  };

  // Add walls
  const walls = [
    // Back wall
    createWallWithMolding(20, 4, new THREE.Vector3(0, 2, -5), new THREE.Euler(0, 0, 0)),
    // Left wall
    createWallWithMolding(10, 4, new THREE.Vector3(-10, 2, 0), new THREE.Euler(0, Math.PI / 2, 0)),
    // Right wall
    createWallWithMolding(10, 4, new THREE.Vector3(10, 2, 0), new THREE.Euler(0, -Math.PI / 2, 0)),
  ];

  walls.forEach(wall => scene.add(wall));

  // Add ceiling
  const ceilingGeometry = new THREE.PlaneGeometry(20, 10);
  const ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
  ceiling.position.set(0, 4, 0);
  ceiling.rotation.x = Math.PI / 2;
  scene.add(ceiling);

  // Add decorative columns
  const createColumn = (x: number, z: number) => {
    const group = new THREE.Group();

    // Column base
    const baseGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.8);
    const base = new THREE.Mesh(baseGeometry, createMarbleMaterial());
    base.position.y = 0.1;
    group.add(base);

    // Column shaft
    const shaftGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.6, 16);
    const shaft = new THREE.Mesh(shaftGeometry, createMarbleMaterial());
    shaft.position.y = 2;
    group.add(shaft);

    // Column capital
    const capitalGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.6);
    const capital = new THREE.Mesh(capitalGeometry, createMarbleMaterial());
    capital.position.y = 3.9;
    group.add(capital);

    group.position.set(x, 0, z);
    return group;
  };

  // Add columns at strategic positions
  [-8, 8].forEach(x => {
    scene.add(createColumn(x, -4.5));
  });

  // Add glass display cases
  const createDisplayCase = (x: number) => {
    const group = new THREE.Group();

    // Glass case
    const glassGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);
    const glass = new THREE.Mesh(glassGeometry, createGlassMaterial());
    glass.position.y = 1;
    group.add(glass);

    // Base
    const baseGeometry = new THREE.BoxGeometry(2, 0.2, 2);
    const base = new THREE.Mesh(baseGeometry, createWoodMaterial());
    base.position.y = -0.1;
    group.add(base);

    group.position.set(x, 0, -2);
    return group;
  };

  // Add display cases
  [-6, -2, 2, 6].forEach(x => {
    scene.add(createDisplayCase(x));
  });
};