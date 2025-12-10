import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      ventura: 'url("https://512pixels.net/downloads/macos-wallpapers-6k/13-macos-ventura-light.jpg")',
      monterey: 'url("https://512pixels.net/downloads/macos-wallpapers-6k/12-macos-monterey-light.jpg")',
      bigsur: 'url("https://512pixels.net/downloads/macos-wallpapers-6k/11-big-sur-light.jpg")',
      sonoma: 'url("https://4kwallpapers.com/images/wallpapers/macos-sonoma-stock-5k-6016x3384-11666.jpg")',
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
    <>
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
            {/* Animated background blur circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"
                animate={{
                  x: [0, 100, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ top: '10%', left: '20%' }}
              />
              <motion.div
                className="absolute w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"
                animate={{
                  x: [0, -100, 0],
                  y: [0, -50, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ bottom: '10%', right: '20%' }}
              />
              <motion.div
                className="absolute w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-15"
                animate={{
                  x: [0, -50, 0],
                  y: [0, 100, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ top: '40%', right: '30%' }}
              />
            </div>

            <MenuBar onAppOpen={handleAppOpen} />
            <Desktop onAppOpen={handleAppOpen} />

            {/* Render open windows */}
            {openWindows.map((appId) => (
              <Window
                key={appId}
                appId={appId}
                isActive={activeWindow === appId}
                onClose={() => handleWindowClose(appId)}
                onFocus={() => setActiveWindow(appId)}
              />
            ))}

            <Dock onAppOpen={handleAppOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
