import React, { useState, useEffect } from 'react';
import { SongsLibrary } from './SongsLibrary';
import { Song } from '../types';
import { songService } from '../services/songService';

/**
 * Container pour Songs avec intégration Firebase
 * Gère le chargement, ajout, mise à jour et suppression des chansons
 */
export const SongsContainer: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Charger les chansons au montage
  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await songService.getAll();
      setSongs(data);
    } catch (err) {
      console.error('Erreur chargement chansons:', err);
      setError('Impossible de charger les chansons');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSong = async (song: Song) => {
    try {
      setError('');
      const { id, ...songData } = song;
      const newSong = await songService.create(songData);
      setSongs([...songs, newSong]);
    } catch (err) {
      console.error('Erreur ajout chanson:', err);
      setError('Impossible d\'ajouter la chanson');
    }
  };

  const handleUpdateSong = async (song: Song) => {
    try {
      setError('');
      await songService.update(song.id, song);
      setSongs(songs.map(s => s.id === song.id ? song : s));
    } catch (err) {
      console.error('Erreur mise à jour chanson:', err);
      setError('Impossible de mettre à jour la chanson');
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      setError('');
      await songService.delete(id);
      setSongs(songs.filter(s => s.id !== id));
    } catch (err) {
      console.error('Erreur suppression chanson:', err);
      setError('Impossible de supprimer la chanson');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.125rem',
        color: 'var(--gray)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid var(--cream)', 
            borderTop: '4px solid var(--primary)', 
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          Chargement des chansons...
        </div>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c33'
        }}>
          ⚠️ {error}
        </div>
      )}
      <SongsLibrary
        songs={songs}
        onAddSong={handleAddSong}
        onUpdateSong={handleUpdateSong}
        onDeleteSong={handleDeleteSong}
      />
    </>
  );
};
