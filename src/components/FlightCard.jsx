import React from 'react';
import { Clock, Navigation, Mountain, Heart, MessageSquare, Share2 } from 'lucide-react';
import { getPilot } from '../data/mockData';
import './FlightCard.css';

const FlightCard = ({ flight }) => {
    const pilot = getPilot(flight.pilotId);

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}h ${m}m`;
        if (m > 0) return `${m}m ${s}s`;
        return `${s}s`;
    };

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flight-card">
            <div className="card-header">
                <img src={pilot.avatar} alt={pilot.name} className="avatar" />
                <div className="header-info">
                    <h3 className="pilot-name">{pilot.name}</h3>
                    <span className="flight-meta">{formatDate(flight.date)} • {flight.type}</span>
                </div>
            </div>

            <div className="card-body">
                <h2 className="flight-title">{flight.title}</h2>
                <p className="flight-desc">{flight.description}</p>

                <div className="flight-stats">
                    <div className="stat-item">
                        <span className="stat-label">Distance</span>
                        <span className="stat-value">{flight.distance} km</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Duration</span>
                        <span className="stat-value">{formatDuration(flight.duration)}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Max Alt</span>
                        <span className="stat-value">{flight.maxAltitude} m</span>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="map-placeholder">
                    <span>Map Visualization Coming Soon</span>
                </div>
            </div>

            <div className="card-footer">
                <button className="action-btn"><Heart size={18} /></button>
                <button className="action-btn"><MessageSquare size={18} /></button>
                <button className="action-btn"><Share2 size={18} /></button>
            </div>
        </div>
    );
};

export default FlightCard;
