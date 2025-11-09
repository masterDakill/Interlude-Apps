import React, { useState } from 'react';
import { Download, Box, Database } from 'lucide-react';
import { DropboxJsonImport } from './DropboxJsonImport';
import { Model3DViewer } from './Model3DViewer';
import { BackupManager } from './BackupManager';
import { Song } from '../types';

interface ImportManagerProps {
  onImportComplete: (importedData: any) => void;
}

export const ImportManager: React.FC<ImportManagerProps> = ({ onImportComplete }) => {
  const [activeTab, setActiveTab] = useState<'import' | '3d' | 'backup'>('import');

  return (
    <div>
      {/* Tabs */}
      <div style={{ 
        borderBottom: '2px solid var(--border)', 
        padding: '0 0 0 1rem', 
        display: 'flex', 
        gap: '0.5rem',
        marginBottom: '2rem',
      }}>
        <button
          className={`nav-button ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
          style={{ 
            borderBottom: activeTab === 'import' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Download size={18} /> Import Automatique
        </button>
        <button
          className={`nav-button ${activeTab === '3d' ? 'active' : ''}`}
          onClick={() => setActiveTab('3d')}
          style={{ 
            borderBottom: activeTab === '3d' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Box size={18} /> Modèles 3D
        </button>
        <button
          className={`nav-button ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
          style={{ 
            borderBottom: activeTab === 'backup' ? '3px solid var(--secondary)' : 'none', 
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <Database size={18} /> Sauvegarde
        </button>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div>
          <DropboxJsonImport onImportComplete={(songs: Song[]) => {
            // Adapter le format pour onImportComplete
            onImportComplete({
              songs,
              audioFiles: [],
              sheetMusic: [],
            });
          }} />
        </div>
      )}

      {/* Backup Tab */}
      {activeTab === 'backup' && (
        <div>
          <BackupManager />
        </div>
      )}

      {/* 3D Models Tab */}
      {activeTab === '3d' && (
        <div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Box size={24} />
                Galerie de Modèles 3D
              </h3>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <p style={{ 
                fontSize: '1.125rem', 
                color: 'var(--gray)', 
                lineHeight: '1.8',
                marginBottom: '2rem',
              }}>
                Explorez les modèles 3D de nos instruments, scènes et espaces de spectacle.
                Utilisez votre souris pour faire pivoter et zoomer les modèles.
              </p>

              {/* Modèle Polycam principal */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  fontFamily: "'Playfair Display', serif",
                }}>
                  🎹 Scène Spectacle Interlude
                </h4>
                <Model3DViewer 
                  polycamUrl="https://poly.cam/capture/186db6ea-9124-4778-aa7f-e3ec67f6149d/embed"
                  title="Scène Spectacle Interlude - Modèle 3D"
                  height="600px"
                />
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'var(--cream)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: 'var(--gray)',
                }}>
                  <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                    💡 Contrôles:
                  </strong>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                    <li><strong>Clic gauche + glisser</strong>: Faire pivoter le modèle</li>
                    <li><strong>Molette</strong>: Zoomer/Dézoomer</li>
                    <li><strong>Clic droit + glisser</strong>: Déplacer la vue</li>
                    <li><strong>Double-clic</strong>: Réinitialiser la vue</li>
                  </ul>
                </div>
              </div>

              {/* Espace pour futurs modèles */}
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(139, 21, 56, 0.05) 100%)',
                borderRadius: '12px',
                border: '2px dashed var(--border)',
                textAlign: 'center',
              }}>
                <Box size={48} style={{ color: 'var(--gray)', opacity: 0.5, marginBottom: '1rem' }} />
                <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>
                  Ajoutez plus de modèles 3D de vos instruments, scènes et espaces
                </p>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Utilisez Polycam pour scanner vos instruments et espaces de spectacle
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
