import classNames from 'classnames';
import styles from './gallery.module.scss';
import { Merch } from '../merch/merch';
// @ts-ignore
import productData from '../../data/data_merch.jsx';
import { useState } from 'react';
import merchStyles from '../merch/merch.module.scss';

export interface GalleryProps {
    className?: string;
    products?: any[]; // Allow external products to be passed in as props
}

export const Gallery = ({ className, products = productData }: GalleryProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for category filter
    const [priceSort, setPriceSort] = useState<string>(''); // State for sorting by price
    const [sortBy, setSortBy] = useState<string>('relevance'); // State for sorting by relevance or latest

    // Function to sort products by price
    const sortProductsByPrice = (products: any[]) => {
        if (priceSort === 'priceHighToLow') {
            return [...products].sort((a, b) => b.price - a.price);
        }
        if (priceSort === 'priceLowToHigh') {
            return [...products].sort((a, b) => a.price - b.price);
        }
        return products; // No price sorting
    };

    // Function to sort products by relevance or latest
    const sortProductsByOtherCriteria = (products: any[]) => {
        if (sortBy === 'latest') {
            // Sort by ID (Newer to Older)
            return [...products].sort((a, b) => b.id - a.id);
        }
        if (sortBy === 'relevance') {
            // Relevance can be custom logic, here it is just the default order
            return products; // No sorting for relevance as an example
        }
        return products; // Default order
    };

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Filter products by category
    const filteredProducts = products.filter((product: any) => {
        return selectedCategory ? product.productCategory === selectedCategory : true;
    });

    // First, sort filtered products by price, then by relevance/latest
    let sortedProducts = sortProductsByPrice(filteredProducts);
    sortedProducts = sortProductsByOtherCriteria(sortedProducts);

    // Handle price sort change
    const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriceSort(e.target.value);
    };

    // Handle sort by relevance or latest change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    return (
        <div className={classNames(styles['product-grid'], className)}>
            <div className={styles.filters}>
                <h2 className={merchStyles.header1}>Filter by</h2>

                {/* Category Filter */}
                <select
                    title="selectCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="selectCategory"
                    defaultValue={''}
                    className={styles.selectButton}
                >
                    <option value={''}>All Categories</option>
                    <option value={'clothing'}>Clothing</option>
                    <option value={'nonclothing'}>Accessories</option>
                </select>

                {/* Price Sort Filter */}
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

                {/* Relevance or Latest Sort */}
                {/* <select
                    title="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className={styles.selectButton}
                >
                    <option value="relevance">Relevance</option>
                    <option value="latest">Latest</option>
                </select> */}
            </div>

            {/* Render the sorted and filtered products */}
            <div className={styles.gallery}>
                {sortedProducts.length === 0 && <h3>No Results Found</h3>}
                {sortedProducts.map((product: any, index: any) => (
                    <div
                        key={product.id}
                        className={styles['fade-up']}
                        style={{ '--animation-delay': `${index * 0.2}s` } as React.CSSProperties} // Stagger delay
                    >
                        <Merch
                            key={product.id}
                            image={product.imageThumbnail[0]} // Access the first function in the array
                            name={product.name}
                            description={product.description}
                            price={product.price}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
