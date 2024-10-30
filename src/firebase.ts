// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, setDoc, getDoc, getFirestore, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const storage = getStorage(app);

// Function to handle Google login
export const loginWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// Define Order interface
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

// Define Product interface
export interface Product {
  id: string;
  productCategory: string;
  variations: Array<{
    name: string;
    images: string[];
    description?: string;
    price?: number;
    quantity: number;
  }>;
  timestamp: any;
}


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
      status: data.status || 'pending',
      total,
      statusTimestamps: data.statusTimestamps || {},
    };
  });

  return orderList;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('timestamp', 'desc'));
  const productSnapshot = await getDocs(q);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const addProduct = async (product: Omit<Product, 'id' | 'timestamp'>): Promise<void> => {
  const docRef = doc(collection(db, 'products')); // Create a document reference with an auto-generated ID
  await setDoc(docRef, {
    ...product,
    id: docRef.id, // Use the generated ID
    timestamp: serverTimestamp(),
  });
};


export const updateProduct = async (productId: string, updatedData: Partial<Product>): Promise<void> => {
  const productDoc = doc(db, 'products', productId);
  await updateDoc(productDoc, updatedData);
};


// Delete a product from Firestore
export const deleteProduct = async (productId: string): Promise<void> => {
  const productDoc = doc(db, 'products', productId);
  await deleteDoc(productDoc);
};

// Upload an image to Firebase Storage
export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `product-images/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Upload multiple images to Firebase Storage
export const uploadImages = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(async (file) => {
    const storageRef = ref(storage, `product-images/${file.name}-${Date.now()}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  });
  return await Promise.all(uploadPromises);
};

// Upload an image to Firebase Storage using File
export const uploadImageBlob = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `product-images/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};


// Update order status, timestamp, and save logs
export const updateOrderStatus = async (orderId: string, newStatus: string, adminEmail: string) => {
  const orderDoc = doc(db, 'orders', orderId);
  const statusField = `statusTimestamps.${newStatus}`;

  // Update the order status and timestamp
  await updateDoc(orderDoc, {
    status: newStatus,
    [statusField]: serverTimestamp(),
  });

  // Add log entry
  const logsCollection = collection(orderDoc, 'logs');
  await addDoc(logsCollection, {
    adminEmail, // Email of the admin who made the change
    change: `Status updated to ${newStatus}`,
    timestamp: serverTimestamp(),
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
      statusTimestamps: data.statusTimestamps || {},
    };
  } else {
    return null;
  }
};
// Fetch product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  const productDoc = doc(db, 'products', productId);
  const productSnapshot = await getDoc(productDoc);

  if (productSnapshot.exists()) {
    return {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    } as Product;
  } else {
    console.warn('Product not found');
    return null;
  }
};

// Update product variations
export const updateProductVariations = async (productId: string, updatedVariations: Product['variations']): Promise<void> => {
  const productDoc = doc(db, 'products', productId);
  await updateDoc(productDoc, {
    variations: updatedVariations,
  });
};


