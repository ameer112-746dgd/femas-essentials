// import React from 'react';
// import { Link } from 'react-router-dom';
// import './About.css';

// const About = () => {
//   return (
//     <div className="about-page">
//       {/* Header Section */}
//       <div className="about-header">
//         <div className="container">
//           <h1>The FEMAS <span className="text-gold">Philosophy</span></h1>
//           <p>Redefining luxury self-care for the modern individual.</p>
//         </div>
//       </div>

//       <div className="container">
//         {/* Section 1: The Story */}
//         <section className="about-section">
//           <div className="about-text">
//             <h2>Our <span className="text-gold">Story</span></h2>
//             <p>
//               FEMAS Essentials was born out of a desire to create skincare that is both 
//               <strong> effective</strong> and <strong>luxurious</strong>. We understand the struggle of finding products 
//               that actually work for acne, hyperpigmentation, and sensitive skin without using harsh chemicals.
//             </p>
//             <p>
//               We believe your skincare routine should be a ritual—a moment of peace in your busy day. 
//               That's why every bottle is packed with natural, plant-based ingredients designed to reveal your 
//               natural glow.
//             </p>
//           </div>
//           <div className="about-image">
//             {/* Using one of your product images as a brand visual */}
//             <img src="/products/1.jpg" alt="FEMAS Essentials Bottle" />
//           </div>
//         </section>

//         {/* Section 2: Our Values */}
//         <section className="values-section">
//           <h2>Why Choose FEMAS?</h2>
//           <div className="values-grid">
//             <div className="value-card">
//               <h3>100% Natural</h3>
//               <p>We strictly use plant-based ingredients. No parabens, no sulfates, just nature.</p>
//             </div>
//             <div className="value-card">
//               <h3>Science-Backed</h3>
//               <p>Formulated to target specific skin concerns like acne and dark spots effectively.</p>
//             </div>
//             <div className="value-card">
//               <h3>Luxury Experience</h3>
//               <p>From the scent to the texture, every product feels like a spa treatment.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <div className="about-cta">
//           <h3>Ready to start your journey?</h3>
//           <Link to="/shop" className="btn-primary">Shop The Collection</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiHeart, FiArrowRight, FiCheckCircle, FiDroplet, FiSun, FiMoon } from 'react-icons/fi';
import './About.css';

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const botanicals = [
    { name: "Organic Shea", benefit: "Deep Hydration" },
    { name: "Essential Oils", benefit: "Skin Repair" },
    { name: "Vitamin E", benefit: "Glow Protection" },
    { name: "Pure Botanicals", benefit: "Anti-Inflammatory" }
  ];

  return (
    <div className="about-dark-wrapper">
      <div className="glow-dot dot-a"></div>
      <div className="glow-dot dot-b"></div>

      {/* HERO SECTION */}
      <section className="about-hero-dark">
        <div className="container">
          <motion.span className="tag-gold" initial={{opacity:0}} animate={{opacity:1}}>
            The Art of Self-Care
          </motion.span>
          <motion.h1 className="display-large" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Beyond Skincare, <br /><span className="italic-gold">A State of Mind.</span>
          </motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            FEMAS Essentials is more than a brand; it is a commitment to the purity of nature 
            and the luxury of time. We believe in the power of slow-crafted, botanical science.
          </motion.p>
        </div>
      </section>

      <div className="container">
        {/* SECTION 1: THE STORY */}
        <section className="story-split">
          <motion.div className="story-visual" {...fadeUp}>
            <div className="image-frame">
              <img src="/products/1.jpg" alt="FEMAS Essence" />
              <div className="frame-border"></div>
            </div>
          </motion.div>

          <motion.div className="story-content-dark" {...fadeUp}>
            <span className="label">The Vision</span>
            <h2>Born from <span className="text-gold">Necessity.</span></h2>
            <p>
              FEMAS Essentials was founded on a singular premise: that effective skincare shouldn't require a compromise on health. 
              Our founder struggled with hyperpigmentation and sensitive skin, finding only products laden with harsh synthetics.
            </p>
            <p>
              We spent years researching plant-based alternatives that provide clinical-level results. 
              Today, we provide targeted solutions for acne and scarring that feel like a ritual, not a chore.
            </p>
            <div className="stats-row">
              <div className="stat-item"><strong>100%</strong><span>Natural</span></div>
              <div className="stat-item"><strong>0%</strong><span>Parabens</span></div>
              <div className="stat-item"><strong>24H</strong><span>Hydration</span></div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: BOTANICAL EXCELLENCE (NEW) */}
        <section className="botanical-section">
          <motion.div className="section-head-left" {...fadeUp}>
            <span className="label">The Ingredients</span>
            <h2>Nature’s <span className="text-gold">Alchemy</span></h2>
          </motion.div>
          <div className="botanical-grid">
            {botanicals.map((b, i) => (
              <motion.div key={i} className="botanical-card" {...fadeUp} transition={{delay: i * 0.1}}>
                <FiDroplet className="b-icon" />
                <h4>{b.name}</h4>
                <p>{b.benefit}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: THE RITUAL (NEW) */}
        <section className="ritual-section">
          <motion.div className="ritual-glass" {...fadeUp}>
            <div className="ritual-text">
              <span className="label">The Experience</span>
              <h2>A Ritual for <span className="text-gold">Day & Night</span></h2>
              <div className="ritual-steps">
                <div className="step">
                  <FiSun className="step-icon" />
                  <div>
                    <h5>AM: Protect & Glow</h5>
                    <p>Start with our Treatment Oils to create a barrier against pollutants.</p>
                  </div>
                </div>
                <div className="step">
                  <FiMoon className="step-icon" />
                  <div>
                    <h5>PM: Repair & Restore</h5>
                    <p>Use our Luxury Butters to heal your skin while it rests.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="ritual-visual">
               <img src="/products/3.jpg" alt="Skincare Ritual" />
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: OUR PROMISE */}
        <section className="promise-section">
          <motion.div className="section-head" {...fadeUp}>
            <h2>The FEMAS Promise</h2>
          </motion.div>
          <div className="promise-grid">
            {[
              { title: "Ethically Sourced", desc: "We partner with local producers to ensure the highest quality ingredients." },
              { title: "Cruelty Free", desc: "Tested on humans, never on animals. We believe in compassionate beauty." },
              { title: "Sustainable Packaging", desc: "Designed to minimize our footprint while maximizing luxury." }
            ].map((p, i) => (
              <motion.div key={i} className="promise-item" {...fadeUp} transition={{delay: i * 0.1}}>
                <FiCheckCircle className="p-icon" />
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <motion.section className="about-cta-dark" {...fadeUp}>
        <div className="container">
          <h2 className="cta-title">Your skin's <span className="italic-gold">new era</span> starts here.</h2>
          <Link to="/shop" className="gold-cta-btn">
            Explore Collection <FiArrowRight />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default About;