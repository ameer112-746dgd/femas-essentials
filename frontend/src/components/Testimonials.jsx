import React, { useState, useEffect } from 'react';
import { FiStar, FiCheck } from 'react-icons/fi';
import './Testimonials.css';

const reviews = [
  {
    id: 1,
    name: "Ngozi T.",
    text: "I’ve tried everything for my hyperpigmentation, but the Citrus Ointment is the only thing that actually worked. My skin is finally glowing!",
    location: "Lagos, NG",
    product: "Citrus Glow Ointment"
  },
  {
    id: 2,
    name: "Sarah Adebayo",
    text: "The Glow Melt is magic in a bottle. It smells expensive and keeps my skin deeply moisturized all day without feeling heavy or greasy.",
    location: "Abuja, NG",
    product: "Glow Melt Balm"
  },
  {
    id: 3,
    name: "Jessica B.",
    text: "Finally, a brand that understands sensitive skin. The Green Tea Cleanser is so gentle. My redness has vanished—I'm a customer for life.",
    location: "London, UK",
    product: "Green Tea Soothing Cleanser"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000); // 5 seconds gives people more time to read

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <span className="eyebrow">Community Stories</span>
          <h3 className="section-title">Voices of <span className="text-gold">Radiance</span></h3>
        </div>
        
        {/* We use key={current} to re-trigger the animation on change */}
        <div className="review-card fade-in" key={current}>
          <div className="quote-icon">“</div>
          
          <div className="stars">
            {[...Array(5)].map((_, i) => <FiStar key={i} fill="var(--color-accent)" />)}
          </div>

          <p className="review-text">{reviews[current].text}</p>
          
          <div className="product-tag">
            Used: <strong>{reviews[current].product}</strong>
          </div>

          <div className="review-author">
            <div className="author-info">
              <h4>{reviews[current].name}</h4>
              <span className="location">{reviews[current].location}</span>
            </div>
            <div className="verified-badge">
              <FiCheck /> Verified Purchaser
            </div>
          </div>
        </div>

        <div className="dots">
          {reviews.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;