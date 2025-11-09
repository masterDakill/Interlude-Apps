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
import { Show } from '../types';

const COLLECTION = 'shows';

// Convertir un document Firestore en Show
const docToShow = (doc: QueryDocumentSnapshot<DocumentData>): Show => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    venue: data.venue || '',
    date: data.date?.toDate() || new Date(),
    setlistId: data.setlistId,
    status: data.status || 'planned',
    notes: data.notes || '',
    technicalSheet: data.technicalSheet || {
      stage: { power: [] },
      sound: { channels: [], monitors: 0 },
      lighting: {},
      backline: []
    },
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
  };
};

export const showService = {
  /**
   * Créer un nouveau spectacle
   */
  async create(show: Omit<Show, 'id'>): Promise<Show> {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...show,
        date: Timestamp.fromDate(new Date(show.date)),
        createdAt: Timestamp.now(),
      });
      
      return { 
        id: docRef.id, 
        ...show,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Erreur création spectacle:', error);
      throw new Error('Impossible de créer le spectacle');
    }
  },

  /**
   * Récupérer tous les spectacles
   */
  async getAll(): Promise<Show[]> {
    try {
      const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(docToShow);
    } catch (error) {
      console.error('Erreur récupération spectacles:', error);
      throw new Error('Impossible de récupérer les spectacles');
    }
  },

  /**
   * Mettre à jour un spectacle
   */
  async update(id: string, data: Partial<Show>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION, id);
      const { id: _, createdAt, ...updateData } = data as any;
      
      // Convertir la date si présente
      if (updateData.date) {
        updateData.date = Timestamp.fromDate(new Date(updateData.date));
      }
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erreur mise à jour spectacle:', error);
      throw new Error('Impossible de mettre à jour le spectacle');
    }
  },

  /**
   * Supprimer un spectacle
   */
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
    } catch (error) {
      console.error('Erreur suppression spectacle:', error);
      throw new Error('Impossible de supprimer le spectacle');
    }
  },
};
