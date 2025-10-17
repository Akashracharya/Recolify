import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import PixelFrame from '../components/PixelFrame';
import PixelPressableButton from '../components/PixelPressableButton';
import {Trash2 } from 'lucide-react';

export default function SubjectPage({ subject, activeTab, setActiveTab, studyData, onAddItem, onOpenFlashcard,onDeleteItem, onBack }) {
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
        <PixelPressableButton
        topColor="#14adff"       // green-500
        shadowColor="#0065ab"    // green-700
        textColor="#ffffff"
          onClick={onBack}
          className="mr-4  "
        >
          <span className="text-3xl">←</span>
        </PixelPressableButton>
        <div>
          <h1 className="text-3xl md:text-4xl font-doto font-bold" style={{ color: subject.color }}>
            {subject.name}
          </h1>
          <p className="text-gray-400">Recoll your {subject.name.toLowerCase()} concepts</p>
        </div>
      </div>

      <PixelFrame className="justify-center hidden md:flex bg-gray-800/50 rounded-2xl p-1 mb-8">
        {tabs.map((tab) => (
          <PixelPressableButton
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-2 pl-[4vw] pr-[4vw] ml-[.5vw] mr-[.5vw] `}
          >
            {tab}
          </PixelPressableButton>
        ))}
      </PixelFrame>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-purple-500/30 z-40">
        <div className="grid grid-cols-2 gap-2 p-2 ">
          {tabs.map((tab) => (
            <PixelPressableButton
              key={tab}
              onClick={() => setActiveTab(tab)}
              
              className={`py-3 rounded-lg font-bold text-xs h-14 ${
                activeTab === tab
                  ? ''
                  : 'text-white  hover:text-white  hover:bg-gray-700/50'
              }`}
            >
              {tab.split('/')[0]}
            </PixelPressableButton>
          ))}
        </div>
      </div>

      <div className="mb-20 md:mb-8">
        <PixelFrame className="bg-gray-800/50 p-3 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newItemContent}
              onChange={(e) => setNewItemContent(e.target.value)}
              placeholder={`Add new ${activeTab.toLowerCase()}...`}
              className="flex-1 bg-gray-900 border-2 rounded text-white border-gray-500 px-4 py-3"
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            />
            
            <PixelPressableButton
            topColor="#22c55e"       // green-500
            shadowColor="#15803d"    // green-700
            textColor="#ffffff"
            onClick={handleAddItem}
              className=""
            >
              <span className="text-xl">+ Add</span>
            </PixelPressableButton>
           
          </div>
        </PixelFrame>

        <div className="space-y-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <span className="flex-1">{item.content}</span>
              <div className="flex items-center space-x-2">
              <PixelPressableButton
                onClick={() => onOpenFlashcard(item)}
                className="p-1 "
              >
                <Sparkles size={16} />
              </PixelPressableButton>
              <PixelPressableButton
              topColor="#c1121f"       // green-500
              shadowColor="#780000"    // green-700
              textColor="#ffffff"
              
                  onClick={() => onDeleteItem(activeTab, item.id)} // <-- Make sure this line is correct
                  className=" p-1"
                >
                  <Trash2 size={16} />
                </PixelPressableButton> 
            </div>
            </div>
          ))}
          
          {currentItems.length === 0 && (
            <div className="text-center font-bold py-12 text-gray-500">
              <p>No {activeTab.toLowerCase()} added yet.</p>
              <p className="text-sm">Add your first item above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}