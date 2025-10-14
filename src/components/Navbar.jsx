// components/Navbar.js
import React from 'react';

const Navbar = ({ onTimerClick, examDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (examDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(examDate).getTime() - now;
        
        if (distance < 0) {
          setTimeLeft('EXAM TIME!');
          return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examDate]);

  return (
    <nav className="fixed top-0 w-full bg-gray-800 border-b-2 border-cyan-400 z-50 pixel-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg pixel-corners"></div>
          <h1 className="text-xl font-bold text-cyan-400 neon-text retro-font">
            LastMinute.ai
          </h1>
        </div>

        {/* Timer Button */}
        <button
          onClick={onTimerClick}
          className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 game-button ${
            timeLeft && parseInt(timeLeft) < 60 ? 'animate-pulse bg-red-500' : 'bg-purple-600'
          }`}
        >
          ⏰ {examDate ? timeLeft : 'Set Exam Timer'}
        </button>

        {/* Profile Icon */}
        <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors pixel-corners">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded pixel-corners"></div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;