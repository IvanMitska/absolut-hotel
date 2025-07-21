import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-white overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-teal-600 focus:text-white focus:rounded-md">
        Перейти к основному контенту
      </a>
      <div className="fixed top-0 left-0 right-0 h-20 bg-white z-40" />
      <Header />
      <main id="main-content" className="flex-1 mt-20 bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 