import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import PixelPressableButton from '../components/PixelPressableButton';

export default function Navbar({ setCurrentView, setShowTimerModal, timeLeft, formatTime }) {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Effect to close the dropdown if a click is detected outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => {
                setCurrentView('home');
                setIsDropdownOpen(false); // Close dropdown on navigation
            }}
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

          {/* Desktop View: Buttons are visible directly */}
          <div className="hidden md:flex items-center space-x-4">
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
              <PixelPressableButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </PixelPressableButton>
            )}
          </div>

          {/* Mobile View: Profile icon with dropdown */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <PixelPressableButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <User size={20} />
            </PixelPressableButton>

            {isDropdownOpen && (
              <div className="absolute top-14 right-0 w-48 bg-gray-900 border border-purple-500/50 rounded-lg shadow-lg py-2">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        loginWithRedirect({ screen_hint: 'signup' });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => {
                        loginWithRedirect();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20"
                    >
                      Log In
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      logout({ logoutParams: { returnTo: window.location.origin } });
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20"
                  >
                    Log Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}