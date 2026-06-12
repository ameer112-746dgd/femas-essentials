// import React from 'react';
// import { FiDroplet, FiShield, FiZap } from 'react-icons/fi'; // More specific skincare icons
// import './Benefits.css';

// const Benefits = () => {
//   const benefits = [
//     {
//       id: 1,
//       icon: <FiDroplet />,
//       title: "Purely Botanical",
//       desc: "Clean, plant-derived formulas crafted without parabens, sulfates, or harsh synthetics."
//     },
//     {
//       id: 2,
//       icon: <FiShield />,
//       title: "Sensitive-First",
//       desc: "Dermatologically conscious blends specifically balanced to soothe reactive and fragile skin."
//     },
//     {
//       id: 3,
//       icon: <FiZap />,
//       title: "Targeted Results",
//       desc: "Potent actives clinically inspired to fade hyperpigmentation and clear stubborn acne."
//     }
//   ];

//   return (
//     <section className="benefits-section">
//       <div className="container">
//         {/* Added Section Header for more context */}
//         <div className="benefits-header">
//           <span className="eyebrow">The Femas Promise</span>
//           <h3>Why Your Skin Will Love Us</h3>
//         </div>

//         <div className="benefits-grid">
//           {benefits.map((item) => (
//             <div key={item.id} className="benefit-card">
//               <div className="benefit-icon-wrapper">
//                 {item.icon}
//               </div>
//               <div className="benefit-text">
//                 <h4>{item.title}</h4>
//                 <p>{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Benefits;

import React from 'react';
import { FiDroplet, FiShield, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FiDroplet />,
      title: "Ethically Sourced",
      desc: "We carefully select ingredients from Nigeria, across Africa, and trusted global partners. By sourcing thoughtfully, we celebrate the richness of nature while supporting quality, authenticity, and responsible craftsmanship."
    },
    {
      id: 2,
      icon: <FiShield />,
      title: "Thoughtful Formulation",
      desc: "Our products are crafted with carefully chosen ingredient and are free from parabens, we focus on creating skincare that feels effective, enjoyable, and suitable for everyday use."
    },
    {
      id: 3,
      icon: <FiZap />,
      title: "Thoughtful Packaging",
      desc: "We are committed to reducing waste through intentional packaging choices and are actively exploring refill options and more sustainable solutions as we continue to grow. Our goal is to create products that are better for both people and the planet."
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
    <section className="benefits-dark-section">
      {/* Background Decoration */}
      <div className="benefits-glow"></div>

      <div className="container">
        <motion.div 
          className="benefits-header"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">The Femas Promise</span>
          <h3>Why Your Skin Will <span className="italic-gold">Love Us</span></h3>
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
              className="benefit-glass-card"
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