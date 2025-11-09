import React, { useState, useRef } from 'react';
import { Maximize2, Plus, Trash2, Move, Edit2, Save } from 'lucide-react';
import { VenueLayout, VenueElement, Musician } from '../types';
import { generateId } from '../utils/helpers';

interface VenueVisualizerProps {
  layout: VenueLayout | null;
  musicians: Musician[];
  onSaveLayout: (layout: VenueLayout) => void;
}

export const VenueVisualizer: React.FC<VenueVisualizerProps> = ({
  layout: initialLayout,
  musicians,
  onSaveLayout,
}) => {
  const [layout, setLayout] = useState<VenueLayout>(
    initialLayout || {
      id: generateId(),
      name: 'Nouvelle disposition',
      width: 800,
      height: 600,
      elements: [],
    }
  );

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementTypes = [
    { type: 'stage', label: 'Scène', icon: '🎭', color: '#8B1538', width: 200, height: 100 },
    { type: 'piano', label: 'Piano', icon: '🎹', color: '#D4AF37', width: 80, height: 60 },
    { type: 'musician', label: 'Musicien', icon: '🎵', color: '#C19A6B', width: 40, height: 40 },
    { type: 'mic', label: 'Micro', icon: '🎤', color: '#2D6A4F', width: 20, height: 30 },
    { type: 'speaker', label: 'Enceinte', icon: '🔊', color: '#6E6E6E', width: 40, height: 60 },
    { type: 'monitor', label: 'Retour', icon: '📢', color: '#9B2226', width: 35, height: 25 },
    { type: 'table', label: 'Table', icon: '🪑', color: '#A0522D', width: 80, height: 60 },
  ];

  const addElement = (type: string) => {
    const elementType = elementTypes.find(et => et.type === type);
    if (!elementType) return;

    const newElement: VenueElement = {
      id: generateId(),
      type: type as any,
      x: layout.width / 2 - elementType.width / 2,
      y: layout.height / 2 - elementType.height / 2,
      width: elementType.width,
      height: elementType.height,
      rotation: 0,
      color: elementType.color,
    };

    setLayout({
      ...layout,
      elements: [...layout.elements, newElement],
    });
    setSelectedElement(newElement.id);
  };

  const deleteElement = (id: string) => {
    setLayout({
      ...layout,
      elements: layout.elements.filter(e => e.id !== id),
    });
    setSelectedElement(null);
  };

  const updateElement = (id: string, updates: Partial<VenueElement>) => {
    setLayout({
      ...layout,
      elements: layout.elements.map(e => (e.id === id ? { ...e, ...updates } : e)),
    });
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const element = layout.elements.find(el => el.id === elementId);
    if (!element) return;

    setSelectedElement(elementId);
    setIsDragging(true);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = Math.max(0, Math.min(layout.width, e.clientX - rect.left - dragOffset.x));
      const y = Math.max(0, Math.min(layout.height, e.clientY - rect.top - dragOffset.y));

      updateElement(selectedElement, { x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const selectedEl = layout.elements.find(e => e.id === selectedElement);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Visualisation de la salle</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
              Créez et gérez la disposition de la scène et des musiciens
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onSaveLayout(layout)}>
            <Save size={20} /> Sauvegarder
          </button>
        </div>

        {/* Layout Name */}
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="form-label">Nom de la disposition</label>
          <input
            type="text"
            className="form-input"
            value={layout.name}
            onChange={(e) => setLayout({ ...layout, name: e.target.value })}
          />
        </div>

        {/* Element Palette */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--dark)' }}>
            <Plus size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Ajouter des éléments
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {elementTypes.map((et) => (
              <button
                key={et.type}
                className="btn btn-outline btn-small"
                onClick={() => addElement(et.type)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span style={{ fontSize: '1.25rem' }}>{et.icon}</span>
                {et.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedElement ? '1fr 300px' : '1fr', gap: '2rem' }}>
          <div>
            <div
              ref={canvasRef}
              style={{
                width: '100%',
                aspectRatio: `${layout.width} / ${layout.height}`,
                maxHeight: '600px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                border: '3px solid var(--border)',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'hidden',
                cursor: isDragging ? 'grabbing' : 'default',
                boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Grid */}
              <svg
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                viewBox={`0 0 ${layout.width} ${layout.height}`}
              >
                <defs>
                  <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#ddd" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width={layout.width} height={layout.height} fill="url(#grid)" />
              </svg>

              {/* Elements */}
              {layout.elements.map((element) => {
                const elementType = elementTypes.find(et => et.type === element.type);
                return (
                  <div
                    key={element.id}
                    onMouseDown={(e) => handleMouseDown(e, element.id)}
                    style={{
                      position: 'absolute',
                      left: `${(element.x / layout.width) * 100}%`,
                      top: `${(element.y / layout.height) * 100}%`,
                      width: `${(element.width / layout.width) * 100}%`,
                      height: `${(element.height / layout.height) * 100}%`,
                      background: element.color || elementType?.color || '#666',
                      border: selectedElement === element.id ? '3px solid var(--secondary)' : '2px solid rgba(0, 0, 0, 0.3)',
                      borderRadius: element.type === 'musician' ? '50%' : '8px',
                      cursor: 'grab',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      transform: `rotate(${element.rotation || 0}deg)`,
                      transition: selectedElement === element.id ? 'none' : 'all 0.2s',
                      boxShadow: selectedElement === element.id ? '0 4px 12px rgba(212, 175, 55, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {elementType?.icon}
                    {element.label && (
                      <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.75rem', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: '4px' }}>
                        {element.label}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* No elements message */}
              {layout.elements.length === 0 && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'var(--gray)' }}>
                  <Maximize2 size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>Cliquez sur les boutons ci-dessus pour ajouter des éléments</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9375rem', color: 'var(--dark)' }}>
                💡 Astuce
              </h4>
              <ul style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: '1.8', marginLeft: '1.25rem' }}>
                <li>Cliquez et glissez pour déplacer les éléments</li>
                <li>Sélectionnez un élément pour modifier ses propriétés</li>
                <li>Utilisez le panneau de droite pour personnaliser</li>
              </ul>
            </div>
          </div>

          {/* Properties Panel */}
          {selectedEl && (
            <div className="card" style={{ height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--primary)' }}>
                  <Edit2 size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Propriétés
                </h3>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => deleteElement(selectedEl.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Étiquette</label>
                <input
                  type="text"
                  className="form-input"
                  value={selectedEl.label || ''}
                  onChange={(e) => updateElement(selectedEl.id, { label: e.target.value })}
                  placeholder="Nom ou description"
                />
              </div>

              {selectedEl.type === 'musician' && (
                <div className="form-group">
                  <label className="form-label">Musicien</label>
                  <select
                    className="form-select"
                    value={selectedEl.musicianId || ''}
                    onChange={(e) => updateElement(selectedEl.id, { musicianId: e.target.value })}
                  >
                    <option value="">Sélectionner un musicien</option>
                    {musicians.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.firstName} {m.lastName} - {m.instrument}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Couleur</label>
                <input
                  type="color"
                  className="form-input"
                  value={selectedEl.color || '#666666'}
                  onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rotation (degrés)</label>
                <input
                  type="number"
                  className="form-input"
                  value={selectedEl.rotation || 0}
                  onChange={(e) => updateElement(selectedEl.id, { rotation: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="360"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Largeur</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedEl.width}
                    onChange={(e) => updateElement(selectedEl.id, { width: parseInt(e.target.value) || 40 })}
                    min="20"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Hauteur</label>
                  <input
                    type="number"
                    className="form-input"
                    value={selectedEl.height}
                    onChange={(e) => updateElement(selectedEl.id, { height: parseInt(e.target.value) || 40 })}
                    min="20"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={selectedEl.notes || ''}
                  onChange={(e) => updateElement(selectedEl.id, { notes: e.target.value })}
                  placeholder="Notes additionnelles..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(139, 21, 56, 0.05)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
            📊 Statistiques de la disposition
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <span style={{ color: 'var(--gray)' }}>Total éléments:</span>
              <span style={{ fontWeight: 600, marginLeft: '0.5rem', color: 'var(--dark)' }}>{layout.elements.length}</span>
            </div>
            <div>
              <span style={{ color: 'var(--gray)' }}>Musiciens:</span>
              <span style={{ fontWeight: 600, marginLeft: '0.5rem', color: 'var(--dark)' }}>
                {layout.elements.filter(e => e.type === 'musician').length}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--gray)' }}>Micros:</span>
              <span style={{ fontWeight: 600, marginLeft: '0.5rem', color: 'var(--dark)' }}>
                {layout.elements.filter(e => e.type === 'mic').length}
              </span>
            </div>
            <div>
              <span style={{ color: 'var(--gray)' }}>Pianos:</span>
              <span style={{ fontWeight: 600, marginLeft: '0.5rem', color: 'var(--dark)' }}>
                {layout.elements.filter(e => e.type === 'piano').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
