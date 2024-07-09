import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; // Adjust the path as necessary
import { getFirestore, doc, getDoc,collection,addDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState(null); // State to hold Firestore instance

  const login = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  const submitReview = async (reviewData) => {
    try {
      const { currentUser } = auth;
      if (!currentUser) {
        throw new Error('User not authenticated.');
      }

      await addDoc(collection(db, 'reviews'), {
        userId: currentUser.uid,
        ...reviewData,
        timestamp: new Date(),
      });
      console.log('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user && !user.displayName) {
        // If user is logged in but does not have displayName, fetch from Firestore
        const db = getFirestore();
        const userDocRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          user.displayName = userData.fullname || 'Unknown User';
        }
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup function to unsubscribe from the listener
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    submitReview,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
