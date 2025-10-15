// src/components/PixelPressableButton.jsx
import React from 'react';

const clipPathPolygon = 'polygon(4px 0px, 4px 2px, 2px 2px, 2px 4px, 0px 4px, 0px calc(100% - 4px), 2px calc(100% - 4px), 2px calc(100% - 2px), 4px calc(100% - 2px), 4px 100%, calc(100% - 4px) 100%, calc(100% - 4px) calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) calc(100% - 4px), 100% calc(100% - 4px), 100% calc(100% - 4px), 100% 4px, calc(100% - 2px) 4px, calc(100% - 2px) 2px, calc(100% - 4px) 2px, calc(100% - 4px) 0px)';

const borderImageUrl =
  "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_183_5329)'%3E%3Cpath d='M2 0H3V1H2V0ZM3 0H4V1H3V0ZM1 1H2V2H1V1ZM4 1H5V2H4V1ZM0 2H1V3H0V2ZM5 2H6V3H5V2ZM0 3H1V4H0V3ZM5 3H6V4H5V3ZM1 4H2V5H1V4ZM4 4H5V5H4V4ZM2 5H3V6H2V5ZM3 5H4V6H3V5Z' fill='currentColor'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_183_5329'%3E%3Crect width='6' height='6' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A\")";

const PixelPressableButton = ({
  children,
  onClick,
  className = '',
  topColor = '#fbbf24', // Default: amber-400
  shadowColor = '#d97706', // Default: amber-600
  textColor = '#000000', // Default: black
  borderColor = 'currentColor', // Optional: for future customization
}) => {
  const frameStyles = {
    borderImage: `${borderImageUrl} 2 / 4px / 0px stretch`,
    borderWidth: '4px',
    clipPath: clipPathPolygon,
    color: borderColor,
  };

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer group font-pixel relative border-none bg-transparent text-sm font-bold tracking-wider ${className}`}
      style={{ color: textColor }}
    >
      {/* Layer 2: Top Face */}
      <span
        style={{
          ...frameStyles,
          backgroundColor: topColor,
        }}
        className="
          absolute inset-0 z-20 bottom-[4px]
          transition-all duration-100 ease-in-out
          group-active:top-[6px] group-active:bottom-0
        "
      />

      {/* Layer 3: Text */}
      <span
        className="
          btn-content relative z-30 block px-4 py-2
          transition-all duration-100 ease-in-out
          group-active:top-[6px]
        "
      >
        {children}
      </span>

      {/* Layer 1: Base Shadow */}
      <span
        style={{
          ...frameStyles,
          backgroundColor: shadowColor,
        }}
        className="absolute inset-0 z-10 top-[6px]"
      />
    </button>
  );
};

export default PixelPressableButton;
