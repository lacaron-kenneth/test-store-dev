import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, updateProduct, uploadImageBlob } from '../../firebase'; // Adjust the import path
import { Product } from '../../types/product'; // Import the Product interface

export const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageFiles, setImageFiles] = useState<File[][]>([]); // Array of arrays to handle images for each variation

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setImageFiles(fetchedProduct.variations.map(() => [])); // Initialize imageFiles with empty arrays for each variation
        }
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const updatedImageFiles = [...imageFiles];
      updatedImageFiles[index] = files;
      setImageFiles(updatedImageFiles);

      const updatedVariations = [...(product?.variations || [])];
      updatedVariations[index].images = files.map(file => URL.createObjectURL(file));
      setProduct({ ...product, variations: updatedVariations } as Product);
    }
  };

  const handleUpdateProduct = async () => {
    if (!product) return;
  
    const updatedVariations = await Promise.all(
      product.variations.map(async (variation, index) => {
        const imageUrls = imageFiles[index].length
          ? await Promise.all(imageFiles[index].map(file => uploadImageBlob(file)))
          : variation.images;
        return { ...variation, images: imageUrls };
      })
    );
  
    const updatedProduct: Product = {
      ...product,
      variations: updatedVariations,
    };
  
    if (productId) { // Ensure productId is defined
      try {
        await updateProduct(productId, updatedProduct);
        alert('Product updated successfully!');
        setImageFiles([]); // Clear images after updating
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
      }
    } else {
      console.error('Product ID is undefined');
    }
  };
  

  const handleFieldChange = (field: string, value: any) => {
    if (product) {
      setProduct({ ...product, [field]: value });
    }
  };

  const handleVariationChange = (index: number, field: string, value: any) => {
    if (product) {
      const updatedVariations = [...product.variations];
      updatedVariations[index] = { ...updatedVariations[index], [field]: value };
      setProduct({ ...product, variations: updatedVariations });
    }
  };

  const addVariation = () => {
    if (product) {
      setProduct({
        ...product,
        variations: [...product.variations, { name: '', images: [], description: '', price: 0, quantity: 0 }],
      });
      setImageFiles([...imageFiles, []]); // Add an empty array for the new variation's images
    }
  };

  const removeVariation = (index: number) => {
    if (product) {
      setProduct({
        ...product,
        variations: product.variations.filter((_, i) => i !== index),
      });
      setImageFiles(imageFiles.filter((_, i) => i !== index)); // Remove the corresponding images array
    }
  };
  return (
    <div>
      <h1>Product Detail</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
        <div>
          <label>Product Category:</label>
          <input
          title='cat'
            type="text"
            value={product?.productCategory || ''}
            onChange={(e) => handleFieldChange('productCategory', e.target.value)}
            required
          />
        </div>
        <div>
          <label>Variations:</label>
          {product?.variations.map((variation, index) => (
            <div key={index}>
              <h3>Variation {index + 1}</h3>
              <div>
                <label>Name:</label>
                <input
                title='name'
                  type="text"
                  value={variation.name}
                  onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                title='desc'
                  value={variation.description || ''}
                  onChange={(e) => handleVariationChange(index, 'description', e.target.value)}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                title='price'
                  type="number"
                  value={variation.price || ''}
                  onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                title='quantity'
                  type="number"
                  value={variation.quantity}
                  onChange={(e) => handleVariationChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Images:</label>
                <input
                title='images'
                  type="file"
                  multiple
                  onChange={(e) => handleImageChange(index, e)}
                />
                <div>
                  {variation.images.map((image, imgIndex) => (
                    <img key={imgIndex} src={image} alt={`Variation ${index} Image ${imgIndex}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => removeVariation(index)}>Remove Variation</button>
            </div>
          ))}
          <button type="button" onClick={addVariation}>Add Variation</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
