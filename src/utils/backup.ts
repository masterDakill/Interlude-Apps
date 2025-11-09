// Utilitaires de sauvegarde et restauration des données

export interface BackupData {
  musicians: any[];
  songs: any[];
  shows: any[];
  setlists: any[];
  exportDate: string;
  version: string;
}

/**
 * Exporte toutes les données de l'application en JSON
 */
export const exportData = (): void => {
  const data: BackupData = {
    musicians: JSON.parse(localStorage.getItem('musicians') || '[]'),
    songs: JSON.parse(localStorage.getItem('songs') || '[]'),
    shows: JSON.parse(localStorage.getItem('shows') || '[]'),
    setlists: JSON.parse(localStorage.getItem('setlists') || '[]'),
    exportDate: new Date().toISOString(),
    version: '1.0',
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `interlude-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Importe les données depuis un fichier JSON
 */
export const importData = (file: File): Promise<BackupData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as BackupData;
        
        // Valider la structure des données
        if (!data.musicians || !data.songs || !data.shows) {
          throw new Error('Format de fichier invalide');
        }
        
        // Restaurer les données dans localStorage
        localStorage.setItem('musicians', JSON.stringify(data.musicians));
        localStorage.setItem('songs', JSON.stringify(data.songs));
        localStorage.setItem('shows', JSON.stringify(data.shows));
        localStorage.setItem('setlists', JSON.stringify(data.setlists || []));
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Compte le nombre total d'éléments dans les données
 */
export const countDataItems = (): { musicians: number; songs: number; shows: number; setlists: number } => {
  return {
    musicians: JSON.parse(localStorage.getItem('musicians') || '[]').length,
    songs: JSON.parse(localStorage.getItem('songs') || '[]').length,
    shows: JSON.parse(localStorage.getItem('shows') || '[]').length,
    setlists: JSON.parse(localStorage.getItem('setlists') || '[]').length,
  };
};
