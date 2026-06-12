// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { FiTrash2, FiMinus, FiPlus, FiChevronRight } from 'react-icons/fi';
// import './Cart.css';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQty } = useContext(CartContext);

//   // Helper function to convert MongoDB Binary Data to Base64 Image
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

//   if (cartItems.length === 0) {
//     return (
//       <div className="empty-cart container">
//         <h2>Your Cart is Empty</h2>
//         <p>Looks like you haven't added any essentials to your ritual yet.</p>
//         <Link to="/shop" className="btn">Continue Shopping</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page container">
//       <nav className="breadcrumbs">
//         <Link to="/">Home</Link> <FiChevronRight /> <span>Your Cart</span>
//       </nav>

//       <h1>Shopping Cart</h1>

//       <div className="cart-layout">
//         <div className="cart-items-list">
//           {cartItems.map((item) => (
//             <div key={item._id} className="cart-item">
//               <div className="cart-item-img">
//                 {/* --- UPDATED IMAGE RENDER --- */}
//                 {item.image && item.image.data ? (
//                   <img 
//                     src={`data:${item.image.contentType};base64,${arrayBufferToBase64(item.image.data.data)}`} 
//                     alt={item.name} 
//                   />
//                 ) : (
//                   <div className="placeholder">Image</div>
//                 )}
//               </div>
              
//               <div className="cart-item-info">
//                 <h3>{item.name}</h3>
//                 <p className="item-price">₦{item.price.toLocaleString()}</p>
                
//                 <div className="cart-item-actions">
//                   <div className="qty-control">
//                     <button onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}><FiMinus /></button>
//                     <span>{item.qty}</span>
//                     <button onClick={() => updateQty(item._id, item.qty + 1)}><FiPlus /></button>
//                   </div>
//                   <button onClick={() => removeFromCart(item._id)} className="remove-btn"><FiTrash2 /></button>
//                 </div>
//               </div>

//               <div className="cart-item-total">
//                 ₦{(item.price * item.qty).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="cart-summary">
//           <h3>Order Summary</h3>
//           <div className="summary-row">
//             <span>Subtotal</span>
//             <span>₦{subtotal.toLocaleString()}</span>
//           </div>
//           <div className="summary-row">
//             <span>Shipping</span>
//             <span>Calculated at checkout</span>
//           </div>
//           <div className="summary-total">
//             <span>Total</span>
//             <span>₦{subtotal.toLocaleString()}</span>
//           </div>
//           <Link to="/checkout" className="btn btn-checkout">Proceed to Checkout</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiChevronRight, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useContext(CartContext);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-dark-wrapper empty-state">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="empty-box"
        >
          <FiShoppingBag className="empty-icon" />
          <h2>Your Ritual is <span className="italic-gold">Empty</span></h2>
          <p>It seems you haven't added any essentials to your collection yet.</p>
          <Link to="/shop" className="gold-btn">Start Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-dark-wrapper">
      <div className="cart-glow"></div>
      
      <div className="container cart-page-content">
        <nav className="cart-breadcrumbs">
          <Link to="/">Home</Link> <FiChevronRight /> <span>Your Cart</span>
        </nav>

        <header className="cart-header">
          <h1>Shopping <span className="italic-gold">Cart</span></h1>
        </header>

        <div className="cart-grid-layout">
          {/* List of Items */}
          <div className="cart-items-section">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <motion.div 
                  key={item._id} 
                  className="cart-item-glass"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                >
                  <div className="item-visual">
                    {item.image?.data ? (
                      <img 
                        src={`data:${item.image.contentType};base64,${arrayBufferToBase64(item.image.data.data)}`} 
                        alt={item.name} 
                      />
                    ) : <div className="no-img">No Image</div>}
                  </div>
                  
                  <div className="item-main-info">
                    <span className="item-cat">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p className="unit-price">₦{item.price.toLocaleString()}</p>
                    
                    <div className="item-controls">
                      <div className="qty-stepper">
                        <button onClick={() => updateQty(item._id, item.qty - 1)} disabled={item.qty <= 1}><FiMinus /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item._id, item.qty + 1)}><FiPlus /></button>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="trash-btn">
                        <FiTrash2 /> <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="item-total-column">
                    <span className="total-label">Total</span>
                    <p className="total-price">₦{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <motion.div 
            className="cart-summary-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Order Summary</h3>
            <div className="summary-details">
              <div className="summary-line">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className="gold-text">Calculated at Checkout</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-total-row">
                <span>Estimated Total</span>
                <span className="final-price">₦{subtotal.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout <FiArrowRight />
            </Link>
            <p className="secure-note">Secure encryption applied at checkout.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;