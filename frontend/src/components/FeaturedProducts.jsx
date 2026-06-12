import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/products');
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="featured-dark-loader">
      <div className="spinner"></div>
      <p>Curating Rituals...</p>
    </div>
  );

  return (
    <section className="featured-dark-section">
      <div className="featured-glow"></div>
      
      <div className="container">
        <header className="featured-dark-header">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="feat-label">Premium Selection</span>
            <h2>Featured <span className="italic-gold">Collection</span></h2>
            <p>Discover concentrated formulations crafted to support your skin need.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/shop" className="explore-all-btn">
              Explore All <FiArrowRight />
            </Link>
          </motion.div>
        </header>

        <div className="featured-dark-grid">
          {products.map((product, index) => (
            <motion.div 
              key={product._id} 
              className="featured-dark-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to={`/product/${product._id}`} className="feat-img-wrapper">
                {product.image && product.image.data ? (
                  <img 
                    src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} 
                    alt={product.name} 
                  />
                ) : (
                  <div className="placeholder">Image Coming Soon</div>
                )}
                <div className="feat-overlay">
                  <span>Quick View</span>
                </div>
                <div className="feat-badge">{product.category}</div>
              </Link>

              <div className="featured-dark-info">
                <h3>{product.name}</h3>
                <div className="feat-footer">
                   <span className="feat-price">₦{product.price?.toLocaleString()}</span>
                   <button className="feat-cart-circle">
                     <FiShoppingBag />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;