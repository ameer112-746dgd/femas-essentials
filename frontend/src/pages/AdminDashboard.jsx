// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, FiImage, FiTag, FiDollarSign } from 'react-icons/fi';
// import './AdminDashboard.css';
// import API from '../api'; 

// const AdminDashboard = () => {
//   const [products, setProducts] = useState([]);
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
//     else fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await API.get('/products');
//       setProducts(data);
//     } catch (err) { console.error("Fetch error:", err); }
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
//       if (editingId) {
//         await API.put(`/products/${editingId}`, data);
//       } else {
//         await API.post('/products', data);
//       }
//       setEditingId(null);
//       setImageFile(null);
//       setFormData({ name: '', price: '', category: '', description: '', ingredients: '', usage: '' });
//       fetchProducts();
//       alert("Inventory Updated");
//     } catch (err) { alert("Action failed"); }
//   };

//   const handleDelete = async (id) => {
//     if(window.confirm("Delete this product?")) {
//         try {
//             await API.delete(`/products/${id}`);
//             fetchProducts();
//         } catch (err) { console.error(err); }
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('isAdmin');
//     navigate('/');
//   };

//   if (loading) return <div className="admin-dark-loader"><div className="spinner"></div></div>;

//   return (
//     <div className="admin-dark-wrapper">
//       <div className="bg-glow"></div>
      
//       {/* Sidebar - Desktop Only */}
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
//             Inventory <span className="italic-gold">Management</span>
//           </motion.h1>
//           {/* Mobile Only Logout */}
//           <button onClick={handleLogout} className="mobile-logout-btn">
//              <FiLogOut />
//           </button>
//         </header>

//         <div className="admin-grid">
//           {/* EDITOR SECTION */}
//           <motion.div 
//             className="glass-card editor-section" 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="card-header-flex">
//                 <h3>{editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? 'Edit' : 'New'} Product</h3>
//             </div>
            
//             <form onSubmit={handleSubmit} className="admin-form">
//               <div className="input-group">
//                 <label><FiPackage /> Name</label>
//                 <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required placeholder="e.g. Femas Oil" />
//               </div>

//               <div className="input-group">
//                 <label><FiDollarSign /> Price (₦)</label>
//                 <input type="number" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required placeholder="7000" />
//               </div>

//               <div className="input-group">
//                 <label><FiTag /> Category</label>
//                 <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} required>
//                   <option value="">Select</option>
//                   {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                 </select>
//               </div>

//               <div className="input-group">
//                 <label><FiImage /> Image</label>
//                 <input type="file" className="file-input" onChange={(e)=>setImageFile(e.target.files[0])} required={!editingId} />
//               </div>

//               <div className="input-group full">
//                 <label>Description</label>
//                 <textarea rows="3" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} required placeholder="Product details..." />
//               </div>

//               <div className="form-actions">
//                 <button type="submit" className="btn-gold">
//                    {editingId ? 'Update' : 'Add to Inventory'}
//                 </button>
//                 {editingId && <button type="button" className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>}
//               </div>
//             </form>
//           </motion.div>

//           {/* INVENTORY TABLE */}
//           <motion.div 
//             className="glass-card table-section" 
//             initial={{ opacity: 0, y: 20 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ delay: 0.1 }}
//           >
//             <div className="table-responsive">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th className="hide-mobile">Category</th>
//                     <th>Price</th>
//                     <th className="txt-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <AnimatePresence mode='popLayout'>
//                     {products.map(p => (
//                       <motion.tr key={p._id} layout exit={{opacity: 0, x: -20}}>
//                         <td>
//                           <div className="td-product">
//                             {p.image && <img src={`data:${p.image.contentType};base64,${arrayBufferToBase64(p.image.data.data)}`} alt=""/>}
//                             <span className="p-name">{p.name}</span>
//                           </div>
//                         </td>
//                         <td className="hide-mobile">
//                            <span className="badge">{p.category}</span>
//                         </td>
//                         <td>₦{p.price.toLocaleString()}</td>
//                         <td className="txt-right">
//                           <div className="action-btns-flex">
//                             <button className="action-btn edit" onClick={()=>{setEditingId(p._id); setFormData(p)}}><FiEdit2 /></button>
//                             <button className="action-btn delete" onClick={()=>handleDelete(p._id)}><FiTrash2 /></button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </div>
//       </main>
//     </div>

    
//   );
// };
// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, FiImage, FiTag, FiDollarSign, FiList, FiCheckCircle } from 'react-icons/fi';
import './AdminDashboard.css';
import API from '../api'; 

