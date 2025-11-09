import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, MapPin } from 'lucide-react';
import { Show, Setlist } from '../types';
import { formatDateTime, generateId } from '../utils/helpers';

interface ShowManagerProps {
  shows: Show[];
  setlists: Setlist[];
  onAddShow: (show: Show) => void;
  onUpdateShow: (show: Show) => void;
  onDeleteShow: (id: string) => void;
}

export const ShowManager: React.FC<ShowManagerProps> = ({
  shows,
  setlists,
  onAddShow,
  onUpdateShow,
  onDeleteShow,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);

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
    show.date = new Date(formData.get('date') as string);
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
          <h2 className="card-title">Show Manager</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={20} /> Schedule Show
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{shows.length}</div>
            <div className="stat-label">Total Shows</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{upcomingShows.length}</div>
            <div className="stat-label">Upcoming</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{shows.filter(s => s.status === 'confirmed').length}</div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{pastShows.length}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        {shows.length === 0 ? (
          <div className="empty-state">
            <Calendar size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No shows scheduled</h3>
            <p className="empty-state-text">Schedule your first show and start planning</p>
          </div>
        ) : (
          <div>
            {upcomingShows.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Upcoming Shows</h3>
                {upcomingShows.map((show) => (
                  <ShowItem
                    key={show.id}
                    show={show}
                    setlists={setlists}
                    onEdit={handleEdit}
                    onDelete={onDeleteShow}
                    getStatusBadge={getStatusBadge}
                  />
                ))}
              </div>
            )}

            {pastShows.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Past Shows</h3>
                {pastShows.map((show) => (
                  <ShowItem
                    key={show.id}
                    show={show}
                    setlists={setlists}
                    onEdit={handleEdit}
                    onDelete={onDeleteShow}
                    getStatusBadge={getStatusBadge}
                  />
                ))}
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
        }}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingShow ? 'Edit Show' : 'Schedule New Show'}</h3>
              <button className="btn btn-small" onClick={() => {
                setShowModal(false);
                setEditingShow(null);
              }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Show Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="e.g., New Year's Eve Concert"
                    defaultValue={editingShow?.name}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Venue *</label>
                    <input
                      type="text"
                      name="venue"
                      className="form-input"
                      placeholder="e.g., Madison Square Garden"
                      defaultValue={editingShow?.venue}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date & Time *</label>
                    <input
                      type="datetime-local"
                      name="date"
                      className="form-input"
                      defaultValue={editingShow ? new Date(editingShow.date).toISOString().slice(0, 16) : ''}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Setlist</label>
                    <select name="setlistId" className="form-select" defaultValue={editingShow?.setlistId || ''}>
                      <option value="">No setlist assigned</option>
                      {setlists.map((setlist) => (
                        <option key={setlist.id} value={setlist.id}>
                          {setlist.name} ({setlist.songs.length} songs)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-select" defaultValue={editingShow?.status || 'planned'}>
                      <option value="planned">Planned</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    className="form-textarea"
                    placeholder="Any additional notes about this show..."
                    defaultValue={editingShow?.notes}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => {
                  setShowModal(false);
                  setEditingShow(null);
                }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingShow ? 'Update Show' : 'Schedule Show'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface ShowItemProps {
  show: Show;
  setlists: Setlist[];
  onEdit: (show: Show) => void;
  onDelete: (id: string) => void;
  getStatusBadge: (status: string) => string;
}

const ShowItem: React.FC<ShowItemProps> = ({ show, setlists, onEdit, onDelete, getStatusBadge }) => {
  const setlist = setlists.find(s => s.id === show.setlistId);

  return (
    <div className="list-item">
      <div className="list-item-header">
        <div>
          <h3 className="list-item-title">{show.name}</h3>
          <p className="list-item-subtitle">
            <MapPin size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
            {show.venue} • {formatDateTime(show.date)}
          </p>
        </div>
        <div className="list-item-actions">
          <button className="btn btn-small btn-outline" onClick={() => onEdit(show)}>
            <Edit2 size={16} />
          </button>
          <button className="btn btn-small btn-danger" onClick={() => onDelete(show.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <span className={`badge ${getStatusBadge(show.status)}`}>{show.status}</span>
        {setlist && (
          <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>
            {setlist.name}
          </span>
        )}
      </div>

      {show.notes && (
        <p style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
          {show.notes}
        </p>
      )}
    </div>
  );
};
