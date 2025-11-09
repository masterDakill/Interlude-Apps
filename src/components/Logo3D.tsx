import React, { useState, useRef, useEffect } from 'react';

interface Logo3DProps {
  size?: number;
  className?: string;
}

export const Logo3D: React.FC<Logo3DProps> = ({ size = 120, className = '' }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / rect.width;
    const deltaY = (e.clientY - centerY) / rect.height;
    
    setRotation({
      x: deltaY * 20, // max 20 degrees tilt
      y: deltaX * 20,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `
            rotateX(${rotation.x}deg) 
            rotateY(${rotation.y}deg)
            scale(${isHovered ? 1.1 : 1})
          `,
          transition: isHovered 
            ? 'transform 0.1s ease-out' 
            : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Main logo */}
        <img
          src="/logo.png"
          alt="Spectacle Interlude Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 30px rgba(139, 21, 56, 0.3))',
            transform: 'translateZ(0px)',
          }}
        />
        
        {/* Shadow layer for 3D effect */}
        <img
          src="/logo.png"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.3,
            filter: 'blur(8px) brightness(0.3)',
            transform: 'translateZ(-20px)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Reflection/shine effect */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                linear-gradient(
                  135deg,
                  transparent 0%,
                  rgba(255, 255, 255, 0.3) 45%,
                  rgba(255, 255, 255, 0.5) 50%,
                  rgba(255, 255, 255, 0.3) 55%,
                  transparent 100%
                )
              `,
              transform: 'translateZ(5px)',
              animation: 'shine 1.5s ease-in-out',
              pointerEvents: 'none',
              borderRadius: '50%',
            }}
          />
        )}
      </div>
      
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80%',
          height: '80%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(212, 175, 55, ${isHovered ? 0.3 : 0.15}), transparent 70%)`,
          transition: 'all 0.3s ease',
          pointerEvents: 'none',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />

      <style>{`
        @keyframes shine {
          0% {
            transform: translateZ(5px) translateX(-100%);
          }
          100% {
            transform: translateZ(5px) translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
