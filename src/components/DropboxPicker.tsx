import React, { useState } from 'react';
import { Link as LinkIcon, FolderOpen, AlertCircle } from 'lucide-react';

interface DropboxPickerProps {
  onFileSelected: (url: string, name: string) => void;
  fileType?: 'audio' | 'pdf' | 'image' | 'any';
  buttonText?: string;
}

export const DropboxPicker: React.FC<DropboxPickerProps> = ({
  onFileSelected,
  fileType = 'any',
  buttonText = 'Choisir depuis Dropbox',
}) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');

  const handleDropboxChooser = () => {
    // Note: Pour utiliser le Dropbox Chooser, vous auriez besoin d'un App Key Dropbox
    // et inclure le script Dropbox dans index.html
    // Voir: https://www.dropbox.com/developers/chooser
    
    // Pour l'instant, on utilise l'input URL manuel
    setShowUrlInput(true);
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Veuillez entrer une URL');
      return;
    }

    // Convertir les liens Dropbox en liens directs
    let finalUrl = urlInput.trim();
    
    // Si c'est un lien Dropbox classique, le convertir en lien direct
    if (finalUrl.includes('dropbox.com') && !finalUrl.includes('dl=1')) {
      if (finalUrl.includes('?')) {
        finalUrl = finalUrl.replace('dl=0', 'dl=1').replace('?', '?').replace('dl=0', 'raw=1');
      } else {
        finalUrl += '?raw=1';
      }
    }

    // Extraire le nom du fichier de l'URL
    const fileName = finalUrl.split('/').pop()?.split('?')[0] || 'Fichier';

    onFileSelected(finalUrl, decodeURIComponent(fileName));
    setUrlInput('');
    setShowUrlInput(false);
    setError('');
  };

  const getFileTypeHelp = () => {
    switch (fileType) {
      case 'audio':
        return 'Formats supportés: MP3, WAV, M4A, OGG';
      case 'pdf':
        return 'Format supporté: PDF';
      case 'image':
        return 'Formats supportés: JPG, PNG, GIF';
      default:
        return 'Tous types de fichiers';
    }
  };

  return (
    <div>
      {!showUrlInput ? (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-primary btn-small"
            onClick={handleDropboxChooser}
            style={{ flex: 1 }}
          >
            <FolderOpen size={16} />
            {buttonText}
          </button>
        </div>
      ) : (
        <div style={{ padding: '1rem', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
            <LinkIcon size={18} />
            <strong>Ajouter un fichier Dropbox</strong>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '1rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '0.5rem' }}>📁 {getFileTypeHelp()}</p>
            <p style={{ fontSize: '0.8125rem', fontStyle: 'italic' }}>
              💡 Copiez le lien de partage Dropbox de votre fichier
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input
              type="url"
              className="form-input"
              placeholder="https://www.dropbox.com/s/xxxxx/fichier.mp3"
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                setError('');
              }}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-primary btn-small"
              onClick={handleUrlSubmit}
            >
              Ajouter
            </button>
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '6px', fontSize: '0.875rem', color: 'var(--danger)' }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="button"
            className="btn btn-outline btn-small"
            onClick={() => {
              setShowUrlInput(false);
              setUrlInput('');
              setError('');
            }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Annuler
          </button>

          {/* Instructions détaillées */}
          <details style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--gray)' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: '0.5rem' }}>
              📖 Comment obtenir un lien Dropbox?
            </summary>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Ouvrez Dropbox et trouvez votre fichier</li>
              <li>Cliquez sur "Partager" ou l'icône de lien</li>
              <li>Cliquez sur "Créer un lien" si demandé</li>
              <li>Cliquez sur "Copier le lien"</li>
              <li>Collez le lien ici</li>
            </ol>
            <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
              Le lien sera automatiquement converti pour un accès direct.
            </p>
          </details>
        </div>
      )}
    </div>
  );
};
