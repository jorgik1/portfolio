import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaUser, FaTerminal, FaChartBar, FaSafari, FaCog } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { portfolioConfig } from '../data/portfolio';

interface DockProps {
  onAppOpen: (appId: string) => void;
  openWindows: string[];
}

const Dock = ({ onAppOpen, openWindows }: DockProps) => {
  const apps = [
    { id: 'about', icon: FaUser, label: 'About Me', color: '#3b82f6' },
    { id: 'projects', icon: FaCode, label: 'Projects', color: '#8b5cf6' },
    { id: 'vscode', icon: VscCode, label: 'Skills', color: '#23a9f2' },
    { id: 'terminal', icon: FaTerminal, label: 'Terminal', color: '#10b981' },
    { id: 'browser', icon: FaSafari, label: 'Safari', color: '#2563eb' },
    { id: 'settings', icon: FaCog, label: 'Settings', color: '#6b7280' },
    { id: 'github', icon: FaChartBar, label: 'GitHub Stats', color: '#f59e0b' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact', color: '#ef4444' },
    { id: 'github-link', icon: FaGithub, label: 'GitHub', color: '#333333', link: portfolioConfig.personal.github },
    { id: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', color: '#0077b5', link: portfolioConfig.personal.linkedin },
  ];

  const handleAppClick = (app: typeof apps[0]) => {
    if (app.link) {
      window.open(app.link, '_blank', 'noopener,noreferrer');
    } else {
      onAppOpen(app.id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-[calc(100vw-16px)]">
      <GlassCard className="px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-end gap-2 max-sm:overflow-x-auto">
          {apps.map((app) => (
            <motion.button
              key={app.id}
              className="relative group shrink-0"
              whileHover={{ y: -12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => handleAppClick(app)}
              aria-label={app.label}
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
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center
                           shadow-lg cursor-pointer"
                style={{ backgroundColor: app.color }}
                whileHover={{
                  boxShadow: `0 10px 30px ${app.color}50`,
                }}
              >
                <app.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              {/* Active indicator — only shown when window is open */}
              {!app.link && openWindows.includes(app.id) && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                             w-1 h-1 bg-white/60 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Dock;
