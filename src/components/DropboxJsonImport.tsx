import React, { useState } from 'react';
import { Download, CheckCircle, AlertCircle, FileAudio, Loader, Music } from 'lucide-react';
import { Song, AudioFile } from '../types';
import { generateId } from '../utils/helpers';

interface DropboxJsonImportProps {
  onImportComplete: (songs: Song[]) => void;
}

export const DropboxJsonImport: React.FC<DropboxJsonImportProps> = ({ onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    songsCreated: number;
    songs: string[];
  } | null>(null);
  const [error, setError] = useState('');

  const handleImport = async () => {
    setIsImporting(true);
    setError('');
    setImportResults(null);

    try {
      // Charger les données Dropbox depuis le JSON
      const response = await fetch('/dropbox_audio_list.json');
      if (!response.ok) {
        throw new Error('Fichier JSON Dropbox non trouvé');
      }
      
      const dropboxData = await response.json();
      
      if (!Array.isArray(dropboxData) || dropboxData.length === 0) {
        throw new Error('Le fichier JSON est vide ou invalide');
      }

      // Parser les données Dropbox réelles
      const parsedFiles = dropboxData.map((item: any) => {
        const fileName = item.dig_truncate__singleline;
        const url = item.dig_link_url;
        
        // Extraire le titre de la chanson (enlever le numéro et l'extension)
        let songTitle = fileName
          .replace(/^\d+[A-Z]?\s*-\s*/, '') // Enlève "1 - " ou "1A - "
          .replace(/\.(mp3|wav|pdf|jpg|png)$/i, '') // Enlève l'extension
          .replace(/_/g, ' ') // Remplace les underscores
          .trim();
        
        // Nettoyer les underscores restants dans le titre
        songTitle = songTitle.replace(/_/g, '\'');
        
        // Extraire l'artiste si présent (format: "Title - From Soundtrack")
        let artist = 'Artiste Inconnu';
        const fromMatch = songTitle.match(/\s+-\s+From\s+["'](.+?)["']/i);
        if (fromMatch) {
          artist = fromMatch[1];
          songTitle = songTitle.replace(/\s+-\s+From\s+.+$/i, '').trim();
        }
        
        return {
          fileName,
          songTitle,
          artist,
          url: url.replace('?dl=0', '?raw=1'), // Pour download direct
          size: item.dig_text_1,
          date: item.dig_text,
        };
      });

      // Grouper les fichiers par titre de chanson
      const songsByTitle = new Map<string, typeof parsedFiles[0][]>();
      parsedFiles.forEach(file => {
        const existing = songsByTitle.get(file.songTitle) || [];
        existing.push(file);
        songsByTitle.set(file.songTitle, existing);
      });

      // Créer les chansons
      const importedSongs: Song[] = [];
      const songTitles: string[] = [];

      songsByTitle.forEach((files, title) => {
        const firstFile = files[0];
        const songId = generateId();
        
        // Créer les AudioFile depuis les fichiers MP3/WAV
        const audioFiles: AudioFile[] = files
          .filter(f => f.fileName.match(/\.(mp3|wav)$/i))
          .map(f => ({
            id: generateId(),
            name: f.fileName,
            url: f.url,
            type: 'recording' as const,
            duration: 0,
            uploadedAt: new Date(),
          }));

        const song: Song = {
          id: songId,
          title,
          artist: firstFile.artist,
          key: 'C',
          tempo: 120,
          duration: 0,
          difficulty: 'medium',
          status: 'learning',
          tags: ['Dropbox Import', '2024'],
          practiceLog: [],
          audioFiles,
          sheetMusic: [],
          musicians: [],
          keyboardPatches: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        importedSongs.push(song);
        songTitles.push(title);
      });

      setImportResults({
        songsCreated: importedSongs.length,
        songs: songTitles,
      });

      onImportComplete(importedSongs);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'import');
      console.error(err);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Music size={24} />
          Import Dropbox (14 chansons disponibles)
        </h3>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{
          padding: '1rem',
          background: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--secondary)',
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--primary)' }}>
            🎵 Chansons prêtes à importer:
          </h4>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: '1.8' }}>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li>The Time Of My Life (Dirty Dancing)</li>
              <li>Stayin' Alive (Saturday Night Fever)</li>
              <li>Another Brick in the Wall (versions INTRO, PIECE, LIVE)</li>
              <li>Funkytown</li>
              <li>Live And Let Die</li>
              <li>Shallow</li>
              <li>You're The One That I Want (Grease)</li>
              <li>School's Out (Alice Cooper)</li>
              <li>Et 6 autres titres...</li>
            </ul>
          </div>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--danger)',
            borderRadius: '8px',
            marginBottom: '1rem',
            color: 'var(--danger)',
          }}>
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {importResults && (
          <div style={{
            padding: '1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid var(--success)',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '0.75rem' }}>
              <CheckCircle size={20} />
              <strong>{importResults.songsCreated} chansons importées avec succès!</strong>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--gray)', maxHeight: '200px', overflowY: 'auto' }}>
              {importResults.songs.map((title, idx) => (
                <div key={idx} style={{ padding: '0.25rem 0' }}>
                  ✓ {title}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          className="btn btn-primary"
          onClick={handleImport}
          disabled={isImporting}
          style={{ width: '100%' }}
        >
          {isImporting ? (
            <>
              <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
              Import en cours...
            </>
          ) : (
            <>
              <Download size={20} />
              Importer les 14 chansons depuis Dropbox
            </>
          )}
        </button>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'var(--cream)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'var(--gray)',
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark)' }}>
            ℹ️ Informations:
          </strong>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Toutes les chansons de votre dossier Dropbox seront importées</li>
            <li>Les fichiers audio seront liés directement à Dropbox (pas de téléchargement)</li>
            <li>Les chansons seront automatiquement taguées "Dropbox Import"</li>
            <li>Les artistes sont extraits automatiquement des noms de fichiers</li>
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
