// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./auth/AuthContext";
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Sales from './pages/Sales';
import ProtectedWrapper from './components/ProtectedWrapper';
import AddCustomerPage from './pages/Customer/Add';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedWrapper > <Dashboard /> </ProtectedWrapper>} />
            <Route path="/customers" element={<ProtectedWrapper > <Customers /> </ProtectedWrapper>} />
            <Route path="/customers/add" element={<ProtectedWrapper><AddCustomerPage></AddCustomerPage></ProtectedWrapper>} />
            <Route path="/sales" element={<ProtectedWrapper > <Sales /> </ProtectedWrapper>} />
          </Routes>
        </Layout>
      </Router >
    </AuthProvider>
  );
};

export default App;
