import React, { useRef } from 'react';
import HeroSection from '../components/sections/HeroSection';
import GallerySection from '../components/sections/GallerySection';
import ReviewsSection from '../components/sections/ReviewsSection';

const HomePage: React.FC = () => {
  const galleryRef = useRef<HTMLElement>(null);

  return (
    <main className="min-h-screen">
      <HeroSection nextSectionRef={galleryRef} />
      <GallerySection ref={galleryRef} />
      <ReviewsSection />
    </main>
  );
};

export default HomePage;