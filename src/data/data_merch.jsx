const productData = [
    { id: '1', name: 'Ladies Silk Touch Performance Sport Polo', imageThumbnail: [() => import('../assets/01.webp')], description: 'This is a great product.', price: 14.94,
    productCategory: 'clothing',
    featured: 'exclusive-apparel',
    imageUrl: {
      black: () => import('../assets/01.webp'),
      white: () => import('../assets/02.webp')
    },
    variations: ['black', 'white'], 
    sizes: [
      { size: 'XS', inventory: 0 },
      { size: 'S', inventory: 0 },
      { size: 'M', inventory: 0 },
      { size: 'L', inventory: 0 },
      { size: 'XL', inventory: 0 }
    ] },

    { id: '2', name: 'Men Silk Touch Performance Sport Polo', imageThumbnail: [() => import('../assets/03.webp')], description: 'This is an even greater product.', price: 13.20, 
    productCategory: 'clothing',
    featured: 'exclusive-apparel',
    imageUrl: {
      black: () => import('../assets/03.webp'),
      white: () => import('../assets/04.webp')
    },
    variations: ['black', 'white'], 
    sizes: [
      { size: 'S', inventory: 0 },
      { size: 'M', inventory: 0 },
      { size: 'L', inventory: 0 },
      { size: 'XL', inventory: 0 }
    ] },
    { id: '3', name: 'Womens Crossland Soft Shell Jacket', imageThumbnail: [() => import('../assets/05.webp')], description: 'This is an even greater product.', price: 40.80,
    productCategory: 'clothing',
    featured: 'exclusive-apparel',
    imageUrl: {
      gray: () => import('../assets/05.webp'),
    },
    variations: ['gray'], 
    sizes: [
      { size: 'XS', inventory: 0 },
      { size: 'S', inventory: 0 },
      { size: 'M', inventory: 0 },
      { size: 'L', inventory: 0 },
      { size: 'XL', inventory: 0 }
    ] },
    { id: '4', name: 'Mens Crossland Soft Shell Jacket', description: 'This is an even greater product.', price: 40.80, imageThumbnail: [() => import('../assets/06.webp')], 
    productCategory: 'clothing',
    featured: 'exclusive-apparel',
    imageUrl: {
      gray: () => import('../assets/06.webp'),
    },
    variations: ['gray'], 
    sizes: [
      { size: 'XS', inventory: 0 },
      { size: 'S', inventory: 0 },
      { size: 'M', inventory: 0 },
      { size: 'L', inventory: 0 },
      { size: 'XL', inventory: 0 }
    ] },
    { id: '6', name: 'Cyber CEO/Mom Ladies Cotton T-shirt', imageThumbnail: [() => import('../assets/08.webp')], description: 'Gildan 5.3 oz. These are sized higher for the request of having something for moms that just had a baby.', 
    price: 8.34, 
    productCategory: 'clothing',
    featured: 'exclusive-apparel',
    imageUrl: {
      white: () => import('../assets/08.webp')
    },
    variations: ['white'],
    sizes: [
      { size: 'L', inventory: 0 },
      { size: 'XL', inventory: 0 },
      { size: 'XXL', inventory: 0 }
    ] },
    { id: '7', name: 'Sports Cap', imageThumbnail: [() => import('../assets/09.webp')], description: 'Brushed cotton 6 panel cap.', price: 8.92,
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      black: () => import('../assets/09.webp')
    },
    variations: ['black'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
    { id: '8', name: 'Graphite Slim 15" Laptop Backpack', imageThumbnail: [() => import('../assets/10.webp')], description: 'This is an even greater product.', price: 39.90, 
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      gray: () => import('../assets/10.webp')
    },
    colors: ['gray'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
    { id: '9', name: 'Ranger Stainless Sport Bottle', imageThumbnail: [() => import('../assets/11.webp')], description: '26oz.', price: 13.62, 
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      black: () => import('../assets/11.webp')
    },
    variations: ['black'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
    { id: '10', name: 'Mardi Gras Pen-Black', description: 'Sold by quantities of 100.', price: 42.00, imageThumbnail: [() => import('../assets/12.webp')],
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      black: () => import('../assets/12.webp')
    },
    variations: ['black'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
    { id: '11', name: 'Corded Earbuds with Microphone', description: 'This is an even greater product.', price: 3.30, imageThumbnail: [() => import('../assets/13.webp')],
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      black: () => import('../assets/13.webp')
    },
    variations: ['black'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
    { id: '12', name: 'Double Sided Hand Banner', description: '1-"Please Mute Yourself", 2-"You\'re on Mute".', price: 1.20, imageThumbnail: [() => import('../assets/14.webp')],
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      black: () => import('../assets/14.webp')
    },
    variations: ['black'],
    sizes: [
      { size: 'Available', inventory: 0 }
    ] },
   
    { id: '14', name: 'Closed Back Fitted Table Cover', description: 'Available in fitted 6\' or 8\', or draped 6\' or 8\'.', price: 144.00, imageThumbnail: [() => import('../assets/16.webp')],
    productCategory: 'nonclothing',
    featured: 'swag-essentials',
    imageUrl: {
      one: () => import('../assets/16.webp'),
    },
    variations: ['one'],
    sizes: [
      { size: '6\' Draped', inventory: 0 },
      { size: '6\' Fitted', inventory: 0 },
      { size: '8\' Draped', inventory: 0 },
      { size: '8\'', inventory: 0 },
    ] },
    // ...more merch
  ];
  
  export default productData;
  