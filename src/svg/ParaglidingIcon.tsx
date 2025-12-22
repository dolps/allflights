export function ParaglidingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            {/* Wing */}
            <path d="M2 10c6-5 16-5 20 0" />
            {/* Lines to pilot */}
            <line x1="5" y1="11" x2="12" y2="16" />
            <line x1="19" y1="11" x2="12" y2="16" />
            {/* Pilot */}
            <circle cx="12" cy="16" r="1.5" />
        </svg>
    );
}
