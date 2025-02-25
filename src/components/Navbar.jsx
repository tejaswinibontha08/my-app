import React, { useState, useEffect, useRef } from 'react';
import { Home, LogOut, User } from 'lucide-react';
import './Navbar.css';
import logoImage from '../assets/logo.png';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <img src={logoImage} alt="Logo" className="logo-image" />
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>

          {/* Profile Menu */}
          <div className="profile-menu" ref={dropdownRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="profile-button"
                >
                <User className="profile-image text-gray-600" />
              </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="dropdown-menu">
                <a href="/" className="dropdown-item">
                  <Home className="dropdown-icon" />
                  Home
                </a>
                <a href="/logout" className="dropdown-item">
                  <LogOut className="dropdown-icon" />
                  Logout
                </a>
                <a href="/signout" className="dropdown-item">
                  <LogOut className="dropdown-icon" />
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;