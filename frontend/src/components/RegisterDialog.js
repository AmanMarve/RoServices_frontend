import React, { useState } from "react";
import { Dialog, DialogContent, Backdrop, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import config from "../Api/api";

const RegisterDialog = ({ open, handleClose, setIsNewUser }) => {
  const [loader, setLoader] = useState(false);
  const [SignUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleSignUp = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const SignUp = async () => {
    // Validation
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!SignUpData.email.match(emailFormat)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!SignUpData.username || !SignUpData.email || !SignUpData.password) {
      toast.error('Please enter all details');
      return;
    }

    setLoader(true);

    // Prepare signup object
    const signUpObject = {
      name: SignUpData.username, // Map frontend 'username' to backend 'name'
      email: SignUpData.email,
      password: SignUpData.password
    };

    try {
      const response = await fetch(`${config.apiUrl}api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpObject)
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Signed up successfully!');
        console.log("Response from backend:", result);
        setIsNewUser(false); // Close sign-up dialog
      } else {
        const error = await response.json();
        toast.error(error.error || 'Sign up failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoader(false); // Hide loader
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
            <p className="title">Sign Up</p>
            <div className="form">
              <input
                type="text"
                name="username"
                onChange={handleSignUp}
                className="input"
                value={SignUpData.username}
                placeholder="Username"
              />
              <input
                type="email"
                className="input"
                onChange={handleSignUp}
                name="email"
                value={SignUpData.email}
                placeholder="Email"
              />
              <input
                type="password"
                className="input"
                onChange={handleSignUp}
                name="password"
                value={SignUpData.password}
                placeholder="Password"
              />
              <button className="form-btn" onClick={SignUp}>Create</button>
              <p className="sign-up-label">
                Already have an account?
                <span className="sign-up-link" onClick={() => setIsNewUser(false)}>Log in</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
