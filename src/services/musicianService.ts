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
import { Musician } from '../types';

const COLLECTION = 'musicians';

// Convertir un document Firestore en Musician
const docToMusician = (doc: QueryDocumentSnapshot<DocumentData>): Musician => {
  const data = doc.data();
  return {
    id: doc.id,
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    instrument: data.instrument,
    isStudent: data.isStudent || false,
    email: data.email || '',
    phone: data.phone || '',
    notes: data.notes || '',
    avatar: data.avatar,
    needsMic: data.needsMic || false,
    needsDI: data.needsDI || false,
    needsInputMic: data.needsInputMic || false,
    createdAt: data.createdAt?.toDate() || new Date(),
  };
};

export const musicianService = {
  /**
   * Créer un nouveau musicien
   */
  async create(musician: Omit<Musician, 'id'>): Promise<Musician> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...musician,
        createdAt: Timestamp.now(),
      });
      
      return { 
        id: docRef.id, 
        ...musician,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Erreur création musicien:', error);
      throw new Error('Impossible de créer le musicien');
    }
  },

  /**
   * Récupérer tous les musiciens
   */
  async getAll(): Promise<Musician[]> {
    try {
      const q = query(collection(db, COLLECTION), orderBy('firstName'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(docToMusician);
    } catch (error) {
      console.error('Erreur récupération musiciens:', error);
      throw new Error('Impossible de récupérer les musiciens');
    }
  },

  /**
   * Mettre à jour un musicien
   */
  async update(id: string, data: Partial<Musician>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      const { id: _, createdAt, ...updateData } = data as any;
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erreur mise à jour musicien:', error);
      throw new Error('Impossible de mettre à jour le musicien');
    }
  },

  /**
   * Supprimer un musicien
   */
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      console.error('Erreur suppression musicien:', error);
      throw new Error('Impossible de supprimer le musicien');
    }
  },

  /**
   * Importer plusieurs musiciens en batch
   */
  async importBatch(musicians: Omit<Musician, 'id'>[]): Promise<Musician[]> {
    try {
      const promises = musicians.map(musician => this.create(musician));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Erreur import batch musiciens:', error);
      throw new Error('Impossible d\'importer les musiciens');
    }
  },
};
