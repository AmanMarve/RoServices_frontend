import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import './login.css';
import { useCookies } from "react-cookie";
import { Badge, Button } from "@mui/material";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useCart } from '../context/ContextProvider';
import toast, { Toaster } from "react-hot-toast";
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';

const Navbar = () => {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'email', 'token']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (cookies.token) {
      setIsLoggedIn(true);
      if (cookies.username) {
        setUsername(cookies.username);
      }
    }
  }, [cookies]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    removeCookie('username', { path: '/' });
    removeCookie('email', { path: '/' });
    removeCookie('token', { path: '/' });
    localStorage.clear();
    toast.success("Logout successfully");
    setIsLoggedIn(false);
    setUsername('');
  };



  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ConfirmDialog />

      <div className="sticky z-20 top-0 bg-gray-300 px-4 py-4 flex justify-between items-center">
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-semibold whitespace-nowrap">
            <Link to="/">Ganesh Services</Link>
          </h2>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="hidden md:flex items-center justify-center w-full">
          <ul className="flex gap-10 items-center justify-center w-full">
            <li>
              <Link className="hover:text-blue-500" to="/Shop">Shop</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500" to="/BookApp">Book appointment</Link>
            </li>
            <li className="relative">
              <Link to="/Cart">
                <Badge badgeContent={cartCount()} color="primary">
                  <FaShoppingCart />
                </Badge>
                <span className="mx-2">MyCart</span>
              </Link>
            </li>
            {/* Authentication Links */}
            <li>
              {isLoggedIn ? (
                <>
                  <span className="mr-2">Hello, {username}</span>
                  <Button variant="contained" onClick={logout} className="bi bi-person-circle">
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleClickOpen} className="bi bi-person-circle">
                  Login
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-300 w-full flex flex-col items-center p-4">
          <ul className="flex flex-col gap-4 w-full items-center">
            <li>
              <Link className="hover:text-blue-500" to="/Shop">Shop</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500" to="/BookApp">Book appointment</Link>
            </li>
            <li className="relative">
              <Link to="/Cart">
                <Badge badgeContent={cartCount()} color="primary">
                  <FaShoppingCart />
                </Badge>
                <span className="mx-2">MyCart</span>
              </Link>
            </li>
            {/* Authentication Links for Mobile */}
            <li>
              {isLoggedIn ? (
                <>
                  <span className="mr-2">Hello, {username}</span>
                  <Button variant="contained" onClick={logout} className="bi bi-person-circle w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <Button variant="contained" onClick={handleClickOpen} className="bi bi-person-circle w-full">
                  Login
                </Button>
              )}
            </li>
          </ul>
        </div>
      )}

      {isNewUser ? (
        <RegisterDialog open={open} handleClose={handleClose} setIsNewUser={setIsNewUser} />
      ) : (
        <LoginDialog open={open} handleClose={handleClose} setIsLoggedIn={setIsLoggedIn} setCookie={setCookie} setIsNewUser={setIsNewUser} />
      )}
    </>
  );
};

export default Navbar;
