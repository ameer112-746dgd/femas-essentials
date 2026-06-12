import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiPackage, FiImage, FiTag, FiDollarSign } from 'react-icons/fi';
import './AdminDashboard.css';
import API from '../api'; 

const { data } = await API.get('/products');

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', price: '', category: '', description: '', ingredients: '', usage: '' 
  });

  const categoryOptions = ['Oil', 'Treatment', 'Luxury Butter'];
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin-login');
    else fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/products');
      setProducts(data);
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
      if (editingId) {
        await axios.put(`http://localhost:5001/api/products/${editingId}`, data);
      } else {
        await axios.post('http://localhost:5001/api/products', data);
      }
      setEditingId(null);
      setImageFile(null);
      setFormData({ name: '', price: '', category: '', description: '', ingredients: '', usage: '' });
      fetchProducts();
    } catch (err) { alert("Action failed"); }
  };

  if (loading) return <div className="admin-dark-loader"><div className="spinner"></div></div>;

  return (
    <div className="admin-dark-wrapper">
      <div className="bg-glow"></div>

      <nav className="admin-sidebar">
        <div className="brand">
          <h2>FEMAS <span>Portal</span></h2>
        </div>
        <div className="nav-info">
          <button onClick={() => {localStorage.removeItem('isAdmin'); navigate('/');}} className="logout-pill">
            <FiLogOut /> Logout
          </button>
        </div>
      </nav>

      <main className="admin-main">
        <header className="admin-header">
          <motion.h1 initial={{x:-20, opacity:0}} animate={{x:0, opacity:1}}>
            Admin <span className="italic-gold">Dashboard</span>
          </motion.h1>
        </header>

        <div className="admin-grid">
          {/* EDITOR SECTION */}
          <motion.div 
            className="glass-card editor-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>{editingId ? <FiEdit2 /> : <FiPlus />} {editingId ? 'Edit Product' : 'New Product'}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="input-group">
                <label><FiPackage /> Product Name</label>
                <input type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required placeholder="Enter name..." />
              </div>
              
              <div className="input-group">
                <label><FiDollarSign /> Price (₦)</label>
                <input type="number" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required placeholder="0.00" />
              </div>

              <div className="input-group">
                <label><FiTag /> Category</label>
                <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} required>
                  <option value="">Select Category</option>
                  {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>

              <div className="input-group">
                <label><FiImage /> Product Image</label>
                <input type="file" className="file-input" onChange={(e)=>setImageFile(e.target.files[0])} required={!editingId} />
              </div>

              <div className="input-group full">
                <label>Description</label>
                <textarea rows="3" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} required />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-gold">
                  {editingId ? 'Update Product' : 'Add to Inventory'}
                </button>
                {editingId && <button type="button" className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>}
              </div>
            </form>
          </motion.div>

          {/* INVENTORY TABLE */}
          <motion.div 
            className="glass-card table-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th className="txt-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {products.map(p => (
                      <motion.tr key={p._id} layout exit={{opacity: 0, x: -20}}>
                        <td>
                          <div className="td-product">
                            {p.image && <img src={`data:${p.image.contentType};base64,${arrayBufferToBase64(p.image.data.data)}`} alt=""/>}
                            <span>{p.name}</span>
                          </div>
                        </td>
                        <td><span className="badge">{p.category}</span></td>
                        <td>₦{p.price.toLocaleString()}</td>
                        <td className="txt-right">
                          <button className="action-btn edit" onClick={()=>{setEditingId(p._id); setFormData(p)}}><FiEdit2 /></button>
                          <button className="action-btn delete" onClick={()=>{
                            if(window.confirm("Delete?")) axios.delete(`http://localhost:5001/api/products/${p._id}`).then(fetchProducts);
                          }}><FiTrash2 /></button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;