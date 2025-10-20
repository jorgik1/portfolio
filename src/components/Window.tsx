import { motion } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from './GlassCard';
import AboutContent from './windows/AboutContent';
import ProjectsContent from './windows/ProjectsContent';
import ContactContent from './windows/ContactContent';

interface WindowProps {
  appId: string;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
}

const Window = ({ appId, isActive, onClose, onFocus }: WindowProps) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const windowContent: Record<string, JSX.Element> = {
    about: <AboutContent />,
    projects: <ProjectsContent />,
    contact: <ContactContent />,
  };

  const windowTitles: Record<string, string> = {
    about: 'About Me',
    projects: 'My Projects',
    contact: 'Get in Touch',
  };

  // Handle minimize with genie effect
  const handleMinimize = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      // In a full implementation, this would hide the window
      alert('💡 Window minimized! Click the dock icon to restore.');
      setIsMinimizing(false);
    }, 600);
  };

  // Handle maximize with smooth animation
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <motion.div
      drag={!isMaximized && !isMinimizing}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={{
        top: 40,
        left: 0,
        right: 0,
        bottom: 100,
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      // Opening animation - Scale up from dock with spring physics
      initial={{ 
        scale: 0.3, 
        opacity: 0, 
        x: '-50%', 
        y: '100vh',
      }}
      animate={{ 
        scale: isMinimizing ? 0.1 : (isDragging ? 1.02 : 1),
        opacity: isMinimizing ? 0 : 1,
        width: isMaximized ? '100vw' : '800px',
        height: isMaximized ? 'calc(100vh - 140px)' : '600px',
        x: isMaximized ? 0 : (isMinimizing ? '-50%' : '-50%'),
        y: isMaximized ? '40px' : (isMinimizing ? '100vh' : '-50%'),
        top: isMaximized ? 0 : '50%',
        left: isMaximized ? 0 : '50%',
        rotateX: isDragging ? 2 : 0,
      }}
      // Closing animation - Scale down and fade
      exit={{ 
        scale: 0.8, 
        opacity: 0,
        y: 50,
        transition: { duration: 0.2, ease: 'easeIn' }
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className="fixed"
      style={{ 
        zIndex: isActive ? 40 : 30,
        transformStyle: 'preserve-3d',
      }}
      onClick={onFocus}
      whileHover={!isDragging ? { 
        scale: isMaximized ? 1 : 1.01,
        transition: { duration: 0.2 }
      } : {}}
    >
      <GlassCard className="w-full h-full flex flex-col overflow-hidden">
        {/* Title Bar */}
        <motion.div 
          className="flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-move"
          animate={{
            backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
          }}
        >
          <div className="flex items-center gap-2">
            {/* macOS Traffic Lights with hover effects */}
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 relative group"
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* X icon on hover */}
              <span className="absolute inset-0 flex items-center justify-center text-red-900 text-[8px] opacity-0 group-hover:opacity-100 font-bold">
                ×
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 relative group"
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Minus icon on hover */}
              <span className="absolute inset-0 flex items-center justify-center text-yellow-900 text-[8px] opacity-0 group-hover:opacity-100 font-bold">
                −
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 relative group"
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Plus/Arrows icon on hover */}
              <span className="absolute inset-0 flex items-center justify-center text-green-900 text-[8px] opacity-0 group-hover:opacity-100 font-bold">
                {isMaximized ? '⇙' : '⇗'}
              </span>
            </motion.button>
          </div>
          <motion.h2 
            className="text-white font-medium absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
            animate={{
              opacity: isDragging ? 0.7 : 1
            }}
          >
            {windowTitles[appId] || 'Window'}
          </motion.h2>
        </motion.div>

        {/* Content */}
        <motion.div 
          className="flex-1 overflow-y-auto p-6 custom-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {windowContent[appId] || <div className="text-white">Content not found</div>}
        </motion.div>
      </GlassCard>

      {/* Shadow effect that grows when dragging */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: -1,
        }}
        animate={{
          boxShadow: isDragging 
            ? '0 35px 60px -15px rgba(0, 0, 0, 0.4)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      />
    </motion.div>
  );
};

export default Window;
