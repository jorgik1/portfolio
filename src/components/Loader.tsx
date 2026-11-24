import { motion } from 'framer-motion';
import { FaApple } from 'react-icons/fa';
import { useEffect } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
}

// Short boot screen: logo and one bar. Nothing loads here, so it stays under a second.
const BOOT_MS = 900;

const Loader = ({ onLoadComplete }: LoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(onLoadComplete, BOOT_MS);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-10 bg-black"
      role="status"
      aria-label="Loading"
    >
      <FaApple className="w-20 h-20 text-white" />
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: BOOT_MS / 1000, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
