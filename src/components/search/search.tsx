import classNames from 'classnames';
import styles from './search.module.scss';
import { useLocation } from 'react-router-dom';
import { Gallery } from '../gallery/gallery'; // Your Gallery component
// @ts-ignore
import productData from '../../data/data_merch.jsx'; // Your product data
import { Helmet } from 'react-helmet';

export interface SearchProps {
    className?: string;
}

export const Search = ({ className }: SearchProps) => {
    const location = useLocation();

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || ''; // Get search query from URL
    const selectedCategory = searchParams.get('category') || 'all'; // Get category from URL

    // Filter products by search term and category
    const filteredProducts = productData.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.productCategory === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <Helmet>
                <title>Browse Cyberbacker Store</title>
                <meta name='description' content='Cyberbacker Official Merch Store. Browse different types of merchandises from hoodies to tumblers.'/>
                <meta name='keywords' content='cyberbacker, cyberbacker store, cb merch store, cyberbacker merchandise'/>
            </Helmet>
            <h1>Browse Products</h1>
            <Gallery products={filteredProducts} /> {/* Pass the filtered products to the Gallery */}
        </div>
    );
};