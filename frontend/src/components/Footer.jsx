// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiMail } from 'react-icons/fi';
// import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer">
      
//       {/* Main Footer Links */}
//       <div className="footer-main">
//         <div className="container footer-grid">
          
//           {/* Column 1: Brand Info & Socials */}
//           <div className="footer-col">
//             <h4 className="footer-logo">FEMAS <span>Essentials</span></h4>
//             <p>Luxury self-care for the modern individual. Natural, effective, and always gentle.</p>
            
//             <div className="social-icons">
//               <a href="https://www.instagram.com/femas_essentials" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//               <a href="https://www.tiktok.com/@femas_e" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
//               <a href="https://wa.me/2349099319135" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
//             </div>
//           </div>

//           {/* Column 2: Shop */}
//           <div className="footer-col">
//             <h4>Shop</h4>
//             <Link to="/shop">All Products</Link>
//             <Link to="/shop">Body Oils</Link>
//             <Link to="/shop">Face Serums</Link>
//           </div>

//           {/* Column 3: Support */}
//           <div className="footer-col">
//             <h4>Support</h4>
//             <Link to="/contact">Contact Us</Link>
//           </div>

//           {/* Column 4: Contact Info */}
//           <div className="footer-col">
//             <h4>Contact</h4>
//             <p><FiMail />femasessentials35@gmail.com</p>
//             <p>Lagos, Nigeria</p>
//           </div>
//         </div>
//       </div>

//       {/* Copyright & Subtle Links */}
//       <div className="footer-bottom">
//         <div className="container footer-bottom-flex">
//           <p>&copy; {new Date().getFullYear()} FEMAS Essentials. All rights reserved.</p>
          
//           <span className="footer-sep">|</span>

//           {/* Developer Link */}
//           <div className="dev-by">
//             Developed by 
//             <a href="https://wa.me/2348131179102" target="_blank" rel="noopener noreferrer" className="dev-link">
//               <FaWhatsapp />
//             </a>
//           </div>

//           {/* Admin link removed: admin access is available only via direct URL */}
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiSend } from 'react-icons/fi';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark">
      <div className="footer-glow"></div>

      {/* Newsletter Section */}
      {/* <section className="newsletter-dark">
        <div className="container">
          <motion.div 
            className="newsletter-glass"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="newsletter-text">
              <h3>Join the <span className="italic-gold">Inner Circle</span></h3>
              <p>Subscribe for exclusive skincare rituals and first access to new collections.</p>
            </div>
            <form className="newsletter-form-dark" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit">
                <span>Subscribe</span>
                <FiSend />
              </button>
            </form>
          </motion.div>
        </div>
      </section> */}

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <h4 className="footer-logo">FEMAS <span>Essentials</span></h4>
            <p className="brand-desc">Luxury self-care for the modern individual. Slow-crafted botanical science for your natural radiance.</p>
            
            <div className="social-tray">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"><FaTiktok /></a>
              <a href="https://wa.me/2349099319135" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="footer-col">
            <h4 className="col-title">Collection</h4>
            <nav className="footer-links">
              <Link to="/shop">All Rituals</Link>
              <Link to="/shop">Body Oils</Link>
              <Link to="/shop">Luxury Butters</Link>
              <Link to="/shop">Treatment Serums</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div className="footer-col">
            <h4 className="col-title">Client Care</h4>
            <nav className="footer-links">
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">Our Story</Link>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col">
            <h4 className="col-title">Contact</h4>
            <div className="contact-details">
              <a href="mailto:femasessentials35@gmail.com" className="contact-link">
                <FiMail className="gold-icon" /> femasessentials35@gmail.com
              </a>
              <p className="contact-link">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copyright">&copy; {currentYear} FEMAS Essentials. All rights reserved.</p>
          
          <div className="dev-credit">
            <span>Developed by</span>
            <a href="https://wa.me/2348131179102" target="_blank" rel="noopener noreferrer" className="wa-dev">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;