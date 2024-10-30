import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Import your Firestore setup
import styles from './product-page.module.scss';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product'; // Import the Product interface

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loadedImage, setLoadedImage] = useState<string>('');
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart(); // Use the cart context to add items

  // Fetch product data from Firestore based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data() as Product;
          setProduct(productData);
          // Set initial variation and image
          if (productData.variations.length > 0) {
            setSelectedVariation(productData.variations[0].name);
            setLoadedImage(productData.variations[0].images[0]);
          }
        } else {
          console.error("No such product found in Firestore");
        }
      }
    };
    fetchProduct();
  }, [id]);

  // Handle variation change (color selection)
  const handleVariationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const variationName = event.target.value;
    setSelectedVariation(variationName);
    const selectedVar = product?.variations.find(
      (variation) => variation.name === variationName
    );
    if (selectedVar && selectedVar.images.length > 0) {
      setLoadedImage(selectedVar.images[0]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value >= 1 ? value : 1); // Ensure quantity is at least 1
  };

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    if (product) {
      const selectedVar = product.variations.find(
        (variation) => variation.name === selectedVariation
      );
      if (selectedVar) {
        addToCart({
          id: product.id,
          name: selectedVar.name,
          price: selectedVar.price || product.price,
          variation: selectedVariation,
          image: loadedImage, // Pass the currently loaded image
          quantity: quantity,
        });
        alert(`Added ${quantity} ${selectedVar.name} to the cart!`);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.merch}>
      <div className={styles['image-wrapper']}>
        <img src={loadedImage} className={styles.img} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.name}>{product.variations.find(variation => variation.name === selectedVariation)?.name || ''}</h1>
        <p className={styles.description}>{product.variations.find(variation => variation.name === selectedVariation)?.description || ''}</p>
        <p className={styles.price}>Price: ${product.variations.find(variation => variation.name === selectedVariation)?.price || 0}</p>
        {/* Radio buttons for variations */}
        <div className={styles.variations}>
          <h3>Select Variation:</h3>
          {product.variations.map((variation) => (
            <label key={variation.name}>
              <input
                type="radio"
                value={variation.name}
                checked={selectedVariation === variation.name}
                onChange={handleVariationChange}
              />
              {variation.name.charAt(0).toUpperCase() + variation.name.slice(1)}
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
