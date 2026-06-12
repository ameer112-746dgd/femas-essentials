// import React, { createContext, useState, useEffect } from 'react';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // Load cart from localStorage so items persist on refresh
//   const [cartItems, setCartItems] = useState(() => {
//     const savedCart = localStorage.getItem('femasCart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Save to localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('femasCart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add Item to Cart
//   const addToCart = (product, qty = 1) => {
//     setCartItems((prevItems) => {
//       const existItem = prevItems.find((x) => x._id === product._id);
//       if (existItem) {
//         // If item exists, just update quantity
//         return prevItems.map((x) =>
//           x._id === product._id ? { ...x, qty: x.qty + qty } : x
//         );
//       } else {
//         // If new item, add it
//         return [...prevItems, { ...product, qty }];
//       }
//     });
//   };

//   // Remove Item from Cart
//   const removeFromCart = (id) => {
//     setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
//   };

//   // Calculate Total Price
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   // Total Item Count (for Navbar badge)
//   const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, cartCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initial Load: Get saved cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('femasCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Could not parse cart from storage", error);
      return [];
    }
  });

  // 2. Persistent Storage: Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      /**
       * CRITICAL FIX: To prevent QuotaExceededError (5MB limit), 
       * we strip the heavy binary 'image' data before saving to localStorage.
       */
      const lightCart = cartItems.map(item => {
        const { image, ...rest } = item; // Remove the 'image' property
        return rest;
      });

      localStorage.setItem('femasCart', JSON.stringify(lightCart));
    } catch (error) {
      console.error("LocalStorage Save Error: Storage is full.", error);
    }
  }, [cartItems]);

  // 3. Add Item to Cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      
      if (existItem) {
        // If item exists, update the quantity
        return prevItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        // If new item, add the whole product (including image for immediate UI display)
        return [...prevItems, { ...product, qty }];
      }
    });
  };

  // 4. Update Quantity (Used by +/- buttons in Cart.jsx)
  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  // 5. Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
  };

  // 6. Global Calculations
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQty, 
        totalPrice, 
        cartCount 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};