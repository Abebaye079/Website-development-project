import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
    <footer>
        <div className="footer-container">
            <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><Link to="/">Enrollment</Link></li>
                    <li><Link to="/courses">Find a course</Link></li>
                    <li><Link to="/about">Our Teachers</Link></li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contact Us</h4>
                <p> 123 Language Lane, Lissan Academy </p>
                <p> Email: info@lissanacademy.edu </p>
                <p> Phone:+251-911763421</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 Lissan Online Language Project. All rights reserved.</p>
        </div>
    </footer>
    );
}

export default Footer;