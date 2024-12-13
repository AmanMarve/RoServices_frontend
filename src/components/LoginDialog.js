import React, { useState } from "react";
import { Dialog, DialogContent, Backdrop, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import config from "../Api/api";

const LoginDialog = ({ open, handleClose, setIsLoggedIn, setCookie, setIsNewUser }) => {
  const [loader, setLoader] = useState(false);
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async () => {
    if (!LoginData.email || !LoginData.password) {
      toast.error('Please enter your credentials');
      return;
    }

    setLoader(true); // Show loader during API call

    try {
      const response = await fetch(`${config.apiUrl}api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: LoginData.email, password: LoginData.password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('Logged in successfully');

        // Check the role and store it in a variable
        const userRole = data.role === 1 ? 'admin' : 'user';

        // Store token, username, and role in cookies
        setCookie('token', data.token);
        setCookie('username', data.name);
        setCookie('role', userRole); // Save role as either admin or user

        setIsLoggedIn(true);
        handleClose();

        // Redirect based on user role
        if (userRole === 'admin') {
          window.location.href = 'http://localhost:3001/admin'; // Change to your specific URL for admin
        } else {
          navigate('/'); // Navigate to user dashboard for regular users
        }
      } else {
        if (data.error === "Invalid Credentials") {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.error("User not registered. Redirecting to Sign Up...");
          setIsNewUser(true); // Redirect to sign-up dialog
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error("Error during login:", error);
    } finally {
      setLoader(false); // Hide loader after the process
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        {loader && (
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-close" onClick={handleClose}></button>
          </div>
          <div className="form-container">
            <p className="title">Welcome back</p>
            <div className="form">
              <input
                type="email"
                className="input"
                onChange={handleChange}
                name="email"
                value={LoginData.email}
                placeholder="Email"
              />
              <input
                type="password"
                className="input"
                onChange={handleChange}
                name="password"
                value={LoginData.password}
                placeholder="Password"
              />

              <p className="page-link">
                <span className="page-link-label">Forgot Password?</span>
              </p>
              <button className="form-btn" onClick={login}>Log In</button>
              <p className="sign-up-label">
                Don't have an account?
                <span className="sign-up-link" onClick={() => setIsNewUser(true)}>Sign up</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
