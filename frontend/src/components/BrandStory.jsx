import React from 'react';
import { motion } from 'framer-motion';
import './BrandStory.css';

const BrandStory = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="brand-story-dark">
      {/* Decorative Background Elements */}
      <div className="story-glow"></div>
      <div className="story-vertical-line"></div>

      <div className="story-content container">
        {/* Eyebrow Tag */}
        <motion.span 
          className="story-tag-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Heritage
        </motion.span>
        
        {/* LOGO REPLACES THE H2 TEXT */}
        <motion.img 
          src="/products/logo.png" 
          alt="FEMAS Essentials Logo" 
          className="story-logo"
          {...fadeUp}
          transition={{ delay: 0.3 }}
        />
        
        <motion.div 
          className="story-text-block"
          {...fadeUp}
          transition={{ delay: 0.5 }}
        >
          <p>
            FEMAS was created with a simple belief: skincare should feel good, work beautifully, and become a meaningful part of your everyday routine.
            We believe that self-care is not about perfection. It is about consistency, confidence, and taking a moment for yourself each day. From nourishing body oils to hydration-focused essentials, every FEMAS product is thoughtfully crafted to transform ordinary moments into rituals worth looking forward to.
            Because caring for your skin should never feel like a chore.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div 
          className="story-accent-line"
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </section>
  );
};

export default BrandStory;