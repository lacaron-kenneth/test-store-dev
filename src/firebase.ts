// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to handle Google login
export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
// Fetch all orders from Firestore and map to Order interface
export const fetchOrders = async (): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const orderSnapshot = await getDocs(ordersRef);

  const orderList = orderSnapshot.docs.map((doc) => {
      const data = doc.data();
      const total = data.items.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0);

      return {
          id: doc.id,
          contact: data.contact || '',
          email: data.email || '',
          items: data.items || [],
          name: data.name || '',
          timestamp: data.timestamp || null,
          status: data.status || 'pending',  // Assuming default status is 'pending'
          total,  // Calculating total price from items
      };
  });

  return orderList;
};
// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderDoc = doc(db, 'orders', orderId);
  await updateDoc(orderDoc, { status });
};

interface Order {
  id: string;
  contact: string;
  email: string;
  items: Array<{
      id: string;
      image: string;
      name: string;
      price: number;
      quantity: number;
      variation: string;
  }>;
  name: string;
  timestamp: any;
  status: string; // Optional or required based on how it's set up in Firestore
  total: number;  // Assuming total is calculated from items
}