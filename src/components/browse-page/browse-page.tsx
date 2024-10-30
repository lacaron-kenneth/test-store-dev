import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './browse-page.module.scss';
import { useLocation } from 'react-router-dom';
import { Gallery } from '../gallery/gallery';
import { Helmet } from 'react-helmet';
import { fetchProducts } from '../../firebase';
import { Product } from '../../types/product'; // Import the Product interface

export interface BrowsePageProps {
  className?: string;
}

export const BrowsePage = ({ className }: BrowsePageProps) => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [internalProducts, setInternalProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // State to track no results

  // Parse query parameters from URL
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  const selectedCategory = searchParams.get('category') || 'all';

  // Fetch products initially if not already loaded
  useEffect(() => {
    const loadProducts = async () => {
      if (products.length > 0) {
        setInternalProducts(products);  // Use passed products if available
        setLoading(false);
      } else if (internalProducts.length === 0) { // Only fetch if no internal products
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setInternalProducts(fetchedProducts);
        setLoading(false);
      }
    };
    loadProducts();
  }, [products, internalProducts.length]);

  // Filter products based on search term and category from URL
  const filteredProducts = internalProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.productCategory === selectedCategory;
    const matchesSearch = product.variations.some(variation => 
      variation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variation.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesCategory && matchesSearch;
  });

  // Update noResults based on filteredProducts length
  useEffect(() => {
    setNoResults(filteredProducts.length === 0 && !loading);
  }, [filteredProducts, loading]);

  return (
    <div className={classNames(styles.root, className)}>
      <Helmet>
        <title>Browse Cyberbacker Store</title>
        <meta
          name="description"
          content="Cyberbacker Official Merch Store. Browse different types of merchandises from hoodies to tumblers."
        />
        <meta
          name="keywords"
          content="cyberbacker, cyberbacker store, cb merch store, cyberbacker merchandise"
        />
      </Helmet>
      <h1 className={styles.header1}>Browse Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : noResults ? (
        <div>No Results Found</div> // Show message if no results
      ) : (
        <Gallery products={filteredProducts} /> // Pass filtered products to Gallery
      )}
    </div>
  );
};
