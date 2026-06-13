// import React, { useState, useContext, useEffect } from 'react';
// import { CartContext } from '../context/CartContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiChevronLeft, FiTruck, FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
// import { FaWhatsapp } from 'react-icons/fa';
// import './Checkout.css';
// import API from '../api'; 

// const { data } = await API.get('/products');

// const nigerianStates = [
//   "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
//   "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
//   "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
//   "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
//   "Taraba", "Yobe", "Zamfara"
// ];

// const Checkout = () => {
//   const { cartItems, totalPrice } = useContext(CartContext);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '', email: '', phone: '', address: '', city: '', state: ''
//   });

//   const [shippingFee, setShippingFee] = useState(0);

//   useEffect(() => {
//     if (!formData.state) setShippingFee(0);
//     else if (formData.state === 'Lagos') setShippingFee(2500);
//     else if (formData.state === 'FCT - Abuja' || formData.state === 'Rivers') setShippingFee(4500);
//     else setShippingFee(5500);
//   }, [formData.state]);

//   const finalTotal = totalPrice + (shippingFee || 0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleWhatsAppCheckout = () => {
//     if (!formData.name || !formData.phone || !formData.address || !formData.state) {
//       alert('Please fill in your shipping details first.');
//       return;
//     }

//     let message = `*NEW ORDER - FEMAS ESSENTIALS*` + "\n\n";
//     message += `*Customer Details:*` + "\n";
//     message += `Name: ${formData.name}` + "\n";
//     message += `Phone: ${formData.phone}` + "\n";
//     message += `Address: ${formData.address}, ${formData.city}, ${formData.state}` + "\n\n";
//     message += `*Items:*` + "\n";

//     cartItems.forEach(item => {
//       message += `• ${item.name} (x${item.qty}) - ₦${(item.price * item.qty).toLocaleString()}` + "\n";
//     });

//     message += "\n" + `*Subtotal:* ₦${totalPrice.toLocaleString()}` + "\n";
//     message += `*Shipping:* ₦${shippingFee.toLocaleString()}` + "\n";
//     message += `*Total Amount:* ₦${finalTotal.toLocaleString()}`;

//     window.open(`https://wa.me/2349099319135?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="checkout-dark-wrapper empty">
//         <div className="container">
//           <h2>Your cart is <span className="italic-gold">empty</span></h2>
//           <Link to="/shop" className="gold-btn">Go To Shop</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-dark-wrapper">
//       <div className="checkout-glow dot-1"></div>
//       <div className="checkout-glow dot-2"></div>

//       <div className="container checkout-content">
//         <Link to="/cart" className="back-link"><FiChevronLeft /> Back to Cart</Link>
        
//         <header className="checkout-header">
//           <h1>Complete <span className="italic-gold">Your check out</span></h1>
//           <p>Secure your essentials via WhatsApp for direct delivery.</p>
//         </header>

//         <div className="checkout-grid">
//           {/* FORM SIDE */}
//           <motion.div 
//             className="checkout-glass-card form-side"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <h3><FiTruck /> Shipping Details</h3>
//             <form className="luxury-form" onSubmit={(e) => e.preventDefault()}>
//               <div className="input-row">
//                 <div className="input-group">
//                   <label><FiUser /> Full Name</label>
//                   <input type="text" name="name" required onChange={handleChange} placeholder="First & Last Name" />
//                 </div>
//               </div>
              
//               <div className="input-row split">
//                 <div className="input-group">
//                   <label><FiMail /> Email</label>
//                   <input type="email" name="email" required onChange={handleChange} placeholder="email@example.com" />
//                 </div>
//                 <div className="input-group">
//                   <label><FiPhone /> Phone</label>
//                   <input type="text" name="phone" required onChange={handleChange} placeholder="080..." />
//                 </div>
//               </div>

//               <div className="input-group">
//                 <label><FiMapPin /> Delivery Address</label>
//                 <input type="text" name="address" required onChange={handleChange} placeholder="House number, street name..." />
//               </div>

//               <div className="input-row split">
//                 <div className="input-group">
//                   <label>City</label>
//                   <input type="text" name="city" required onChange={handleChange} placeholder="Lekki, Garki, etc" />
//                 </div>
//                 <div className="input-group">
//                   <label>State</label>
//                   <select name="state" required onChange={handleChange}>
//                     <option value="">Select State</option>
//                     {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                 </div>
//               </div>
//             </form>
//           </motion.div>

//           {/* SUMMARY SIDE */}
//           <motion.div 
//             className="checkout-glass-card summary-side"
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h3>Order Summary</h3>
//             <div className="summary-scroll">
//               {cartItems.map(item => (
//                 <div key={item._id} className="summary-item">
//                   <div className="item-txt">
//                     <p className="item-name">{item.name}</p>
//                     <p className="item-qty">Quantity: {item.qty}</p>
//                   </div>
//                   <span className="item-price">₦{(item.price * item.qty).toLocaleString()}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="summary-breakdown">
//               <div className="break-line">
//                 <span>Subtotal</span>
//                 <span>₦{totalPrice.toLocaleString()}</span>
//               </div>
//               <div className="break-line">
//                 <span>Shipping</span>
//                 <span className="gold-text">{shippingFee === 0 ? 'Select State' : `₦${shippingFee.toLocaleString()}`}</span>
//               </div>
//               <div className="total-line">
//                 <span>Total</span>
//                 <span className="final-amount">₦{finalTotal.toLocaleString()}</span>
//               </div>
//             </div>

//             <button className="whatsapp-checkout-btn" onClick={handleWhatsAppCheckout}>
//               <FaWhatsapp /> Checkout via WhatsApp
//             </button>
//             <p className="secure-tag">Safe & Direct Order Management</p>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiTruck, FiMapPin, FiUser, FiMail, FiPhone, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import './Checkout.css';
import API from '../api';

