import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import { WalletProvider } from './contexts/WalletContext';
import Dashboard from './components/Dashboard';
import HowItWorks from './components/HowItWorks';
import Vote from './components/Vote';
import About from './components/About';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import EducationPortal from './components/education/EducationPortal';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
      <AuthProvider>
      <WalletProvider>
    <div className="min-h-screen bg-gradient-to-br from-patriot-blue to-white flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/vote/:electionId" element={<Vote />} />
        <Route path="/about" element={<About />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
        <Route path="/education" element={<EducationPortal />} />
      </Routes>
      <Footer />
    </div>
    </WalletProvider>
    </AuthProvider>
    
  );
}

export default App;