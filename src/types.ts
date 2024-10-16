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
  status: string; // Optional or required based on how it's set up in Firestore
  total: number;  // Assuming total is calculated from items
  }
  