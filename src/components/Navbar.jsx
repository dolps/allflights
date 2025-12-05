import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Activity } from 'lucide-react';
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
                    <span className="logo-text">AllFlights</span>
                </Link>
                <span className="bg-gradient-to-b from-retro-blue via-white to-retro-purple bg-clip-text text-transparent transform skew-x-[-10deg]">
                    ALLFLIGHTS
                </span>
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
