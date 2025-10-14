import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import TimerModal from './components/TimerModal';
import FlashcardModal from './components/FlashcardModal';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'subject'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', color: '#FF6B6B' },
    { id: 2, name: 'Physics', color: '#4ECDC4' },
    { id: 3, name: 'Chemistry', color: '#45B7D1' },
    { id: 4, name: 'History', color: '#96CEB4' },
  ]);
  
  const [activeTab, setActiveTab] = useState('Tricky Words');
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [examTime, setExamTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const [studyData, setStudyData] = useState({
    'Tricky Words': [
      { id: 1, content: 'Photosynthesis', flashcard: { front: 'Photosynthesis', back: 'The process by which plants convert light energy into chemical energy' }},
      { id: 2, content: 'Mitochondria', flashcard: { front: 'Mitochondria', back: 'The powerhouse of the cell - organelles that produce ATP energy' }},
    ],
    'Definitions': [
      { id: 1, content: 'Entropy', flashcard: { front: 'Entropy', back: 'A measure of disorder or randomness in a system' }},
    ],
    'Formulas': [
      { id: 1, content: 'E = mc²', flashcard: { front: 'E = mc²', back: 'Einstein\'s mass-energy equivalence formula' }},
    ],
    'Dates/Events': [
      { id: 1, content: '1066 - Battle of Hastings', flashcard: { front: '1066', back: 'Battle of Hastings - Norman conquest of England' }},
    ],
  });

  // Timer logic
  useEffect(() => {
    if (examTime && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examTime, timeLeft]);

  const formatTime = (ms) => {
    if (!ms) return '';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const setExamTimer = (hours, minutes) => {
    const now = Date.now();
    const examDate = now + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    setExamTime(examDate);
    setTimeLeft(examDate - now);
    setShowTimerModal(false);
  };

  const addSubject = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
    const newSubject = {
      id: Date.now(),
      name,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setSubjects([...subjects, newSubject]);
  };

  const addStudyItem = (category, content) => {
    const newItem = {
      id: Date.now(),
      content,
      flashcard: { front: content, back: 'AI-generated definition will appear here...' }
    };
    setStudyData(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem]
    }));
  };

  const openFlashcard = (item) => {
    setCurrentFlashcard(item.flashcard);
    setIsFlipped(false);
    setShowFlashcardModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-orbitron">
      <Navbar 
        setCurrentView={setCurrentView}
        setShowTimerModal={setShowTimerModal}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />

      <div className="pt-16">
        {currentView === 'home' && (
          <HomePage 
            subjects={subjects}
            onSelectSubject={(subject) => {
              setSelectedSubject(subject);
              setCurrentView('subject');
            }}
            onAddSubject={addSubject}
          />
        )}
        
        {currentView === 'subject' && selectedSubject && (
          <SubjectPage
            subject={selectedSubject}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            studyData={studyData}
            onAddItem={addStudyItem}
            onOpenFlashcard={openFlashcard}
            onBack={() => setCurrentView('home')}
          />
        )}
      </div>

      {showTimerModal && (
        <TimerModal
          onClose={() => setShowTimerModal(false)}
          onSetTimer={setExamTimer}
          currentTime={timeLeft}
          onReset={() => {
            setExamTime(null);
            setTimeLeft(null);
          }}
        />
      )}

      {showFlashcardModal && currentFlashcard && (
        <FlashcardModal
          flashcard={currentFlashcard}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(!isFlipped)}
          onClose={() => setShowFlashcardModal(false)}
        />
      )}
    </div>
  );
}