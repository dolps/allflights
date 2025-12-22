export function SpeedridingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            {/* Wing */}
            <path d="M2 11c6-4 16-6 20-3" />
            {/* Lines */}
            <line x1="7" y1="11" x2="12" y2="19" />
            <line x1="17" y1="8" x2="12" y2="19" />
            {/* Pilot */}
            <circle cx="12" cy="19" r="1.5" />
        </svg>
    );
}
