import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaRedo, FaHome, FaLock, FaStar } from 'react-icons/fa';

const BrowserContent = () => {
  const [url, setUrl] = useState('https://github.com/jorgik1');
  const [currentUrl, setCurrentUrl] = useState('https://github.com/jorgik1');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(['https://github.com/jorgik1']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const favorites = [
    { name: 'GitHub', url: 'https://github.com/jorgik1', color: 'bg-black' },
    { name: 'Portfolio', url: 'https://yuriy-stenin.com', color: 'bg-purple-600' },
    { name: 'Linkedin', url: 'https://linkedin.com/in/yuriy-stenin', color: 'bg-blue-600' },
    { name: 'React', url: 'https://react.dev', color: 'bg-blue-500' }
  ];

  const handleNavigate = (newUrl: string) => {
    setIsLoading(true);
    setCurrentUrl(newUrl);
    setUrl(newUrl);

    // Simple history management
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    // Simulate load time
    setTimeout(() => setIsLoading(false), 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = url;
    if (!target.startsWith('http')) {
      target = `https://${target}`;
    }
    handleNavigate(target);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const prevUrl = history[historyIndex - 1];
      setCurrentUrl(prevUrl);
      setUrl(prevUrl);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const nextUrl = history[historyIndex + 1];
      setCurrentUrl(nextUrl);
      setUrl(nextUrl);
    }
  };

  // Many sites block iframes (X-Frame-Options: DENY).
  // We can't easily proxy this in a static client-side app.
  // We'll show a friendly message if it's likely dragging.
  // const isEmbeddable = (link: string) => {
  //   return true; // We'll try, and show a "Open External" fallback if needed in UI
  // };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500">
           <button onClick={goBack} disabled={historyIndex === 0} className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-30"><FaArrowLeft /></button>
           <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-2 hover:bg-gray-200 rounded-full disabled:opacity-30"><FaArrowRight /></button>
           <button onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 800); }} className="p-2 hover:bg-gray-200 rounded-full"><FaRedo className={isLoading ? 'animate-spin' : ''} /></button>
           <button onClick={() => handleNavigate('home')} className="p-2 hover:bg-gray-200 rounded-full"><FaHome /></button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative flex items-center">
            <div className="absolute left-3 text-gray-400"><FaLock className="w-3 h-3" /></div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-gray-200/50 hover:bg-gray-200 focus:bg-white text-sm py-2 pl-9 pr-8 rounded-full border border-transparent focus:border-blue-400 outline-none transition-all"
            />
            <div className="absolute right-3 text-yellow-500 cursor-pointer"><FaStar /></div>
          </div>
        </form>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-600 overflow-x-auto">
        {favorites.map(fav => (
          <button
             key={fav.name}
             onClick={() => handleNavigate(fav.url)}
             className="flex items-center gap-2 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors whitespace-nowrap"
          >
             <div className={`w-4 h-4 rounded-full ${fav.color} flex items-center justify-center text-[8px] text-white`}>{fav.name[0]}</div>
             {fav.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 backdrop-blur-sm">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {currentUrl === 'home' ? (
           <div className="p-12 flex flex-col items-center">
              <h1 className="text-4xl font-bold text-gray-300 mb-8">Favorites</h1>
              <div className="grid grid-cols-4 gap-6">
                {favorites.map(fav => (
                  <div key={fav.name} onClick={() => handleNavigate(fav.url)} className="flex flex-col items-center gap-3 cursor-pointer group">
                     <div className={`w-16 h-16 rounded-2xl ${fav.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                        {fav.name[0]}
                     </div>
                     <span className="font-medium">{fav.name}</span>
                  </div>
                ))}
              </div>
           </div>
        ) : (
          <div className="w-full h-full flex flex-col">
             {/* Note: In a real app we'd need to handle X-Frame-Options. For this demo we'll assume some work or show a fallback.
                 GitHub usually blocks iframes. */}
             <iframe
               src={currentUrl}
               className="w-full h-full border-0"
               title="Browser View"
               onError={() => console.log("Cant load")}
             />

             {/* Overlay hint if it might fail */}
             <div className="absolute bottom-0 left-0 right-0 bg-yellow-50 p-2 text-center text-xs text-yellow-700 border-t border-yellow-200">
               ⚠️ Note: Many external sites (like GitHub) block being styled in an iframe.
               <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="underline ml-2 font-bold">Open in new tab</a>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserContent;
