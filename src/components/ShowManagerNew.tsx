import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, MapPin, Clock, Users, Sparkles, PartyPopper } from 'lucide-react';
import { Show, Setlist } from '../types';
import { formatDateTime, generateId } from '../utils/helpers';

interface ShowManagerProps {
  shows: Show[];
  setlists: Setlist[];
  onAddShow: (show: Show) => void;
  onUpdateShow: (show: Show) => void;
  onDeleteShow: (id: string) => void;
}

export const ShowManagerNew: React.FC<ShowManagerProps> = ({
  shows,
  setlists,
  onAddShow,
  onUpdateShow,
  onDeleteShow,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Dates suggérées pour spectacles (exemple)
  const suggestedDates = [
    { date: new Date(2025, 11, 15, 19, 30), label: '15 décembre 2025', theme: 'Noël', emoji: '🎄', color: '#D32F2F' },
    { date: new Date(2025, 11, 20, 20, 0), label: '20 décembre 2025', theme: 'Fin d\'année', emoji: '✨', color: '#D4AF37' },
    { date: new Date(2026, 2, 21, 19, 0), label: '21 mars 2026', theme: 'Printemps', emoji: '🌸', color: '#E91E63' },
    { date: new Date(2026, 5, 20, 18, 30), label: '20 juin 2026', theme: 'Été', emoji: '☀️', color: '#FF9800' },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const show: Show = editingShow
      ? { ...editingShow, updatedAt: new Date() }
      : {
          id: generateId(),
          name: '',
          venue: '',
          date: new Date(),
          technicalSheet: {
            stage: { power: [] },
            sound: { channels: [], monitors: 0 },
            lighting: {},
            backline: [],
          },
          status: 'planned',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

    show.name = formData.get('name') as string;
    show.venue = formData.get('venue') as string;
    show.date = selectedDate || new Date(formData.get('date') as string);
    show.setlistId = formData.get('setlistId') as string || undefined;
    show.status = formData.get('status') as 'planned' | 'confirmed' | 'completed' | 'cancelled';
    show.notes = formData.get('notes') as string;

    if (editingShow) {
      onUpdateShow(show);
    } else {
      onAddShow(show);
    }

    setShowModal(false);
    setEditingShow(null);
    setSelectedDate(null);
  };

  const handleEdit = (show: Show) => {
    setEditingShow(show);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      planned: 'badge-info',
      confirmed: 'badge-success',
      completed: 'badge-gray',
      cancelled: 'badge-danger',
    };
    return colors[status] || 'badge-gray';
  };

  const sortedShows = [...shows].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const upcomingShows = sortedShows.filter(s => new Date(s.date) >= new Date() && s.status !== 'cancelled');
  const pastShows = sortedShows.filter(s => new Date(s.date) < new Date() || s.status === 'completed');

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <PartyPopper size={32} style={{ color: 'var(--secondary)' }} />
              Spectacles
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
              Planifiez vos représentations et célébrations musicales
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} /> Nouveau spectacle
          </button>
        </div>

        {/* Festive Stats */}
        <div className="stats-grid">
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', color: 'white', border: 'none' }}>
            <div className="stat-value" style={{ color: 'white' }}>{shows.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Spectacles totaux</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)', color: 'white', border: 'none' }}>
            <div className="stat-value" style={{ color: 'white' }}>{upcomingShows.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>À venir</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)', color: 'white', border: 'none' }}>
            <div className="stat-value" style={{ color: 'white' }}>{shows.filter(s => s.status === 'confirmed').length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Confirmés</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none' }}>
            <div className="stat-value" style={{ color: 'white' }}>{pastShows.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Complétés</div>
          </div>
        </div>

        {shows.length === 0 ? (
          <div className="empty-state">
            <PartyPopper size={64} className="empty-state-icon" style={{ color: 'var(--secondary)' }} />
            <h3 className="empty-state-title">Aucun spectacle planifié</h3>
            <p className="empty-state-text">Créez votre premier spectacle et célébrez la musique!</p>
          </div>
        ) : (
          <div>
            {upcomingShows.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={24} style={{ color: 'var(--secondary)' }} />
                  Spectacles à venir
                </h3>
                <div className="grid">
                  {upcomingShows.map((show) => (
                    <ShowCard
                      key={show.id}
                      show={show}
                      setlists={setlists}
                      onEdit={handleEdit}
                      onDelete={onDeleteShow}
                      getStatusBadge={getStatusBadge}
                      isFuture={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {pastShows.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--gray)', fontFamily: "'Playfair Display', serif" }}>
                  Spectacles passés
                </h3>
                <div className="grid">
                  {pastShows.map((show) => (
                    <ShowCard
                      key={show.id}
                      show={show}
                      setlists={setlists}
                      onEdit={handleEdit}
                      onDelete={onDeleteShow}
                      getStatusBadge={getStatusBadge}
                      isFuture={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Show Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setEditingShow(null);
          setSelectedDate(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)' }}>
              <h3 className="modal-title" style={{ color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PartyPopper size={28} />
                {editingShow ? 'Modifier le spectacle' : 'Nouveau spectacle'}
              </h3>
              <button className="btn btn-small" onClick={() => {
                setShowModal(false);
                setEditingShow(null);
                setSelectedDate(null);
              }} style={{ background: 'rgba(0,0,0,0.1)' }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nom du spectacle *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="ex: Spectacle Interlude - Générations 2025"
                    defaultValue={editingShow?.name}
                    required
                  />
                </div>

                {/* Date Suggestions */}
                {!editingShow && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" style={{ marginBottom: '1rem' }}>Dates suggérées pour les spectacles</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      {suggestedDates.map((suggested, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedDate(suggested.date)}
                          style={{
                            padding: '1rem',
                            border: selectedDate?.getTime() === suggested.date.getTime() ? `3px solid ${suggested.color}` : '2px solid var(--border)',
                            borderRadius: '12px',
                            background: selectedDate?.getTime() === suggested.date.getTime() 
                              ? `linear-gradient(135deg, ${suggested.color}15, ${suggested.color}05)` 
                              : 'var(--white)',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            textAlign: 'left',
                          }}
                          className={selectedDate?.getTime() === suggested.date.getTime() ? '' : 'list-item'}
                        >
                          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{suggested.emoji}</div>
                          <div style={{ fontWeight: 600, color: suggested.color, marginBottom: '0.25rem' }}>{suggested.theme}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{suggested.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '0.25rem' }}>
                            <Clock size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                            {suggested.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Lieu *</label>
                    <input
                      type="text"
                      name="venue"
                      className="form-input"
                      placeholder="ex: Centre d'art La Chapelle"
                      defaultValue={editingShow?.venue}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date & Heure {selectedDate && '(sélectionnée)'}</label>
                    <input
                      type="datetime-local"
                      name="date"
                      className="form-input"
                      defaultValue={editingShow ? new Date(editingShow.date).toISOString().slice(0, 16) : selectedDate ? selectedDate.toISOString().slice(0, 16) : ''}
                      required={!selectedDate}
                      disabled={!!selectedDate}
                      style={{ background: selectedDate ? 'var(--light-gray)' : 'var(--white)' }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Liste de lecture</label>
                    <select name="setlistId" className="form-select" defaultValue={editingShow?.setlistId || ''}>
                      <option value="">Aucune liste assignée</option>
                      {setlists.map((setlist) => (
                        <option key={setlist.id} value={setlist.id}>
                          {setlist.name} ({setlist.songs.length} chansons)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Statut</label>
                    <select name="status" className="form-select" defaultValue={editingShow?.status || 'planned'}>
                      <option value="planned">Planifié</option>
                      <option value="confirmed">Confirmé</option>
                      <option value="completed">Complété</option>
                      <option value="cancelled">Annulé</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="Notes sur le spectacle, invités spéciaux, thème..."
                    defaultValue={editingShow?.notes}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setEditingShow(null);
                  setSelectedDate(null);
                }}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingShow ? 'Mettre à jour' : 'Créer le spectacle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface ShowCardProps {
  show: Show;
  setlists: Setlist[];
  onEdit: (show: Show) => void;
  onDelete: (id: string) => void;
  getStatusBadge: (status: string) => string;
  isFuture: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, setlists, onEdit, onDelete, getStatusBadge, isFuture }) => {
  const setlist = setlists.find(s => s.id === show.setlistId);

  const cardGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  ];

  const gradient = cardGradients[Math.abs(show.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % cardGradients.length];

  return (
    <div 
      className="list-item" 
      style={{ 
        borderLeft: 'none',
        background: isFuture ? gradient : 'var(--white)',
        color: isFuture ? 'white' : 'inherit',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {isFuture && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '2rem', opacity: 0.2 }}>
          ✨
        </div>
      )}
      
      <div className="list-item-header">
        <div>
          <h3 className="list-item-title" style={{ color: isFuture ? 'white' : 'var(--primary)' }}>
            {show.name}
          </h3>
          <p className="list-item-subtitle" style={{ color: isFuture ? 'rgba(255,255,255,0.9)' : 'var(--gray)' }}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {show.venue} • {formatDateTime(show.date)}
          </p>
        </div>
        <div className="list-item-actions">
          <button className="btn btn-small" onClick={() => onEdit(show)} style={{ background: isFuture ? 'rgba(255,255,255,0.2)' : undefined, color: isFuture ? 'white' : undefined }}>
            <Edit2 size={16} />
          </button>
          <button className="btn btn-small btn-danger" onClick={() => onDelete(show.id)} style={{ background: isFuture ? 'rgba(255,255,255,0.2)' : undefined }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <span className={`badge ${getStatusBadge(show.status)}`} style={{ background: isFuture ? 'rgba(255,255,255,0.25)' : undefined, border: isFuture ? '1px solid rgba(255,255,255,0.4)' : undefined, color: isFuture ? 'white' : undefined }}>
          {show.status}
        </span>
        {setlist && (
          <span className="badge badge-info" style={{ marginLeft: '0.5rem', background: isFuture ? 'rgba(255,255,255,0.25)' : undefined, border: isFuture ? '1px solid rgba(255,255,255,0.4)' : undefined, color: isFuture ? 'white' : undefined }}>
            {setlist.name}
          </span>
        )}
      </div>

      {show.notes && (
        <p style={{ fontSize: '0.875rem', color: isFuture ? 'rgba(255,255,255,0.9)' : 'var(--gray)' }}>
          {show.notes}
        </p>
      )}
    </div>
  );
};
