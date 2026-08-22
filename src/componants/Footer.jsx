import { Link } from 'react-router-dom'
import DayOneLogo from './DayOneLogo' // Adjust path if necessary

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <footer className="relative bg-[#0E0E0D] text-[#F5F2EB] pt-20 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-neutral-800/60 selection:bg-[#E63946] selection:text-white">
            <div className="max-w-7xl mx-auto">
                {/* INFORMATION & CONTACT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-neutral-800/80">
                    {/* Brand Tagline Column */}
                    <div className="md:col-span-5 space-y-4">
                        <div className="inline-block">
                            <DayOneLogo variant="navbar" className="brightness-0 invert-[0.95]" />
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                            A modern venture studio working side-by-side with visionary founders to engineer high-impact ventures from inception.
                        </p>
                    </div>

                    {/* Direct Contact Column */}
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                            Contact
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="mailto:dayoneventurestudio@gmail.com"
                                    className="group inline-flex items-center gap-2 text-base sm:text-lg text-[#F5F2EB] hover:text-[#E63946] transition-colors duration-300"
                                >
                                    <span className="relative">
                                        dayoneventurestudio@gmail.com
                                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#E63946] transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:8078928275"
                                    className="group inline-flex items-center gap-2 text-base sm:text-lg text-[#F5F2EB] hover:text-[#E63946] transition-colors duration-300"
                                >
                                    <span className="relative">
                                        +91 8078928275
                                        <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#E63946] transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div className="md:col-span-3 space-y-4">
                        <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                            Social
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://www.instagram.com/dayone_venturestudio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-base sm:text-lg text-[#F5F2EB] hover:text-[#E63946] transition-colors duration-300"
                                >
                                    <span>Instagram</span>
                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-neutral-400 group-hover:text-[#E63946]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/profile.php?id=61574333967955&mibextid=rS40aB7S9Ucbxw6v"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-base sm:text-lg text-[#F5F2EB] hover:text-[#E63946] transition-colors duration-300"
                                >
                                    <span>Facebook</span>
                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-neutral-400 group-hover:text-[#E63946]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/dayone-venture-studio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 text-base sm:text-lg text-[#F5F2EB] hover:text-[#E63946] transition-colors duration-300"
                                >
                                    <span>LinkedIn</span>
                                    <svg
                                        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-neutral-400 group-hover:text-[#E63946]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                        />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* 3. HERO WORDMARK ("WOW FACTOR") */}
                <div className="py-12 border-b border-neutral-800/80 group cursor-default select-none">
                    <h1 className="text-[12vw] sm:text-[13vw] font-black tracking-tighter leading-none text-center uppercase text-neutral-900 group-hover:text-[#F5F2EB] transition-colors duration-700">
                        DAY
                        <span className="text-[#E63946] group-hover:drop-shadow-[0_0_25px_rgba(230,57,70,0.4)] transition-all duration-500">
                            ONE
                        </span>
                    </h1>
                </div>

                {/* 4. LEGAL & BACK TO TOP */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
                    <p>© 2026 DayOne Venture Studio. All rights reserved.</p>

                    <button
                        onClick={scrollToTop}
                        className="group inline-flex items-center gap-2 text-neutral-400 hover:text-[#F5F2EB] transition-colors duration-300 cursor-pointer"
                        aria-label="Back to top"
                    >
                        <span className="uppercase tracking-wider">Back to top</span>
                        <div className="w-7 h-7 rounded-full border border-neutral-800 group-hover:border-[#E63946] group-hover:bg-[#E63946] text-neutral-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
                            <svg
                                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer