// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage.jsx';
import TimerModal from './components/TimerModal';
import FlashcardModal from './components/FlashcardModal';

export default function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [currentView, setCurrentView] = useState('home');
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

  // This function will fetch subjects for the logged-in user
  const fetchSubjects = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get('/api/subjects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const subjectsWithId = response.data.map(subject => ({ ...subject, id: subject._id }));
      setSubjects(subjectsWithId);
    } catch (error) {
      console.error("Could not fetch subjects:", error);
    }
  }, [getAccessTokenSilently]);

  // This powerful hook handles all data logic based on auth state
  useEffect(() => {
    if (isAuthenticated) {
      // If user is logged in, fetch their data
      fetchSubjects();
    } else {
      // If user is logged out, clear all local state
      setSubjects([]);
      setStudyItems([]);
      setSelectedSubject(null);
      setCurrentView('home');
    }
  }, [isAuthenticated, fetchSubjects]);

  // --- All your other functions (addSubject, deleteSubject, etc.) are already correct
  // because they use getAccessTokenSilently. No changes needed there! ---

  // ... (addSubject, deleteSubject, addStudyItem, deleteStudyItem functions)
  
  const addSubject = async (name) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    try {
      const token = await getAccessTokenSilently();
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
      const newSubjectData = {
        name,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      const res = await axios.post('/api/subjects/add', newSubjectData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const savedSubject = { ...res.data, id: res.data._id };
      setSubjects([...subjects, savedSubject]);
    } catch (error) {
      console.error("There was an error adding the subject!", error);
    }
  };

 const deleteSubject = async (id) => {
    if (!isAuthenticated) {
        loginWithRedirect();
        return;
    }
    try {
        const token = await getAccessTokenSilently();
        await axios.delete(`/api/subjects/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setSubjects(subjects.filter(subject => subject.id !== id));
    } catch (error) {
        console.error("There was an error deleting the subject!", error);
    }
  };

  const addStudyItem = async (category, content) => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    if (!selectedSubject) return;
    try {
        const token = await getAccessTokenSilently();
        const newItemData = {
          content,
          category,
          flashcard: { front: content, back: 'Click to edit...' },
          subjectId: selectedSubject.id
        };
        const res = await axios.post('/api/studyitems/add', newItemData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const savedItem = { ...res.data, id: res.data._id };
        setStudyItems([...studyItems, savedItem]);
    } catch (error) {
        console.error("There was an error adding the study item!", error);
    }
  };

  const fetchStudyItems = useCallback(async (subjectId) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`/api/studyitems/subject/${subjectId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const itemsWithId = response.data.map(item => ({ ...item, id: item._id }));
        setStudyItems(itemsWithId);
    } catch (error) {
        console.error(`Error fetching study items for subject ${subjectId}:`, error);
        setStudyItems([]);
    }
  }, [getAccessTokenSilently]);

  const deleteStudyItem = async (itemId) => {
    if (!isAuthenticated) {
        loginWithRedirect();
        return;
    }
    try {
        const token = await getAccessTokenSilently();
        await axios.delete(`/api/studyitems/${itemId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setStudyItems(studyItems.filter(item => item.id !== itemId));
    } catch (error) {
        console.error("Error deleting study item:", error);
    }
  };
  
  // Timer and Modal logic remains the same
   // ... (useEffect for timer, formatTime, setExamTimer)
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
   const openFlashcard = (item) => {
    setCurrentFlashcard(item.flashcard);
    setIsFlipped(false);
    setShowFlashcardModal(true);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    fetchStudyItems(subject.id);
    setCurrentView('subject');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white font-orbitron">
      <Navbar
        setCurrentView={setCurrentView}
        setShowTimerModal={setShowTimerModal}
        timeLeft={timeLeft}
        formatTime={formatTime}
      />
      <div className="pt-16">
        {currentView === 'home' ? (
          <HomePage
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onAddSubject={addSubject}
            onDeleteSubject={deleteSubject}
          />
        ) : (
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