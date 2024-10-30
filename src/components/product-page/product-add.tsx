import React, { useState } from 'react';
import { addProduct, uploadImageBlob } from '../../firebase'; // Adjust the import path
import { Product } from '../../types/product'; // Import the Product interface

export const ProductAdd = () => {
  const [productCategory, setProductCategory] = useState('');
  const [variations, setVariations] = useState<Product['variations']>([
    { name: '', images: [], description: '', price: 0, quantity: 0 }, // Default new variation
  ]);
  const [imageFiles, setImageFiles] = useState<File[][]>([[]]); // Array of arrays to handle images for each variation

  const handleAddProduct = async () => {
    const updatedVariations = await Promise.all(
      variations.map(async (variation, index) => {
        const imageUrls = await Promise.all(imageFiles[index].map(file => uploadImageBlob(file)));
        return { ...variation, images: imageUrls };
      })
    );

    const product: Omit<Product, 'id' | 'timestamp'> = {
      productCategory,
      variations: updatedVariations,
    };

    try {
      await addProduct(product);
      alert('Product added successfully!');
      // Reset form fields
      setProductCategory('');
      setVariations([{ name: '', images: [], description: '', price: 0, quantity: 0 }]); // Reset with a default new variation
      setImageFiles([[]]); // Reset image files
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const updatedImageFiles = [...imageFiles];
      updatedImageFiles[index] = files;
      setImageFiles(updatedImageFiles);

      const updatedVariations = [...variations];
      updatedVariations[index].images = files.map(file => URL.createObjectURL(file));
      setVariations(updatedVariations);
    }
  };

  const handleVariationChange = (index: number, field: string, value: any) => {
    const updatedVariations = [...variations];
    updatedVariations[index] = { ...updatedVariations[index], [field]: value };
    setVariations(updatedVariations);
  };

  const addVariation = () => {
    setVariations([...variations, { name: '', images: [], description: '', price: 0, quantity: 0 }]);
    setImageFiles([...imageFiles, []]); // Add an empty array for the new variation's images
  };

  const removeVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index)); // Remove the corresponding images array
  };
  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <div>
          <label>Product Category:</label>
          <input
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Variations:</label>
          {variations.map((variation, index) => (
            <div key={index}>
              <h3>Variation {index + 1}</h3>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={variation.name}
                  onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description:</label>
                <textarea
                  value={variation.description}
                  onChange={(e) => handleVariationChange(index, 'description', e.target.value)}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={variation.price || ''}
                  onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={variation.quantity}
                  onChange={(e) => handleVariationChange(index, 'quantity', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Images:</label>
                <input
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
