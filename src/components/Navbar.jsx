import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, User, Activity } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'nav-item active' : 'nav-item';
    };

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    <Plane className="logo-icon" size={24} />
                    <span className="logo-text">AllFlights</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className={isActive('/')}>
                        <Activity size={20} />
                        <span>Feed</span>
                    </Link>
                    <Link to="/profile" className={isActive('/profile')}>
                        <User size={20} />
                        <span>Profile</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
