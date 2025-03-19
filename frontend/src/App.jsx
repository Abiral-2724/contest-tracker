import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ReminderPage from './pages/ReminderPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import './index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutPage from './pages/About';

function App() {
  const [user, setUser] = useState(null);
  
  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('contestTrackerUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('contestTrackerUser');
      }
    }
  }, []);
  
  // Save user to local storage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('contestTrackerUser', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/reminders" element={<ReminderPage user={user} setUser={setUser} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage></AboutPage>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
