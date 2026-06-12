import React from 'react';
import { FiGlobe, FiLayers, FiPackage } from 'react-icons/fi'; // Icons that match the new text
import { motion } from 'framer-motion';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FiGlobe />, // Represents Global/Nigeria sourcing
      title: "Ethically Sourced",
      desc: "We carefully select ingredients from Nigeria, across Africa, and trusted global partners. By sourcing thoughtfully, we celebrate the richness of nature while supporting quality, authenticity, and responsible craftsmanship."
    },
    {
      id: 2,
      icon: <FiLayers />, // Represents blending/formulation
      title: "Thoughtful Formulation",
      desc: "Our products are crafted with carefully chosen ingredients and are free from parabens. We focus on creating skincare that feels effective, enjoyable, and suitable for everyday use."
    },
    {
      id: 3,
      icon: <FiPackage />, // Represents packaging/sustainability
      title: "Thoughtful Packaging",
      desc: "We are committed to reducing waste through intentional packaging choices and are actively exploring refill options and sustainable solutions. Our goal is to create products that are better for both people and the planet."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="benefits-femas-section">
      <div className="benefits-glow"></div>

      <div className="container">
        <motion.div 
          className="benefits-header"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">The Femas Promise</span>
          <h3>Why Your Skin Will <span className="italic-brown">Love Us</span></h3>
          <div className="header-line"></div>
        </motion.div>

        <motion.div 
          className="benefits-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((item) => (
            <motion.div 
              key={item.id} 
              className="benefit-nude-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="benefit-icon-box">
                {item.icon}
              </div>
              <div className="benefit-text">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="card-shine"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;