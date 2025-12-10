import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'auto' | 'light' | 'dark';
type Wallpaper = 'ventura' | 'monterey' | 'bigsur' | 'sonoma' | 'default';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  wallpaper: Wallpaper;
  setWallpaper: (wallpaper: Wallpaper) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  // Computed values
  isDarkMode: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  // Load from localStorage or default
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'auto'
  );
  const [wallpaper, setWallpaper] = useState<Wallpaper>(() => {
    const saved = localStorage.getItem('wallpaper') as Wallpaper;
    // Validate that the saved wallpaper is a valid option, otherwise default
    const validWallpapers: Wallpaper[] = ['ventura', 'monterey', 'bigsur', 'sonoma', 'default'];
    return validWallpapers.includes(saved) ? saved : 'ventura';
  });
  const [soundEnabled, setSoundEnabled] = useState(() =>
    localStorage.getItem('soundEnabled') !== 'false'
  );

  // Computed state for Auto mode
  const [timeBasedDark, setTimeBasedDark] = useState(false);

  useEffect(() => {
    // Check time for 'auto' mode
    const checkTime = () => {
      const hour = new Date().getHours();
      setTimeBasedDark(hour < 6 || hour >= 18);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Persist to localStorage
  useEffect(() => localStorage.setItem('theme', theme), [theme]);
  useEffect(() => localStorage.setItem('wallpaper', wallpaper), [wallpaper]);
  useEffect(() => localStorage.setItem('soundEnabled', soundEnabled.toString()), [soundEnabled]);

  const isDarkMode = theme === 'auto' ? timeBasedDark : theme === 'dark';

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <SettingsContext.Provider
      value={{
        theme, setTheme,
        wallpaper, setWallpaper,
        soundEnabled, setSoundEnabled,
        isDarkMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
