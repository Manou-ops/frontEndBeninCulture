import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contents from './pages/Contents';
import Events from './pages/Events';
import Login from './pages/Auth/Login';
import Account from './pages/Account';
import './styles/custom.css';
import 'animate.css';
import { UserProvider } from './contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // important pour avoir le style



const App = () => {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

      <UserProvider> {/* Ici, on entoure TOUT */}
        <Router>
          <Navbar />
          <main style={{ paddingTop: '70px', paddingBottom: '50px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contents" element={<Contents />} />
              <Route path="/events" element={<Events />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />

        </Router>
      </UserProvider>
      <ToastContainer />
    </>
  );
};

export default App;
