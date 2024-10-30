// export interface Product {
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     productCategory: string;
//     featured: string[];
//     variations: Array<{
//       name: string;
//       images: string[];
//       description?: string;
//       price?: number;
//       quantity: number;
//       sizes: Array<{ size: string; inventory: number }>;
//     }>;
//     timestamp: any;
//   }
  
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
