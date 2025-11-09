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
import { Setlist } from '../types';

const COLLECTION = 'setlists';

// Convertir un document Firestore en Setlist
const docToSetlist = (doc: QueryDocumentSnapshot<DocumentData>): Setlist => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    songs: data.songs || [],
    notes: data.notes || '',
    totalDuration: data.totalDuration || 0,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

export const setlistService = {
  /**
   * Créer une nouvelle setlist
   */
  async create(setlist: Omit<Setlist, 'id'>): Promise<Setlist> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...setlist,
        createdAt: Timestamp.now(),
      });
      
      return { 
        id: docRef.id, 
        ...setlist,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Erreur création setlist:', error);
      throw new Error('Impossible de créer la setlist');
    }
  },

  /**
   * Récupérer toutes les setlists
   */
  async getAll(): Promise<Setlist[]> {
    try {
      const q = query(collection(db, COLLECTION), orderBy('name'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(docToSetlist);
    } catch (error) {
      console.error('Erreur récupération setlists:', error);
      throw new Error('Impossible de récupérer les setlists');
    }
  },

  /**
   * Mettre à jour une setlist
   */
  async update(id: string, data: Partial<Setlist>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      const { id: _, createdAt, ...updateData } = data as any;
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erreur mise à jour setlist:', error);
      throw new Error('Impossible de mettre à jour la setlist');
    }
  },

  /**
   * Supprimer une setlist
   */
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      console.error('Erreur suppression setlist:', error);
      throw new Error('Impossible de supprimer la setlist');
    }
  },
};
