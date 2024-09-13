import classNames from 'classnames';
import styles from './search-bar.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface SearchBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const SearchBar = ({ className }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // For storing search input
    const [selectedCategory, setSelectedCategory] = useState<string>('all'); // For storing selected category
    const navigate = useNavigate(); // To navigate to the browse page

    // Handle form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload
        // Navigate to the browse page with search term and category as URL parameters
        navigate(`/browse?search=${searchTerm}&category=${selectedCategory}`);
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchBar}>
            <input
                type="text"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />

            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.categorySelect}
            >
                <option value="all">All Categories</option>
                <option value="clothing">Clothing</option>
                <option value="nonclothing">Accessories</option>
            </select>

            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    );
};
