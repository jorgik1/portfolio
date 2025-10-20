import { useEffect } from 'react';

export const usePreventOverflow = () => {
  useEffect(() => {
    // Prevent body scrolling when the app is mounted
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      // Restore scrolling when unmounted
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);
};
