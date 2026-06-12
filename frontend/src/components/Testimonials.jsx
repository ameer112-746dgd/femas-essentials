import React from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Adepeju IO",
      text: "I love the way FEMAS feels on my skin. One thing I’ve noticed over the years is that the brand keeps evolving and getting better. Every new product feels more refined than the last.",
      stars: "★★★★★"
    },
    {
      id: 2,
      name: "Ayinke Alara",
      text: "I have sensitive skin and I’m very careful about what I use. Since incorporating FEMAS into my routine, my skin feels healthier, more comfortable, and better cared for. It’s one of the few brands I genuinely trust on my skin.",
      stars: "★★★★★"
    },
    {
      id: 3,
      name: "Henry uduma",
      text: "FEMAS products are gold on my skin. The texture, the feel, and the overall experience keep me coming back.",
      stars: "★★★★★"
    }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="testimonials-femas-section">
      <div className="testi-glow"></div>
      
      <div className="container">
        <motion.div className="testi-header" {...fadeUp}>
          <span className="eyebrow">Real Experiences</span>
          <h2>The <span className="italic-brown">Glow</span> Reports</h2>
          <div className="header-line"></div>
        </motion.div>

        <div className="testi-grid">
          {reviews.map((rev, i) => (
            <motion.div 
              key={rev.id} 
              className="testi-nude-card"
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
            >
              <div className="stars-display">{rev.stars}</div>
              <p className="rev-text">“{rev.text}”</p>
              <div className="rev-author">
                <div className="author-line"></div>
                <span>{rev.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;