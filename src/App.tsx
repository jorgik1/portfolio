import { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import Window from './components/Window';
import Loader from './components/Loader';
import { usePreventOverflow } from './hooks/usePreventOverflow';
import { useSettings } from './context/SettingsContext';

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { isDarkMode, wallpaper } = useSettings();

  usePreventOverflow();

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const getBackgroundStyle = () => {
    const wallpapers: Record<string, string> = {
      ventura: 'url("https://512pixels.net/wp-content/uploads/2025/08/26-Tahoe-Beach-Dawn-thumb.jpeg")',
      monterey: 'url("https://512pixels.net/wp-content/uploads/2025/08/26-Tahoe-Beach-Dusk-thumb.jpeg")',
      bigsur: 'url("https://512pixels.net/wp-content/uploads/2025/06/15-Sequoia-Dark-thumbnail.jpg")',
      sonoma: 'url("https://512pixels.net/wp-content/uploads/2025/06/14-Sonoma-Horizon-thumb.jpeg")',
      default: 'url("https://512pixels.net/wp-content/uploads/2025/06/13-Ventura-Dark-thumb.jpg")',
    };

    if (wallpapers[wallpaper]) {
      return { backgroundImage: wallpapers[wallpaper] };
    }

    // Default to a fallback if nothing matches (or initially)
    return isDarkMode
      ? { backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #1e40af, #4c1d95)' }
      : { backgroundImage: 'linear-gradient(to bottom right, #60a5fa, #93c5fd, #bfdbfe)' };
  };

  const handleAppOpen = (appId: string) => {
    if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
    }
    setActiveWindow(appId);
  };

  const handleWindowClose = (appId: string) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
    if (activeWindow === appId) {
      setActiveWindow(openWindows[openWindows.length - 2] || null);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Toaster position="top-center" theme={isDarkMode ? 'dark' : 'light'} />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onLoadComplete={handleLoadComplete} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen overflow-hidden relative bg-cover bg-center transition-all duration-1000"
            style={getBackgroundStyle()}
          >
            {/* Subtle overlay to improve glass card contrast against wallpapers */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <MenuBar onAppOpen={handleAppOpen} />
            <Desktop onAppOpen={handleAppOpen} />

            {/* Render open windows */}
            {openWindows.map((appId, index) => (
              <Window
                key={appId}
                appId={appId}
                isActive={activeWindow === appId}
                onClose={() => handleWindowClose(appId)}
                onFocus={() => setActiveWindow(appId)}
                offsetIndex={index}
              />
            ))}

            <Dock onAppOpen={handleAppOpen} openWindows={openWindows} />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
