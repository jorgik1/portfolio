import { useSettings } from '../../context/SettingsContext';
import { FaMoon, FaDesktop, FaVolumeUp, FaVolumeMute, FaImage } from 'react-icons/fa';

const SettingsContent = () => {
  const { theme, setTheme, wallpaper, setWallpaper, soundEnabled, setSoundEnabled } = useSettings();

  const wallpapers = [
    { id: 'default', name: 'macOS Dynamic', color: 'bg-gradient-to-br from-purple-500 to-blue-500' },
    { id: 'nature', name: 'Nature', color: 'bg-gradient-to-br from-green-500 to-teal-700' },
    { id: 'abstract', name: 'Abstract', color: 'bg-gradient-to-br from-orange-500 to-red-600' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 text-gray-800">
      {/* Header */}
      <div className="px-6 py-8 flex flex-col items-center border-b border-gray-200 bg-white">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-3xl text-gray-500 mb-3 shadow-inner">
          <FaDesktop />
        </div>
        <h1 className="text-xl font-semibold">System Settings</h1>
        <p className="text-sm text-gray-500">Yuriy Stenin • MacBook Pro</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* Appearance Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 font-medium">
            <FaMoon className="text-purple-500" /> Appearance
          </div>
          <div className="p-4 flex gap-4 justify-center">
            {['light', 'dark', 'auto'].map((t) => (
              <div
                key={t}
                onClick={() => setTheme(t as 'light' | 'dark' | 'auto')}
                className={`
                  flex flex-col items-center gap-2 cursor-pointer group
                `}
              >
                <div className={`
                  w-20 h-14 rounded-lg border-2 shadow-sm transition-all
                  ${t === 'light' ? 'bg-gray-100' : t === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-800'}
                  ${theme === t ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 group-hover:border-gray-300'}
                `} />
                <span className="text-xs font-medium capitalize">{t}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Wallpaper Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 font-medium">
            <FaImage className="text-blue-500" /> Wallpaper
          </div>
          <div className="p-4 grid grid-cols-3 gap-4">
            {wallpapers.map((wp) => (
              <div
                key={wp.id}
                onClick={() => setWallpaper(wp.id as any)}
                className={`cursor-pointer group`}
              >
                <div className={`
                  h-16 rounded-lg shadow-sm transition-all mb-2
                  ${wp.color}
                  ${wallpaper === wp.id ? 'ring-2 ring-offset-2 ring-blue-500' : 'group-hover:opacity-90'}
                `} />
                <div className="text-xs text-center font-medium text-gray-600">{wp.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sound Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 font-medium">
            <FaVolumeUp className="text-red-500" /> Sound & Notifications
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               {soundEnabled ? <FaVolumeUp className="text-gray-500" /> : <FaVolumeMute className="text-gray-400" />}
               <span className="text-sm">Play startup sound</span>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`
                w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out relative
                ${soundEnabled ? 'bg-green-500' : 'bg-gray-300'}
              `}
            >
              <div className={`
                w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200
                ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}
              `} />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SettingsContent;
