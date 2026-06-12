// import React from 'react'; // <--- ADD THIS LINE
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // Import Context
// import { CartProvider } from './context/CartContext'; 

// // Layout Components
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// // Homepage Section Components
// import Hero from './components/Hero';
// import BrandStory from './components/BrandStory';
// import FeaturedProducts from './components/FeaturedProducts';
// import Benefits from './components/Benefits';
// import Testimonials from './components/Testimonials';

// // Pages
// import Shop from './pages/Shop';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart'; 
// import Checkout from './pages/Checkout';
// import About from './pages/About';
// import Contact from './pages/Contact';

// // New Admin Pages
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';

// // Home Page Layout
// const Home = () => {
//   return (
//     <>
//       <Hero />
//       <BrandStory />
//       <FeaturedProducts />
//       <Benefits />
//       <Testimonials /> 
//     </>
//   );
// };

// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <div className="app">
//           <Navbar />
          
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/shop" element={<Shop />} />
//             <Route path="/product/:id" element={<ProductDetails />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />

//             {/* Admin Routes */}
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           </Routes>

//           <Footer />
//         </div>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load your pages (Only downloads when needed)
const Home = lazy(() => import('./components/Hero').then(module => ({ default: () => (
  <>
    <module.default />
    <BrandStory />
    <FeaturedProducts />
    <Benefits />
    <Testimonials />
  </>
)})));

// Standard Imports for small components
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import FeaturedProducts from './components/FeaturedProducts';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';

// Lazy Load Pages
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// A luxury loader to show while the page is "Waking Up"
const LuxuryLoader = () => (
  <div style={{ height: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37', flexDirection: 'column' }}>
    <div className="spinner"></div>
    <p style={{ marginTop: '20px', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.7rem' }}>Preparing Ritual</p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          {/* Suspense handles the waiting time between pages */}
          <Suspense fallback={<LuxuryLoader />}>
            <Routes>
              <Route path="/" element={<><Hero /><BrandStory /><FeaturedProducts /><Benefits /><Testimonials /></>} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;