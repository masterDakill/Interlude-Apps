import React, { useState } from 'react';
import { ListMusic, Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Setlist, Song, SetlistSong } from '../types';
import { formatDuration, generateId, calculateTotalDuration } from '../utils/helpers';

interface SetlistPlannerProps {
  setlists: Setlist[];
  songs: Song[];
  onAddSetlist: (setlist: Setlist) => void;
  onUpdateSetlist: (setlist: Setlist) => void;
  onDeleteSetlist: (id: string) => void;
}

export const SetlistPlanner: React.FC<SetlistPlannerProps> = ({
  setlists,
  songs,
  onAddSetlist,
  onUpdateSetlist,
  onDeleteSetlist,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingSetlist, setEditingSetlist] = useState<Setlist | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<SetlistSong[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const songDurations = selectedSongs.map(ss => {
      const song = songs.find(s => s.id === ss.songId);
      return song?.duration || 0;
    });

    const setlist: Setlist = editingSetlist
      ? { ...editingSetlist, updatedAt: new Date() }
      : {
          id: generateId(),
          name: '',
          songs: [],
          totalDuration: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

    setlist.name = formData.get('name') as string;
    setlist.notes = formData.get('notes') as string;
    setlist.songs = selectedSongs;
    setlist.totalDuration = calculateTotalDuration(songDurations);

    if (editingSetlist) {
      onUpdateSetlist(setlist);
    } else {
      onAddSetlist(setlist);
    }

    setShowModal(false);
    setEditingSetlist(null);
    setSelectedSongs([]);
  };

  const handleEdit = (setlist: Setlist) => {
    setEditingSetlist(setlist);
    setSelectedSongs([...setlist.songs]);
    setShowModal(true);
  };

  const addSongToSetlist = (songId: string) => {
    const newSong: SetlistSong = {
      songId,
      order: selectedSongs.length + 1,
    };
    setSelectedSongs([...selectedSongs, newSong]);
  };

  const removeSongFromSetlist = (index: number) => {
    const updated = selectedSongs.filter((_, i) => i !== index);
    const reordered = updated.map((s, i) => ({ ...s, order: i + 1 }));
    setSelectedSongs(reordered);
  };

  const moveSong = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === selectedSongs.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...selectedSongs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    const reordered = updated.map((s, i) => ({ ...s, order: i + 1 }));
    setSelectedSongs(reordered);
  };

  const getSongById = (songId: string) => songs.find(s => s.id === songId);

  const calculateSetlistDuration = (setlistSongs: SetlistSong[]) => {
    const durations = setlistSongs.map(ss => {
      const song = getSongById(ss.songId);
      return song?.duration || 0;
    });
    return calculateTotalDuration(durations);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Setlist Planner</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Create Setlist
          </button>
        </div>

        {setlists.length === 0 ? (
          <div className="empty-state">
            <ListMusic size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No setlists yet</h3>
            <p className="empty-state-text">Create your first setlist to organize songs for your shows</p>
          </div>
        ) : (
          <div>
            {setlists.map((setlist) => (
              <div key={setlist.id} className="list-item">
                <div className="list-item-header">
                  <div>
                    <h3 className="list-item-title">{setlist.name}</h3>
                    <p className="list-item-subtitle">
                      {setlist.songs.length} songs • {formatDuration(setlist.totalDuration)} total
                    </p>
                  </div>
                  <div className="list-item-actions">
                    <button className="btn btn-small btn-outline" onClick={() => handleEdit(setlist)}>
                      <Edit2 size={16} />
                    </button>
                    <button className="btn btn-small btn-danger" onClick={() => onDeleteSetlist(setlist.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {setlist.notes && (
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                    {setlist.notes}
                  </p>
                )}

                <div style={{ marginTop: '1rem' }}>
                  {setlist.songs.map((ss, index) => {
                    const song = getSongById(ss.songId);
                    if (!song) return null;
                    return (
                      <div
                        key={`${ss.songId}-${index}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0.5rem',
                          background: index % 2 === 0 ? 'var(--light-gray)' : 'transparent',
                          borderRadius: '0.25rem',
                        }}
                      >
                        <span style={{ marginRight: '0.75rem', fontWeight: 600, color: 'var(--gray)' }}>
                          {ss.order}.
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500 }}>{song.title}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                            {song.artist} • {formatDuration(song.duration)}
                          </div>
                        </div>
                        <span style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                          {song.key} • {song.tempo} BPM
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Setlist Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setEditingSetlist(null);
          setSelectedSongs([]);
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingSetlist ? 'Edit Setlist' : 'Create New Setlist'}</h3>
              <button className="btn btn-small" onClick={() => {
                setShowModal(false);
                setEditingSetlist(null);
                setSelectedSongs([]);
              }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Setlist Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="e.g., Summer Tour 2024, Wedding Set"
                    defaultValue={editingSetlist?.name}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="Any notes about this setlist..."
                    defaultValue={editingSetlist?.notes}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Songs in Setlist</label>
                  {selectedSongs.length === 0 ? (
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                      No songs added yet. Select songs from the library below.
                    </p>
                  ) : (
                    <div style={{ marginBottom: '1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
                      {selectedSongs.map((ss, index) => {
                        const song = getSongById(ss.songId);
                        if (!song) return null;
                        return (
                          <div
                            key={`${ss.songId}-${index}`}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.75rem',
                              borderBottom: index < selectedSongs.length - 1 ? '1px solid var(--border)' : 'none',
                            }}
                          >
                            <div style={{ marginRight: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                              <button
                                type="button"
                                className="btn btn-small"
                                onClick={() => moveSong(index, 'up')}
                                disabled={index === 0}
                                style={{ padding: '0.25rem' }}
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                className="btn btn-small"
                                onClick={() => moveSong(index, 'down')}
                                disabled={index === selectedSongs.length - 1}
                                style={{ padding: '0.25rem' }}
                              >
                                ▼
                              </button>
                            </div>
                            <span style={{ marginRight: '0.75rem', fontWeight: 600 }}>{ss.order}.</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500 }}>{song.title}</div>
                              <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                                {song.artist} • {formatDuration(song.duration)}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn btn-small btn-danger"
                              onClick={() => removeSongFromSetlist(index)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        );
                      })}
                      <div style={{ padding: '0.75rem', background: 'var(--light-gray)', fontWeight: 600 }}>
                        Total Duration: {formatDuration(calculateSetlistDuration(selectedSongs))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Add Songs from Library</label>
                  <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                    {songs.length === 0 ? (
                      <p style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--gray)' }}>
                        No songs in library. Add songs first!
                      </p>
                    ) : (
                      songs.map((song) => {
                        const isAdded = selectedSongs.some(ss => ss.songId === song.id);
                        return (
                          <div
                            key={song.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.75rem',
                              borderBottom: '1px solid var(--border)',
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 500 }}>{song.title}</div>
                              <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                                {song.artist} • {formatDuration(song.duration)}
                              </div>
                            </div>
                            <button
                              type="button"
                              className={`btn btn-small ${isAdded ? 'btn-outline' : 'btn-primary'}`}
                              onClick={() => addSongToSetlist(song.id)}
                              disabled={isAdded}
                            >
                              {isAdded ? 'Added' : 'Add'}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setEditingSetlist(null);
                  setSelectedSongs([]);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingSetlist ? 'Update Setlist' : 'Create Setlist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
