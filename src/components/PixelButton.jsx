// src/components/PixelButton.jsx

import React from 'react';

const PixelButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        font-pixel  // Use the pixel font
        relative
        py-3 px-8
        bg-yellow-400  // Main button color (#facc15)
        text-black
        text-sm
        font-bold
        rounded-lg
        shadow-[4px_4px_0px_#ca8a04] // The "3D" shadow effect (yellow-500)
        hover:bg-yellow-300
        active:translate-x-[4px]   // Move button on click
        active:translate-y-[4px]   // Move button on click
        active:shadow-none         // Remove shadow on click
        transition-all duration-150
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PixelButton;