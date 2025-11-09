import React, { useState } from 'react';
import { Music as MusicIcon, FileText, Sliders, Users, Plus, Trash2, Download } from 'lucide-react';
import { Song, AudioFile, SheetMusicFile, KeyboardPatch, SongMusician, Musician } from '../types';
import { generateId, formatDuration } from '../utils/helpers';
import { DropboxPicker } from './DropboxPicker';

interface SongMediaManagerProps {
  song: Song;
  musicians: Musician[];
  onUpdateSong: (song: Song) => void;
  onClose: () => void;
}

export const SongMediaManager: React.FC<SongMediaManagerProps> = ({
  song,
  musicians,
  onUpdateSong,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'audio' | 'sheets' | 'patches' | 'musicians'>('audio');

  // Audio Functions
  const addAudioFile = (url: string, name: string) => {
    const newAudio: AudioFile = {
      id: generateId(),
      name: name,
      url: url,
      type: 'recording',
      duration: 0,
      uploadedAt: new Date(),
    };

    onUpdateSong({
      ...song,
      audioFiles: [...(song.audioFiles || []), newAudio],
    });
  };

  const deleteAudioFile = (id: string) => {
    onUpdateSong({
      ...song,
      audioFiles: (song.audioFiles || []).filter(a => a.id !== id),
    });
  };

  // Sheet Music Functions
  const addSheetMusic = (url: string, name: string) => {
    const newSheet: SheetMusicFile = {
      id: generateId(),
      name: name,
      url: url,
      type: url.endsWith('.pdf') ? 'pdf' : 'image',
      uploadedAt: new Date(),
    };

    onUpdateSong({
      ...song,
      sheetMusic: [...(song.sheetMusic || []), newSheet],
    });
  };

  const deleteSheetMusic = (id: string) => {
    onUpdateSong({
      ...song,
      sheetMusic: (song.sheetMusic || []).filter(s => s.id !== id),
    });
  };

  // Keyboard Patch Functions
  const addKeyboardPatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newPatch: KeyboardPatch = {
      id: generateId(),
      name: formData.get('patchName') as string,
      bank: formData.get('bank') as string,
      program: parseInt(formData.get('program') as string),
      keyboardModel: formData.get('keyboardModel') as string,
      notes: formData.get('patchNotes') as string,
      sections: [],
    };

    onUpdateSong({
      ...song,
      keyboardPatches: [...(song.keyboardPatches || []), newPatch],
    });

    e.currentTarget.reset();
  };

  const deleteKeyboardPatch = (id: string) => {
    onUpdateSong({
      ...song,
      keyboardPatches: (song.keyboardPatches || []).filter(p => p.id !== id),
    });
  };

  // Musician Functions
  const addMusicianToSong = (musicianId: string, instrument: string, role: 'lead' | 'backup' | 'section') => {
    const newSongMusician: SongMusician = {
      musicianId,
      instrument,
      role,
    };

    onUpdateSong({
      ...song,
      musicians: [...(song.musicians || []), newSongMusician],
    });
  };

  const removeMusicianFromSong = (musicianId: string) => {
    onUpdateSong({
      ...song,
      musicians: (song.musicians || []).filter(m => m.musicianId !== musicianId),
    });
  };

  const getMusicianById = (id: string) => musicians.find(m => m.id === id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: '1000px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Médias - {song.title}</h3>
          <button className="btn btn-small" onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '2px solid var(--border)', padding: '0 1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button
            className={`nav-button ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('audio')}
            style={{ borderBottom: activeTab === 'audio' ? '3px solid var(--secondary)' : 'none', padding: '0.75rem 1rem' }}
          >
            <MusicIcon size={18} /> Audio ({(song.audioFiles || []).length})
          </button>
          <button
            className={`nav-button ${activeTab === 'sheets' ? 'active' : ''}`}
            onClick={() => setActiveTab('sheets')}
            style={{ borderBottom: activeTab === 'sheets' ? '3px solid var(--secondary)' : 'none', padding: '0.75rem 1rem' }}
          >
            <FileText size={18} /> Partitions ({(song.sheetMusic || []).length})
          </button>
          <button
            className={`nav-button ${activeTab === 'patches' ? 'active' : ''}`}
            onClick={() => setActiveTab('patches')}
            style={{ borderBottom: activeTab === 'patches' ? '3px solid var(--secondary)' : 'none', padding: '0.75rem 1rem' }}
          >
            <Sliders size={18} /> Patches ({(song.keyboardPatches || []).length})
          </button>
          <button
            className={`nav-button ${activeTab === 'musicians' ? 'active' : ''}`}
            onClick={() => setActiveTab('musicians')}
            style={{ borderBottom: activeTab === 'musicians' ? '3px solid var(--secondary)' : 'none', padding: '0.75rem 1rem' }}
          >
            <Users size={18} /> Musiciens ({(song.musicians || []).length})
          </button>
        </div>

        <div className="modal-body">
          {/* Audio Tab */}
          {activeTab === 'audio' && (
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
                Fichiers audio
              </h4>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <DropboxPicker
                  onFileSelected={addAudioFile}
                  fileType="audio"
                  buttonText="📁 Ajouter un fichier audio depuis Dropbox"
                />
              </div>

              {(song.audioFiles || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <MusicIcon size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Aucun fichier audio</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(song.audioFiles || []).map((audio) => (
                    <div key={audio.id} className="list-item" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{audio.name}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                            Type: {audio.type} • {formatDuration(audio.duration)}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <a
                            href={audio.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-small btn-outline"
                          >
                            <Download size={16} />
                          </a>
                          <button
                            className="btn btn-small btn-danger"
                            onClick={() => deleteAudioFile(audio.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sheet Music Tab */}
          {activeTab === 'sheets' && (
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
                Partitions
              </h4>

              <div style={{ marginBottom: '1.5rem' }}>
                <DropboxPicker
                  onFileSelected={addSheetMusic}
                  fileType="pdf"
                  buttonText="📄 Ajouter une partition depuis Dropbox"
                />
              </div>

              {(song.sheetMusic || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <FileText size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Aucune partition</p>
                </div>
              ) : (
                <div className="grid">
                  {(song.sheetMusic || []).map((sheet) => (
                    <div key={sheet.id} className="list-item">
                      <div style={{ marginBottom: '0.75rem' }}>
                        <FileText size={32} style={{ color: 'var(--secondary)' }} />
                      </div>
                      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{sheet.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                        {sheet.type.toUpperCase()}
                        {sheet.instrument && ` • ${sheet.instrument}`}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <a
                          href={sheet.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-small btn-primary"
                          style={{ flex: 1, justifyContent: 'center' }}
                        >
                          Ouvrir
                        </a>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => deleteSheetMusic(sheet.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Keyboard Patches Tab */}
          {activeTab === 'patches' && (
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
                Patches clavier
              </h4>

              <form onSubmit={addKeyboardPatch} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nom du patch *</label>
                    <input type="text" name="patchName" className="form-input" required placeholder="ex: Piano Grand" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Modèle de clavier</label>
                    <input type="text" name="keyboardModel" className="form-input" placeholder="ex: Yamaha P-125" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Bank</label>
                    <input type="text" name="bank" className="form-input" placeholder="ex: A, GM" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Program #</label>
                    <input type="number" name="program" className="form-input" placeholder="0-127" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Notes</label>
                  <textarea name="patchNotes" className="form-textarea" rows={2} placeholder="Paramètres additionnels..." />
                </div>
                <button type="submit" className="btn btn-primary">
                  <Plus size={18} /> Ajouter patch
                </button>
              </form>

              {(song.keyboardPatches || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <Sliders size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Aucun patch configuré</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(song.keyboardPatches || []).map((patch) => (
                    <div key={patch.id} className="list-item">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                            {patch.name}
                          </div>
                          {patch.keyboardModel && (
                            <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>
                              🎹 {patch.keyboardModel}
                            </div>
                          )}
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                            {patch.bank && `Bank: ${patch.bank}`}
                            {patch.program !== undefined && ` • Program: ${patch.program}`}
                          </div>
                          {patch.notes && (
                            <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'var(--light-gray)', borderRadius: '4px', fontSize: '0.875rem' }}>
                              {patch.notes}
                            </div>
                          )}
                        </div>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => deleteKeyboardPatch(patch.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Musicians Tab */}
          {activeTab === 'musicians' && (
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--primary)' }}>
                Musiciens pour cette chanson
              </h4>

              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.75rem' }}>
                  👥 Sélectionnez les musiciens qui jouent cette pièce
                </p>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const musicianId = e.target.value;
                    const musician = getMusicianById(musicianId);
                    if (musician) {
                      addMusicianToSong(musicianId, musician.instrument, 'section');
                      e.target.value = '';
                    }
                  }}
                >
                  <option value="">Ajouter un musicien...</option>
                  {musicians
                    .filter(m => !(song.musicians || []).some(sm => sm.musicianId === m.id))
                    .map(m => (
                      <option key={m.id} value={m.id}>
                        {m.firstName} {m.lastName} - {m.instrument}
                      </option>
                    ))}
                </select>
              </div>

              {(song.musicians || []).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                  <p>Aucun musicien assigné</p>
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📊 Résumé des besoins techniques</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                      Total musiciens: {(song.musicians || []).length} • 
                      Étudiants piano: {(song.musicians || []).filter(sm => {
                        const m = getMusicianById(sm.musicianId);
                        return m?.isStudent;
                      }).length}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(song.musicians || []).map((songMusician) => {
                      const musician = getMusicianById(songMusician.musicianId);
                      if (!musician) return null;

                      return (
                        <div key={songMusician.musicianId} className="list-item">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                              <div
                                style={{
                                  width: '45px',
                                  height: '45px',
                                  borderRadius: '50%',
                                  background: musician.isStudent ? 'var(--primary)' : 'var(--secondary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: musician.isStudent ? 'var(--white)' : 'var(--dark)',
                                  fontWeight: 700,
                                }}
                              >
                                {musician.firstName.charAt(0)}{musician.lastName.charAt(0)}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600 }}>
                                  {musician.firstName} {musician.lastName}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                                  {songMusician.instrument} • {songMusician.role}
                                  {musician.isStudent && <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>Étudiant</span>}
                                </div>
                              </div>
                            </div>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => removeMusicianFromSong(songMusician.musicianId)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Terminer
          </button>
        </div>
      </div>
    </div>
  );
};
