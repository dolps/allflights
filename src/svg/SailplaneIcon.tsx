export function SailplaneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            {/* Fuselage */}
            <line x1="12" y1="12" x2="12" y2="20" />
            {/* Wings */}
            <line x1="4" y1="14" x2="20" y2="14" />
            {/* Tail */}
            <line x1="11" y1="20" x2="13" y2="20" />
        </svg>
    );
}
