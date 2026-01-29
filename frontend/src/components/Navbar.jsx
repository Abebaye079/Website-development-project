import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Check for logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out successfully");
        navigate("/login");
        window.location.reload();
    };

    return (
        <header className="main-header">
            <div className="header-container">
                {/* Logo Section */}
                <Link to="/" className="logo">
                    <img src="images/logo.png" alt="Lissan logo" />
                    Lissan Language School
                </Link>

                {/* Navigation Links */}
                <nav className={`main-nav ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-list">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/about" className="nav-link">About Us</Link></li>
                        <li><Link to="/courses" className="nav-link">Courses</Link></li>
                        <li><Link to="/schedule" className="nav-link">Schedule & Prices</Link></li>
                        
                        {/* Only show "My Profile" in the list if logged in */}
                        {user && (
                            <li><Link to="/profile" className="nav-link">My Profile</Link></li>
                        )}
                    </ul>
                </nav>

                {/* Auth Button Section (The spot where your original Login button lived) */}
                {user ? (
                    <button 
                        onClick={handleLogout} 
                        className="login-button" 
                        style={{ cursor: 'pointer', border: 'none' }}
                    >
                        Logout
                    </button>
                ) : (
                    <Link to="/login" className="login-button">Login</Link>
                )}

                {/* Hamburger Toggle for Mobile */}
                <button 
                    className="menu-toggle" 
                    aria-label="Toggle navigation"
                    onClick={toggleMenu}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>
        </header>
    );
}

export default Navbar;