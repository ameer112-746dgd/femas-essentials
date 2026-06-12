// import React, { useState, useEffect, useContext } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiMinus, FiPlus, FiShoppingBag, FiChevronRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';
// import axios from 'axios';
// import { CartContext } from '../context/CartContext';
// import './ProductDetails.css';
// import API from '../api'; 

// const { data } = await API.get('/products');
// const ProductDetails = () => {
//   const { id } = useParams();
//   const { addToCart } = useContext(CartContext);
  
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [qty, setQty] = useState(1);
//   const [buttonStatus, setButtonStatus] = useState("idle"); // idle, adding, success
//   const [openSection, setOpenSection] = useState('ingredients');

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
//     return window.btoa(binary);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:5001/api/products/${id}`);
//         setProduct(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (product) {
//       setButtonStatus("adding");
//       setTimeout(() => {
//         addToCart(product, qty);
//         setButtonStatus("success");
//         setTimeout(() => setButtonStatus("idle"), 2000);
//       }, 600);
//     }
//   };

//   if (loading) return (
//     <div className="pdp-dark-loader">
//       <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="loader-ring" />
//       <p>Preparing Ritual...</p>
//     </div>
//   );

//   if (!product) return <div className="pdp-error-dark"><h2>Ritual not found</h2><Link to="/shop">Return to Collection</Link></div>;

//   return (
//     <div className="pdp-dark-wrapper">
//       <div className="pdp-glow"></div>
      
//       <div className="container pdp-content">
//         {/* Navigation */}
//         <nav className="pdp-dark-breadcrumbs">
//           <Link to="/">Home</Link> <FiChevronRight /> 
//           <Link to="/shop">Collection</Link> <FiChevronRight /> 
//           <span className="gold-text">{product.name}</span>
//         </nav>

//         <div className="product-layout-dark">
//           {/* LEFT: ARCH GALLERY */}
//           <motion.div 
//             className="pdp-gallery-side"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="pdp-arch-frame">
//               {product.image?.data ? (
//                 <img 
//                   src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} 
//                   alt={product.name} 
//                 />
//               ) : <div className="placeholder">Loading Visual...</div>}
//               <div className="arch-accent-border"></div>
//               <div className="pdp-badge-glass">{product.category}</div>
//             </div>
//           </motion.div>

//           {/* RIGHT: INFO */}
//           <motion.div 
//             className="pdp-info-side"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <header className="pdp-title-block">
//               <span className="pdp-label">High Performance Skin Ritual</span>
//               <h1 className="pdp-main-title">{product.name}</h1>
//               <div className="pdp-price-row">
//                  <span className="pdp-price">₦{product.price.toLocaleString()}</span>
//               </div>
//             </header>

//             <p className="pdp-description">{product.description}</p>

//             <div className="pdp-interaction-card">
//               <div className="qty-selector-dark">
//                 <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="qty-btn"><FiMinus /></button>
//                 <span className="qty-number">{qty}</span>
//                 <button onClick={() => setQty(qty + 1)} className="qty-btn"><FiPlus /></button>
//               </div>
              
//               <button 
//                 className={`pdp-add-btn ${buttonStatus}`}
//                 onClick={handleAddToCart}
//                 disabled={buttonStatus !== "idle"}
//               >
//                 <AnimatePresence mode="wait">
//                   {buttonStatus === "idle" && (
//                     <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="btn-inner">
//                       <FiShoppingBag /> Add to Cart
//                     </motion.div>
//                   )}
//                   {buttonStatus === "adding" && <motion.div key="adding" initial={{opacity:0}} animate={{opacity:1}}>Adding...</motion.div>}
//                   {buttonStatus === "success" && <motion.div key="success" initial={{scale:0.5}} animate={{scale:1}}>Successfully Added</motion.div>}
//                 </AnimatePresence>
//               </button>
//             </div>

//             <div className="pdp-benefits-row">
//               <div className="benefit-item"><FiTruck /> <span>Fast Delivery</span></div>
//               <div className="benefit-item"><FiShield /> <span>Organic Pure</span></div>
//               <div className="benefit-item"><FiRefreshCw /> <span>Eco-Friendly</span></div>
//             </div>

//             <div className="pdp-accordion-group">
//               {[
//                 { id: 'ingredients', title: 'The Ingredients', content: product.ingredients },
//                 { id: 'usage', title: 'Ritual & Usage', content: product.usage }
//               ].map((section) => (
//                 <div key={section.id} className={`pdp-accordion ${openSection === section.id ? 'open' : ''}`}>
//                   <button onClick={() => setOpenSection(openSection === section.id ? null : section.id)} className="acc-trigger">
//                     {section.title}
//                     <motion.span animate={{ rotate: openSection === section.id ? 45 : 0 }}>
//                       <FiPlus />
//                     </motion.span>
//                   </button>
//                   <AnimatePresence>
//                     {openSection === section.id && (
//                       <motion.div 
//                         className="accordion-content"
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                       >
//                         <p>{section.content || "Expertly crafted with botanical actives for visible results."}</p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMinus, FiPlus, FiShoppingBag, FiChevronRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import './ProductDetails.css';
import API from '../api'; 

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [buttonStatus, setButtonStatus] = useState("idle");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  const handleAddToCart = () => {
    if (product) {
      setButtonStatus("adding");
      setTimeout(() => {
        addToCart(product, qty);
        setButtonStatus("success");
        setTimeout(() => setButtonStatus("idle"), 2000);
      }, 600);
    }
  };

  if (loading) return <div className="pdp-dark-loader"><div className="loader-ring" /></div>;

  return (
    <div className="pdp-dark-wrapper">
      <div className="container pdp-content">
        <div className="product-layout-dark">
          <div className="pdp-gallery-side">
            <div className="pdp-arch-frame">
              {product?.image?.data && <img src={`data:${product.image.contentType};base64,${arrayBufferToBase64(product.image.data.data)}`} alt={product.name} />}
              <div className="arch-accent-border"></div>
            </div>
          </div>
          <div className="pdp-info-side">
            <h1 className="pdp-main-title">{product?.name}</h1>
            <span className="pdp-price">₦{product?.price.toLocaleString()}</span>
            <p className="pdp-description">{product?.description}</p>
            <div className="pdp-interaction-card">
              <div className="qty-selector-dark">
                <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><FiMinus /></button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}><FiPlus /></button>
              </div>
              <button className={`pdp-add-btn ${buttonStatus}`} onClick={handleAddToCart}>
                {buttonStatus === "idle" ? "Add to Ritual" : "Added"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;