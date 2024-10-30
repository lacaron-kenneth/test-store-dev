import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../firebase';
import { Product } from '../../types/product'; // Adjust the import path
import { Link } from 'react-router-dom';
import styles from '../browse-page/browse-page.module.scss';

export const AdminProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.variations.some(variation =>
      variation.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    setProducts(await fetchProducts());
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.adminProductPage}>
      <h1>Admin Product Management</h1>
      {/* Search */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to="/admin-dashboard/products/add">
          <button>Add New Product</button>
        </Link>
      </div>
      {/* Product List */}
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div className={styles.productItem} key={product.id}>
            <h2>{product.variations[0].name}</h2>
            <p>Category: {product.productCategory}</p>
            <p>Price: ${product.variations[0].price}</p>
            {product.variations[0].images.length > 0 && (
              <img
                src={product.variations[0].images[0]}
                alt={`${product.variations[0].name} featured`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
            <Link to={`/admin-dashboard/products/${product.id}`}>
              <button>View / Edit</button>
            </Link>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
