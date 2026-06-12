import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage so items persist on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('femasCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('femasCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Item to Cart
  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      if (existItem) {
        // If item exists, just update quantity
        return prevItems.map((x) =>
          x._id === product._id ? { ...x, qty: x.qty + qty } : x
        );
      } else {
        // If new item, add it
        return [...prevItems, { ...product, qty }];
      }
    });
  };

  // Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((x) => x._id !== id));
  };

  // Calculate Total Price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Total Item Count (for Navbar badge)
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, totalPrice, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};