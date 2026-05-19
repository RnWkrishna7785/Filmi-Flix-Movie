import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant', // instant scroll to avoid conflicts with smooth scroll libraries
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
