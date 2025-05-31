import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './fontawesome';
import './assets/css/index.css';
import 'datatables.net-responsive';
import 'datatables.net-responsive-dt/css/responsive.dataTables.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <App />
      <ToastContainer />
    </>
  </StrictMode>,
)
