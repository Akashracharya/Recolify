import React from 'react';
import { X } from 'lucide-react';
import PixelFrame from './PixelFrame';

export default function FlashcardModal({ flashcard, isFlipped, onFlip, onClose }) {
  return (
    
    <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div
          onClick={onFlip}
          className="relative w-full h-64 cursor-pointer perspective-1000"
        >
          <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            <PixelFrame className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 flex items-center justify-center backface-hidden">
              <h3 className="text-2xl font-bold text-center text-white">
                {flashcard.front}
              </h3>
            </PixelFrame>
            
            {/* Back */}
            <PixelFrame className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 flex items-center justify-center backface-hidden rotate-y-180">
              <p className="text-lg text-center text-white leading-relaxed">
                {flashcard.back}
              </p>
            </PixelFrame>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Click card to flip • Tap outside to close
        </p>
      </div>
    </div>
  );
}