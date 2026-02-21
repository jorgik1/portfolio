import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { FaApple } from 'react-icons/fa';

interface MenuItem {
  label: string;
  action?: string;
  disabled?: boolean;
}

interface MenuBarProps {
  onAppOpen: (appId: string) => void;
}

const MenuBar = ({ onAppOpen }: MenuBarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const menuItems: Record<string, MenuItem[]> = {
    apple: [
      { label: 'About This Portfolio', action: 'about' },
      { label: 'System Settings...', action: 'settings' },
      { label: '---' },
      { label: 'Built with React + TypeScript', action: 'tech' },
      { label: 'Styled with Tailwind CSS', action: 'tech' },
      { label: 'Animated with Framer Motion', action: 'tech' },
      { label: '---' },
      { label: 'View on GitHub', action: 'github' },
    ],
    portfolio: [
      { label: 'About Me', action: 'about' },
      { label: 'My Projects', action: 'projects' },
      { label: 'Contact', action: 'contact' },
      { label: '---' },
      { label: 'Download CV', action: 'cv' },
    ],
    file: [
      { label: 'New Window', action: 'new' },
      { label: '---' },
      { label: 'Open GitHub', action: 'github' },
      { label: 'Open LinkedIn', action: 'linkedin' },
      { label: '---' },
      { label: 'Print Portfolio', action: 'print' },
    ],
    edit: [
      { label: 'Theme: Liquid macOS', disabled: true },
      { label: '---' },
      { label: 'Copy Email Address', action: 'copy-email' },
      { label: 'Copy GitHub Link', action: 'copy-github' },
    ],
    view: [
      { label: 'Show All Windows', action: 'show-all' },
      { label: 'Hide All Windows', action: 'hide-all' },
      { label: '---' },
      { label: 'Full Screen', action: 'fullscreen' },
      { label: '---' },
      { label: 'Tech Stack Info', action: 'tech-info' },
    ],
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleMenuItemClick = (action: string) => {
    setActiveMenu(null);

    switch(action) {
      case 'about':
        onAppOpen('about');
        break;
      case 'settings':
        onAppOpen('settings');
        break;
      case 'projects':
        onAppOpen('projects');
        break;
      case 'contact':
        onAppOpen('contact');
        break;
      case 'tech':
      case 'tech-info':
        onAppOpen('vscode');
        break;
      case 'github':
        window.open('https://github.com/jorgik1', '_blank', 'noopener,noreferrer');
        break;
      case 'linkedin':
        window.open('https://www.linkedin.com/in/yuriy-stenin/', '_blank', 'noopener,noreferrer');
        break;
      case 'cv':
        window.open('https://www.linkedin.com/in/yuriy-stenin/', '_blank', 'noopener,noreferrer');
        break;
      case 'copy-email':
        navigator.clipboard.writeText('yurii.stenin@gmail.com');
        break;
      case 'copy-github':
        navigator.clipboard.writeText('https://github.com/jorgik1');
        break;
      case 'print':
        window.print();
        break;
      case 'fullscreen':
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
        break;
      case 'show-all':
      case 'new':
        onAppOpen('about');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-2">
        <GlassCard className="px-4 py-2">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-1">
              {/* Apple Logo */}
              <button
                onClick={() => handleMenuClick('apple')}
                className={`hover:bg-white/10 px-3 py-1 rounded transition-colors relative ${
                  activeMenu === 'apple' ? 'bg-white/10' : ''
                }`}
              >
                <FaApple className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1 text-sm font-medium">
                <button
                  onClick={() => handleMenuClick('portfolio')}
                  className={`hover:bg-white/10 px-3 py-1 rounded transition-colors ${
                    activeMenu === 'portfolio' ? 'bg-white/10' : ''
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => handleMenuClick('file')}
                  className={`hover:bg-white/10 px-3 py-1 rounded transition-colors ${
                    activeMenu === 'file' ? 'bg-white/10' : ''
                  }`}
                >
                  File
                </button>
                <button
                  onClick={() => handleMenuClick('edit')}
                  className={`hover:bg-white/10 px-3 py-1 rounded transition-colors ${
                    activeMenu === 'edit' ? 'bg-white/10' : ''
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleMenuClick('view')}
                  className={`hover:bg-white/10 px-3 py-1 rounded transition-colors ${
                    activeMenu === 'view' ? 'bg-white/10' : ''
                  }`}
                >
                  View
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>{currentDate}</span>
              <span className="font-semibold">{currentTime}</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Dropdown Menus */}
      <AnimatePresence>
        {activeMenu && (
          <>
            {/* Backdrop to close menu when clicking outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setActiveMenu(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="fixed z-50"
              style={{
                top: '60px',
                left: activeMenu === 'apple' ? '20px' :
                      activeMenu === 'portfolio' ? '72px' :
                      activeMenu === 'file' ? '170px' :
                      activeMenu === 'edit' ? '220px' : '270px'
              }}
            >
              <GlassCard className="min-w-[220px] py-2">
                {menuItems[activeMenu as keyof typeof menuItems]?.map((item, index) => (
                  item.label === '---' ? (
                    <div key={index} className="h-px bg-white/20 my-1 mx-2" />
                  ) : (
                    <button
                      key={index}
                      onClick={() => !item.disabled && handleMenuItemClick(item.action || '')}
                      disabled={item.disabled}
                      className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors ${
                        item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </GlassCard>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuBar;
