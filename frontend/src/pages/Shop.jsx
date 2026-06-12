// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiFilter, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
// import { motion, AnimatePresence } from 'framer-motion';
// import './Shop.css';
// import API from '../api'; 

// const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('All');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await API.get('/products');
//         setProducts(data);
//       } catch (error) { console.error(error); }
//       finally { setLoading(false); }
//     };
//     fetchProducts();
//   }, []);

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
//     return window.btoa(binary);
//   };

//   const categories = ['All', 'Body oils', 'Body butters', 'Serum', 'Soap', 'Creams', 'Cleansers'];
//   const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

//   if (loading) return <div className="shop-dark-loader"><div className="loader-circle" /><p>Curating Collection...</p></div>;

//   return (
//     <div className="shop-dark-wrapper">
//       <div className="shop-glow dot-1"></div>
//       <header className="shop-dark-header">
//         <div className="container">
//           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="display-text">
//             CURATED <span className="italic-gold">FOR YOUR SKIN</span>
//           </motion.h1>
//         </div>
//       </header>
//       <div className="container shop-dark-layout">
//         <aside className="shop-dark-sidebar">
//           <div className="filter-list">
//             {categories.map(cat => (
//               <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
//                 {cat}{filter === cat && <motion.div layoutId="pill" className="active-line" />}
//               </button>
//             ))}
//           </div>
//         </aside>
//         <main className="shop-main-content">
//           <div className="shop-dark-grid">
//             <AnimatePresence mode='popLayout'>
//               {filteredProducts.map((product, index) => (
//                 <motion.div key={product._id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }}>
//                   <Link to={`/product/${product._id}`} className="premium-product-card">
//                     <div className="product-visual">
//                       {product.image?.data ? <img src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} alt={product.name} /> : <div className="no-image">No Image</div>}
//                       <div className="product-card-overlay"><span className="view-text">View Details <FiArrowRight /></span></div>
//                       <div className="cat-tag">{product.category}</div>
//                     </div>
//                     <div className="product-details">
//                       <h3>{product.name}</h3>
//                       <div className="price-row"><span className="price">₦{product.price.toLocaleString()}</span><FiShoppingBag /></div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };
// export default Shop;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './Shop.css';
import API from '../api'; 

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  const categories = ['All', 'Body oils', 'Body butters', 'Serum', 'Soap', 'Creams', 'Cleansers'];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.category === filter);

  if (loading) return <div className="shop-femas-loader"><div className="loader-circle" /><p>Curating Ritual...</p></div>;

  return (
    <div className="shop-femas-wrapper">
      <header className="shop-femas-header">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="display-text">
            CURATED <span className="italic-brown">FOR YOUR SKIN</span>
          </motion.h1>
        </div>
      </header>

      {/* CATEGORIES SECTION */}
      <div className="category-nav-wrapper">
        <div className="container">
          <div className="filter-scroll-container">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`} 
                onClick={() => setFilter(cat)}
              >
                {cat}
                {filter === cat && <motion.div layoutId="active-pill" className="active-line" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <main className="shop-main-content">
          <div className="shop-femas-grid">
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product, index) => (
                <motion.div 
                  key={product._id} 
                  layout 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  transition={{ delay: index * 0.02 }}
                >
                  <Link to={`/product/${product._id}`} className="femas-product-card">
                    <div className="product-visual">
                      {product.image?.data ? (
                        <img src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} alt={product.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      <div className="card-cat-tag">{product.category}</div>
                    </div>
                    <div className="product-details">
                      <h3>{product.name}</h3>
                      <div className="price-row">
                        <span className="price">₦{product.price.toLocaleString()}</span>
                        <FiShoppingBag className="bag-icon-light" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="shop-empty">No rituals found in this category.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;