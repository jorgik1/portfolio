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

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        top: 40,
        left: 0,
        right: 0,
        bottom: 100,
      }}
      initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? '100vw' : '800px',
        height: isMaximized ? 'calc(100vh - 140px)' : '600px',
        x: isMaximized ? 0 : '-50%',
        y: isMaximized ? '40px' : '-50%',
        top: isMaximized ? 0 : '50%',
        left: isMaximized ? 0 : '50%',
      }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed"
      style={{ zIndex: isActive ? 40 : 30 }}
      onClick={onFocus}
    >
      <GlassCard className="w-full h-full flex flex-col overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-move">
          <div className="flex items-center gap-2">
            {/* macOS Traffic Lights */}
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
            />
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Minimize logic (could set window to hidden state)
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"
            />
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized(!isMaximized);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"
            />
          </div>
          <h2 className="text-white font-medium absolute left-1/2 transform -translate-x-1/2 pointer-events-none">
            {windowTitles[appId] || 'Window'}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {windowContent[appId] || <div className="text-white">Content not found</div>}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default Window;
