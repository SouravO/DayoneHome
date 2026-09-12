import React from "react"

export default function DayOneLogo({ className = "", variant = "navbar" }) {
    const isNavbar = variant === "navbar"
    const baseWidth = isNavbar 
        ? "w-[140px] sm:w-[160px] md:w-[180px]" 
        : "w-[260px] sm:w-[320px] md:w-[450px]"
    const brandRed = "#DD3027"

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
                                font-family: 'Arial Black', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                                font-weight: 900;
                                font-size: 80px;
                                letter-spacing: -0.075em;
                                fill: ${brandRed};
                            }
                            .do-tagline {
                                font-family: 'Bodoni 72', Didot, 'Iowan Old Style', Georgia, serif;
                                font-style: italic;
                                font-size: 17px;
                                letter-spacing: -0.02em;
                                fill: ${brandRed};
                            }
                        `}
                    </style>
                </defs>

                <text x="5" y="70" className="do-wordmark" stroke={brandRed} strokeWidth="2.5" strokeLinejoin="round">
                    dayone
                </text>

                <circle cx="109" cy="78" r="6.5" fill={brandRed} />

                <path
                    d="M 148 2 Q 148 12 158 12 Q 148 12 148 22 Q 148 12 138 12 Q 148 12 148 2 Z"
                    fill={brandRed}
                />

                <text x="290" y="98" className="do-tagline" textAnchor="end">
                    venture studio
                </text>
            </svg>
        </div>
    )
}