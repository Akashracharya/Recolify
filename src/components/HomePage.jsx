import React, { useState } from 'react';
import { Plus ,X} from 'lucide-react';
import PixelFrame from '../components/PixelFrame';
import PixelPressableButton from './PixelPressableButton';

export default function HomePage({ subjects, onSelectSubject, onAddSubject ,onDeleteSubject }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  const handleAddSubject = () => {
    if (newSubjectName.trim()) {
      onAddSubject(newSubjectName.trim());
      setNewSubjectName('');
      setShowAddModal(false);
    }
  };

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-4  bg-white bg-clip-text text-transparent">
          Choose Your Subject 
        </h1>
        <p className="text-gray-400 text-lg">Level up your exam prep game!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {subjects.map((subject) => (
          <div key={subject.id}
            onClick={() => onSelectSubject(subject)}>
          <PixelFrame borderColor="#475569"
           
            className="group relative bg-gray-950 p-6 cursor-pointer "
            style={{ '--subject-color': subject.color }}
          >


            
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the card's click event from firing
                onDeleteSubject(subject.id);
              }}
              className="absolute top-2 right-2 z-20 p-1.5 bg-gray-900/50 rounded-full text-gray-400 hover:bg-red-500/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Delete subject"
            >
              <X size={16} />
            </button>


            
            <div onClick={() => onSelectSubject(subject)} className="cursor-pointer"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity" 
                 style={{ background: `linear-gradient(135deg, ${subject.color}40, ${subject.color}10)` }}></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                   style={{ backgroundColor: subject.color + '40', color: subject.color }}>
                📚
              </div>
              <h3 className="text-xl font-bold mb-2">{subject.name}</h3>
              <p className="text-gray-400 text-sm">Click to study</p>
            </div>
          </PixelFrame>
          </div>
        ))}
      </div>

      <div className="fixed md:mr-80 bottom-8 right-8">
        <PixelPressableButton
          onClick={() => setShowAddModal(true)}
          className="full p-2 animate-bounce-slow"
        >
          <Plus size={24} />
        </PixelPressableButton>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <PixelFrame className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-purple-500/30">
            <h3 className="text-2xl font-bold mb-6 text-center">Add New Subject</h3>
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter subject name..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 mb-6 focus:border-purple-500 focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
              autoFocus
            />
            <div className="flex space-x-4">
              <PixelPressableButton
                onClick={() => setShowAddModal(false)}
                className="flex-1 p-1"
              >
                Cancel
              </PixelPressableButton>
              <PixelPressableButton
                onClick={handleAddSubject}
                className="flex-1 p-1"
              >
                Add Subject
              </PixelPressableButton>
            </div>
          </PixelFrame>
        </div>
      )}
      
    </div>
  );
}