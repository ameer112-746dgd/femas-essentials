import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiFilter, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Shop.css';
import API from '../api'; 

const { data } = await API.get('/products');

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/products');
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['All', 'Oil', 'Treatment', 'Luxury Butter'];
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="shop-dark-loader">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="loader-circle"
        />
        <p>Curating Collection...</p>
      </div>
    );
  }

  return (
    <div className="shop-dark-wrapper">
      {/* Background Decorative Blurs */}
      <div className="shop-glow dot-1"></div>
      <div className="shop-glow dot-2"></div>

      <header className="shop-dark-header">
        <div className="container">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="shop-label"
          >
            Organic Excellence
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="display-text"
          >
            The <span className="italic-gold">Collection</span>
          </motion.h1>
        </div>
      </header>

      <div className="container shop-dark-layout">
        <aside className="shop-dark-sidebar">
          <div className="sidebar-sticky">
            <div className="filter-header"><FiFilter /> Filters</div>
            <div className="filter-list">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                  {filter === cat && <motion.div layoutId="pill" className="active-line" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="shop-main-content">
          <motion.div layout className="shop-dark-grid">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/product/${product._id}`} className="premium-product-card">
                    <div className="product-visual">
                      {product.image?.data ? (
                        <img 
                          src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} 
                          alt={product.name} 
                        />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      <div className="product-card-overlay">
                        <span className="view-text">View Details <FiArrowRight /></span>
                      </div>
                      <div className="cat-tag">{product.category}</div>
                    </div>

                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <span className="price">₦{product.price.toLocaleString()}</span>
                        <FiShoppingBag className="bag-icon" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="shop-empty">
              No items found in this category.
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;