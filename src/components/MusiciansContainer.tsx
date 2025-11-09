import React, { useState, useEffect } from 'react';
import { Musicians } from './Musicians';
import { Musician } from '../types';
import { musicianService } from '../services/musicianService';

/**
 * Container pour Musicians avec intégration Firebase
 * Gère le chargement, ajout, mise à jour et suppression des musiciens
 */
export const MusiciansContainer: React.FC = () => {
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Charger les musiciens au montage
  useEffect(() => {
    loadMusicians();
  }, []);

  const loadMusicians = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await musicianService.getAll();
      setMusicians(data);
    } catch (err) {
      console.error('Erreur chargement musiciens:', err);
      setError('Impossible de charger les musiciens');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMusician = async (musician: Musician) => {
    try {
      setError('');
      const { id, ...musicianData } = musician;
      const newMusician = await musicianService.create(musicianData);
      setMusicians([...musicians, newMusician]);
    } catch (err) {
      console.error('Erreur ajout musicien:', err);
      setError('Impossible d\'ajouter le musicien');
    }
  };

  const handleUpdateMusician = async (musician: Musician) => {
    try {
      setError('');
      await musicianService.update(musician.id, musician);
      setMusicians(musicians.map(m => m.id === musician.id ? musician : m));
    } catch (err) {
      console.error('Erreur mise à jour musicien:', err);
      setError('Impossible de mettre à jour le musicien');
    }
  };

  const handleDeleteMusician = async (id: string) => {
    try {
      setError('');
      await musicianService.delete(id);
      setMusicians(musicians.filter(m => m.id !== id));
    } catch (err) {
      console.error('Erreur suppression musicien:', err);
      setError('Impossible de supprimer le musicien');
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
          Chargement des musiciens...
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
      <Musicians
        musicians={musicians}
        onAddMusician={handleAddMusician}
        onUpdateMusician={handleUpdateMusician}
        onDeleteMusician={handleDeleteMusician}
      />
    </>
  );
};
