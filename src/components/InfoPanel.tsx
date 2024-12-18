import React from 'react';
import { ArtworkItem } from '../types/Gallery';
import { X } from 'lucide-react';

interface InfoPanelProps {
  artwork: ArtworkItem | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white/95 backdrop-blur-sm p-6 shadow-lg transform transition-transform">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
        <p className="text-gray-600 mb-4">
          {artwork.artist}, {artwork.year}
        </p>
        <p className="text-gray-800 mb-6">{artwork.description}</p>
      </div>
    </div>
  );
};

export default InfoPanel;