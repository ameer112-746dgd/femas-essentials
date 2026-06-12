// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiCheckCircle, FiDroplet } from 'react-icons/fi';
// import './About.css';

// const About = () => {
//   const fadeUp = {
//     initial: { opacity: 0, y: 40 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true },
//     transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
//   };

//   const botanicals = [
//     { name: "Organic Shea", benefit: "Deep Hydration" },
//     { name: "Essential Oils", benefit: "Skin Repair" },
//     { name: "Vitamin E", benefit: "Glow Protection" },
//     { name: "Pure Botanicals", benefit: "Anti-Inflammatory" }
//   ];

//   return (
//     <div className="about-dark-wrapper">
//       <div className="glow-dot dot-a"></div>
//       <div className="glow-dot dot-b"></div>

//       {/* HERO SECTION */}
//       <section className="about-hero-dark">
//         <div className="container">
//           <motion.img 
//             src="/products/logo.png" 
//             alt="FEMAS Logo" 
//             className="about-hero-logo"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           />
//           <motion.p 
//             className="hero-subtitle" 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             transition={{ delay: 0.4 }}
//           >
//             FEMAS Essentials is more than a brand; it is a commitment to the purity of nature 
//             and the luxury of time. We believe in the power of slow-crafted, botanical science.
//           </motion.p>
//         </div>
//       </section>

//       <div className="container">
//         {/* SECTION 1: OUR JOURNEY (Updated with your text) */}
//         <section className="story-split">
//           <motion.div className="story-visual" {...fadeUp}>
//             <div className="image-frame">
//               {/* Replace with your event or journey image */}
//               <img src="/products/journey.jpg" alt="FEMAS Journey" className="femas-img" />
//               <div className="frame-border"></div>
//             </div>
//           </motion.div>

//           <motion.div className="story-content-dark" {...fadeUp}>
//             <span className="label">Our Journey</span>
//             <h2>A Milestone of <span className="italic-gold">Care.</span></h2>
//             <div className="journey-text-block">
//               <p>
//                 In 2024, FEMAS celebrated an important milestone with its first official launch event—a gathering that brought together skincare lovers, supporters, and the community that helped shape our vision.
//               </p>
//               <p>
//                 The event showcased our collection of handcrafted balms and butters, products that reflected our passion for nourishing skin through thoughtful formulation and intentional care.
//               </p>
//               <p>
//                 More than a launch, it was a celebration of confidence, self-care, and the belief that skincare should be both effective and enjoyable. It marked the beginning of a new chapter for FEMAS and reinforced our commitment to creating products that help people feel comfortable and confident in their skin.
//               </p>
//               <p>
//                 As we continue to grow, that same spirit of care, community, and craftsmanship remains at the heart of everything we do.
//               </p>
//             </div>
//           </motion.div>
//         </section>

//         {/* SECTION 2: BOTANICAL EXCELLENCE */}
//         <section className="botanical-section">
//           <div className="container">
//             <motion.div className="section-head-left" {...fadeUp}>
//               <span className="label">The Ingredients</span>
//               <h2>Nature’s <span className="italic-gold">Alchemy</span></h2>
//             </motion.div>
//             <div className="botanical-grid">
//               {botanicals.map((b, i) => (
//                 <motion.div key={i} className="botanical-card" {...fadeUp} transition={{delay: i * 0.1}}>
//                   <FiDroplet className="b-icon" />
//                   <h4>{b.name}</h4>
//                   <p>{b.benefit}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* SECTION 3: EDITORIAL VISUAL */}
//         <section className="ritual-section">
//           <motion.div className="ritual-visual-standalone" {...fadeUp}>
//              <img src="/products/3.jpg" alt="Skincare Ritual" className="femas-img" />
//           </motion.div>
//         </section>

//         {/* SECTION 4: OUR PROMISE */}
//         <section className="promise-section">
//           <motion.div className="section-head" {...fadeUp}>
//             <h2>The <span className="italic-gold">FEMAS</span> Promise</h2>
//           </motion.div>
//           <div className="promise-grid">
//             {[
//               { title: "Ethically Sourced", desc: "We carefully select ingredients from Nigeria and across Africa." },
//               { title: "Cruelty-Free", desc: "FEMAS products are never tested on animals and are created with care." },
//               { title: "Thoughtful Packaging", desc: "We are committed to reducing waste through intentional choices." }
//             ].map((p, i) => (
//               <motion.div key={i} className="promise-item" {...fadeUp} transition={{delay: i * 0.1}}>
//                 <FiCheckCircle className="p-icon" />
//                 <h4>{p.title}</h4>
//                 <p>{p.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </div>

//       {/* FOOTER CTA */}
//       <motion.section className="about-cta-dark" {...fadeUp}>
//         <div className="container">
//           <h2 className="cta-title">Your skin's <span className="italic-gold">new era</span> starts here.</h2>
//           <Link to="/shop" className="gold-cta-btn">
//             Explore Collection <FiArrowRight />
//           </Link>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiDroplet, FiTarget } from 'react-icons/fi';
import './About.css';

