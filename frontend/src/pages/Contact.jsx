// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FiMail, FiPhone, FiMapPin, FiInstagram, FiArrowRight, FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
// import { FaWhatsapp } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import './Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [status, setStatus] = useState('Send Message');
  
//   // Notification State
//   const [notification, setNotification] = useState({ show: false, message: '', type: '' });

//   // Auto-hide notification after 4 seconds
//   useEffect(() => {
//     if (notification.show) {
//       const timer = setTimeout(() => {
//         setNotification({ ...notification, show: false });
//       }, 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus('Sending...');
//     try {
//       await axios.post('http://localhost:5001/api/contact', formData);
      
//       // Success Notification
//       setNotification({
//         show: true,
//         message: "Message received. We'll be in touch shortly.",
//         type: 'success'
//       });
      
//       setFormData({ name: '', email: '', message: '' });
//       setStatus('Send Message');
//     } catch (error) {
//       // Error Notification
//       setNotification({
//         show: true,
//         message: "Something went wrong. Please try again.",
//         type: 'error'
//       });
//       setStatus('Send Message');
//     }
//   };

//   const fadeUp = {
//     initial: { opacity: 0, y: 30 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true },
//     transition: { duration: 0.6, ease: "easeOut" }
//   };

//   return (
//     <div className="contact-wrapper">
//       {/* POPUP NOTIFICATION */}
//       <AnimatePresence>
//         {notification.show && (
//           <motion.div 
//             className={`notification-toast ${notification.type}`}
//             initial={{ opacity: 0, y: -50, x: '-50%' }}
//             animate={{ opacity: 1, y: 20, x: '-50%' }}
//             exit={{ opacity: 0, y: -20, x: '-50%' }}
//           >
//             <div className="toast-content">
//               {notification.type === 'success' ? <FiCheckCircle className="toast-icon" /> : <FiXCircle className="toast-icon" />}
//               <p>{notification.message}</p>
//               <button className="close-toast" onClick={() => setNotification({ ...notification, show: false })}>
//                 <FiX />
//               </button>
//             </div>
//             <motion.div 
//               className="toast-progress" 
//               initial={{ width: '100%' }}
//               animate={{ width: '0%' }}
//               transition={{ duration: 4, ease: "linear" }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="bg-blur-dot dot-1"></div>
//       <div className="bg-blur-dot dot-2"></div>

//       <div className="contact-main">
//         <motion.section 
//           className="contact-visual-side"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="sticky-content">
//             <motion.span className="tag" {...fadeUp}>Contact</motion.span>
//             <motion.h1 className="display-text" {...fadeUp} transition={{ delay: 0.2 }}>
//               Let's craft <br /> something <span className="italic-gold">beautiful.</span>
//             </motion.h1>
            
//             <motion.div className="contact-methods" {...fadeUp} transition={{ delay: 0.4 }}>
//               <div className="method-row">
//                 <FiMail className="m-icon" />
//                 <div className="m-text">
//                   <span>Write to us</span>
//                   <p>femasessentials35@gmail.com</p>
//                 </div>
//               </div>
//               <div className="method-row">
//                 <FiPhone className="m-icon" />
//                 <div className="m-text">
//                   <span>Speak with us</span>
//                   <p>+234 909 931 9135</p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* <motion.div className="social-tray" {...fadeUp} transition={{ delay: 0.6 }}>
//               <a href="https://instagram.com/femas_essentials" target="_blank" rel="noreferrer"><FiInstagram /></a>
//               <a href="https://wa.me/2349099319135" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
//             </motion.div> */}
//           </div>
//         </motion.section>

//         <section className="contact-form-side">
//           <motion.div 
//             className="form-glass-container"
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <form onSubmit={handleSubmit} className="minimal-form">
//               <div className="input-block">
//                 <input 
//                   type="text" 
//                   id="name"
//                   required
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   placeholder=" "
//                 />
//                 <label htmlFor="name">Your Name</label>
//               </div>

//               <div className="input-block">
//                 <input 
//                   type="email" 
//                   id="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   placeholder=" "
//                 />
//                 <label htmlFor="email">Email Address</label>
//               </div>

//               <div className="input-block">
//                 <textarea 
//                   id="message"
//                   required
//                   rows="4"
//                   value={formData.message}
//                   onChange={(e) => setFormData({...formData, message: e.target.value})}
//                   placeholder=" "
//                 ></textarea>
//                 <label htmlFor="message">Your Message</label>
//               </div>

//               <button type="submit" className="magnetic-btn" disabled={status === 'Sending...'}>
//                 <span className="btn-content">
//                   {status} <FiArrowRight />
//                 </span>
//                 <div className="btn-fill"></div>
//               </button>
//             </form>
//           </motion.div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiArrowRight, FiCheckCircle, FiXCircle, FiX, FiClock, FiUsers } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('Send Message');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('http://localhost:5001/api/contact', formData);
      setNotification({ show: true, message: "Message received. We'll be in touch shortly.", type: 'success' });
      setFormData({ name: '', email: '', message: '' });
      setStatus('Send Message');
    } catch (error) {
      setNotification({ show: true, message: "Something went wrong. Please try again.", type: 'error' });
      setStatus('Send Message');
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="contact-wrapper">
      {/* POPUP NOTIFICATION */}
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            className={`notification-toast ${notification.type}`}
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
          >
            <div className="toast-content">
              {notification.type === 'success' ? <FiCheckCircle className="toast-icon" /> : <FiXCircle className="toast-icon" />}
              <p>{notification.message}</p>
              <button className="close-toast" onClick={() => setNotification({ ...notification, show: false })}><FiX /></button>
            </div>
            <motion.div className="toast-progress" initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 4, ease: "linear" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-blur-dot dot-1"></div>
      <div className="bg-blur-dot dot-2"></div>

      <div className="contact-main">
        {/* LEFT SIDE: Content & Info */}
        <motion.section className="contact-visual-side">
          <div className="sticky-content">
            <motion.span className="tag" {...fadeUp}>Contact Us</motion.span>
            <motion.h1 className="display-text" {...fadeUp} transition={{ delay: 0.1 }}>
              Elevate your <br /> skincare <span className="italic-gold">journey.</span>
            </motion.h1>
            
            <motion.div className="contact-context-blocks" {...fadeUp} transition={{ delay: 0.2 }}>
              {/* Expert Blurb */}
              <div className="context-block">
                <div className="c-icon"><FiUsers /></div>
                <div className="c-text">
                  <h4>Expert Consultations</h4>
                  <p>Not sure which ritual is right for you? Our specialists are available for personalized skin analysis.</p>
                </div>
              </div>

              {/* Timing Blurb */}
              <div className="context-block">
                <div className="c-icon"><FiClock /></div>
                <div className="c-text">
                  <h4>Client Care Hours</h4>
                  <p>Monday — Friday: 9am - 6pm <br />Saturday: 10am - 4pm</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-methods" {...fadeUp} transition={{ delay: 0.3 }}>
              <div className="method-row">
                <FiMail className="m-icon" />
                <div className="m-text">
                  <span>Write to us</span>
                  <p>femasessentials35@gmail.com</p>
                </div>
              </div>
              <div className="method-row">
                <FiPhone className="m-icon" />
                <div className="m-text">
                  <span>Speak with us</span>
                  <p>+234 909 931 9135</p>
                </div>
              </div>
            </motion.div>

            {/* <motion.div className="social-tray" {...fadeUp} transition={{ delay: 0.4 }}>
              <p>Join the community</p>
              <div className="social-btns">
                <a href="https://instagram.com/femas_essentials" target="_blank" rel="noreferrer"><FiInstagram /></a>
                <a href="https://wa.me/2349099319135" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
              </div>
            </motion.div> */}
          </div>
        </motion.section>

        {/* RIGHT SIDE: Form */}
        <section className="contact-form-side">
          <motion.div 
            className="form-glass-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
             <div className="form-header">
                <h3>Send a Message</h3>
                <p>We typically respond within 24 hours.</p>
             </div>
            <form onSubmit={handleSubmit} className="minimal-form">
              <div className="input-block">
                <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder=" " />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="input-block">
                <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder=" " />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="input-block">
                <textarea id="message" required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder=" "></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <button type="submit" className="magnetic-btn" disabled={status === 'Sending...'}>
                <span className="btn-content">
                  {status} <FiArrowRight />
                </span>
                <div className="btn-fill"></div>
              </button>
            </form>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Contact;