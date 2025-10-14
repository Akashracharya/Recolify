// App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import SubjectPage from './components/SubjectPage';
import ExamTimerModal from './components/ExamTimerModal';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [examDate, setExamDate] = useState(null);

  // Mock data
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
    { id: 4, name: 'History' },
  ]);

  const addSubject = (subjectName) => {
    const newSubject = {
      id: subjects.length + 1,
      name: subjectName
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage('subject');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white retro-font">
      <Navbar 
        onTimerClick={() => setShowTimerModal(true)}
        examDate={examDate}
      />
      
      <main className="pt-16">
        {currentPage === 'home' && (
          <HomePage 
            subjects={subjects}
            onSubjectClick={handleSubjectClick}
            onAddSubject={addSubject}
          />
        )}
        
        {currentPage === 'subject' && selectedSubject && (
          <SubjectPage 
            subject={selectedSubject}
            onBack={() => setCurrentPage('home')}
          />
        )}
      </main>

      {showTimerModal && (
        <ExamTimerModal 
          onClose={() => setShowTimerModal(false)}
          examDate={examDate}
          setExamDate={setExamDate}
        />
      )}
    </div>
  );
}

export default App;