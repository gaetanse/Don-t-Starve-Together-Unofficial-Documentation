import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './NavBar'; // Adjust the path as needed
import Home from './Home';
import Api from './Api';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Api />} />
      </Routes>
    </Router>
  );
};

export default App;