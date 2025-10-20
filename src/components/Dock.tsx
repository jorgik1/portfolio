import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { FaGithub, FaLinkedin, FaFolder, FaEnvelope, FaCode, FaUser } from 'react-icons/fa';

interface DockProps {
  onAppOpen: (appId: string) => void;
}

const Dock = ({ onAppOpen }: DockProps) => {
  const apps = [
    { id: 'about', icon: FaUser, label: 'About Me', color: '#3b82f6' },
    { id: 'projects', icon: FaCode, label: 'Projects', color: '#8b5cf6' },
    { id: 'github', icon: FaGithub, label: 'GitHub', color: '#333333', link: 'https://github.com/jorgik1' },
    { id: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', color: '#0077b5', link: 'https://www.linkedin.com/in/yuriy-stenin/' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact', color: '#ef4444' },
  ];

  const handleAppClick = (app: typeof apps[0]) => {
    if (app.link) {
      window.open(app.link, '_blank', 'noopener,noreferrer');
    } else {
      onAppOpen(app.id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <GlassCard className="px-4 py-3">
        <div className="flex items-end gap-2">
          {apps.map((app, index) => (
            <motion.button
              key={app.id}
              className="relative group"
              whileHover={{ y: -12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => handleAppClick(app)}
            >
              {/* Tooltip */}
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                           bg-gray-900/90 text-white text-xs px-3 py-1 rounded-lg
                           whitespace-nowrap opacity-0 group-hover:opacity-100
                           pointer-events-none transition-opacity z-10"
              >
                {app.label}
              </motion.div>

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center
                           shadow-lg cursor-pointer"
                style={{ backgroundColor: app.color }}
                whileHover={{
                  boxShadow: `0 10px 30px ${app.color}50`,
                }}
              >
                <app.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Active indicator */}
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                           w-1 h-1 bg-white/60 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dock;
