import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout } from '../firebase'; // Adjust path as needed
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Firestore

interface AuthContextProps {
  currentUser: User | null;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(true);  // Set loading while checking for admin role

            if (user) {
                // Check Firestore for admin role
                const adminDoc = await getDoc(doc(db, 'admins', user.uid));
                setIsAdmin(adminDoc.exists() && adminDoc.data()?.role === 'admin');
            } else {
                setIsAdmin(false);
            }

            setLoading(false);  // Loading complete
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, isAdmin, loginWithGoogle, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
