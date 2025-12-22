export function HikeAndFlyIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Paraglider wing */}
            <path d="M2 8c6-5 16-5 20 0" />

            {/* Lines to pilot */}
            <line x1="5" y1="8" x2="12" y2="14" />
            <line x1="19" y1="8" x2="12" y2="14" />

            {/* Pilot head */}
            <circle cx="12" cy="14" r="1.5" />

            {/* Pilot body / hiking posture */}
            <line x1="12" y1="15.5" x2="12" y2="18" /> {/* torso */}
            <line x1="12" y1="18" x2="11" y2="20" /> {/* left leg */}
            <line x1="12" y1="18" x2="13" y2="20" /> {/* right leg */}
            <line x1="12" y1="16" x2="11" y2="17" /> {/* left arm */}
            <line x1="12" y1="16" x2="13" y2="17" /> {/* right arm */}
        </svg>
    );
}
