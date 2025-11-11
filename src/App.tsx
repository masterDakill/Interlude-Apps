import React, { useState, useEffect } from 'react';
import { Music, ListMusic, Calendar, FileText, FolderOpen, Users, Maximize2, Download, Database } from 'lucide-react';
import { Song, Setlist, Show, Musician, VenueLayout, AudioFile, SheetMusicFile } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SongsLibrary } from './components/SongsLibrary';
import { SetlistPlanner } from './components/SetlistPlanner';
import { ShowManagerNew } from './components/ShowManagerNew';
import { CueSheet } from './components/CueSheet';
import { Documents } from './components/Documents';
import { MusiciansContainer } from './components/MusiciansContainer';
import { SongsContainer } from './components/SongsContainer';
import { VenueManager } from './components/VenueManager';
import { Logo3D } from './components/Logo3D';
import { ImportManager } from './components/ImportManager';
import { DataMigration } from './components/DataMigration';
import './App.css';

type Tab = 'songs' | 'setlists' | 'shows' | 'cuesheet' | 'documents' | 'musicians' | 'venue' | 'import';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('songs');
  const [showMigration, setShowMigration] = useState(false);
  const [hasLocalData, setHasLocalData] = useState(false);

  // Vérifier si on a des données locales à migrer
  useEffect(() => {
    const checkLocalData = () => {
      const localMusicians = JSON.parse(localStorage.getItem('musicians') || '[]');
      const localSongs = JSON.parse(localStorage.getItem('songs') || '[]');
      const hasData = localMusicians.length > 0 || localSongs.length > 0;
      setHasLocalData(hasData);
      
      // Afficher automatiquement la migration si on a des données locales
      if (hasData) {
        setShowMigration(true);
      }
    };
    
    checkLocalData();
  }, []);
  const [songs, setSongs] = useLocalStorage<Song[]>('interlude-songs', []);
  const [setlists, setSetlists] = useLocalStorage<Setlist[]>('interlude-setlists', []);
  const [shows, setShows] = useLocalStorage<Show[]>('interlude-shows', []);
  const [musicians, setMusicians] = useLocalStorage<Musician[]>('interlude-musicians', []);
  const [venueLayout, setVenueLayout] = useLocalStorage<VenueLayout | null>('interlude-venue-layout', null);

  const handleAddSong = (song: Song) => {
    setSongs([...songs, song]);
  };

  const handleUpdateSong = (updatedSong: Song) => {
    setSongs(songs.map(s => s.id === updatedSong.id ? updatedSong : s));
  };

  const handleDeleteSong = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette chanson ?')) {
      setSongs(songs.filter(s => s.id !== id));
      // Remove from setlists
      setSetlists(setlists.map(setlist => ({
        ...setlist,
        songs: setlist.songs.filter(ss => ss.songId !== id),
      })));
    }
  };

  const handleAddSetlist = (setlist: Setlist) => {
    setSetlists([...setlists, setlist]);
  };

  const handleUpdateSetlist = (updatedSetlist: Setlist) => {
    setSetlists(setlists.map(s => s.id === updatedSetlist.id ? updatedSetlist : s));
  };

  const handleDeleteSetlist = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette liste de lecture ?')) {
      setSetlists(setlists.filter(s => s.id !== id));
      // Update shows that use this setlist
      setShows(shows.map(show => 
        show.setlistId === id ? { ...show, setlistId: undefined } : show
      ));
    }
  };

  const handleAddShow = (show: Show) => {
    setShows([...shows, show]);
  };

  const handleUpdateShow = (updatedShow: Show) => {
    setShows(shows.map(s => s.id === updatedShow.id ? updatedShow : s));
  };

  const handleDeleteShow = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce spectacle ?')) {
      setShows(shows.filter(s => s.id !== id));
    }
  };

  const handleAddMusician = (musician: Musician) => {
    setMusicians([...musicians, musician]);
  };

  const handleUpdateMusician = (updatedMusician: Musician) => {
    setMusicians(musicians.map(m => m.id === updatedMusician.id ? updatedMusician : m));
  };

  const handleDeleteMusician = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce musicien ?')) {
      setMusicians(musicians.filter(m => m.id !== id));
    }
  };

  const handleSaveVenueLayout = (layout: VenueLayout) => {
    setVenueLayout(layout);
  };

  const handleImportComplete = (importedData: {
    songs: Song[];
    audioFiles: { songId: string; file: AudioFile }[];
    sheetMusic: { songId: string; file: SheetMusicFile }[];
  }) => {
    // Fusionner les chansons importées avec les existantes
    const newSongs = importedData.songs.map(song => {
      // Ajouter les fichiers audio et partitions à la chanson
      const songAudio = importedData.audioFiles
        .filter(a => a.songId === song.id)
        .map(a => a.file);
      const songSheets = importedData.sheetMusic
        .filter(s => s.songId === song.id)
        .map(s => s.file);
      
      return {
        ...song,
        audioFiles: songAudio,
        sheetMusic: songSheets,
      };
    });

    setSongs([...songs, ...newSongs]);
    alert(`✅ Import réussi! ${newSongs.length} chansons importées.`);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
            <Logo3D size={80} />
            <div style={{ flex: 1 }}>
              <h1 className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Spectacle Interlude
              </h1>
              <p className="header-subtitle">Votre compagnon de gestion de spectacles</p>
            </div>
          </div>
          
          {/* Bouton Migration */}
          {hasLocalData && (
            <button
              onClick={() => setShowMigration(true)}
              className="migration-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <Database size={16} />
              Migrer vers Firebase
            </button>
          )}
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <button
            className={`nav-button ${activeTab === 'songs' ? 'active' : ''}`}
            onClick={() => setActiveTab('songs')}
          >
            <Music size={20} />
            Chansons
          </button>
          <button
            className={`nav-button ${activeTab === 'setlists' ? 'active' : ''}`}
            onClick={() => setActiveTab('setlists')}
          >
            <ListMusic size={20} />
            Listes de lecture
          </button>
          <button
            className={`nav-button ${activeTab === 'shows' ? 'active' : ''}`}
            onClick={() => setActiveTab('shows')}
          >
            <Calendar size={20} />
            Spectacles
          </button>
          <button
            className={`nav-button ${activeTab === 'cuesheet' ? 'active' : ''}`}
            onClick={() => setActiveTab('cuesheet')}
          >
            <FileText size={20} />
            Cue Sheet
          </button>
          <button
            className={`nav-button ${activeTab === 'musicians' ? 'active' : ''}`}
            onClick={() => setActiveTab('musicians')}
          >
            <Users size={20} />
            Musiciens
          </button>
          <button
            className={`nav-button ${activeTab === 'venue' ? 'active' : ''}`}
            onClick={() => setActiveTab('venue')}
          >
            <Maximize2 size={20} />
            Salle
          </button>
          <button
            className={`nav-button ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            <Download size={20} />
            Import
          </button>
          <button
            className={`nav-button ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FolderOpen size={20} />
            Documents
          </button>
        </div>
      </nav>

      <main className="main-content">
        {/* Modal de migration */}
        {showMigration && (
          <DataMigration onClose={() => setShowMigration(false)} />
        )}
        
        {activeTab === 'songs' && (
          <SongsContainer />
        )}
        {activeTab === 'setlists' && (
          <SetlistPlanner
            setlists={setlists}
            songs={songs}
            onAddSetlist={handleAddSetlist}
            onUpdateSetlist={handleUpdateSetlist}
            onDeleteSetlist={handleDeleteSetlist}
          />
        )}
        {activeTab === 'shows' && (
          <ShowManagerNew
            shows={shows}
            setlists={setlists}
            onAddShow={handleAddShow}
            onUpdateShow={handleUpdateShow}
            onDeleteShow={handleDeleteShow}
          />
        )}
        {activeTab === 'cuesheet' && (
          <CueSheet
            setlists={setlists}
            songs={songs}
            musicians={musicians}
            onUpdateSong={handleUpdateSong}
          />
        )}
        {activeTab === 'musicians' && (
          <MusiciansContainer />
        )}
        {activeTab === 'venue' && (
          <VenueManager
            layout={venueLayout}
            musicians={musicians}
            onSaveLayout={handleSaveVenueLayout}
          />
        )}
        {activeTab === 'import' && (
          <ImportManager
            onImportComplete={handleImportComplete}
          />
        )}
        {activeTab === 'documents' && (
          <Documents />
        )}
      </main>
    </div>
  );
}

export default App;
