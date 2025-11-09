import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Song } from '../types';

const COLLECTION = 'songs';

// Convertir un document Firestore en Song
const docToSong = (doc: QueryDocumentSnapshot<DocumentData>): Song => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    artist: data.artist || '',
    key: data.key || '',
    tempo: data.tempo || 0,
    duration: data.duration || 0,
    difficulty: data.difficulty || 'medium',
    status: data.status || 'learning',
    lyrics: data.lyrics || '',
    chords: data.chords || '',
    notes: data.notes || '',
    tags: data.tags || [],
    audioFiles: data.audioFiles || [],
    sheetMusic: data.sheetMusic || [],
    musicians: data.musicians || [],
    keyboardPatches: data.keyboardPatches || [],
    practiceLog: data.practiceLog || [],
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

export const songService = {
  /**
   * Créer une nouvelle chanson
   */
  async create(song: Omit<Song, 'id'>): Promise<Song> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...song,
        createdAt: Timestamp.now(),
      });
      
      return { 
        id: docRef.id, 
        ...song,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Erreur création chanson:', error);
      throw new Error('Impossible de créer la chanson');
    }
  },

  /**
   * Récupérer toutes les chansons
   */
  async getAll(): Promise<Song[]> {
    try {
      const q = query(collection(db, COLLECTION), orderBy('title'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(docToSong);
    } catch (error) {
      console.error('Erreur récupération chansons:', error);
      throw new Error('Impossible de récupérer les chansons');
    }
  },

  /**
   * Mettre à jour une chanson
   */
  async update(id: string, data: Partial<Song>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      const { id: _, createdAt, ...updateData } = data as any;
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erreur mise à jour chanson:', error);
      throw new Error('Impossible de mettre à jour la chanson');
    }
  },

  /**
   * Supprimer une chanson
   */
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      console.error('Erreur suppression chanson:', error);
      throw new Error('Impossible de supprimer la chanson');
    }
  },

  /**
   * Importer plusieurs chansons en batch
   */
  async importBatch(songs: Omit<Song, 'id'>[]): Promise<Song[]> {
    try {
      const promises = songs.map(song => this.create(song));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Erreur import batch chansons:', error);
      throw new Error('Impossible d\'importer les chansons');
    }
  },

  /**
   * Ajouter une entrée au journal de pratique
   */
  async addPracticeLog(songId: string, logEntry: any): Promise<void> {
    try {
      const songDoc = doc(db, COLLECTION, songId);
      // Récupérer la chanson actuelle
      const snapshot = await getDocs(query(collection(db, COLLECTION)));
      const song = snapshot.docs.find(d => d.id === songId);
      
      if (song) {
        const currentLog = song.data().practiceLog || [];
        await updateDoc(songDoc, {
          practiceLog: [...currentLog, { ...logEntry, date: Timestamp.now() }]
        });
      }
    } catch (error) {
      console.error('Erreur ajout pratique:', error);
      throw new Error('Impossible d\'ajouter l\'entrée de pratique');
    }
  },
};
