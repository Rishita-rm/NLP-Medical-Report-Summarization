import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Upload from './components/Upload';
import Blogs from './components/Blogs';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-white">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Home />
                  <About />
                  <Services />
                  <Doctors />
                  <Blogs />
                </>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/upload" 
                element={
                  <PrivateRoute>
                    <Upload />
                  </PrivateRoute>
                } 
              />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
            <ChatBot />
            <Footer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