const shippingOptions = [
  { id: 'mainland', label: "Lagos Mainland (Standard)", price: 4000 },
  { id: 'mainland_ext', label: "Mainland Extended (Ikorodu / Badagry)", price: 6000 },
  { id: 'island', label: "Lagos Island (Standard)", price: 4500 },
  { id: 'island_ext', label: "Island Extended (Sangotedo / Awoyaya / Ibeju-Lekki / Epe)", price: 7000 },
  { id: 'interstate', label: "Interstate Delivery (Outside Lagos)", price: 6500 },
  { id: 'international', label: "International Delivery", price: 75000 },
];

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', regionId: ''
  });
  const [shippingFee, setShippingFee] = useState(0);
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selected = shippingOptions.find(opt => opt.id === formData.regionId);
    setShippingFee(selected ? selected.price : 0);
  }, [formData.regionId]);

  const finalTotal = totalPrice + shippingFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.address || !formData.regionId || !formData.phone) {
      alert("Please fill in all shipping details.");
      return;
    }

    setLoading(true);
    try {
      const selectedRegion = shippingOptions.find(o => o.id === formData.regionId).label;
      await API.post('/orders', {
        ...formData,
        state: selectedRegion, 
        cartItems: cartItems,
        subtotal: totalPrice,
        shipping: shippingFee,
        total: finalTotal,
        paymentMethod: 'Bank Transfer'
      });

      setIsOrdered(true);
      // Clear local cart storage
      localStorage.removeItem('femasCart');
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (isOrdered) return (
    <div className="checkout-success-wrapper">
      <motion.div initial={{scale: 0.9, opacity: 0}} animate={{scale: 1, opacity: 1}} className="success-card">
        <FiCheckCircle className="success-icon" />
        <h2>Ritual <span className="italic-brown">Initiated</span></h2>
        <p>Your order has been recorded. To complete your purchase, please make a transfer to the account below:</p>
        
        <div className="payment-instruction-box">
           <small>TOTAL TO REMIT</small>
           <div className="pay-amount">₦{finalTotal.toLocaleString()}</div>
           <div className="bank-details-grid">
              <div className="bank-row"><span>Bank</span><strong>Moniepoint</strong></div>
              <div className="bank-row"><span>Account</span><strong>9099319135</strong></div>
              <div className="bank-row"><span>Name</span><strong>Femas Essentials Nigeria Ltd</strong></div>
           </div>
           <div className="payment-note">
             Please send your proof of payment via DM on Instagram or WhatsApp to finalize your delivery.
           </div>
        </div>
        <button onClick={() => navigate('/')} className="femas-btn-solid">Return to Home</button>
      </motion.div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="checkout-femas-wrapper empty">
       <div className="container">
          <h2>Your cart is empty.</h2>
          <Link to="/shop" className="femas-btn-solid">Go to Shop</Link>
       </div>
    </div>
  );

  return (
    <div className="checkout-femas-wrapper">
      <div className="checkout-bg-glow"></div>
      <div className="container">
        <Link to="/cart" className="pdp-back-link"><FiChevronLeft /> Back to Cart</Link>
        <header className="pdp-checkout-header">
           <h1>Complete <span className="italic-brown">Your Checkout</span></h1>
        </header>

        <div className="checkout-grid-main">
          {/* LEFT: FORM */}
          <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}} className="checkout-glass-card">
            <h3 className="section-title"><FiTruck /> Shipping Information</h3>
            <form className="femas-checkout-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group-pdp">
                <label><FiUser /> Full Name</label>
                <input type="text" name="name" required onChange={handleChange} placeholder="First & Last Name" />
              </div>
              <div className="form-grid-2">
                <div className="form-group-pdp">
                  <label><FiMail /> Email</label>
                  <input type="email" name="email" required onChange={handleChange} placeholder="email@example.com" />
                </div>
                <div className="form-group-pdp">
                  <label><FiPhone /> Phone</label>
                  <input type="text" name="phone" required onChange={handleChange} placeholder="090..." />
                </div>
              </div>
              <div className="form-group-pdp">
                <label><FiMapPin /> Delivery Address</label>
                <input type="text" name="address" required onChange={handleChange} placeholder="House no, Street name, Estate" />
              </div>
              <div className="form-group-pdp">
                <label>Shipping Region</label>
                <select name="regionId" required onChange={handleChange} className="region-select">
                  <option value="">-- Select Your Location --</option>
                  {shippingOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
                </select>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: SUMMARY */}
          <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}} transition={{delay: 0.1}} className="checkout-glass-card summary-card">
             <h3 className="section-title">Order Summary</h3>
             <div className="mini-cart-list">
                {cartItems.map(item => (
                  <div key={item._id} className="mini-item">
                    <span>{item.name} <small>x{item.qty}</small></span>
                    <strong>₦{(item.price * item.qty).toLocaleString()}</strong>
                  </div>
                ))}
             </div>
             
             <div className="checkout-totals">
                <div className="total-row"><span>Subtotal</span><span>₦{totalPrice.toLocaleString()}</span></div>
                <div className="total-row"><span>Shipping</span><span>{shippingFee === 0 ? 'Select Region' : `₦${shippingFee.toLocaleString()}`}</span></div>
                <div className="final-row"><span>Grand Total</span><span>₦{finalTotal.toLocaleString()}</span></div>
             </div>

             <div className="bank-info-box-inline">
                <h4><FiCreditCard /> Bank Transfer Details</h4>
                <p>9099319135 | Moniepoint <br/> Femas Essentials Nigeria Ltd</p>
             </div>

             <button className="confirm-checkout-btn" onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Processing Ritual...' : 'Place Order Now'}
             </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;