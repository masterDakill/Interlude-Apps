export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  duration: number; // in seconds
  lyrics?: string;
  chords?: string;
  notes?: string;
  practiceLog: PracticeEntry[];
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'learning' | 'rehearsing' | 'ready';
  tags: string[];
  // Nouveaux champs
  audioFiles: AudioFile[];
  sheetMusic: SheetMusicFile[];
  musicians: SongMusician[];
  keyboardPatches: KeyboardPatch[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PracticeEntry {
  id: string;
  date: Date;
  duration: number; // in minutes
  notes: string;
  quality: 1 | 2 | 3 | 4 | 5; // 1 = poor, 5 = excellent
}

export interface Setlist {
  id: string;
  name: string;
  songs: SetlistSong[];
  totalDuration: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SetlistSong {
  songId: string;
  order: number;
  notes?: string;
}

export interface Show {
  id: string;
  name: string;
  venue: string;
  date: Date;
  setlistId?: string;
  technicalSheet: TechnicalSheet;
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TechnicalSheet {
  stage: StageRequirements;
  sound: SoundRequirements;
  lighting: LightingRequirements;
  backline: BacklineItem[];
  additionalNotes?: string;
}

export interface StageRequirements {
  width?: number;
  depth?: number;
  power: PowerRequirement[];
  risers?: string;
}

export interface PowerRequirement {
  voltage: number;
  outlets: number;
  location: string;
}

export interface SoundRequirements {
  channels: ChannelRequirement[];
  monitors: number;
  monitorMix?: string;
  pa?: string;
}

export interface ChannelRequirement {
  number: number;
  instrument: string;
  micType?: string;
  diBox?: boolean;
  phantom48v?: boolean;
  notes?: string;
}

export interface LightingRequirements {
  type?: string;
  colors?: string[];
  specialEffects?: string[];
  notes?: string;
}

export interface BacklineItem {
  item: string;
  quantity: number;
  provided: boolean;
  notes?: string;
}

// Nouveaux types pour les fonctionnalités avancées

export interface AudioFile {
  id: string;
  name: string;
  url: string;
  type: 'recording' | 'backing-track' | 'reference' | 'practice';
  duration: number;
  uploadedAt: Date;
  waveformData?: number[];
  markers?: AudioMarker[];
}

export interface AudioMarker {
  id: string;
  time: number; // in seconds
  label: string;
  color?: string;
}

export interface SheetMusicFile {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image';
  instrument?: string;
  pageCount?: number;
  uploadedAt: Date;
}

export interface Musician {
  id: string;
  firstName: string;
  lastName: string;
  instrument: string;
  isStudent: boolean;
  email?: string;
  phone?: string;
  notes?: string;
  avatar?: string;
  needsMic?: boolean;
  needsDI?: boolean;
  needsInputMic?: boolean;
  createdAt: Date;
}

export interface SongMusician {
  musicianId: string;
  instrument: string;
  role: 'lead' | 'backup' | 'section';
  notes?: string;
}

export interface KeyboardPatch {
  id: string;
  name: string;
  bank?: string;
  program?: number;
  keyboardModel?: string;
  settings?: Record<string, any>;
  notes?: string;
  sections?: PatchSection[];
}

export interface PatchSection {
  name: string; // e.g., "Intro", "Verse", "Chorus"
  timestamp: number; // in seconds
  patchChange?: {
    bank?: string;
    program?: number;
  };
}

export interface VenueLayout {
  id: string;
  name: string;
  width: number;
  height: number;
  elements: VenueElement[];
  backgroundImage?: string;
}

export interface VenueElement {
  id: string;
  type: 'stage' | 'piano' | 'musician' | 'speaker' | 'monitor' | 'mic' | 'instrument' | 'table' | 'chair';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  label?: string;
  musicianId?: string;
  color?: string;
  notes?: string;
}

export interface MusicianStats {
  totalStudents: number;
  totalProfessionals: number;
  instrumentBreakdown: Record<string, number>;
  microphoneCount: {
    vocal: number;
    violin: number;
    piano: number;
    other: number;
  };
}
