// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, FiImage, FiTag, FiDollarSign, FiList, FiCheckCircle } from 'react-icons/fi';
// import './AdminDashboard.css';
// import API from '../api'; 

// const AdminDashboard = () => {
//   const [view, setView] = useState('products'); // 'products' or 'orders'
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [formData, setFormData] = useState({ 
//     name: '', price: '', category: '', description: '', ingredients: '', usage: '' 
//   });

//   const categoryOptions = ['Body oils', 'Body butters', 'Serum', 'Soap', 'Creams', 'Cleansers'];
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin-login');
//     else {
//       loadAllData();
//     }
//   }, []);

//   const loadAllData = async () => {
//     setLoading(true);
//     try {
//       const prodRes = await API.get('/products');
//       const orderRes = await API.get('/orders');
//       setProducts(prodRes.data);
//       setOrders(orderRes.data);
//     } catch (err) { console.error(err); }
//     finally { setLoading(false); }
//   };

//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
//     return window.btoa(binary);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach(key => data.append(key, formData[key]));
//     if (imageFile) data.append('image', imageFile);

//     try {
//       if (editingId) await API.put(`/products/${editingId}`, data);
//       else await API.post('/products', data);
      
//       setEditingId(null);
//       setImageFile(null);
//       setFormData({ name: '', price: '', category: '', description: '' });
//       loadAllData();
//       alert("Inventory Updated");
//     } catch (err) { alert("Save failed"); }
//   };

//   const handleDelete = async (id) => {
//     if(window.confirm("Delete this product?")) {
//         try {
//             await API.delete(`/products/${id}`);
//             loadAllData();
//         } catch (err) { console.error(err); }
//     }
//   }

//   const confirmPayment = async (orderId) => {
//     if (window.confirm("Confirm payment received? This sends an email to the customer.")) {
//       try {
//         await API.put(`/orders/${orderId}/confirm-payment`);
//         loadAllData();
//         alert("Payment Confirmed & Email Sent!");
//       } catch (err) { alert("Failed to confirm"); }
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAdmin');
//     navigate('/');
//   };

//   if (loading) return <div className="admin-dark-loader"><div className="spinner"></div></div>;

//   return (
//     <div className="admin-dark-wrapper">
//       <div className="bg-glow"></div>
      
//       {/* Sidebar - Desktop */}
//       <nav className="admin-sidebar">
//         <div className="brand">
//           <h2>FEMAS <span>Portal</span></h2>
//         </div>
//         <button onClick={handleLogout} className="logout-pill">
//           <FiLogOut /> Logout
//         </button>
//       </nav>

//       <main className="admin-main">
//         <header className="admin-header">
//           <motion.h1 initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>
//             Management <span className="italic-gold">Portal</span>
//           </motion.h1>
//           <button onClick={handleLogout} className="mobile-logout-btn"><FiLogOut /></button>
//         </header>

//         {/* Tab Switcher */}
//         <div className="admin-tabs">
//           <button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')}>
//             <FiPackage /> Inventory
//           </button>
//           <button className={view === 'orders' ? 'active' : ''} onClick={() => setView('orders')}>
//             <FiList /> Orders ({orders.filter(o => o.status === 'Pending').length})
//           </button>
//         </div>

//         <div className="admin-content-area">
//           <AnimatePresence mode="wait">
//             {view === 'products' ? (
//               <motion.div key="prod" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:10}} className="admin-grid">
                
//                 {/* Form */}
//                 <div className="glass-card editor-section">
//                   <h3>{editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? 'Edit' : 'New'} Product</h3>
//                   <form onSubmit={handleSubmit} className="admin-form">
//                     <div className="input-group"><label><FiPackage /> Name</label>
//                     <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required /></div>
//                     <div className="input-group"><label><FiDollarSign /> Price</label>
//                     <input type="number" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required /></div>
//                     <div className="input-group"><label><FiTag /> Category</label>
//                       <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} required>
//                         <option value="">Select</option>
//                         {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                       </select>
//                     </div>
//                     <div className="input-group"><label><FiImage /> Image</label>
//                     <input type="file" className="file-input" onChange={(e)=>setImageFile(e.target.files[0])} required={!editingId} /></div>
//                     <div className="input-group full"><label>Description</label>
//                     <textarea rows="3" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} required /></div>
//                     <div className="form-actions">
//                       <button type="submit" className="btn-gold">{editingId ? 'Update' : 'Add to Inventory'}</button>
//                       {editingId && <button type="button" className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>}
//                     </div>
//                   </form>
//                 </div>

//                 {/* Inventory Table */}
//                 <div className="glass-card table-section">
//                   <div className="table-responsive">
//                     <table>
//                       <thead><tr><th>Product</th><th className="hide-mobile">Category</th><th>Price</th><th className="txt-right">Actions</th></tr></thead>
//                       <tbody>
//                         {products.map(p => (
//                           <tr key={p._id}>
//                             <td><div className="td-product">{p.image && <img src={`data:${p.image.contentType};base64,${arrayBufferToBase64(p.image.data.data)}`} alt=""/>}<span>{p.name}</span></div></td>
//                             <td className="hide-mobile"><span className="badge">{p.category}</span></td>
//                             <td>₦{p.price.toLocaleString()}</td>
//                             <td className="txt-right"><button className="action-btn edit" onClick={()=>{setEditingId(p._id); setFormData(p)}}><FiEdit2 /></button><button className="action-btn delete" onClick={()=>handleDelete(p._id)}><FiTrash2 /></button></td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               /* Orders View */
//               <motion.div key="ord" initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} className="glass-card table-section full-width">
//                 <div className="table-responsive">
//                   <table>
//                     <thead><tr><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th className="txt-right">Action</th></tr></thead>
//                     <tbody>
//                       {orders.map(o => (
//                         <tr key={o._id}>
//                           <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//                           <td><strong>{o.name}</strong><br/><small style={{color: '#888'}}>{o.phone}</small></td>
//                           <td>₦{o.total.toLocaleString()}</td>
//                           <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
//                           <td className="txt-right">
//                             {o.status === 'Pending' ? (
//                               <button className="confirm-pay-btn" onClick={() => confirmPayment(o._id)}><FiCheckCircle /> Confirm Payment</button>
//                             ) : <FiCheckCircle style={{color: '#27ae60'}} />}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, 
  FiImage, FiTag, FiDollarSign, FiList, 
  FiCheckCircle, FiInfo, FiLayers 
} from 'react-icons/fi';
import './AdminDashboard.css';
import API from '../api'; 

const AdminDashboard = () => {
  const [view, setView] = useState('products'); 
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', price: '', category: '', description: '', ingredients: '', usage: '' 
  });

  const categoryOptions = ['Body oils', 'Body butters', 'Serum', 'Soap', 'Creams', 'Cleansers'];
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/admin-login');
    } else {
      loadAllData();
    }
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const prodRes = await API.get('/products');
      const orderRes = await API.get('/orders');
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, data);
      } else {
        await API.post('/products', data);
      }
      
      setEditingId(null);
      setImageFile(null);
      setFormData({ name: '', price: '', category: '', description: '', ingredients: '', usage: '' });
      loadAllData();
      alert("Inventory Updated Successfully");
    } catch (err) { 
      alert("Failed to save product. Please check your connection."); 
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
        try {
            await API.delete(`/products/${id}`);
            loadAllData();
        } catch (err) { 
          console.error(err); 
        }
    }
  };

  const confirmPayment = async (orderId) => {
    if (window.confirm("Confirm payment received? This will update the order status.")) {
      try {
        await API.put(`/orders/${orderId}/confirm-payment`);
        loadAllData();
        alert("Payment Confirmed");
      } catch (err) { 
        alert("Failed to confirm payment."); 
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  if (loading) return (
    <div className="admin-femas-loader">
      <div className="loader-circle"></div>
    </div>
  );

  return (
    <div className="admin-femas-wrapper">
      <div className="bg-glow"></div>
      
      {/* Sidebar - Desktop Only (Hidden on Mobile via CSS) */}
      <nav className="admin-sidebar">
        <div className="brand">
          <h2 style={{color: 'var(--femas-brown)'}}>FEMAS <span style={{fontWeight: '300', fontSize: '0.9rem', display: 'block'}}>Portal</span></h2>
        </div>
        
        <div className="sidebar-nav-links">
           {/* Static links can go here if needed */}
        </div>

        <button onClick={handleLogout} className="femas-btn-outline" style={{display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>
          <FiLogOut /> Logout
        </button>
      </nav>

      <main className="admin-main-content">
        <header className="admin-header">
          <motion.h1 initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}}>
            Admin <span className="italic-brown">Panel</span>
          </motion.h1>
          
          {/* Mobile Logout Button (Visible only on Mobile) */}
          <button onClick={handleLogout} className="mobile-logout-icon">
            <FiLogOut />
          </button>
        </header>

        {/* Responsive Tabs Wrapper */}
        <div className="admin-tabs-scroll-wrapper">
          <div className="admin-tabs-container">
            <button 
              className={`tab-btn ${view === 'products' ? 'active' : ''}`} 
              onClick={() => setView('products')}
            >
              <FiPackage /> Inventory
            </button>
            <button 
              className={`tab-btn ${view === 'orders' ? 'active' : ''}`} 
              onClick={() => setView('orders')}
            >
              <FiList /> Orders ({orders.filter(o => o.status === 'Pending').length})
            </button>
          </div>
        </div>

        <div className="admin-view-area">
          <AnimatePresence mode="wait">
            {view === 'products' ? (
              <motion.div 
                key="prod" 
                initial={{opacity:0, y:10}} 
                animate={{opacity:1, y:0}} 
                exit={{opacity:0, y:-10}} 
                className="admin-grid"
              >
                {/* Product Form Card */}
                <div className="admin-glass-card">
                  <h3>
                    {editingId ? <FiEdit2 /> : <FiPlus />} 
                    {editingId ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <form onSubmit={handleSubmit} className="admin-form-layout">
                    <div className="input-group">
                      <label><FiPackage /> Product Name</label>
                      <input 
                        type="text" 
                        value={formData.name} 
                        onChange={(e)=>setFormData({...formData, name: e.target.value})} 
                        required 
                        placeholder="e.g. Glow Oil" 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label><FiDollarSign /> Price (₦)</label>
                      <input 
                        type="number" 
                        value={formData.price} 
                        onChange={(e)=>setFormData({...formData, price: e.target.value})} 
                        required 
                        placeholder="7000" 
                      />
                    </div>
                    
                    <div className="input-group">
                      <label><FiLayers /> Category</label>
                      <select 
                        value={formData.category} 
                        onChange={(e)=>setFormData({...formData, category: e.target.value})} 
                        required
                      >
                        <option value="">Select Category</option>
                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    
                    <div className="input-group">
                      <label><FiImage /> Image</label>
                      <input 
                        type="file" 
                        className="admin-file-input" 
                        onChange={(e)=>setImageFile(e.target.files[0])} 
                        required={!editingId} 
                      />
                    </div>
                    
                    <div className="input-group full-span">
                      <label><FiInfo /> Description</label>
                      <textarea 
                        rows="3" 
                        value={formData.description} 
                        onChange={(e)=>setFormData({...formData, description: e.target.value})} 
                        required 
                        placeholder="Brief product description..." 
                      />
                    </div>
                    
                    <div className="admin-actions">
                      <button type="submit" className="femas-btn-brown">
                        {editingId ? 'Update Product' : 'Save to Inventory'}
                      </button>
                      {editingId && (
                        <button 
                          type="button" 
                          className="femas-btn-outline" 
                          onClick={() => {
                            setEditingId(null);
                            setFormData({ name: '', price: '', category: '', description: '', ingredients: '', usage: '' });
                          }}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Inventory List Card */}
                <div className="admin-glass-card">
                  <h3><FiTag /> Current Inventory</h3>
                  <div className="table-x-scroll">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th className="txt-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id}>
                            <td>
                              <div className="cell-product">
                                {p.image && (
                                  <img 
                                    src={`data:${p.image.contentType};base64,${arrayBufferToBase64(p.image.data.data)}`} 
                                    alt={p.name}
                                  />
                                )}
                                <strong>{p.name}</strong>
                              </div>
                            </td>
                            <td><span className="cat-badge">{p.category}</span></td>
                            <td>₦{p.price?.toLocaleString()}</td>
                            <td className="txt-right">
                              <div className="btn-group-right">
                                <button className="icon-btn edit" onClick={()=>{setEditingId(p._id); setFormData(p)}}>
                                  <FiEdit2 />
                                </button>
                                <button className="icon-btn delete" onClick={()=>handleDelete(p._id)}>
                                  <FiTrash2 />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Orders View Card */
              <motion.div 
                key="ord" 
                initial={{opacity:0, y:10}} 
                animate={{opacity:1, y:0}} 
                exit={{opacity:0, y:-10}} 
                className="admin-glass-card"
              >
                <h3><FiList /> Order Management</h3>
                <div className="table-x-scroll">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th className="txt-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o._id}>
                          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td>
                            <strong>{o.name}</strong><br/>
                            <small style={{color: 'var(--text-muted)'}}>{o.phone}</small>
                          </td>
                          <td>₦{o.total?.toLocaleString()}</td>
                          <td>
                            <span className={`status-pill ${o.status.toLowerCase()}`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="txt-right">
                            {o.status === 'Pending' ? (
                              <button className="confirm-order-btn" onClick={() => confirmPayment(o._id)}>
                                Confirm
                              </button>
                            ) : (
                              <FiCheckCircle className="paid-icon" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;