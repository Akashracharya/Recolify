import React from 'react';
import { Settings, Clock, User } from 'lucide-react';
import PixelFrame from '../components/PixelFrame';
import PixelPressableButton from '../components/PixelPressableButton';


export default function Navbar({ setCurrentView, setShowTimerModal, timeLeft, formatTime }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('home')}
          >
            RECOLIFY
          </div>
          
          
            <PixelPressableButton
            onClick={() => setShowTimerModal(true)}
            className="w-[27vw] h-12"
          >
            
            <span className="text-xl font-bold ">
              {timeLeft ? (timeLeft < 3600000 ? ' ' + formatTime(timeLeft) : formatTime(timeLeft)) : 'Set Exam Timer'}
            </span>
          </PixelPressableButton>
         
          
          <div className="flex items-center space-x-4">
            <User className="w-6 h-6 hover:text-cyan-400 cursor-pointer transition-colors" />
            <Settings className="w-6 h-6 hover:text-cyan-400 cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}