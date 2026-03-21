import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, X, Maximize2, Search, Info } from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-white/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/10">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">UNBLOCKED<span className="text-white">ARCADE</span></h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors hidden md:block">
              <Info className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800/20 to-zinc-900 border border-white/5 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Play the best web games, <span className="text-white">anywhere.</span></h2>
              <p className="text-zinc-400 text-lg mb-8">Fast, lightweight, and completely unblocked. No downloads required.</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setSelectedGame(games[0])}
                  className="bg-white hover:bg-zinc-200 text-black font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-white/10 active:scale-95"
                >
                  Play Featured
                </button>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {games.length} Games Available
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
              <img 
                src="https://picsum.photos/seed/arcade/800/600" 
                alt="Arcade Background" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Game Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              layoutId={game.id}
              onClick={() => setSelectedGame(game)}
              className="group cursor-pointer bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/50 transition-all hover:shadow-2xl hover:shadow-white/5"
              whileHover={{ y: -4 }}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                    <Gamepad2 className="text-black w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">{game.title}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2">{game.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">No games found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              layoutId={selectedGame.id}
              className={`bg-zinc-900 w-full max-w-6xl rounded-3xl overflow-hidden border border-white/10 flex flex-col ${isFullScreen ? 'h-full max-w-none rounded-none border-none' : 'max-h-[90vh]'}`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <Gamepad2 className="text-black w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                    title="Toggle Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedGame(null);
                      setIsFullScreen(false);
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-zinc-400 hover:text-red-500"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; full-screen"
                />
              </div>

              {/* Modal Footer */}
              {!isFullScreen && (
                <div className="px-6 py-4 bg-zinc-900/50 flex items-center justify-between">
                  <p className="text-zinc-500 text-sm italic">Note: Some games may require a keyboard to play.</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/5">HTML5</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/5">Unblocked</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-white w-6 h-6" />
            <span className="font-bold tracking-tight">UNBLOCKED ARCADE</span>
          </div>
          <div className="flex gap-8 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-zinc-600 text-sm">© 2026 Unblocked Arcade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
