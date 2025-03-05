import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import DogSearch from './components/DogSearch';

function App() {
  //  Maintaining a basic auth state.
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
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
