import React, { useState, useRef } from 'react';
import { Download, Upload, Database, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { exportData, importData, countDataItems } from '../utils/backup';

export const BackupManager: React.FC = () => {
  const [importing, setImporting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const counts = countDataItems();
  const hasData = counts.musicians > 0 || counts.songs > 0 || counts.shows > 0;

  const handleExport = () => {
    try {
      exportData();
      setSuccess('✅ Données exportées avec succès!');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('❌ Erreur lors de l\'export');
      console.error(err);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setError('');
    setSuccess('');

    try {
      const data = await importData(file);
      setSuccess(`✅ Données importées: ${data.musicians.length} musiciens, ${data.songs.length} chansons, ${data.shows.length} spectacles`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'import');
    } finally {
      setImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <Database size={24} />
          Sauvegarde des Données
        </h3>
      </div>

      <div style={{ padding: '1.5rem' }}>
        {/* Info sur les données actuelles */}
        <div style={{
          padding: '1rem',
          background: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid var(--secondary)',
        }}>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: 600, 
            marginBottom: '0.75rem', 
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <Info size={18} />
            Données actuelles
          </h4>
          <div style={{ fontSize: '0.875rem', color: 'var(--gray)', lineHeight: '1.8' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              <div>🎵 <strong>{counts.songs}</strong> chansons</div>
              <div>👥 <strong>{counts.musicians}</strong> musiciens</div>
              <div>🎭 <strong>{counts.shows}</strong> spectacles</div>
              <div>📋 <strong>{counts.setlists}</strong> setlists</div>
            </div>
          </div>
        </div>

        {/* Messages de succès/erreur */}
        {success && (
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
            {success}
          </div>
        )}

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

        {/* Boutons Export/Import */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <button
            className="btn btn-primary"
            onClick={handleExport}
            disabled={!hasData}
            style={{ width: '100%' }}
          >
            <Download size={20} />
            Exporter les données
          </button>

          <button
            className="btn btn-outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            style={{ width: '100%' }}
          >
            <Upload size={20} />
            {importing ? 'Import en cours...' : 'Importer des données'}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />

        {/* Informations et avertissements */}
        <div style={{
          padding: '1rem',
          background: 'var(--cream)',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: 'var(--gray)',
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--dark)' }}>
            ℹ️ Informations importantes:
          </strong>
          <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Export:</strong> Télécharge toutes vos données dans un fichier JSON</li>
            <li><strong>Import:</strong> Restaure les données depuis un fichier de backup</li>
            <li><strong>⚠️ Attention:</strong> L'import remplace toutes les données actuelles</li>
            <li><strong>💡 Conseil:</strong> Exportez régulièrement (1x/semaine recommandé)</li>
          </ul>
        </div>

        {/* Avertissement localStorage */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(255, 193, 7, 0.1)',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          fontSize: '0.875rem',
        }}>
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#f57c00' }}>
            ⚠️ Important - Sauvegarde locale
          </strong>
          <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
            Les données sont stockées dans votre navigateur (localStorage). 
            Elles peuvent être perdues si vous videz le cache du navigateur. 
            <strong> Exportez régulièrement vos données pour éviter toute perte!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
