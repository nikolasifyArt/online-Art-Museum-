import React from 'react';
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg">
      <button
        onClick={onMoveLeft}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onZoomIn}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ZoomIn className="w-6 h-6" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ZoomOut className="w-6 h-6" />
      </button>
      <button
        onClick={onMoveRight}
       className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Controls; 