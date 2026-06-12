// import React, { useState, useEffect } from 'react';
// import { FiStar, FiCheck } from 'react-icons/fi';
// import './Testimonials.css';

// const reviews = [
//   {
//     id: 1,
//     name: "Ngozi T.",
//     text: "I’ve tried everything for my hyperpigmentation, but the Citrus Ointment is the only thing that actually worked. My skin is finally glowing!",
//     location: "Lagos, NG",
//     product: "Citrus Glow Ointment"
//   },
//   {
//     id: 2,
//     name: "Sarah Adebayo",
//     text: "The Glow Melt is magic in a bottle. It smells expensive and keeps my skin deeply moisturized all day without feeling heavy or greasy.",
//     location: "Abuja, NG",
//     product: "Glow Melt Balm"
//   },
//   {
//     id: 3,
//     name: "Jessica B.",
//     text: "Finally, a brand that understands sensitive skin. The Green Tea Cleanser is so gentle. My redness has vanished—I'm a customer for life.",
//     location: "London, UK",
//     product: "Green Tea Soothing Cleanser"
//   }
// ];

// const Testimonials = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % reviews.length);
//     }, 5000); // 5 seconds gives people more time to read

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="testimonials-section">
//       <div className="container">
//         <div className="testimonials-header">
//           <span className="eyebrow">Community Stories</span>
//           <h3 className="section-title">Voices of <span className="text-gold">Radiance</span></h3>
//         </div>
        
//         {/* We use key={current} to re-trigger the animation on change */}
//         <div className="review-card fade-in" key={current}>
//           <div className="quote-icon">“</div>
          
//           <div className="stars">
//             {[...Array(5)].map((_, i) => <FiStar key={i} fill="var(--color-accent)" />)}
//           </div>

//           <p className="review-text">{reviews[current].text}</p>
          
//           <div className="product-tag">
//             Used: <strong>{reviews[current].product}</strong>
//           </div>

//           <div className="review-author">
//             <div className="author-info">
//               <h4>{reviews[current].name}</h4>
//               <span className="location">{reviews[current].location}</span>
//             </div>
//             <div className="verified-badge">
//               <FiCheck /> Verified Purchaser
//             </div>
//           </div>
//         </div>

//         <div className="dots">
//           {reviews.map((_, index) => (
//             <span 
//               key={index} 
//               className={`dot ${index === current ? 'active' : ''}`}
//               onClick={() => setCurrent(index)}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Amara O.",
      text: "The Luxury Butter is a game changer. My hyperpigmentation faded significantly in just 3 weeks. It feels like a spa every morning.",
      stars: 5
    },
    {
      id: 2,
      name: "Chidi E.",
      text: "Finally, a treatment oil that doesn't clog my pores. The botanical scent is heavenly and my skin feels so much more resilient.",
      stars: 5
    },
    {
      id: 3,
      name: "Titi L.",
      text: "Clean beauty that actually works. The transition from chemical-heavy products to FEMAS was the best decision for my sensitive skin.",
      stars: 5
    }
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <section className="testimonials-dark-section">
      <div className="testi-glow"></div>
      
      <div className="container">
        <motion.div className="testi-header" {...fadeUp}>
          <span className="eyebrow">Real Experiences</span>
          <h2>The <span className="italic-gold">Glow</span> Reports</h2>
          <div className="header-line"></div>
        </motion.div>

        <div className="testi-grid">
          {reviews.map((rev, i) => (
            <motion.div 
              key={rev.id} 
              className="testi-glass-card"
              {...fadeUp}
              transition={{ delay: i * 0.15 }}
            >
              <div className="stars-row">
                {[...Array(rev.stars)].map((_, i) => (
                  <FiStar key={i} className="star-icon" />
                ))}
              </div>
              <p className="rev-text">"{rev.text}"</p>
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