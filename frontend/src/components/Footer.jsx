import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-dark">
      <div className="footer-glow"></div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            {/* LOGO IMAGE REPLACES TEXT */}
            <img src="/products/logo.png" alt="FEMAS Logo" className="footer-logo-img" />
            
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
              <Link to="/shop">All products</Link>
              <Link to="/shop">Body Oils</Link>
              <Link to="/shop">body Butters</Link>
              <Link to="/shop">Serum</Link>
              <Link to="/shop">Soap</Link>
              <Link to="/shop">Creams</Link>
              <Link to="/shop">Cleansers</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div className="footer-col">
            <h4 className="col-title">Client Care</h4>
            <nav className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/about">Our Story</Link>
            </nav>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-col">
            <h4 className="col-title">Contact</h4>
            <div className="contact-details">
              <a href="mailto:hello@femasessentials.com" className="contact-link">
                <FiMail className="gold-icon" />hello@femasessentials.com
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;