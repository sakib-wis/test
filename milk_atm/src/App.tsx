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
import CustomerView from './pages/Customer/View';
import SaleMilk from './pages/Sales/Sale';
import EditCustomerPage from './pages/Customer/Edit';
import EditSalesPage from './pages/Sales/Edit';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedWrapper > <Dashboard /> </ProtectedWrapper>} />
            <Route path="/customers" element={<ProtectedWrapper > <Customers /> </ProtectedWrapper>} />
            <Route path="/customers/add" element={<ProtectedWrapper><AddCustomerPage /></ProtectedWrapper>} />
            <Route path="/customers/:id" element={<ProtectedWrapper><CustomerView /></ProtectedWrapper>} />
            <Route path="/customers/edit/:id" element={<ProtectedWrapper><EditCustomerPage /></ProtectedWrapper>} />
            <Route path="/sales" element={<ProtectedWrapper > <Sales /> </ProtectedWrapper>} />
            <Route path="/sales/edit/:id" element={<ProtectedWrapper > <EditSalesPage /> </ProtectedWrapper>} />
            <Route path="/sales/sale" element={<ProtectedWrapper > <SaleMilk /> </ProtectedWrapper>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router >
  );
};

export default App;
