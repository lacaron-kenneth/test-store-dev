import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './gallery.module.scss';
import { Merch } from '../merch/merch';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../firebase';
import { Product } from '../../types/product'; // Adjust the import path

export interface GalleryProps {
  className?: string;
  products?: Product[]; // Allow external products to be passed in as props
}

export const Gallery = ({ className, products = [] }: GalleryProps) => {
  const [internalProducts, setInternalProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 
  const [priceSort, setPriceSort] = useState<string>(''); 
  const [sortBy, setSortBy] = useState<string>('relevance'); 
  const [loading, setLoading] = useState(true);

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

  const sortProductsByPrice = (products: Product[]) => {
    if (priceSort === 'priceHighToLow') {
      return [...products].sort((a, b) => {
        const priceA = a.variations[0]?.price ?? 0;
        const priceB = b.variations[0]?.price ?? 0;
        return priceB - priceA;
      });
    }
    if (priceSort === 'priceLowToHigh') {
      return [...products].sort((a, b) => {
        const priceA = a.variations[0]?.price ?? 0;
        const priceB = b.variations[0]?.price ?? 0;
        return priceA - priceB;
      });
    }
    return products;
  };
  

  const sortProductsByOtherCriteria = (products: Product[]) => {
    if (sortBy === 'latest') {
      return [...products].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    return products;
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProducts = internalProducts.filter((product) => {
    return selectedCategory ? product.productCategory === selectedCategory : true;
  });

  let sortedProducts = sortProductsByPrice(filteredProducts);
  sortedProducts = sortProductsByOtherCriteria(sortedProducts);

  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={classNames(styles['product-grid'], className)}>
      <div className={styles.filters}>
        <h2 className={styles.header1}>Filter by</h2>
        <select
          title="selectCategory"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="selectCategory"
          className={styles.selectButton}
        >
          <option value={''}>All Categories</option>
          <option value={'clothing'}>Clothing</option>
          <option value={'nonclothing'}>Accessories</option>
        </select>
        <select
          title="priceSort"
          value={priceSort}
          onChange={handlePriceSortChange}
          className={styles.selectButton}
        >
          <option value="">Price</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="priceLowToHigh">Price: Low to High</option>
        </select>
      </div>
      <div className={styles.gallery}>
        {loading && <h3>Loading...</h3>}
        {!loading && sortedProducts.length === 0 && <h3>No Results Found</h3>}
        {sortedProducts.map((product: Product, index: number) => (
          <div
            key={product.id}
            className={styles['fade-up']}
            style={{ '--animation-delay': `${index * 0.2}s` } as React.CSSProperties}
          >
            <Link to={`/merch/${product.id}`} className={styles.productLink}>
              <Merch
                key={product.id}
                image={product.variations[0].images[0]} // Access the first image of the first variation
                name={product.variations[0].name} // Access the name of the first variation
                description={product.variations[0].description || ''} // Access the description of the first variation
                price={product.variations[0].price || 0} // Access the price of the first variation
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
