// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Sales from './pages/Sales';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
