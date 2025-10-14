import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function SubjectPage({ subject, activeTab, setActiveTab, studyData, onAddItem, onOpenFlashcard, onBack }) {
  const [newItemContent, setNewItemContent] = useState('');
  const tabs = ['Tricky Words', 'Definitions', 'Formulas', 'Dates/Events'];

  const handleAddItem = () => {
    if (newItemContent.trim()) {
      onAddItem(activeTab, newItemContent.trim());
      setNewItemContent('');
    }
  };

  const currentItems = studyData[activeTab] || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: subject.color }}>
            {subject.name}
          </h1>
          <p className="text-gray-400">Master your {subject.name.toLowerCase()} concepts</p>
        </div>
      </div>

      <div className="hidden md:flex bg-gray-800/50 rounded-2xl p-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 rounded-xl transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/30 z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 rounded-lg text-xs transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {tab.split('/')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-20 md:mb-8">
        <div className="bg-gray-800/50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder={`Add new ${activeTab.toLowerCase()}...`}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:border-purple-500 focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-lg transition-all hover:scale-105"
            >
              + Add
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <span className="flex-1">{item.content}</span>
              <button
                onClick={() => onOpenFlashcard(item)}
                className="ml-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 p-2 rounded-lg transition-all hover:scale-110 animate-glow"
              >
                <Sparkles size={16} />
              </button>
            </div>
          ))}
          
          {currentItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No {activeTab.toLowerCase()} added yet.</p>
              <p className="text-sm">Add your first item above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}