// src/components/Navbar.jsx
import React from 'react';
import { Settings, User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import PixelPressableButton from '../components/PixelPressableButton';

export default function Navbar({ setCurrentView, setShowTimerModal, timeLeft, formatTime }) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

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
            className="w-[39vw] h-12 md:w-[15vw]"
          >
            <span className="md:text-xl cursor-pointer text-sm font-bold ">
              {timeLeft ? (timeLeft < 3600000 ? ' ' + formatTime(timeLeft) : formatTime(timeLeft)) : 'Set Exam Timer'}
            </span>
          </PixelPressableButton>

          <div className="flex items-center space-x-4">
            {!isAuthenticated && (
              <>
                <PixelPressableButton onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
                  Sign Up
                </PixelPressableButton>
                <PixelPressableButton onClick={() => loginWithRedirect()}>
                  Log In
                </PixelPressableButton>
              </>
            )}
            {isAuthenticated && (
              <>
                <User className="w-6 h-6 hover:text-cyan-400 cursor-pointer transition-colors" />
                <Settings className="w-6 h-6 hover:text-cyan-400 cursor-pointer transition-colors" />
                <PixelPressableButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Log Out
                </PixelPressableButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}