import classNames from 'classnames';
import styles from './product-page.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @ts-ignore
import productData from '../../data/data_merch.jsx';

export interface ProductPageProps {
    className?: string;
}

export const ProductPage = ({ className }: ProductPageProps) => {
    const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
    const product = productData.find((p: any) => p.id === id); // Find the product by ID

    const [loadedImage, setLoadedImage] = useState('');
    const [selectedVariation, setSelectedVariation] = useState(product?.variations[0] || ''); // Set default variation
    const [quantity, setQuantity] = useState<number>(1); // Quantity state

    useEffect(() => {
        const loadImage = async () => {
            if (product) {
                const image = await product.imageUrl[selectedVariation](); // Load image dynamically based on selected variation
                setLoadedImage(image.default); // Set the loaded image in state
            }
        };
        if (product) {
            loadImage();
        }
    }, [selectedVariation, product]); // Reload image when the variation changes or when the product loads

    if (!product) {
        return <div>Product not found.</div>; // Handle invalid product ID
    }

    // Handle variation change
    const handleVariationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVariation(event.target.value);
    };

    // Handle quantity change
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity > 0) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className={classNames(styles.merch, className)}>
            <div className={styles['image-wrapper']}>
                {loadedImage ? (
                    <img src={loadedImage} alt={product.name} className={styles.img} />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>
            <div className={styles.content}>
                <h1 className={styles.name}>{product.name}</h1>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>Price: ${product.price}</p>

                {/* Radio buttons for variations */}
                <div className={styles.variations}>
                    <h3>Select Color:</h3>
                    {product.variations.map((variation: string) => (
                        <label key={variation}>
                            <input
                                type="radio"
                                value={variation}
                                checked={selectedVariation === variation}
                                onChange={handleVariationChange}
                            />
                            {variation.charAt(0).toUpperCase() + variation.slice(1)}
                        </label>
                    ))}
                </div>

                {/* Quantity */}
                <div className={styles.quantity}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        min="1"
                    />
                </div>

                {/* Add to Cart & Buy Now buttons */}
                <div className={styles.actions}>
                    <button onClick={() => alert(`Added ${quantity} ${product.name} to cart!`)}>
                        Add to Cart
                    </button>
                    <button onClick={() => alert(`Purchased ${quantity} ${product.name}!`)}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};
