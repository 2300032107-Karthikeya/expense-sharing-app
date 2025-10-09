// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import GroupDetail from './pages/GroupDetail'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        {/* Add the new dynamic route here */}
        <Route 
          path="/group/:groupId" 
          element={<ProtectedRoute><GroupDetail /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}

export default App;