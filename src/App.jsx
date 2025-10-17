import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage.jsx';
import TimerModal from './components/TimerModal';
import FlashcardModal from './components/FlashcardModal';
import PixelFrame from './components/PixelFrame.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'subject'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  
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


  useEffect(() => {
    axios.get('/api/subjects')
      .then(response => {
        // Defensive check: Make sure the response data is actually an array
        if (Array.isArray(response.data)) {
          // MongoDB uses '_id', so we map it to 'id' for consistency in the frontend
          const subjectsWithId = response.data.map(subject => ({ ...subject, id: subject._id }));
          setSubjects(subjectsWithId);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setSubjects([]);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the subjects!", error);
        setSubjects([]);
      });
  }, []); // The empty array [] means this effect runs only once.

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
    const newSubjectData = {
      name,
      color: colors[Math.floor(Math.random() * colors.length)]
    };

    axios.post('/api/subjects/add', newSubjectData)
      .then(res => {
        const savedSubject = { ...res.data, id: res.data._id };
        setSubjects([...subjects, savedSubject]);
      })
      .catch(error => {
        console.error("There was an error adding the subject!", error);
      });
  };

 const deleteSubject = (id) => {
    axios.delete(`/api/subjects/${id}`)
      .then(res => {
        console.log(res.data);
        setSubjects(subjects.filter(subject => subject.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the subject!", error);
      });
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

  const deleteStudyItem = (category , itemId) => {
    
    setStudyData(prev =>({
      ...prev,
      [category]: prev[category].filter(item => item.id !== itemId)
    }));
  };

  const openFlashcard = (item) => {
    setCurrentFlashcard(item.flashcard);
    setIsFlipped(false);
    setShowFlashcardModal(true);
  };

  return (
    
    <div className="min-h-screen  bg-gray-950 text-white font-orbitron">
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
            onDeleteSubject={deleteSubject}
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
            onDeleteItem={deleteStudyItem}
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