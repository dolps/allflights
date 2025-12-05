import React from 'react';

const ParagliderIcon = ({ size = 24, className = '', color = 'currentColor' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Paraglider Wing */}
            <path d="M2 8a10 6 0 0 1 20 0" />

            {/* Lines */}
            <path d="M4 8l6 8" />
            <path d="M20 8l-6 8" />
            <path d="M12 8v8" />

            {/* Pilot in Pod */}
            <path d="M10 16h4l2 3h-8z" />
            {/* Simple representation of a pod harness */}

            {/* Head */}
            <circle cx="12" cy="14.5" r="1.5" />
        </svg>
    );
};

export default ParagliderIcon;
