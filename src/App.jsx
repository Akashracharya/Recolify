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

  const [studyItems, setStudyItems] = useState([]);
  
  const [activeTab, setActiveTab] = useState('Tricky Words');
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);
  const [examTime, setExamTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    axios.get('/api/subjects')
      .then(response => {
        if (Array.isArray(response.data)) {
          const subjectsWithId = response.data.map(subject => ({ ...subject, id: subject._id }));
          setSubjects(subjectsWithId);
        } else {
          console.error("Fetched subjects data is not an array:", response.data);
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
    if (!selectedSubject) return;
    const newItemData = {
      content,
      category,
      flashcard: { front: content, back: 'Click to edit...' },
      subjectId: selectedSubject.id
    };
    axios.post('/api/studyitems/add', newItemData)
      .then(res => {
        const savedItem = { ...res.data, id: res.data._id };
        setStudyItems([...studyItems, savedItem]);
      })
      .catch(error => console.error("There was an error adding the study item!", error));
  };

  const fetchStudyItems = (subjectId) => {
    axios.get(`/api/studyitems/subject/${subjectId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const itemsWithId = response.data.map(item => ({ ...item, id: item._id }));
          setStudyItems(itemsWithId);
        } else {
          console.error("Fetched study items data is not an array:", response.data);
          setStudyItems([]);
        }
      })
      .catch(error => {
        console.error(`Error fetching study items for subject ${subjectId}:`, error);
        setStudyItems([]);
      });
  };

  const deleteStudyItem = (itemId) => {
    axios.delete(`/api/studyitems/${itemId}`)
      .then(() => {
        setStudyItems(studyItems.filter(item => item.id !== itemId));
      })
      .catch(error => console.error("Error deleting study item:", error));
  };

  const openFlashcard = (item) => {
    setCurrentFlashcard(item.flashcard);
    setIsFlipped(false);
    setShowFlashcardModal(true);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    fetchStudyItems(subject.id); // Fetch items when a subject is selected
    setCurrentView('subject');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedSubject(null);
    setStudyItems([]); // Clear study items when going back home
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
            onSelectSubject={handleSelectSubject}
            onAddSubject={addSubject}
            onDeleteSubject={deleteSubject}
          />
        )}
        
        {currentView === 'subject' && selectedSubject && (
          <SubjectPage
            subject={selectedSubject}
            studyItems={studyItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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