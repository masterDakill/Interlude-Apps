import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Music as MusicIcon, Mic, User } from 'lucide-react';
import { Musician } from '../types';
import { generateId } from '../utils/helpers';

interface MusiciansProps {
  musicians: Musician[];
  onAddMusician: (musician: Musician) => void;
  onUpdateMusician: (musician: Musician) => void;
  onDeleteMusician: (id: string) => void;
}

export const Musicians: React.FC<MusiciansProps> = ({
  musicians,
  onAddMusician,
  onUpdateMusician,
  onDeleteMusician,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingMusician, setEditingMusician] = useState<Musician | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const musician: Musician = editingMusician
      ? { ...editingMusician }
      : {
          id: generateId(),
          firstName: '',
          lastName: '',
          instrument: '',
          isStudent: false,
          createdAt: new Date(),
        };

    musician.firstName = formData.get('firstName') as string;
    musician.lastName = formData.get('lastName') as string;
    musician.instrument = formData.get('instrument') as string;
    musician.isStudent = formData.get('isStudent') === 'on';
    musician.email = formData.get('email') as string;
    musician.phone = formData.get('phone') as string;
    musician.notes = formData.get('notes') as string;

    if (editingMusician) {
      onUpdateMusician(musician);
    } else {
      onAddMusician(musician);
    }

    setShowModal(false);
    setEditingMusician(null);
  };

  const handleEdit = (musician: Musician) => {
    setEditingMusician(musician);
    setShowModal(true);
  };

  const students = musicians.filter(m => m.isStudent);
  const professionals = musicians.filter(m => !m.isStudent);

  const instrumentCount: Record<string, number> = {};
  musicians.forEach(m => {
    instrumentCount[m.instrument] = (instrumentCount[m.instrument] || 0) + 1;
  });

  const micCount = {
    vocal: musicians.filter(m => m.instrument.toLowerCase().includes('chant') || m.instrument.toLowerCase().includes('vocal')).length,
    violin: musicians.filter(m => m.instrument.toLowerCase().includes('violon')).length,
    piano: musicians.filter(m => m.instrument.toLowerCase().includes('piano')).length,
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Musiciens</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Ajouter un musicien
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{musicians.length}</div>
            <div className="stat-label">Total musiciens</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{students.length}</div>
            <div className="stat-label">Étudiants piano</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{professionals.length}</div>
            <div className="stat-label">Professionnels</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{micCount.vocal + micCount.violin + micCount.piano}</div>
            <div className="stat-label">Micros nécessaires</div>
          </div>
        </div>

        {/* Microphone Breakdown */}
        <div className="card" style={{ background: 'linear-gradient(135deg, var(--cream) 0%, var(--white) 100%)', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
            <Mic size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Besoins en microphones
          </h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div style={{ padding: '1rem', background: 'var(--white)', borderRadius: '8px', border: '2px solid var(--border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>{micCount.vocal}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Micros vocaux</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--white)', borderRadius: '8px', border: '2px solid var(--border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>{micCount.violin}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Micros violon</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--white)', borderRadius: '8px', border: '2px solid var(--border)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>{micCount.piano}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Micros piano</div>
            </div>
          </div>
        </div>

        {/* Instrument Breakdown */}
        {Object.keys(instrumentCount).length > 0 && (
          <div className="card" style={{ background: 'rgba(212, 175, 55, 0.05)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
              <MusicIcon size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Répartition par instrument
            </h3>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {Object.entries(instrumentCount).map(([instrument, count]) => (
                <div key={instrument} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)', minWidth: '40px' }}>{count}</div>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--dark)' }}>{instrument}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Students Section */}
        {students.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
              Étudiants piano ({students.length})
            </h3>
            <div className="grid">
              {students.map((musician) => (
                <MusicianCard key={musician.id} musician={musician} onEdit={handleEdit} onDelete={onDeleteMusician} />
              ))}
            </div>
          </div>
        )}

        {/* Professionals Section */}
        {professionals.length > 0 && (
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
              Musiciens professionnels ({professionals.length})
            </h3>
            <div className="grid">
              {professionals.map((musician) => (
                <MusicianCard key={musician.id} musician={musician} onEdit={handleEdit} onDelete={onDeleteMusician} />
              ))}
            </div>
          </div>
        )}

        {musicians.length === 0 && (
          <div className="empty-state">
            <Users size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">Aucun musicien</h3>
            <p className="empty-state-text">Ajoutez les musiciens qui participent aux spectacles</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setEditingMusician(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingMusician ? 'Modifier le musicien' : 'Ajouter un musicien'}</h3>
              <button className="btn btn-small" onClick={() => {
                setShowModal(false);
                setEditingMusician(null);
              }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      defaultValue={editingMusician?.firstName}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      defaultValue={editingMusician?.lastName}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Instrument *</label>
                    <input
                      type="text"
                      name="instrument"
                      className="form-input"
                      placeholder="ex: Piano, Chant, Violon"
                      defaultValue={editingMusician?.instrument}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="checkbox"
                        name="isStudent"
                        defaultChecked={editingMusician?.isStudent}
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span>Étudiant piano</span>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Courriel</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      defaultValue={editingMusician?.email}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      defaultValue={editingMusician?.phone}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="Notes additionnelles..."
                    defaultValue={editingMusician?.notes}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setEditingMusician(null);
                }}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMusician ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface MusicianCardProps {
  musician: Musician;
  onEdit: (musician: Musician) => void;
  onDelete: (id: string) => void;
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician, onEdit, onDelete }) => {
  return (
    <div className="list-item">
      <div className="list-item-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: musician.isStudent ? 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)' : 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: musician.isStudent ? 'var(--white)' : 'var(--dark)',
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {musician.firstName.charAt(0)}{musician.lastName.charAt(0)}
          </div>
          <div>
            <h3 className="list-item-title">{musician.firstName} {musician.lastName}</h3>
            <p className="list-item-subtitle">
              <MusicIcon size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
              {musician.instrument}
              {musician.isStudent && <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>Étudiant</span>}
            </p>
          </div>
        </div>
        <div className="list-item-actions">
          <button className="btn btn-small btn-outline" onClick={() => onEdit(musician)}>
            <Edit2 size={16} />
          </button>
          <button className="btn btn-small btn-danger" onClick={() => onDelete(musician.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {(musician.email || musician.phone) && (
        <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--gray)' }}>
          {musician.email && <div>📧 {musician.email}</div>}
          {musician.phone && <div>📱 {musician.phone}</div>}
        </div>
      )}

      {musician.notes && (
        <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--light-gray)', borderRadius: '6px', fontSize: '0.875rem', color: 'var(--gray)' }}>
          {musician.notes}
        </div>
      )}
    </div>
  );
};
