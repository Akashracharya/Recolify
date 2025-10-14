// src/components/PixelFrame.jsx

import React from 'react';

// The complex clip-path polygon
const clipPathPolygon = 'polygon(6px 0px, 6px 2px, 4px 2px, 4px 4px, 2px 4px, 2px 6px, 0px 6px, 0px calc(100% - 6px), 2px calc(100% - 6px), 2px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 2px), 6px calc(100% - 2px), 6px 100%, calc(100% - 6px) 100%, calc(100% - 6px) calc(100% - 2px), calc(100% - 4px) calc(100% - 2px), calc(100% - 4px) calc(100% - 4px), calc(100% - 2px) calc(100% - 4px), calc(100% - 2px) calc(100% - 6px), 100% calc(100% - 6px), 100% 6px, calc(100% - 2px) 6px, calc(100% - 2px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 2px, calc(100% - 6px) 2px, calc(100% - 6px) 0px)';

// URL-encoded SVG border image, now using 'currentColor' for the fill
const borderImageUrl = "url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1310_2574)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 0H3V1H2V2H1V3H0V4V5H1V6H2V7H3V8H4H5V7H6V6H7V5H8V4V3H7V2H6V1H5V0H4ZM5 1V2H6V3H7V4V5H6V6H5V7H4H3V6H2V5H1V4V3H2V2H3V1H4H5Z' fill='currentColor'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_1310_2574'%3E%3Crect width='8' height='8' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A\")";

const PixelFrame = ({ children, className = '', padding = 'p-8' }) => {
  return (
    <div
      className={`
        border-solid border-transparent 
        ${className}
      `}
      style={{
        borderImage: `${borderImageUrl} 3 / 6px / 0px stretch`,
        borderWidth: '6px',
        clipPath: clipPathPolygon,
      }}
    >
      <div className={padding}>
        {children}
      </div>
    </div>
  );
};

export default PixelFrame;