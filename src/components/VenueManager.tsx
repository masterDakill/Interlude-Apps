import React, { useState } from 'react';
import { Maximize2, Image, MapPin, Layout } from 'lucide-react';
import { VenueVisualizer } from './VenueVisualizer';
import { VenueGallery } from './VenueGallery';
import { SeatMap } from './SeatMap';
import { VenueLayout, Musician } from '../types';

interface VenueManagerProps {
  layout: VenueLayout | null;
  musicians: Musician[];
  onSaveLayout: (layout: VenueLayout) => void;
}

export const VenueManager: React.FC<VenueManagerProps> = ({
  layout,
  musicians,
  onSaveLayout,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'seatmap' | 'layout'>('gallery');

  return (
    <div>
      {/* Tabs */}
      <div style={{ 
        borderBottom: '2px solid var(--border)', 
        padding: '0 0 0 1rem', 
        display: 'flex', 
        gap: '0.5rem',
        marginBottom: '2rem',
      }}>
        <button
          className={`nav-button ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
          style={{ 
            borderBottom: activeTab === 'gallery' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Image size={18} /> Galerie Photos
        </button>
        <button
          className={`nav-button ${activeTab === 'seatmap' ? 'active' : ''}`}
          onClick={() => setActiveTab('seatmap')}
          style={{ 
            borderBottom: activeTab === 'seatmap' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <MapPin size={18} /> Plan de Salle
        </button>
        <button
          className={`nav-button ${activeTab === 'layout' ? 'active' : ''}`}
          onClick={() => setActiveTab('layout')}
          style={{ 
            borderBottom: activeTab === 'layout' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Layout size={18} /> Éditeur de Scène
        </button>
      </div>

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <VenueGallery />
      )}

      {/* Seat Map Tab */}
      {activeTab === 'seatmap' && (
        <SeatMap />
      )}

      {/* Layout Editor Tab */}
      {activeTab === 'layout' && (
        <VenueVisualizer
          layout={layout}
          musicians={musicians}
          onSaveLayout={onSaveLayout}
        />
      )}
    </div>
  );
};
