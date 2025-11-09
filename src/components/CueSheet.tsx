import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit2, Clock, Users, Music as MusicIcon, ChevronRight } from 'lucide-react';
import { Song, Setlist, Musician, SongMusician } from '../types';
import { formatDuration } from '../utils/helpers';

interface CueSheetProps {
  setlists: Setlist[];
  songs: Song[];
  musicians: Musician[];
  onUpdateSong: (song: Song) => void;
}

interface CueEntry {
  id: string;
  timestamp: string; // Format: "00:00" ou "0:15"
  cue: string;
  type: 'intro' | 'verse' | 'chorus' | 'bridge' | 'outro' | 'note' | 'patch' | 'lighting';
  notes?: string;
}

export const CueSheet: React.FC<CueSheetProps> = ({
  setlists,
  songs,
  musicians,
  onUpdateSong,
}) => {
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>('');
  const [selectedSongId, setSelectedSongId] = useState<string>('');
  const [showAnnotationModal, setShowAnnotationModal] = useState(false);

  const selectedSetlist = setlists.find(s => s.id === selectedSetlistId);
  const selectedSong = songs.find(s => s.id === selectedSongId);

  const getMusicianById = (id: string) => musicians.find(m => m.id === id);

  const addAnnotation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSong) return;

    const formData = new FormData(e.currentTarget);
    const annotation = formData.get('annotation') as string;

    onUpdateSong({
      ...selectedSong,
      notes: selectedSong.notes ? `${selectedSong.notes}\n${annotation}` : annotation,
    });

    e.currentTarget.reset();
    setShowAnnotationModal(false);
  };

  const cueTypes = [
    { value: 'intro', label: 'Intro', color: '#4ECDC4', icon: '🎵' },
    { value: 'verse', label: 'Couplet', color: '#667eea', icon: '📝' },
    { value: 'chorus', label: 'Refrain', color: '#f093fb', icon: '🎤' },
    { value: 'bridge', label: 'Pont', color: '#F7971E', icon: '🌉' },
    { value: 'outro', label: 'Outro', color: '#667eea', icon: '🎭' },
    { value: 'patch', label: 'Changement patch', color: '#43e97b', icon: '🎹' },
    { value: 'lighting', label: 'Éclairage', color: '#FFD200', icon: '💡' },
    { value: 'note', label: 'Note', color: '#FF6B6B', icon: '📌' },
  ];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">Cue Sheet - Feuille de route</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
              Plan annoté détaillé pour chaque chanson du spectacle
            </p>
          </div>
        </div>

        {/* Setlist Selector */}
        <div className="form-group">
          <label className="form-label">Sélectionner une liste de lecture</label>
          <select
            className="form-select"
            value={selectedSetlistId}
            onChange={(e) => {
              setSelectedSetlistId(e.target.value);
              setSelectedSongId('');
            }}
          >
            <option value="">Choisir une liste...</option>
            {setlists.map((setlist) => (
              <option key={setlist.id} value={setlist.id}>
                {setlist.name} ({setlist.songs.length} chansons)
              </option>
            ))}
          </select>
        </div>

        {selectedSetlist && (
          <div>
            {/* Song List with Cue Sheets */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--primary)', fontFamily: "'Playfair Display', serif" }}>
                Chansons de la liste
              </h3>
              
              {selectedSetlist.songs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Aucune chanson dans cette liste</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedSetlist.songs.map((setSong, index) => {
                    const song = songs.find(s => s.id === setSong.songId);
                    if (!song) return null;

                    const isExpanded = selectedSongId === song.id;

                    return (
                      <div key={song.id} style={{ border: `2px solid ${isExpanded ? 'var(--secondary)' : 'var(--border)'}`, borderRadius: '12px', overflow: 'hidden', background: 'var(--white)' }}>
                        {/* Song Header */}
                        <div
                          onClick={() => setSelectedSongId(isExpanded ? '' : song.id)}
                          style={{
                            padding: '1.25rem',
                            cursor: 'pointer',
                            background: isExpanded ? 'linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)' : 'var(--cream)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            transition: 'all 0.3s',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: isExpanded ? 'rgba(255,255,255,0.3)' : 'var(--primary)',
                                color: isExpanded ? 'var(--dark)' : 'var(--white)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                              }}
                            >
                              {setSong.order}
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '1.125rem', color: isExpanded ? 'var(--dark)' : 'var(--primary)' }}>
                                {song.title}
                              </div>
                              <div style={{ fontSize: '0.875rem', color: isExpanded ? 'var(--dark-brown)' : 'var(--gray)', marginTop: '0.25rem' }}>
                                {song.artist} • {formatDuration(song.duration)} • {song.key}
                              </div>
                            </div>
                          </div>
                          <ChevronRight
                            size={24}
                            style={{
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s',
                              color: isExpanded ? 'var(--dark)' : 'var(--gray)',
                            }}
                          />
                        </div>

                        {/* Expanded Cue Sheet */}
                        {isExpanded && (
                          <div style={{ padding: '1.5rem', background: 'var(--white)' }}>
                            {/* Musicians for this song */}
                            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--cream)', borderRadius: '8px' }}>
                              <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                <Users size={18} />
                                Musiciens ({(song.musicians || []).length})
                              </h4>
                              {(song.musicians || []).length === 0 ? (
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>Aucun musicien assigné</p>
                              ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {(song.musicians || []).map((sm: SongMusician) => {
                                    const musician = getMusicianById(sm.musicianId);
                                    if (!musician) return null;
                                    return (
                                      <div
                                        key={sm.musicianId}
                                        style={{
                                          padding: '0.5rem 0.75rem',
                                          background: musician.isStudent ? 'rgba(139, 21, 56, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                                          border: `1px solid ${musician.isStudent ? 'var(--primary)' : 'var(--secondary)'}`,
                                          borderRadius: '20px',
                                          fontSize: '0.875rem',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem',
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            background: musician.isStudent ? 'var(--primary)' : 'var(--secondary)',
                                            color: musician.isStudent ? 'white' : 'var(--dark)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                          }}
                                        >
                                          {musician.firstName.charAt(0)}{musician.lastName.charAt(0)}
                                        </div>
                                        <span>{musician.firstName} {musician.lastName}</span>
                                        <span style={{ opacity: 0.7 }}>({sm.instrument})</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Keyboard Patches */}
                            {(song.keyboardPatches || []).length > 0 && (
                              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(67, 233, 123, 0.1)', borderRadius: '8px', border: '1px solid #43e97b' }}>
                                <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2d9561' }}>
                                  🎹 Patches clavier
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                  {(song.keyboardPatches || []).map((patch) => (
                                    <div key={patch.id} style={{ padding: '0.5rem 0.75rem', background: 'white', borderRadius: '6px', fontSize: '0.875rem' }}>
                                      <span style={{ fontWeight: 600 }}>{patch.name}</span>
                                      {patch.program !== undefined && <span style={{ marginLeft: '0.5rem', color: 'var(--gray)' }}>Program: {patch.program}</span>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Structure / Cues */}
                            <div style={{ marginBottom: '1.5rem' }}>
                              <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                <MusicIcon size={18} />
                                Structure suggérée
                              </h4>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                                {cueTypes.filter(ct => !['note'].includes(ct.value)).map((cueType) => (
                                  <div
                                    key={cueType.value}
                                    style={{
                                      padding: '0.75rem',
                                      background: `${cueType.color}15`,
                                      border: `2px solid ${cueType.color}`,
                                      borderRadius: '8px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{cueType.icon}</div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--dark)' }}>{cueType.label}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notes and Annotations */}
                            <div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <h4 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                                  📝 Notes et annotations
                                </h4>
                                <button
                                  className="btn btn-small btn-primary"
                                  onClick={() => setShowAnnotationModal(true)}
                                >
                                  <Plus size={16} /> Ajouter
                                </button>
                              </div>
                              
                              {song.notes ? (
                                <div style={{ padding: '1rem', background: 'var(--cream)', borderRadius: '8px', whiteSpace: 'pre-wrap', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                                  {song.notes}
                                </div>
                              ) : (
                                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.875rem', border: '2px dashed var(--border)', borderRadius: '8px' }}>
                                  Aucune annotation. Cliquez sur "Ajouter" pour ajouter des notes.
                                </div>
                              )}
                            </div>

                            {/* Audio & Sheets Quick Links */}
                            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                              {(song.audioFiles || []).length > 0 && (
                                <div style={{ padding: '1rem', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '8px', border: '1px solid #667eea' }}>
                                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#667eea' }}>
                                    🎧 {(song.audioFiles || []).length} fichier(s) audio
                                  </div>
                                </div>
                              )}
                              {(song.sheetMusic || []).length > 0 && (
                                <div style={{ padding: '1rem', background: 'rgba(240, 147, 251, 0.1)', borderRadius: '8px', border: '1px solid #f093fb' }}>
                                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#f093fb' }}>
                                    📄 {(song.sheetMusic || []).length} partition(s)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {!selectedSetlist && (
          <div className="empty-state">
            <FileText size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">Sélectionnez une liste de lecture</h3>
            <p className="empty-state-text">Choisissez une liste pour voir le cue sheet détaillé de chaque chanson</p>
          </div>
        )}
      </div>

      {/* Annotation Modal */}
      {showAnnotationModal && selectedSong && (
        <div className="modal-overlay" onClick={() => setShowAnnotationModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Ajouter une annotation - {selectedSong.title}</h3>
              <button className="btn btn-small" onClick={() => setShowAnnotationModal(false)}>×</button>
            </div>
            <form onSubmit={addAnnotation}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Annotation</label>
                  <textarea
                    name="annotation"
                    className="form-textarea"
                    rows={6}
                    placeholder="Ex: &#10;• 0:00 - Intro piano seul&#10;• 0:30 - Entrée des cordes&#10;• 1:15 - Changement patch (Program 5)&#10;• 2:00 - Solo violon&#10;• 3:00 - Outro avec ralenti"
                    required
                  />
                </div>
                <div style={{ padding: '1rem', background: 'var(--cream)', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--gray)' }}>
                  💡 <strong>Astuce:</strong> Utilisez le format "00:00 - Description" pour indiquer les moments clés
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAnnotationModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Ajouter l'annotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
