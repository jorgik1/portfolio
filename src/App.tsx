import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import Window from './components/Window';
import Loader from './components/Loader';
import { usePreventOverflow } from './hooks/usePreventOverflow';

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  usePreventOverflow();

  const handleLoadComplete = () => {
    setIsLoading(false);
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
            className="h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative"
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

            <MenuBar />
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
