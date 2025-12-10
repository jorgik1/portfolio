import { motion } from 'framer-motion';
import { FaFolderOpen, FaFilePdf, FaUserCircle } from 'react-icons/fa';
import { useRef } from 'react';

interface DesktopProps {
  onAppOpen: (appId: string) => void;
}

const Desktop = ({ onAppOpen }: DesktopProps) => {
  const constraintsRef = useRef(null);

  const icons = [
    {
      id: 'projects',
      label: 'Projects',
      icon: FaFolderOpen,
      color: 'text-blue-400',
      initialX: 20,
      initialY: 20
    },
    {
      id: 'about',
      label: 'About Me.txt',
      icon: FaUserCircle,
      color: 'text-gray-300',
      initialX: 20,
      initialY: 120
    },
    {
      id: 'resume',
      label: 'Resume.pdf',
      icon: FaFilePdf,
      color: 'text-red-400',
      initialX: 20,
      initialY: 220,
      action: () => window.open('/CV.pdf', '_blank')
    }
  ];

  return (
    <div ref={constraintsRef} className="absolute inset-0 pt-10 pb-24 overflow-hidden pointer-events-none">
      {/* Desktop area - Pointer events need to be auto for the icons */}

      {icons.map((item) => (
        <motion.div
          key={item.id}
          drag
          dragMomentum={false}
          dragConstraints={constraintsRef}
          initial={{ x: item.initialX, y: item.initialY }}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
          onDoubleClick={() => item.action ? item.action() : onAppOpen(item.id)}
          className="absolute w-24 flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer pointer-events-auto border border-transparent hover:border-white/20 transition-colors"
        >
          <div className={`text-5xl ${item.color} drop-shadow-lg`}>
            <item.icon />
          </div>
          <span className="text-white text-xs font-medium drop-shadow-md text-center px-1 rounded bg-black/20 backdrop-blur-[2px]">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Desktop;
