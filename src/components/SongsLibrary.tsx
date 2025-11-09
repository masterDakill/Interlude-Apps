import React, { useState } from 'react';
import { Music, Plus, Edit2, Trash2, Clock, TrendingUp } from 'lucide-react';
import { Song, PracticeEntry } from '../types';
import { formatDuration, formatDate, generateId } from '../utils/helpers';

interface SongsLibraryProps {
  songs: Song[];
  onAddSong: (song: Song) => void;
  onUpdateSong: (song: Song) => void;
  onDeleteSong: (id: string) => void;
}

export const SongsLibrary: React.FC<SongsLibraryProps> = ({
  songs,
  onAddSong,
  onUpdateSong,
  onDeleteSong,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const song: Song = editingSong
      ? { ...editingSong, updatedAt: new Date() }
      : {
          id: generateId(),
          title: '',
          artist: '',
          key: '',
          tempo: 0,
          duration: 0,
          practiceLog: [],
          difficulty: 'medium',
          status: 'learning',
          tags: [],
          audioFiles: [],
          sheetMusic: [],
          musicians: [],
          keyboardPatches: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

    song.title = formData.get('title') as string;
    song.artist = formData.get('artist') as string;
    song.key = formData.get('key') as string;
    song.tempo = parseInt(formData.get('tempo') as string);
    song.duration = parseInt(formData.get('duration') as string);
    song.difficulty = formData.get('difficulty') as 'easy' | 'medium' | 'hard';
    song.status = formData.get('status') as 'learning' | 'rehearsing' | 'ready';
    song.notes = formData.get('notes') as string;
    song.lyrics = formData.get('lyrics') as string;
    song.chords = formData.get('chords') as string;

    if (editingSong) {
      onUpdateSong(song);
    } else {
      onAddSong(song);
    }

    setShowModal(false);
    setEditingSong(null);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setShowModal(true);
  };

  const handleAddPractice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSong) return;

    const formData = new FormData(e.currentTarget);
    const practice: PracticeEntry = {
      id: generateId(),
      date: new Date(),
      duration: parseInt(formData.get('duration') as string),
      notes: formData.get('notes') as string,
      quality: parseInt(formData.get('quality') as string) as 1 | 2 | 3 | 4 | 5,
    };

    const updatedSong = {
      ...selectedSong,
      practiceLog: [...selectedSong.practiceLog, practice],
      updatedAt: new Date(),
    };

    onUpdateSong(updatedSong);
    setShowPracticeModal(false);
    setSelectedSong(null);
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      easy: 'badge-success',
      medium: 'badge-warning',
      hard: 'badge-danger',
    };
    return colors[difficulty] || 'badge-gray';
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      learning: 'badge-info',
      rehearsing: 'badge-warning',
      ready: 'badge-success',
    };
    return colors[status] || 'badge-gray';
  };

  const totalPracticeTime = (song: Song) => {
    return song.practiceLog.reduce((acc, p) => acc + p.duration, 0);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Song Library</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Add Song
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{songs.length}</div>
            <div className="stat-label">Total Songs</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{songs.filter(s => s.status === 'ready').length}</div>
            <div className="stat-label">Ready to Perform</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{songs.filter(s => s.status === 'learning').length}</div>
            <div className="stat-label">Currently Learning</div>
          </div>
        </div>

        {songs.length === 0 ? (
          <div className="empty-state">
            <Music size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No songs yet</h3>
            <p className="empty-state-text">Start building your repertoire by adding your first song</p>
          </div>
        ) : (
          <div className="grid">
            {songs.map((song) => (
              <div key={song.id} className="list-item">
                <div className="list-item-header">
                  <div>
                    <h3 className="list-item-title">{song.title}</h3>
                    <p className="list-item-subtitle">{song.artist}</p>
                  </div>
                  <div className="list-item-actions">
                    <button className="btn btn-small btn-outline" onClick={() => handleEdit(song)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-small btn-danger" onClick={() => onDeleteSong(song.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div style={{ marginBottom: '0.75rem' }}>
                  <span className={`badge ${getDifficultyBadge(song.difficulty)}`}>{song.difficulty}</span>
                  {' '}
                  <span className={`badge ${getStatusBadge(song.status)}`}>{song.status}</span>
                </div>

                <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                  <div>Key: {song.key} • Tempo: {song.tempo} BPM</div>
                  <div>Duration: {formatDuration(song.duration)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <Clock size={14} />
                    Practice: {totalPracticeTime(song)} min ({song.practiceLog.length} sessions)
                  </div>
                </div>

                <button
                  className="btn btn-small btn-primary"
                  onClick={() => {
                    setSelectedSong(song);
                    setShowPracticeModal(true);
                  }}
                  style={{ width: '100%' }}
                >
                  <TrendingUp size={16} /> Log Practice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Song Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setEditingSong(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingSong ? 'Edit Song' : 'Add New Song'}</h3>
              <button className="btn btn-small" onClick={() => {
                setShowModal(false);
                setEditingSong(null);
              }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      name="title"
                      className="form-input"
                      defaultValue={editingSong?.title}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Artist *</label>
                    <input
                      type="text"
                      name="artist"
                      className="form-input"
                      defaultValue={editingSong?.artist}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Key</label>
                    <input
                      type="text"
                      name="key"
                      className="form-input"
                      placeholder="e.g., C major, Am"
                      defaultValue={editingSong?.key}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tempo (BPM)</label>
                    <input
                      type="number"
                      name="tempo"
                      className="form-input"
                      defaultValue={editingSong?.tempo}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Duration (seconds)</label>
                    <input
                      type="number"
                      name="duration"
                      className="form-input"
                      defaultValue={editingSong?.duration}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select name="difficulty" className="form-select" defaultValue={editingSong?.difficulty || 'medium'}>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-select" defaultValue={editingSong?.status || 'learning'}>
                      <option value="learning">Learning</option>
                      <option value="rehearsing">Rehearsing</option>
                      <option value="ready">Ready</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Lyrics</label>
                  <textarea
                    name="lyrics"
                    className="form-textarea"
                    placeholder="Add lyrics here..."
                    defaultValue={editingSong?.lyrics}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Chords</label>
                  <textarea
                    name="chords"
                    className="form-textarea"
                    placeholder="Add chord progression..."
                    defaultValue={editingSong?.chords}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="Any additional notes..."
                    defaultValue={editingSong?.notes}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setEditingSong(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSong ? 'Update Song' : 'Add Song'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Practice Log Modal */}
      {showPracticeModal && selectedSong && (
        <div className="modal-overlay" onClick={() => {
          setShowPracticeModal(false);
          setSelectedSong(null);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Log Practice - {selectedSong.title}</h3>
              <button className="btn btn-small" onClick={() => {
                setShowPracticeModal(false);
                setSelectedSong(null);
              }}>×</button>
            </div>
            <form onSubmit={handleAddPractice}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Duration (minutes) *</label>
                  <input
                    type="number"
                    name="duration"
                    className="form-input"
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Quality (1-5) *</label>
                  <select name="quality" className="form-select" defaultValue="3">
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="What did you work on? Any challenges?"
                  />
                </div>

                {selectedSong.practiceLog.length > 0 && (
                  <div>
                    <h4 style={{ marginBottom: '1rem', fontWeight: 600 }}>Previous Practice Sessions</h4>
                    {selectedSong.practiceLog.slice(-5).reverse().map((practice) => (
                      <div key={practice.id} style={{ padding: '0.75rem', background: 'var(--light-gray)', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{formatDate(practice.date)}</span>
                          <span style={{ fontSize: '0.875rem' }}>{practice.duration} min • Quality: {practice.quality}/5</span>
                        </div>
                        {practice.notes && (
                          <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.25rem' }}>{practice.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowPracticeModal(false);
                  setSelectedSong(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Log Practice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
