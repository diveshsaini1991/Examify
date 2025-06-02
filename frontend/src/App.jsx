import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateExam from './components/CreateExam';
import Exam from './components/Exam';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home'
import { Footer } from './components/Footer';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const ExaminerRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role !== 'examiner') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    fetch( VITE_BACKEND_URL + '/ping');
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }/>

          <Route path="/signup" element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/create-exam" element={
            <ExaminerRoute>
              <CreateExam />
            </ExaminerRoute>
          } />

          <Route path="/exam/:id" element={
            <ProtectedRoute>
              <Exam />
            </ProtectedRoute>
          } />

          <Route path="/results" element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          } />

          <Route path="*" element={
            localStorage.getItem('token') ?
              <Navigate to="/dashboard" /> :
              <Navigate to="/" />
          } />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
};

export default App;
