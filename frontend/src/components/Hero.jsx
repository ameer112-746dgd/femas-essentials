// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight } from 'react-icons/fi';
// import './Hero.css';

// const Hero = () => {
//   return (
//     <header className="hero-dark">
//       {/* Background Decorative Elements */}
//       <div className="hero-blur-bg"></div>
      
//       <div className="container hero-container">
        
//         {/* Text Side */}
//         <motion.div 
//           className="hero-text-content"
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//         >
//           <motion.span 
//             className="hero-tag"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             Organic Luxury Skincare
//           </motion.span>
          
//           <h1>
//             Reveal Your <br /> 
//             <span className="italic-gold">Natural Glow</span>
//           </h1>
          
//           <p>
//             Slow-crafted rituals dedicated to sensitive skin, acne care, and hyperpigmentation. 
//             Experience the synergy of botanical science and pure luxury.
//           </p>
          
//           <div className="hero-cta-group">
//             <Link to="/shop" className="hero-btn-gold">
//               Shop Collection <FiArrowRight />
//             </Link>
//             <Link to="/about" className="hero-btn-outline">
//               Our Story
//             </Link>
//           </div>
//         </motion.div>

//         {/* Image Side */}
//         <motion.div 
//           className="hero-visual-frame"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, delay: 0.2 }}
//         >
//           <div className="arch-wrapper">
//             <div className="arch-glow"></div>
//             {/* Using product 1 as requested */}
//             <img src="/products/4.jpg" alt="FEMAS Essence" className="arch-img" />
//             <div className="arch-border"></div>
//           </div>
          
//           {/* Subtle floating badge */}
//           <motion.div 
//             className="floating-badge"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//           >
//             <span>100% Organic</span>
//           </motion.div>
//         </motion.div>

//       </div>
//     </header>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  return (
    <header className="hero-femas-wrapper">
      {/* 1. TOP VISUAL BLOCK (No text here) */}
      <div className="hero-image-banner">
        <img 
          src="/products/4.jpg"  /* Replace with your image path */
          alt="Femas Luxury Skincare" 
          className="hero-main-img" 
        />
        {/* Subtle nude tint overlay */}
        <div className="hero-visual-overlay" />
      </div>

      {/* 2. BOTTOM CONTENT BLOCK (Text and Buttons) */}
      <div className="hero-text-container">
        <div className="container">
          <motion.div
            className="hero-text-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-tag">The Essentials</span>
            <h1 className="hero-bg-headline">
              FOR SKIN THAT <br />
              <span className="italic-brown">DESERVES MORE</span>
            </h1>

            <p className="hero-bg-sub">
              Thoughtfully crafted body essentials designed to nourish, 
              hydrate and restore skin confidence.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="hero-btn-brown">
                Shop Collection <FiArrowRight />
              </Link>
              <Link to="/about" className="hero-btn-nude">
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;