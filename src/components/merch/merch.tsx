import classNames from 'classnames';
import styles from './merch.module.scss';
import Fallback from '../../../src/assets/homeimage2.jpeg';
import { useEffect, useState } from 'react';

export interface MerchProps {
    className?: string;
    image?: any; // Accept functions (dynamic import) and static URLs
    name?: string;
    description?: string;
    price?: string;
}

export const Merch = ({
    image = Fallback, // Default to fallback image
    name = 'merch',
    description = 'Nice looking merch',
    price = 'P0.00',
}: MerchProps) => {
    const [loadedImage, setLoadedImage] = useState<string | null>(null); // State to hold the loaded image URL

    useEffect(() => {
        // Check if `image` is a function (dynamic import) or a static URL
        if (typeof image === 'function') {
            // Dynamically import the image
            image()
                .then((img: any) => {
                    setLoadedImage(img.default); // Set the loaded image URL
                })
                .catch((err : unknown) => {
                    console.error('Failed to load image:', err);
                    setLoadedImage(Fallback); // Fallback image if dynamic import fails
                });
        } else {
            // If it's a static URL, directly set it
            setLoadedImage(image);
        }
    }, [image]);

    return (
        <div className={styles['merch-card']}>
            {/* Render the dynamically loaded image or fallback */}
            <div className={styles['image-wrapper']}>
                <img src={loadedImage || Fallback} alt={name} className={styles.img} />
            </div>
            <div className={styles.content}>
                <h2 className={styles.header1}>{name}</h2>
                <p>{description}</p>
                <p className={styles.p1}>{`Price: P ${price}`}</p>
            </div>
        </div>
    );
};
