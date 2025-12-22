export function HangGlidingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            {/* Wing */}
            <polygon points="2,8 12,3 22,8" />
            {/* Control bar */}
            <line x1="4" y1="9" x2="20" y2="9" />
            {/* Pilot */}
            <circle cx="12" cy="16" r="1.5" />
            <line x1="12" y1="16" x2="12" y2="9" />
        </svg>
    );
}
