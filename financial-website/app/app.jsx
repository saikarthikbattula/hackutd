import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BankingDashboard from './page';
import Banking from './Banking';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankingDashboard />} />
        <Route path="/banking" element={<Banking />} />
      </Routes>
    </Router>
  );
};

export default App;
