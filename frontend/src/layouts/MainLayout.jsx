import React, { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import Footer from '../components/common/Footer';
import ScrollToTop from '../components/common/ScrollToTop';
import TrailerModal from '../components/common/TrailerModal';
import { MovieContext } from '../context/MovieContext';
import Lenis from 'lenis';

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isTrailerOpen, trailerUrl, closeTrailer } = useContext(MovieContext);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-brandDark text-gray-100 flex flex-col relative overflow-hidden">
      
      {/* Background curated red-radial ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-glass-radial pointer-events-none z-0"></div>

      <ScrollToTop />

      <Navbar onToggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Page Area */}
      <main className="flex-grow pt-24 z-10 relative">
        <Outlet />
      </main>

      <Footer />

      {/* Global Iframe Trailer overlay player */}
      <TrailerModal isOpen={isTrailerOpen} onClose={closeTrailer} url={trailerUrl} />

    </div>
  );
};

export default MainLayout;
