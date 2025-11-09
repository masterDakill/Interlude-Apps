import React, { useState } from 'react';
import { FolderOpen, Download, CheckCircle, AlertCircle, FileAudio, FileText, Loader } from 'lucide-react';
import { Song, AudioFile, SheetMusicFile } from '../types';
import { generateId } from '../utils/helpers';

interface DropboxAutoImportProps {
  onImportComplete: (importedData: {
    songs: Song[];
    audioFiles: { songId: string; file: AudioFile }[];
    sheetMusic: { songId: string; file: SheetMusicFile }[];
  }) => void;
}

export const DropboxAutoImport: React.FC<DropboxAutoImportProps> = ({ onImportComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [dropboxFolderUrl, setDropboxFolderUrl] = useState('');
  const [scanResults, setScanResults] = useState<{
    audioCount: number;
    sheetCount: number;
    songsCreated: number;
  } | null>(null);
  const [error, setError] = useState('');

  // Exemple de structure Dropbox attendue:
  // /Spectacle_Interlude/
  //   - Audio/
  //     - 2023/
  //       - chanson1.mp3
  //       - chanson2.wav
  //     - 2024/
  //       - chanson3.mp3
  //   - Partitions/
  //     - 2023/
  //       - chanson1.pdf
  //     - 2024/
  //       - chanson3.pdf

  const handleScan = async () => {
    if (!dropboxFolderUrl.trim()) {
      setError('Veuillez entrer une URL de dossier Dropbox');
      return;
    }

    setIsScanning(true);
    setError('');
    setScanResults(null);

    try {
      // Simulation de scan (dans une vraie implémentation, on utiliserait l'API Dropbox)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Exemple de données importées (simulé)
      const importedSongs: Song[] = [];
      const importedAudio: { songId: string; file: AudioFile }[] = [];
      const importedSheets: { songId: string; file: SheetMusicFile }[] = [];

      // NOTE: Pour une vraie implémentation avec Dropbox API:
      // 1. Utiliser Dropbox SDK avec un Access Token
      // 2. Lister les fichiers avec files/list_folder
      // 3. Générer des liens temporaires avec files/get_temporary_link
      // 4. Organiser par année basé sur la structure des dossiers

      // Exemple de structure de scan simulé
      const mockFiles = [
        { year: 2024, name: 'Nocturne Op.9 No.2.mp3', type: 'audio' },
        { year: 2024, name: 'Nocturne Op.9 No.2.pdf', type: 'sheet' },
        { year: 2024, name: 'Clair de Lune.mp3', type: 'audio' },
        { year: 2023, name: 'Fantaisie-Impromptu.wav', type: 'audio' },
        { year: 2023, name: 'Fantaisie-Impromptu.pdf', type: 'sheet' },
      ];

      // Grouper par nom de chanson
      const songsByName = new Map<string, { audio: any[], sheets: any[], year: number }>();

      mockFiles.forEach(file => {
        const songName = file.name.replace(/\.(mp3|wav|pdf|jpg|png)$/i, '');
        if (!songsByName.has(songName)) {
          songsByName.set(songName, { audio: [], sheets: [], year: file.year });
        }
        const songData = songsByName.get(songName)!;
        if (file.type === 'audio') {
          songData.audio.push(file);
        } else {
          songData.sheets.push(file);
        }
      });

      // Créer les chansons et leurs fichiers associés
      songsByName.forEach((data, songName) => {
        const songId = generateId();
        const song: Song = {
          id: songId,
          title: songName,
          artist: 'Importé depuis Dropbox',
          key: 'C',
          tempo: 120,
          duration: 0,
          difficulty: 'medium',
          status: 'learning',
          tags: [`Année ${data.year}`],
          practiceLog: [],
          audioFiles: [],
          sheetMusic: [],
          musicians: [],
          keyboardPatches: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        importedSongs.push(song);

        // Ajouter les fichiers audio
        data.audio.forEach(audioFile => {
          const audio: AudioFile = {
            id: generateId(),
            name: audioFile.name,
            url: `${dropboxFolderUrl}/Audio/${audioFile.year}/${audioFile.name}?raw=1`,
            type: 'recording',
            duration: 0,
            uploadedAt: new Date(),
          };
          importedAudio.push({ songId, file: audio });
        });

        // Ajouter les partitions
        data.sheets.forEach(sheetFile => {
          const sheet: SheetMusicFile = {
            id: generateId(),
            name: sheetFile.name,
            url: `${dropboxFolderUrl}/Partitions/${sheetFile.year}/${sheetFile.name}?raw=1`,
            type: 'pdf',
            uploadedAt: new Date(),
          };
          importedSheets.push({ songId, file: sheet });
        });
      });

      setScanResults({
        audioCount: importedAudio.length,
        sheetCount: importedSheets.length,
        songsCreated: importedSongs.length,
      });

      onImportComplete({
        songs: importedSongs,
        audioFiles: importedAudio,
        sheetMusic: importedSheets,
      });

    } catch (err) {
      setError('Erreur lors du scan du dossier Dropbox');
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <FolderOpen size={24} />
          Import Automatique depuis Dropbox
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
            📂 Structure attendue du dossier Dropbox:
          </h4>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: '1.8', fontFamily: 'monospace' }}>
            <div>/Spectacle_Interlude/</div>
            <div style={{ marginLeft: '1rem' }}>├── Audio/</div>
            <div style={{ marginLeft: '2rem' }}>│   ├── 2023/</div>
            <div style={{ marginLeft: '3rem' }}>│   │   ├── chanson1.mp3</div>
            <div style={{ marginLeft: '3rem' }}>│   │   └── chanson2.wav</div>
            <div style={{ marginLeft: '2rem' }}>│   └── 2024/</div>
            <div style={{ marginLeft: '3rem' }}>│       └── chanson3.mp3</div>
            <div style={{ marginLeft: '1rem' }}>└── Partitions/</div>
            <div style={{ marginLeft: '2rem' }}>    ├── 2023/</div>
            <div style={{ marginLeft: '3rem' }}>    │   └── chanson1.pdf</div>
            <div style={{ marginLeft: '2rem' }}>    └── 2024/</div>
            <div style={{ marginLeft: '3rem' }}>        └── chanson3.pdf</div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label">URL du dossier Dropbox racine</label>
          <input
            type="text"
            className="form-input"
            placeholder="https://www.dropbox.com/scl/fo/..."
            value={dropboxFolderUrl}
            onChange={(e) => {
              setDropboxFolderUrl(e.target.value);
              setError('');
            }}
            disabled={isScanning}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
            💡 Le système va automatiquement scanner les sous-dossiers Audio/ et Partitions/ et créer les chansons correspondantes
          </p>
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

        {scanResults && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid var(--success)',
            borderRadius: '8px',
            marginBottom: '1rem',
            color: 'var(--success)',
          }}>
            <CheckCircle size={20} />
            <div>
              <strong>Import réussi!</strong>
              <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {scanResults.songsCreated} chansons créées • {scanResults.audioCount} fichiers audio • {scanResults.sheetCount} partitions
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleScan}
            disabled={isScanning || !dropboxFolderUrl.trim()}
            style={{ flex: 1 }}
          >
            {isScanning ? (
              <>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Scan en cours...
              </>
            ) : (
              <>
                <Download size={20} />
                Scanner et Importer
              </>
            )}
          </button>
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'var(--cream)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'var(--gray)',
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark)' }}>
            ℹ️ Notes importantes:
          </strong>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>Les fichiers audio et partitions avec le même nom seront automatiquement associés à la même chanson</li>
            <li>L'organisation par année est basée sur la structure des sous-dossiers (2023/, 2024/, etc.)</li>
            <li>Les chansons seront automatiquement taguées avec leur année</li>
            <li>Format supportés: MP3, WAV (audio) • PDF, JPG, PNG (partitions)</li>
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
