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
        
        <motion.h2 
          className="display-large"
          {...fadeUp}
          transition={{ delay: 0.3 }}
        >
          Effective Science. <br/>
          <span className="italic-gold">Purely Luxurious.</span>
        </motion.h2>
        
        <motion.div 
          className="story-text-block"
          {...fadeUp}
          transition={{ delay: 0.5 }}
        >
          <p>
            FEMAS Essentials was born out of a desire to create skincare that is both effective 
            and luxurious. We understand the struggle of finding products that actually work 
            for acne, hyperpigmentation, and sensitive skin without using harsh chemicals.
          </p>
          <p>
            We believe your skincare routine should be a ritual a moment of peace in your 
            busy day. That's why every bottle is packed with natural, plant-based ingredients 
            designed to reveal your natural glow.
          </p>
        </motion.div>

        {/* Decorative divider - smaller and more elegant */}
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