const About = () => {
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const botanicals = [
    { name: "NOURISHING BUTTERS", benefit: "rich botanical butters  selected to soften and condition skin" },
    { name: "BOTANICAL OILS", benefit: "plant driven oils chosen for their, healing, nourishing and moisturizing properties" },
    { name: "SKIN LOVING ACTIVES", benefit: "thoughtfully chosen ingredients that help hydrate , replenish and support skin barrier" },
    { name: "COSMETIC SCIENCE", benefit: "modern formulation principles that combine performance , stability and an enjoyable user experience" }
  ];

  return (
    <div className="about-dark-wrapper">
      <div className="glow-dot dot-a"></div>
      <div className="glow-dot dot-b"></div>

      {/* HERO SECTION */}
      <section className="about-hero-dark">
        <div className="container">
          <motion.img 
            src="/products/logo.png" 
            alt="FEMAS Logo" 
            className="about-hero-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.p 
            className="hero-subtitle" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4 }}
          >
            FEMAS Essentials is more than a brand; it is a commitment to the purity of nature 
            and the luxury of time. We believe in the power of slow-crafted, botanical science.
          </motion.p>
        </div>
      </section>

      <div className="container">
        
        {/* SECTION 1: THE MISSION (Vision) */}
        <section className="story-split">
          <motion.div className="story-visual" {...fadeUp}>
            <div className="image-frame">
              <img src="/products/1.jpg" alt="FEMAS Mission" className="femas-img" />
              <div className="frame-border"></div>
            </div>
          </motion.div>

          <motion.div className="story-content-dark" {...fadeUp}>
            <span className="label">The Mission</span>
            <h2>Born from <span className="italic-gold">Necessity.</span></h2>
            <div className="journey-text-block">
              <p>
                To create a new generation of skincare essentials that combine thoughtful formulation, beautiful experiences, and everyday practicality.
              </p>
              <p>
                We envision FEMAS as a brand that inspires confidence through care, offering products that nourish the skin, elevate daily rituals, and make self-care feel effortless. Our goal is simple: to create products people genuinely enjoy using every day.
              </p>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: OUR JOURNEY (Text on Left, Image on Right) */}
        <section className="story-split reverse">
          <motion.div className="story-content-dark" {...fadeUp}>
            <span className="label">Our Journey</span>
            <h2>A Milestone of <span className="italic-gold">Care.</span></h2>
            <div className="journey-text-block">
              <p>
                In 2024, FEMAS celebrated an important milestone with its first official launch event a gathering that brought together skincare lovers and the community that helped shape our vision.
              </p>
              <p>
                The event showcased our collection of handcrafted balms and butters, products that reflected our passion for nourishing skin through thoughtful formulation.
              </p>
              <p>
                It marked the beginning of a new chapter for FEMAS and reinforced our commitment to creating products that help people feel comfortable and confident in their skin.
              </p>
              <p className="highlight-text">
                Craftsmanship remains at the heart of everything we do.
              </p>
            </div>
          </motion.div>

          <motion.div className="story-visual" {...fadeUp}>
            <div className="image-frame">
              <img src="/products/5.jpg" alt="FEMAS Launch Event" className="femas-img" />
              <div className="frame-border"></div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 3: BOTANICAL EXCELLENCE */}
        <section className="botanical-section">
          <div className="container">
            <motion.div className="section-head-left" {...fadeUp}>
              <span className="label">The Ingredients</span>
              <h2>Nature’s <span className="italic-gold">Alchemy</span></h2>
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
          </div>
        </section>

        {/* SECTION 4: EDITORIAL MOOD IMAGE */}
        <section className="ritual-section">
          <motion.div className="ritual-visual-standalone" {...fadeUp}>
             <img src="/products/3.jpg" alt="Skincare Ritual" className="femas-img" />
          </motion.div>
        </section>

        {/* SECTION 5: OUR PROMISE */}
        <section className="promise-section">
          <motion.div className="section-head" {...fadeUp}>
            <h2>The <span className="italic-gold">FEMAS</span> Promise</h2>
          </motion.div>
          <div className="promise-grid">
            {[
              { title: "Ethically Sourced", desc: "We carefully select ingredients from Nigeria, across Africa, and trusted global partners. By sourcing thoughtfully, we celebrate the richness of nature while supporting quality, authenticity, and responsible craftsmanship." },
              { title: "Thoughtful Formulation", desc: "Our products are crafted with carefully chosen ingredient and are free from parabens, we focus on creating skincare that feels effective, enjoyable, and suitable for everyday use." },
              { title: "Thoughtful Packaging", desc: "We are committed to reducing waste through intentional packaging choices and are actively exploring refill options and more sustainable solutions as we continue to grow. Our goal is to create products that are better for both people and the planet." }
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