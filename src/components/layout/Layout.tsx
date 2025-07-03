import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-white overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 h-20 bg-white z-40" />
      <Header />
      <main className="flex-1 mt-20 bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 