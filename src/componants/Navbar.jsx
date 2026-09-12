import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import DayOneLogo from "./DayOneLogo" // Adjust import path as needed

// Brand palette: paper cream, DayOne red, and ink black.

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
                ? "text-[#DD3027]"
                : transparent && onHome
                    ? "text-[#F4F1DF]/80 hover:text-white"
                    : "text-[#221F1F]/60 hover:text-[#DD3027]"
        }`

    return (
        <nav
            className={`fixed inset-x-0 top-0 z-30 border-b px-6 transition-all duration-300 sm:px-10 ${
                scrolled || open
                    ? "border-[#221F1F]/10 bg-[#F4F1DF]/95 shadow-sm backdrop-blur"
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
                            transparent && onHome ? "bg-[#F4F1DF]" : "bg-[#221F1F]"
                        } transition-transform duration-300 ${
                            open ? "translate-y-[3px] rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`h-px w-5 transition-colors duration-300 ${
                            transparent && onHome ? "bg-[#F4F1DF]" : "bg-[#221F1F]"
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