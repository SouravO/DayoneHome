import React from "react"

export default function DayOneLogo({ className = "", variant = "navbar" }) {
    // Determine base responsive widths based on where the logo is placed
    const isNavbar = variant === "navbar"
    const baseWidth = isNavbar 
        ? "w-[140px] sm:w-[160px] md:w-[180px]" 
        : "w-[260px] sm:w-[320px] md:w-[450px]"
        
    // Sampled directly from the provided reference image
    const brandRed = "#BA3833" 

    return (
        <div className={`relative flex items-center justify-center ${baseWidth} ${className}`}>
            <svg
                viewBox="0 0 310 110"
                className="w-full h-auto overflow-visible"
                aria-label="DayOne Venture Studio Logo"
            >
                <defs>
                    <style>
                        {`
                            .do-wordmark {
                                font-family: 'Futura', 'Tw Cen MT', 'Century Gothic', 'Helvetica Neue', Arial, sans-serif;
                                font-weight: 900;
                                font-size: 80px;
                                letter-spacing: -0.06em;
                                fill: ${brandRed};
                            }
                            .do-tagline {
                                font-family: 'Playfair Display', 'Iowan Old Style', 'Georgia', serif;
                                font-style: italic;
                                font-size: 14.5px;
                                letter-spacing: 0.02em;
                                fill: ${brandRed};
                            }
                        `}
                    </style>
                </defs>

                {/* Main Wordmark */}
                {/* Adding a subtle stroke to artificially force the extremely thick geometric visual weight found in the reference */}
                <text x="5" y="70" className="do-wordmark" stroke={brandRed} strokeWidth="2.5" strokeLinejoin="round">
                    dayone
                </text>

                {/* Decorative Dot (Nestled below the 'a' and 'y') */}
                <circle cx="109" cy="78" r="6.5" fill={brandRed} />

                {/* Decorative Sparkle/Star (Positioned above the 'y' and 'o') */}
                <path
                    d="M 148 2 Q 148 12 158 12 Q 148 12 148 22 Q 148 12 138 12 Q 148 12 148 2 Z"
                    fill={brandRed}
                />

                {/* Tagline */}
                {/* Right-aligned to flush perfectly with the end of the wordmark */}
                <text x="290" y="98" className="do-tagline" textAnchor="end">
                    venture studio by iQue
                </text>
            </svg>
        </div>
    )
}