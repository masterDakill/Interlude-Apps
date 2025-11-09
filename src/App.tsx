import React, { useState } from 'react';
import { Music, ListMusic, Calendar, FileText, FolderOpen, Users, Maximize2 } from 'lucide-react';
import { Song, Setlist, Show, Musician, VenueLayout } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { SongsLibrary } from './components/SongsLibrary';
import { SetlistPlanner } from './components/SetlistPlanner';
import { ShowManagerNew } from './components/ShowManagerNew';
import { CueSheet } from './components/CueSheet';
import { Documents } from './components/Documents';
import { Musicians } from './components/Musicians';
import { VenueVisualizer } from './components/VenueVisualizer';
import './App.css';

type Tab = 'songs' | 'setlists' | 'shows' | 'cuesheet' | 'documents' | 'musicians' | 'venue';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('songs');
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

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="header-title">
              <Music size={32} />
              Interlude
            </h1>
            <p className="header-subtitle">Votre compagnon de gestion de spectacles</p>
          </div>
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
            className={`nav-button ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FolderOpen size={20} />
            Documents
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'songs' && (
          <SongsLibrary
            songs={songs}
            onAddSong={handleAddSong}
            onUpdateSong={handleUpdateSong}
            onDeleteSong={handleDeleteSong}
          />
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
          <Musicians
            musicians={musicians}
            onAddMusician={handleAddMusician}
            onUpdateMusician={handleUpdateMusician}
            onDeleteMusician={handleDeleteMusician}
          />
        )}
        {activeTab === 'venue' && (
          <VenueVisualizer
            layout={venueLayout}
            musicians={musicians}
            onSaveLayout={handleSaveVenueLayout}
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