const AdminDashboard = () => {
  const [view, setView] = useState('products'); // 'products' or 'orders'
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
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin-login');
    else {
      loadAllData();
    }
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const prodRes = await API.get('/products');
      const orderRes = await API.get('/orders');
      setProducts(prodRes.data);
      setOrders(orderRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
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
      if (editingId) await API.put(`/products/${editingId}`, data);
      else await API.post('/products', data);
      
      setEditingId(null);
      setImageFile(null);
      setFormData({ name: '', price: '', category: '', description: '' });
      loadAllData();
      alert("Inventory Updated");
    } catch (err) { alert("Save failed"); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this product?")) {
        try {
            await API.delete(`/products/${id}`);
            loadAllData();
        } catch (err) { console.error(err); }
    }
  }

  const confirmPayment = async (orderId) => {
    if (window.confirm("Confirm payment received? This sends an email to the customer.")) {
      try {
        await API.put(`/orders/${orderId}/confirm-payment`);
        loadAllData();
        alert("Payment Confirmed & Email Sent!");
      } catch (err) { alert("Failed to confirm"); }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  if (loading) return <div className="admin-dark-loader"><div className="spinner"></div></div>;

  return (
    <div className="admin-dark-wrapper">
      <div className="bg-glow"></div>
      
      {/* Sidebar - Desktop */}
      <nav className="admin-sidebar">
        <div className="brand">
          <h2>FEMAS <span>Portal</span></h2>
        </div>
        <button onClick={handleLogout} className="logout-pill">
          <FiLogOut /> Logout
        </button>
      </nav>

      <main className="admin-main">
        <header className="admin-header">
          <motion.h1 initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>
            Management <span className="italic-gold">Portal</span>
          </motion.h1>
          <button onClick={handleLogout} className="mobile-logout-btn"><FiLogOut /></button>
        </header>

        {/* Tab Switcher */}
        <div className="admin-tabs">
          <button className={view === 'products' ? 'active' : ''} onClick={() => setView('products')}>
            <FiPackage /> Inventory
          </button>
          <button className={view === 'orders' ? 'active' : ''} onClick={() => setView('orders')}>
            <FiList /> Orders ({orders.filter(o => o.status === 'Pending').length})
          </button>
        </div>

        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            {view === 'products' ? (
              <motion.div key="prod" initial={{opacity:0, x:-10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:10}} className="admin-grid">
                
                {/* Form */}
                <div className="glass-card editor-section">
                  <h3>{editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? 'Edit' : 'New'} Product</h3>
                  <form onSubmit={handleSubmit} className="admin-form">
                    <div className="input-group"><label><FiPackage /> Name</label>
                    <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required /></div>
                    <div className="input-group"><label><FiDollarSign /> Price</label>
                    <input type="number" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required /></div>
                    <div className="input-group"><label><FiTag /> Category</label>
                      <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} required>
                        <option value="">Select</option>
                        {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="input-group"><label><FiImage /> Image</label>
                    <input type="file" className="file-input" onChange={(e)=>setImageFile(e.target.files[0])} required={!editingId} /></div>
                    <div className="input-group full"><label>Description</label>
                    <textarea rows="3" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} required /></div>
                    <div className="form-actions">
                      <button type="submit" className="btn-gold">{editingId ? 'Update' : 'Add to Inventory'}</button>
                      {editingId && <button type="button" className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>}
                    </div>
                  </form>
                </div>

                {/* Inventory Table */}
                <div className="glass-card table-section">
                  <div className="table-responsive">
                    <table>
                      <thead><tr><th>Product</th><th className="hide-mobile">Category</th><th>Price</th><th className="txt-right">Actions</th></tr></thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id}>
                            <td><div className="td-product">{p.image && <img src={`data:${p.image.contentType};base64,${arrayBufferToBase64(p.image.data.data)}`} alt=""/>}<span>{p.name}</span></div></td>
                            <td className="hide-mobile"><span className="badge">{p.category}</span></td>
                            <td>₦{p.price.toLocaleString()}</td>
                            <td className="txt-right"><button className="action-btn edit" onClick={()=>{setEditingId(p._id); setFormData(p)}}><FiEdit2 /></button><button className="action-btn delete" onClick={()=>handleDelete(p._id)}><FiTrash2 /></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Orders View */
              <motion.div key="ord" initial={{opacity:0, x:10}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-10}} className="glass-card table-section full-width">
                <div className="table-responsive">
                  <table>
                    <thead><tr><th>Date</th><th>Customer</th><th>Total</th><th>Status</th><th className="txt-right">Action</th></tr></thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o._id}>
                          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td><strong>{o.name}</strong><br/><small style={{color: '#888'}}>{o.phone}</small></td>
                          <td>₦{o.total.toLocaleString()}</td>
                          <td><span className={`status-badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                          <td className="txt-right">
                            {o.status === 'Pending' ? (
                              <button className="confirm-pay-btn" onClick={() => confirmPayment(o._id)}><FiCheckCircle /> Confirm Payment</button>
                            ) : <FiCheckCircle style={{color: '#27ae60'}} />}
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