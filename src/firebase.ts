// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getDoc, getFirestore } from 'firebase/firestore';
import { collection, getDocs, query, where, updateDoc, doc , serverTimestamp} from 'firebase/firestore';
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
// Fetch all orders from Firestore
export const fetchOrders = async (): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const orderSnapshot = await getDocs(ordersRef);

  const orderList = orderSnapshot.docs.map((doc) => {
    const data = doc.data();
    const total = data.items.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0
    );

    return {
      id: doc.id,
      contact: data.contact || '',
      email: data.email || '',
      items: data.items || [],
      name: data.name || '',
      timestamp: data.timestamp || null,
      status: data.status || 'pending', // Default status to 'pending'
      total, // Calculating total price from items
      statusTimestamps: data.statusTimestamps || {}, // Ensure status timestamps are included
    };
  });

  return orderList;
};

// Update order status and timestamp
export const updateOrderStatus = async (orderId: string, newStatus: string) => {
  const orderDoc = doc(db, 'orders', orderId);
  const statusField = `statusTimestamps.${newStatus}`;

  await updateDoc(orderDoc, {
    status: newStatus,
    [statusField]: serverTimestamp(), // Update the timestamp for the new status
  });
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderDoc = doc(db, 'orders', orderId);
  const orderSnapshot = await getDoc(orderDoc);

  if (orderSnapshot.exists()) {
    const data = orderSnapshot.data();
    const total = data.items.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0
    );

    return {
      id: orderSnapshot.id,
      contact: data.contact || '',
      email: data.email || '',
      items: data.items || [],
      name: data.name || '',
      timestamp: data.timestamp || null,
      status: data.status || 'pending',
      total,
      statusTimestamps: data.statusTimestamps || {}, // Ensure status timestamps are included
    };
  } else {
    return null;
  }
};

export interface Order {
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
  statusTimestamps: any;
  status: string; // Optional or required based on how it's set up in Firestore
  total: number;  // Assuming total is calculated from items
}
