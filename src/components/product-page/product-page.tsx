import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './product-page.module.scss';
import { useCart } from '../../context/CartContext';
// @ts-ignore
import productData from '../../data/data_merch.jsx';

export const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const product = productData.find((p: any) => p.id === id); // Find the product by ID

    const [loadedImage, setLoadedImage] = useState<string>('');
    const [selectedVariation, setSelectedVariation] = useState<string>(product.variations[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const { addToCart } = useCart(); // Use the cart context to add items

    // Function to load the image for the selected variation
    useEffect(() => {
        const loadImage = async () => {
            const image = await product.imageUrl[selectedVariation](); // Dynamically import image based on selected variation
            setLoadedImage(image.default); // Set the image once loaded
        };
        loadImage();
    }, [selectedVariation]);

    // Handle variation change (color selection)
    const handleVariationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVariation(event.target.value);
    };

    // Handle quantity change
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value >= 1 ? value : 1); // Ensure quantity is at least 1
    };

    // Handle adding the product to the cart
    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            variation: selectedVariation,
            image: loadedImage, // Pass the currently loaded image
            quantity: quantity,
        });
        alert(`Added ${quantity} ${product.name} to the cart!`);
    };

    return (
        <div className={styles.merch}>
            <div className={styles['image-wrapper']}>
                <img src={loadedImage} alt={product.name} className={styles.img} />
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

                {/* Add to Cart button */}
                <div className={styles.actions}>
                    <button onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};
