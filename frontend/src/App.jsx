import React from 'react'; // <--- ADD THIS LINE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Context
import { CartProvider } from './context/CartContext'; 

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Homepage Section Components
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import FeaturedProducts from './components/FeaturedProducts';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';

// Pages
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart'; 
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';

// New Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Home Page Layout
const Home = () => {
  return (
    <>
      <Hero />
      <BrandStory />
      <FeaturedProducts />
      <Benefits />
      <Testimonials /> 
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;