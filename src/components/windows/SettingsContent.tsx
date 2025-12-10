import { useState } from 'react';
import { useSettings } from '../../context/SettingsContext';
import { FaDesktop, FaImage, FaVolumeUp, FaMoon, FaSun, FaAdjust } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsContent = () => {
  const { theme, setTheme, wallpaper, setWallpaper, soundEnabled, setSoundEnabled, isDarkMode } = useSettings();
  const [activeTab, setActiveTab] = useState<'appearance' | 'wallpaper' | 'sound'>('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: FaDesktop, color: 'bg-blue-500' },
    { id: 'wallpaper', label: 'Wallpaper', icon: FaImage, color: 'bg-pink-500' },
    { id: 'sound', label: 'Sound', icon: FaVolumeUp, color: 'bg-green-500' },
  ] as const;

  const wallpapers = [
    { id: 'ventura', name: 'Ventura', color: '#F58628' },
    { id: 'monterey', name: 'Monterey', color: '#C029F6' },
    { id: 'bigsur', name: 'Big Sur', color: '#1B5EBE' },
    { id: 'sonoma', name: 'Sonoma', color: '#4BA1C6' },
  ] as const;

  return (
    <div className={`flex h-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`w-48 flex-shrink-0 border-r ${isDarkMode ? 'border-white/10 bg-black/20' : 'border-gray-200 bg-white/40'} backdrop-blur-md pt-4 px-2`}>
        <div className="mb-6 px-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 mb-2 overflow-hidden mx-auto shadow-sm">
             <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xl">
               
             </div>
          </div>
          <h2 className="text-sm font-semibold text-center mb-0.5">System Settings</h2>
          <p className={`text-[10px] text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>MacBook Pro</p>
        </div>

        <nav className="space-y-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                ${activeTab === tab.id
                  ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white shadow-sm')
                  : (isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5')}
              `}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] text-white ${tab.color}`}>
                <tab.icon />
              </div>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className={`flex-1 p-8 overflow-y-auto ${isDarkMode ? 'bg-black/10' : 'bg-[#f5f5f7]/50'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            {activeTab === 'appearance' && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Appearance</h3>

                <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <label className="text-sm font-medium mb-4 block">Window Appearance</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'light', label: 'Light', icon: FaSun },
                      { id: 'dark', label: 'Dark', icon: FaMoon },
                      { id: 'auto', label: 'Auto', icon: FaAdjust },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setTheme(mode.id as any)}
                        className={`flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all
                          ${theme === mode.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : (isDarkMode ? 'border-transparent hover:bg-white/5' : 'border-transparent hover:bg-black/5')}
                        `}
                      >
                         <div className={`w-12 h-8 rounded border shadow-sm ${mode.id === 'dark' ? 'bg-gray-800' : mode.id === 'light' ? 'bg-white' : 'bg-gradient-to-r from-white to-gray-800'}`}></div>
                         <span className="text-xs font-medium">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'wallpaper' && (
              <section className="space-y-6">
                 <h3 className="text-xl font-semibold mb-6">Wallpaper</h3>
                 <div className="grid grid-cols-2 gap-4">
                   {wallpapers.map((wp) => (
                     <button
                       key={wp.id}
                       onClick={() => setWallpaper(wp.id as any)}
                       className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all
                         ${wallpaper === wp.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-transparent'}
                       `}
                     >
                       <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: wp.color }}>
                         <img
                           src={
                             wp.id === 'ventura' ? 'https://4kwallpapers.com/images/wallpapers/macos-ventura-light-5k-retina-stock-graphics-gradient-orange-3840x2160-8041.jpg' :
                             wp.id === 'monterey' ? 'https://4kwallpapers.com/images/wallpapers/macos-monterey-stock-purple-dark-mode-layers-5k-4480x2520-5889.jpg' :
                             wp.id === 'bigsur' ? 'https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-wwdc-2020-5k-5120x2880-1455.jpg' :
                             'https://4kwallpapers.com/images/wallpapers/macos-sonoma-light-blue-orange-stock-4k-8k-3840x2160-9118.jpg'
                           }
                           alt={wp.name}
                           className="w-full h-full object-cover"
                         />
                       </div>
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                       <span className="absolute bottom-2 left-2 text-xs font-medium text-white drop-shadow-md bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                         {wp.name}
                       </span>
                     </button>
                   ))}
                 </div>
              </section>
            )}

            {activeTab === 'sound' && (
              <section className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">Sound</h3>
                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                      <FaVolumeUp />
                    </div>
                    <div>
                      <div className="font-medium">Play user interface sound effects</div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Play sound on startup and errors</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-7 rounded-full transition-colors relative ${soundEnabled ? 'bg-blue-500' : 'bg-gray-400/50'}`}
                  >
                    <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${soundEnabled ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsContent;
