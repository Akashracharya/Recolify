import React, { useState } from 'react';
import { X } from 'lucide-react';
import PixelFrame from '../components/PixelFrame';
import PixelPressableButton from '../components/PixelPressableButton';



export default function TimerModal({ onClose, onSetTimer, currentTime, onReset }) {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-purple-500/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Exam Timer</h3>
          <PixelPressableButton onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
            <X size={20} />
          </PixelPressableButton>
        </div>

        {currentTime ? (
          <div className="text-center mb-6">
            <p className="text-gray-400 mb-2">Time remaining:</p>
            <p className={`text-3xl font-bold ${currentTime < 3600000 ? 'animate-pulse-red' : 'text-green-400'}`}>
              {currentTime > 0 ? (() => {
                const hours = Math.floor(currentTime / (1000 * 60 * 60));
                const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
                return `${hours}h ${minutes}m ${seconds}s`;
              })() : 'Time\'s up! 🚨'}
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-400 mb-4">Set your exam time:</p>
            <div className="flex items-center justify-center space-x-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center focus:border-purple-500 focus:outline-none"
                  min="0"
                  max="23"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center focus:border-purple-500 focus:outline-none"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          {currentTime ? (
            <>
              <button
                onClick={onReset}
                className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors"
              >
                Reset Timer
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </>
          ) : (
            <>
              <PixelPressableButton
                onClick={onClose}
                className="flex-1 px-4 py-3 "
              >
                Cancel
              </PixelPressableButton>
              <PixelPressableButton
                onClick={() => onSetTimer(hours, minutes)}
                className="flex-1 px-4 py-3"
              >
                Start Timer
              </PixelPressableButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}