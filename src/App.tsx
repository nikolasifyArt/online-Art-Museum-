import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import GalleryScene from './components/GalleryScene';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import { ArtworkItem } from './types/Gallery';
import { Palette } from 'lucide-react';
import { useGalleryControls } from './hooks/useGalleryControls';

function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const { moveLeft, moveRight, zoomIn, zoomOut } = useGalleryControls(camera);

  const handleCameraReady = useCallback((cam: THREE.PerspectiveCamera) => {
    setCamera(cam);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-4 left-4 z-10">
        <h1 className="flex items-center gap-2 text-2xl font-bold bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
          <Palette className="w-6 h-6" />
          Digital Art Gallery
        </h1>
      </div>
      
      <GalleryScene onCameraReady={handleCameraReady} />
      <InfoPanel 
        artwork={selectedArtwork} 
        onClose={() => setSelectedArtwork(null)} 
      />
      <Controls
        onMoveLeft={moveLeft}
        onMoveRight={moveRight}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
      />
      
      <div className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <p className="text-sm text-gray-700">
          Use mouse/touch to look around<br />
          Drag to rotate • Scroll/Pinch to zoom
        </p>
      </div>
    </div>
  );
}

export default App;