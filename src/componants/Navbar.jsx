import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import DayOneLogo from "./DayOneLogo" // Adjust import path as needed

// Brand palette — kept identical to Contact.jsx / Footer.jsx for consistency.
// cream #F4F2E3 — nav background · red #DD2D26 — accent · ink #211D18 — text

const NAV_LINKS = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact" },
]

function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { pathname } = useLocation()
    const transparent = !scrolled && !open
    const onHome = pathname === "/"

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const linkClass = ({ isActive }) =>
        `transition-colors duration-300 ${
            isActive
                ? "text-[#DD2D26]"
                : transparent && onHome
                    ? "text-[#F5F1E0]/80 hover:text-white"
                    : "text-[#211D18]/60 hover:text-[#DD2D26]"
        }`

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-30 border-b px-6 transition-all duration-300 sm:px-10 ${
                scrolled || open
                    ? "border-[#211D18]/10 bg-[#F4F2E3]/95 shadow-sm backdrop-blur"
                    : "border-transparent bg-transparent"
            }`}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between py-5">
                
                {/* Replaced Text Logo with Reusable Component */}
                <NavLink
                    to="/"
                    onClick={() => setOpen(false)}
                    className="flex-shrink-0 transition-opacity duration-300 hover:opacity-80"
                >
                    <DayOneLogo variant="navbar" />
                </NavLink>

                {/* Desktop links */}
                <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.15em] sm:flex">
                    {NAV_LINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} className={linkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] sm:hidden"
                >
                    <span
                        className={`h-px w-5 transition-colors duration-300 ${
                            transparent && onHome ? "bg-[#F5F1E0]" : "bg-[#211D18]"
                        } transition-transform duration-300 ${
                            open ? "translate-y-[3px] rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`h-px w-5 transition-colors duration-300 ${
                            transparent && onHome ? "bg-[#F5F1E0]" : "bg-[#211D18]"
                        } transition-transform duration-300 ${
                            open ? "-translate-y-[3px] -rotate-45" : ""
                        }`}
                    />
                </button>
            </div>

            {/* Mobile panel */}
            <div
                className={`grid overflow-hidden transition-all duration-300 sm:hidden ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="min-h-0">
                    <div className="flex flex-col gap-5 border-t border-[#211D18]/10 py-6 text-xs font-semibold uppercase tracking-[0.15em]">
                        {NAV_LINKS.map((link) => (
                            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar