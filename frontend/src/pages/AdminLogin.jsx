// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Admin password check
//     if (password === 'ABIMbola33?') { 
//       localStorage.setItem('isAdmin', 'true');
//       navigate('/admin-dashboard');
//     } else {
//       alert('Unauthorized: Incorrect Access Key');
//     }
//   };

//   return (
//     <div className="admin-login-wrapper">
//       <div className="admin-login-card">
//         <div className="admin-login-header">
//           <h2>FEMAS <span>Admin</span></h2>
//           <p className="admin-login-subtitle">Secure Access Portal</p>
//         </div>

//         <form onSubmit={handleLogin} className="admin-login-form">
//           <div className="admin-input-group">
//             <label className="admin-input-label">Security Key</label>
//             <input 
//               type="password" 
//               placeholder="••••••••" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="admin-login-input"
//               required
//             />
//           </div>
          
//           <button type="submit" className="admin-login-btn">
//             Authorize Entry
//           </button>
//         </form>

//         <button 
//           onClick={() => navigate('/')} 
//           className="admin-back-link"
//         >
//           Exit to Public Storefront
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiChevronLeft, FiShield } from 'react-icons/fi';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'ABIMbola33?') { 
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-dashboard');
    } else {
      alert('Unauthorized: Incorrect Access Key');
    }
  };

  return (
    <div className="admin-login-dark-wrapper">
      {/* Background Decorative Glow */}
      <div className="login-glow"></div>

      <motion.div 
        className="login-glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="login-header">
          <div className="shield-icon"><FiShield /></div>
          <h2>FEMAS <span className="italic-gold">Portal</span></h2>
          <p className="login-tag">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input-group">
            <label><FiLock /> Access Key</label>
            <input 
              type="password" 
              placeholder="Enter Security Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="login-authorize-btn">
            Authorize Entry
          </button>
        </form>

        <button 
          onClick={() => navigate('/')} 
          className="login-exit-btn"
        >
          <FiChevronLeft /> Return to Storefront
        </button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;