import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiTruck, FiMapPin, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Checkout.css';
import API from '../api'; 

const { data } = await API.get('/products');

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", 
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", 
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", 
  "Taraba", "Yobe", "Zamfara"
];

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: ''
  });

  const [shippingFee, setShippingFee] = useState(0);

  useEffect(() => {
    if (!formData.state) setShippingFee(0);
    else if (formData.state === 'Lagos') setShippingFee(2500);
    else if (formData.state === 'FCT - Abuja' || formData.state === 'Rivers') setShippingFee(4500);
    else setShippingFee(5500);
  }, [formData.state]);

  const finalTotal = totalPrice + (shippingFee || 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.state) {
      alert('Please fill in your shipping details first.');
      return;
    }

    let message = `*NEW ORDER - FEMAS ESSENTIALS*` + "\n\n";
    message += `*Customer Details:*` + "\n";
    message += `Name: ${formData.name}` + "\n";
    message += `Phone: ${formData.phone}` + "\n";
    message += `Address: ${formData.address}, ${formData.city}, ${formData.state}` + "\n\n";
    message += `*Items:*` + "\n";

    cartItems.forEach(item => {
      message += `• ${item.name} (x${item.qty}) - ₦${(item.price * item.qty).toLocaleString()}` + "\n";
    });

    message += "\n" + `*Subtotal:* ₦${totalPrice.toLocaleString()}` + "\n";
    message += `*Shipping:* ₦${shippingFee.toLocaleString()}` + "\n";
    message += `*Total Amount:* ₦${finalTotal.toLocaleString()}`;

    window.open(`https://wa.me/2349099319135?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-dark-wrapper empty">
        <div className="container">
          <h2>Your cart is <span className="italic-gold">empty</span></h2>
          <Link to="/shop" className="gold-btn">Go To Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-dark-wrapper">
      <div className="checkout-glow dot-1"></div>
      <div className="checkout-glow dot-2"></div>

      <div className="container checkout-content">
        <Link to="/cart" className="back-link"><FiChevronLeft /> Back to Cart</Link>
        
        <header className="checkout-header">
          <h1>Complete <span className="italic-gold">Your check out</span></h1>
          <p>Secure your essentials via WhatsApp for direct delivery.</p>
        </header>

        <div className="checkout-grid">
          {/* FORM SIDE */}
          <motion.div 
            className="checkout-glass-card form-side"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3><FiTruck /> Shipping Details</h3>
            <form className="luxury-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-row">
                <div className="input-group">
                  <label><FiUser /> Full Name</label>
                  <input type="text" name="name" required onChange={handleChange} placeholder="First & Last Name" />
                </div>
              </div>
              
              <div className="input-row split">
                <div className="input-group">
                  <label><FiMail /> Email</label>
                  <input type="email" name="email" required onChange={handleChange} placeholder="email@example.com" />
                </div>
                <div className="input-group">
                  <label><FiPhone /> Phone</label>
                  <input type="text" name="phone" required onChange={handleChange} placeholder="080..." />
                </div>
              </div>

              <div className="input-group">
                <label><FiMapPin /> Delivery Address</label>
                <input type="text" name="address" required onChange={handleChange} placeholder="House number, street name..." />
              </div>

              <div className="input-row split">
                <div className="input-group">
                  <label>City</label>
                  <input type="text" name="city" required onChange={handleChange} placeholder="Lekki, Garki, etc" />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <select name="state" required onChange={handleChange}>
                    <option value="">Select State</option>
                    {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </form>
          </motion.div>

          {/* SUMMARY SIDE */}
          <motion.div 
            className="checkout-glass-card summary-side"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Order Summary</h3>
            <div className="summary-scroll">
              {cartItems.map(item => (
                <div key={item._id} className="summary-item">
                  <div className="item-txt">
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Quantity: {item.qty}</p>
                  </div>
                  <span className="item-price">₦{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-breakdown">
              <div className="break-line">
                <span>Subtotal</span>
                <span>₦{totalPrice.toLocaleString()}</span>
              </div>
              <div className="break-line">
                <span>Shipping</span>
                <span className="gold-text">{shippingFee === 0 ? 'Select State' : `₦${shippingFee.toLocaleString()}`}</span>
              </div>
              <div className="total-line">
                <span>Total</span>
                <span className="final-amount">₦{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button className="whatsapp-checkout-btn" onClick={handleWhatsAppCheckout}>
              <FaWhatsapp /> Checkout via WhatsApp
            </button>
            <p className="secure-tag">Safe & Direct Order Management</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;