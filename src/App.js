import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DogSearch from './components/DogSearch';
import NavBar from './components/NavBar';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <NavBar />
      <Routes>
        
        <Route
          path="/login"
          element={<Login onLoginSuccess={() => setAuthenticated(true)} />}
        />
        <Route
          path="/search"
          element={authenticated ? <DogSearch /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={authenticated ? "/search" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
