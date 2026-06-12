import React from 'react';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import FeaturedProducts from '../components/FeaturedProducts';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';

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

export default Home;