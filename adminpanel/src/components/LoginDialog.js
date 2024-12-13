import React, { useState } from "react";
import { Dialog, DialogContent, Backdrop, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import './login.css'
import { ImArrowUpRight } from "react-icons/im";
import config from '../config'

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

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const login = async () => {
        if (!LoginData.email || !LoginData.password) {
            toast.error('Please enter your credentials');
            return;
        }

        if (!isValidEmail(LoginData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setLoader(true);

        try {
            const response = await fetch(`${config.apiUrl}api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: LoginData.email, password: LoginData.password }),
            });

            const data = await response.json();

            // Check if the login was successful
            if (response.status === 200) {
                // Check if the email is the admin's email
                if (LoginData.email === "Admin@gmail.com") {
                    toast.success('Logged in successfully');
                    setLoginData("");

                    setCookie('token', data.token);
                    setCookie('username', data.name);
                    setCookie('role', 'admin');

                    setIsLoggedIn(true);
                    handleClose();
                    navigate('/'); // Redirect to admin page
                } else {
                    // Email does not match admin email
                    toast.error("Access denied: Only Admin is allowed to log in.");
                }
            } else {
                handleLoginError(data);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            console.error("Error during login:", error);
        } finally {
            setLoader(false);
        }
    };

    const handleLoginError = (data) => {
        if (data.error === "Invalid Credentials") {
            toast.error("Invalid credentials. Please try again.");
        } else {
            toast.error("User not registered. Redirecting to Sign Up...");
            setIsNewUser(true);
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
                        <p className="title">Welcome Admin!</p>
                        <div className="form">
                            <input
                                type="email"
                                className="input"
                                onChange={handleChange}
                                name="email"
                                value={LoginData.email}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                className="input"
                                onChange={handleChange}
                                name="password"
                                value={LoginData.password}
                                placeholder="Password"
                                required
                            />

                            <button className="form-btn" onClick={login}>Log In</button>
                            <p className="text-sm text-center font-sem">Only Admin are allowed!</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
