import { 
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    DocumentData,
    WhereFilterOp
  } from 'firebase/firestore';
  import { db } from '../lib/firebase';
  import { useAuthStore } from '../store/authStore';
  
  export function useFirestore(collectionName: string) {
    const { user } = useAuthStore();
  
    const getDocuments = async (
      conditions: { field: string; operator: string; value: unknown }[] = [],
      sortBy?: { field: string; direction: 'asc' | 'desc' },
      limitTo?: number
    ) => {
      try {
        let q = query(
          collection(db, collectionName),
          where('tenantId', '==', user?.tenantId)
        );
  
        // Add additional query conditions
        conditions.forEach(({ field, operator, value }) => {
          q = query(q, where(field, operator as WhereFilterOp, value));
        });
  
        // Add sorting if specified
        if (sortBy) {
          q = query(q, orderBy(sortBy.field, sortBy.direction));
        }
  
        // Add limit if specified
        if (limitTo) {
          q = query(q, limit(limitTo));
        }
  
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
      }
    };
  
    const addDocument = async (data: DocumentData) => {
      try {
        const docRef = await addDoc(collection(db, collectionName), {
          ...data,
          tenantId: user?.tenantId,
          createdAt: new Date().toISOString()
        });
        return docRef.id;
      } catch (error) {
        console.error('Error adding document:', error);
        throw error;
      }
    };
  
    const updateDocument = async (id: string, data: Partial<DocumentData>) => {
      try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating document:', error);
        throw error;
      }
    };
  
    const deleteDocument = async (id: string) => {
      try {
        await deleteDoc(doc(db, collectionName, id));
      } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
      }
    };
  
    return {
      getDocuments,
      addDocument,
      updateDocument,
      deleteDocument
    };
  }