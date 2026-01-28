import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    // This state handles your mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    </ul>
                </nav>

                {/* Login Button */}
                <Link to="/login" className="login-button">Login</Link>

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