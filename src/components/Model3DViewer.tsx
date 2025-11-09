import React from 'react';

interface Model3DViewerProps {
  polycamUrl: string;
  title?: string;
  height?: string;
}

export const Model3DViewer: React.FC<Model3DViewerProps> = ({ 
  polycamUrl, 
  title = 'Modèle 3D',
  height = '500px' 
}) => {
  return (
    <div style={{
      width: '100%',
      height: height,
      borderRadius: '12px',
      overflow: 'hidden',
      border: '2px solid var(--border)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    }}>
      <iframe
        src={polycamUrl}
        title={title}
        style={{
          height: '100%',
          width: '100%',
          border: 'none',
        }}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
