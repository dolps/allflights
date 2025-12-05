import React from 'react';
import FlightCard from '../components/FlightCard';
import { flights } from '../data/mockData';

const Feed = () => {
    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Activity Feed</h1>
            <div className="feed-list">
                {flights.map(flight => (
                    <FlightCard key={flight.id} flight={flight} />
                ))}
                {flights.length === 0 && (
                    <p style={{ color: 'var(--text-muted)' }}>No recent flights found.</p>
                )}
            </div>
        </div>
    );
};

export default Feed;
