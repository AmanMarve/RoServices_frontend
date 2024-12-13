import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Appointment from './pages/Appointment'
import Order from './pages/Orders';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import LoginDialog from './components/LoginDialog';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';

function ProtectedRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(!isLoggedIn);
  
  // Ref for the Login Dialog
  const loginDialogRef = useRef(null);

  const handleLoginClose = () => {
    setLoginDialogOpen(false);
  };

  const handleLogout = () => {
    removeCookie('token'); // Remove token cookie
    setIsLoggedIn(false); // Update login state
    setLoginDialogOpen(true); // Open login dialog
  };

  // Function to show a toast
  const showToast = () => {
    toast('Please login first!');
  };

  // Handle clicks
  const handleClickOutside = (e) => {
    if (loginDialogRef.current && !loginDialogRef.current.contains(e.target)) {
      showToast();
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Router>
      <Toaster /> {/* Include the toaster here */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onOpenLoginDialog={() => setLoginDialogOpen(true)} 
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin/appointment" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Appointment />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/add" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Add />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/list" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <List />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/order" 
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Order />
              </ProtectedRoute>
            } 
          />
        </Routes>

        {/* Login Dialog */}
        <LoginDialog 
          ref={loginDialogRef} // Attach ref to the LoginDialog
          open={loginDialogOpen} 
          handleClose={handleLoginClose} 
          setIsLoggedIn={setIsLoggedIn} 
          setCookie={setCookie} 
          setIsNewUser={setIsNewUser} 
        />
      </div>
    </Router>
  );
}

export default App;
