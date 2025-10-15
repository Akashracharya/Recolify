import React, { useState } from 'react';
import { X } from 'lucide-react';
import PixelFrame from '../components/PixelFrame';
import PixelPressableButton from '../components/PixelPressableButton';



export default function TimerModal({ onClose, onSetTimer, currentTime, onReset }) {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <PixelFrame className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-purple-500/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Exam Timer</h3>
          <PixelPressableButton onClick={onClose} className="p-1">
            <X size={20} />
          </PixelPressableButton>
        </div>

        {currentTime ? (
          <PixelFrame className="text-center mb-6">
            <p className="text-gray-400 mb-2">Time remaining:</p>
            <p className={`text-3xl font-bold ${currentTime < 3600000 ? 'animate-pulse-red' : 'text-green-400'}`}>
              {currentTime > 0 ? (() => {
                const hours = Math.floor(currentTime / (1000 * 60 * 60));
                const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
                return `${hours}h ${minutes}m ${seconds}s`;
              })() : 'Time\'s up! 🚨'}
            </p>
          </PixelFrame>
        ) : (
          <div className="mb-6">
            <p className="text-gray-400 mb-4">Set your exam time:</p>
            <div className="gap-4 flex items-center justify-center space-x-4">
              <PixelFrame>
                <label className="text-center w-25 block text-sm text-gray-400 mb-2 ">Hours</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className=" w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center focus:border-purple-500 focus:outline-none"
                  min="0"
                  max="23"
                />
              </PixelFrame>
              <PixelFrame>
                <label className="text-center w-25 block text-sm text-gray-400 mb-2">Minutes</label>
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-20 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center focus:border-purple-500 focus:outline-none"
                  min="0"
                  max="59"
                />
              </PixelFrame>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          {currentTime ? (
            <>
              <PixelPressableButton
                onClick={onReset}
                className="flex-1 p-1"
              >
                Reset Timer
              </PixelPressableButton>
              <PixelPressableButton
                onClick={onClose}
                className="flex-1 p-1"
              >
                Close
              </PixelPressableButton>
            </>
          ) : (
            <>
              <PixelPressableButton
                onClick={onClose}
                className="flex-1 p-1 "
              >
                Cancel
              </PixelPressableButton>
              <PixelPressableButton
                onClick={() => onSetTimer(hours, minutes)}
                className="flex-1 p-1"
              >
                Start Timer
              </PixelPressableButton>
            </>
          )}
        </div>
      </PixelFrame>
    </div>
  );
}