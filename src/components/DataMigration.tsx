import React, { useState, useEffect } from 'react';
import { Music, Users, Upload, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { musicianService } from '../services/musicianService';
import { songService } from '../services/songService';
import type { Musician } from '../types/musician';
import type { Song } from '../types/song';

interface MigrationStats {
  musicians: {
    localStorage: number;
    firebase: number;
    migrated: number;
  };
  songs: {
    localStorage: number;
    firebase: number;
    migrated: number;
  };
}

export const DataMigration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [stats, setStats] = useState<MigrationStats>({
    musicians: { localStorage: 0, firebase: 0, migrated: 0 },
    songs: { localStorage: 0, firebase: 0, migrated: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Lire localStorage
      const localMusicians = JSON.parse(localStorage.getItem('musicians') || '[]');
      const localSongs = JSON.parse(localStorage.getItem('songs') || '[]');

      // Lire Firebase
      const firebaseMusicians = await musicianService.getAll();
      const firebaseSongs = await songService.getAll();

      setStats({
        musicians: {
          localStorage: localMusicians.length,
          firebase: firebaseMusicians.length,
          migrated: 0
        },
        songs: {
          localStorage: localSongs.length,
          firebase: firebaseSongs.length,
          migrated: 0
        }
      });
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const migrateData = async () => {
    setMigrating(true);
    setError('');
    let musiciansMigrated = 0;
    let songsMigrated = 0;

    try {
      // Migrer les musiciens
      const localMusicians: Musician[] = JSON.parse(localStorage.getItem('musicians') || '[]');
      if (localMusicians.length > 0) {
        console.log(`🎸 Migration de ${localMusicians.length} musiciens...`);
        
        for (const musician of localMusicians) {
          try {
            // Retirer l'ID pour laisser Firebase en générer un nouveau
            const { id, ...musicianData } = musician;
            await musicianService.create(musicianData);
            musiciansMigrated++;
            
            setStats(prev => ({
              ...prev,
              musicians: { ...prev.musicians, migrated: musiciansMigrated }
            }));
          } catch (err) {
            console.error(`Erreur pour musicien ${musician.firstName}:`, err);
          }
        }
      }

      // Migrer les chansons
      const localSongs: Song[] = JSON.parse(localStorage.getItem('songs') || '[]');
      if (localSongs.length > 0) {
        console.log(`🎵 Migration de ${localSongs.length} chansons...`);
        
        for (const song of localSongs) {
          try {
            // Retirer l'ID pour laisser Firebase en générer un nouveau
            const { id, ...songData } = song;
            await songService.create(songData);
            songsMigrated++;
            
            setStats(prev => ({
              ...prev,
              songs: { ...prev.songs, migrated: songsMigrated }
            }));
          } catch (err) {
            console.error(`Erreur pour chanson ${song.title}:`, err);
          }
        }
      }

      setSuccess(true);
      
      // Recharger les stats
      setTimeout(loadStats, 1000);
      
    } catch (err) {
      setError('Erreur lors de la migration: ' + (err as Error).message);
      console.error(err);
    } finally {
      setMigrating(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des données...</p>
          </div>
        </div>
      </div>
    );
  }

  const hasLocalData = stats.musicians.localStorage > 0 || stats.songs.localStorage > 0;
  const alreadyMigrated = stats.musicians.firebase > 0 || stats.songs.firebase > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Migration des Données</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Explication */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 font-medium">
                L'application utilise maintenant Firebase (cloud database)
              </p>
              <p className="text-sm text-blue-800 mt-1">
                Vos données actuelles sont dans le navigateur (localStorage). 
                Cliquez sur "Migrer" pour les transférer vers Firebase et les rendre accessibles partout.
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Musiciens */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Musiciens</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Dans le navigateur:</span>
                <span className="font-semibold text-gray-900">{stats.musicians.localStorage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dans Firebase:</span>
                <span className="font-semibold text-blue-600">{stats.musicians.firebase}</span>
              </div>
              {migrating && stats.musicians.migrated > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Migrés:</span>
                  <span className="font-semibold">{stats.musicians.migrated}</span>
                </div>
              )}
            </div>
          </div>

          {/* Chansons */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Music className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Chansons</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Dans le navigateur:</span>
                <span className="font-semibold text-gray-900">{stats.songs.localStorage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dans Firebase:</span>
                <span className="font-semibold text-blue-600">{stats.songs.firebase}</span>
              </div>
              {migrating && stats.songs.migrated > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Migrés:</span>
                  <span className="font-semibold">{stats.songs.migrated}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <p className="text-sm text-red-900">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-900 font-medium">
                  Migration réussie! 🎉
                </p>
                <p className="text-sm text-green-800 mt-1">
                  {stats.musicians.migrated} musiciens et {stats.songs.migrated} chansons 
                  ont été transférés vers Firebase.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* État "Pas de données locales" */}
        {!hasLocalData && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <p className="text-gray-900 font-medium">Aucune donnée à migrer</p>
            <p className="text-sm text-gray-600 mt-1">
              Votre navigateur ne contient pas de données locales à transférer.
            </p>
          </div>
        )}

        {/* État "Déjà migré" */}
        {alreadyMigrated && !success && hasLocalData && (
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900 font-medium">
                  Données Firebase détectées
                </p>
                <p className="text-sm text-yellow-800 mt-1">
                  Il semble que vous ayez déjà des données dans Firebase. 
                  La migration ajoutera les données locales sans supprimer les existantes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={migrating}
          >
            {success ? 'Fermer' : 'Annuler'}
          </button>
          
          {hasLocalData && !success && (
            <button
              onClick={migrateData}
              disabled={migrating}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {migrating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Migration en cours...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Migrer vers Firebase
                </>
              )}
            </button>
          )}
        </div>

        {/* Info supplémentaire */}
        {hasLocalData && !success && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              💡 Après la migration, vos données seront synchronisées sur tous vos appareils
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
