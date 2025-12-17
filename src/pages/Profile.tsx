import React from 'react';
import { flights, getPilot } from '../data/mockData';
import { Trophy, Clock, Mountain, ArrowUpRight } from 'lucide-react';
import '../components/Profile.css';

const Profile = () => {
    const currentPilotId = '1'; // Hardcoded for now
    const pilot = getPilot(currentPilotId);
    const myFlights = flights.filter(f => f.pilotId === currentPilotId);

    // Stats Logic
    const totalFlights = myFlights.length;

    const totalTimeSeconds = myFlights.reduce((acc, curr) => acc + curr.duration, 0);
    const totalHours = (totalTimeSeconds / 3600).toFixed(1);

    const maxAltitude = Math.max(...myFlights.map(f => f.maxAltitude), 0);

    const longestFlightTime = Math.max(...myFlights.map(f => f.duration), 0);
    const longestFlightDist = Math.max(...myFlights.map(f => f.distance), 0);

    const formatDuration = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        return `${h}h ${m}m`;
    };

    return (
        <div className="container profile-page">
            <div className="profile-header">
                <img src={pilot.avatar} alt={pilot.name} className="profile-avatar-lg" />
                <div className="profile-info">
                    <h1>{pilot.name}</h1>
                    <p className="profile-bio">Paraglider | Speedflyer | Adventurer</p>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="icon-box"><Trophy size={24} /></div>
                    <div className="stat-data">
                        <span className="label">Total Flights</span>
                        <span className="value">{totalFlights}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-box"><Clock size={24} /></div>
                    <div className="stat-data">
                        <span className="label">Total Flight Hours</span>
                        <span className="value">{totalHours} hrs</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-box"><Mountain size={24} /></div>
                    <div className="stat-data">
                        <span className="label">Max Altitude</span>
                        <span className="value">{maxAltitude} m</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-box"><ArrowUpRight size={24} /></div>
                    <div className="stat-data">
                        <span className="label">Longest Flight</span>
                        <span className="value">{formatDuration(longestFlightTime)}</span>
                        <span className="sub-value">({longestFlightDist} km)</span>
                    </div>
                </div>
            </div>

            <h2 className="section-title">Recent Activities</h2>
            <div className="feed-list">
                {/* Re-use Flight Cards logic or simplified list? Let's verify instructions. 
             "profile showcasing summarized flights througout the year"
             It doesn't explicitly ask for a feed, but standard profile has one. I'll just keep it simple for now as requested.
             */}
                <p style={{ color: 'var(--text-muted)' }}>Detailed history coming separately.</p>
            </div>
        </div>
    );
};

export default Profile;
