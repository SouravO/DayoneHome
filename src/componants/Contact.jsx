import { useState, useEffect, useRef } from "react";

// Brand palette sampled from the DayOne Ventures logo.
// cream   #F4F2E3 — page background
// panel   #FBF9F0 — form / map surface, a shade lighter than the page
// red     #DD2D26 — DayOne red, used only for accents and interactive states
// ink     #211D18 — deep charcoal text
const DISPLAY_FONT = '"Fraunces", "Iowan Old Style", "Palatino Linotype", Georgia, serif';

const OFFICE_ADDRESS_LINES = [
    "Startup Park",
    "Total Mall, opposite Madiwala Police Station",
    "Sidharata Colony, Santhosapuram",
    "Koramangala 2nd Block",
    "Bengaluru, Karnataka 560068",
    "India",
];

const INTEREST_OPTIONS = [
    "Building a new venture",
    "Growing an existing business",
    "Strategic partnership",
    "Technology / Digital",
    "Marketing / Brand",
    "General enquiry",
];

const CONTACT_EMAIL = "dayoneventurestudio@gmail.com";
const CONTACT_PHONE = "8129957753";

const MAP_QUERY =
    "Startup Park, Total Mall, opposite Madiwala Police Station, Koramangala 2nd Block, Bengaluru, Karnataka 560068";
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Scroll reveal logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Preserve native required-field validation on the existing inputs.
        const formEl = event.currentTarget;
        if (!formEl.checkValidity()) {
            formEl.reportValidity();
            return;
        }

        // Build the email body dynamically from whatever the user entered.
        const bodyLines = [`Name: ${form.name}`, `Email: ${form.email}`];
        if (form.phone) bodyLines.push(`Phone: ${form.phone}`);
        if (form.company) bodyLines.push(`Company: ${form.company}`);
        if (form.interest) bodyLines.push(`Interest: ${form.interest}`);
        bodyLines.push("", "Message:", form.message);

        const subject = `New Contact Form Submission from ${form.name}`;
        const body = bodyLines.join("\n");

        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;

        try {
            window.location.href = mailtoLink;
        } catch (err) {
            // If the device can't open a mail client, fail silently and keep the page intact.
        }

        setSubmitted(true);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative bg-[#F4F2E3] px-6 py-16 sm:px-10 lg:px-16 overflow-hidden selection:bg-[#DD2D26]/20 selection:text-[#211D18]"
        >
            {/* Inline styles for custom premium animations without external CSS dependencies */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes clipReveal {
                    0% { clip-path: inset(100% 0 0 0); transform: translateY(20px); opacity: 0; }
                    100% { clip-path: inset(0 0 0 0); transform: translateY(0); opacity: 1; }
                }
                @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes drawLineY {
                    from { height: 0; }
                    to { height: 100%; }
                }
                @keyframes floatMapPin {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes scaleInForm {
                    from { opacity: 0; transform: translateY(20px) scale(0.99); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .anim-clip { opacity: 0; }
                .is-visible .anim-clip { animation: clipReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                
                .anim-fade { opacity: 0; }
                .is-visible .anim-fade { animation: slideUpFade 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
                
                .anim-line { height: 0; }
                .is-visible .anim-line { animation: drawLineY 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

                .anim-form { opacity: 0; }
                .is-visible .anim-form { animation: scaleInForm 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

                @media (prefers-reduced-motion: reduce) {
                    .anim-clip, .anim-fade, .anim-line, .anim-form { 
                        animation: none !important; 
                        opacity: 1 !important; 
                        transform: none !important; 
                        clip-path: none !important;
                        height: 100% !important;
                    }
                }
            `}} />

            <div className={`mx-auto max-w-7xl ${isVisible ? 'is-visible' : ''}`}>
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20 xl:gap-24">
                    
                    {/* LEFT — Typography & Info Composition */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h1
                                style={{ fontFamily: DISPLAY_FONT }}
                                className="text-[3rem] font-medium leading-[1.05] tracking-tight text-[#211D18] sm:text-[4rem] lg:text-[4.5rem]"
                            >
                                <span className="block overflow-hidden">
                                    <span className="block anim-clip [animation-delay:100ms]">Let&apos;s build</span>
                                </span>
                                <span className="block overflow-hidden">
                                    <span className="block anim-clip [animation-delay:300ms]">
                                        what&apos;s next<span className="text-[#DD2D26]">.</span>
                                    </span>
                                </span>
                            </h1>

                            <div className="mt-8 space-y-6 max-w-[420px]">
                                <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#211D18]/70 anim-fade [animation-delay:500ms]">
                                    Have an opportunity worth exploring? Building something already?
                                    Looking for the right partner to help move it forward? Start a
                                    conversation with DayOne.
                                </p>
                                <p
                                    style={{ fontFamily: DISPLAY_FONT }}
                                    className="text-[18px] sm:text-[20px] italic leading-relaxed text-[#211D18]/90 anim-fade [animation-delay:600ms]"
                                >
                                    Every meaningful venture starts with a conversation.
                                </p>
                            </div>
                        </div>

                        {/* Office Address Block */}
                        <div className="mt-16 lg:mt-24 relative pl-8 anim-fade [animation-delay:700ms]">
                            {/* Animated Red Accent Line */}
                            <div className="absolute left-0 top-0 w-[2px] bg-[#DD2D26] anim-line [animation-delay:1000ms]" />
                            
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#211D18]/40 mb-3">
                                Visit
                            </p>
                            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-[#211D18] mb-2">
                                DayOne Ventures
                            </p>
                            <address className="not-italic text-[15px] leading-[1.7] text-[#211D18]/70 mb-8">
                                {OFFICE_ADDRESS_LINES.map((line, idx) => (
                                    <span key={line} className={`block ${idx === 0 ? 'font-medium text-[#211D18]/90' : ''}`}>
                                        {line}
                                    </span>
                                ))}
                            </address>

                            <div className="flex flex-col gap-2 text-[15px] font-medium">
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="group relative w-fit text-[#211D18]/80 transition-colors duration-300 hover:text-[#DD2D26]"
                                >
                                    {CONTACT_EMAIL}
                                    <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-right scale-x-0 bg-[#DD2D26] transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                                </a>
                                <a
                                    href={`tel:${CONTACT_PHONE}`}
                                    className="group relative w-fit text-[#211D18]/50 transition-colors duration-300 hover:text-[#DD2D26] mt-1 tracking-wide"
                                >
                                    {CONTACT_PHONE}
                                    <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-right scale-x-0 bg-[#DD2D26] transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Interactive Form Composition */}
                    <div className="lg:col-span-7">
                        <div className="relative anim-form [animation-delay:400ms]">
                            <div
                                className="relative z-10 border border-[#211D18]/[0.08] bg-[#FBF9F0] p-8 sm:p-12 lg:p-14 shadow-[0_30px_60px_-15px_rgba(33,29,24,0.05)]"
                            >
                                {!submitted ? (
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                                            
                                            {/* Name Input */}
                                            <div className="relative group flex flex-col">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-2 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="name">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        required
                                                        value={form.name}
                                                        onChange={handleChange("name")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] placeholder-[#211D18]/25 py-2 focus:outline-none transition-colors duration-300"
                                                        placeholder="Your name"
                                                    />
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="relative group flex flex-col">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-2 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="email">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        value={form.email}
                                                        onChange={handleChange("email")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] placeholder-[#211D18]/25 py-2 focus:outline-none transition-colors duration-300"
                                                        placeholder="you@company.com"
                                                    />
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                </div>
                                            </div>

                                            {/* Phone Input */}
                                            <div className="relative group flex flex-col">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-2 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="phone">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        value={form.phone}
                                                        onChange={handleChange("phone")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] placeholder-[#211D18]/25 py-2 focus:outline-none transition-colors duration-300"
                                                        placeholder="Optional"
                                                    />
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                </div>
                                            </div>

                                            {/* Company Input */}
                                            <div className="relative group flex flex-col">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-2 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="company">
                                                    Company / Venture
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        id="company"
                                                        type="text"
                                                        value={form.company}
                                                        onChange={handleChange("company")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] placeholder-[#211D18]/25 py-2 focus:outline-none transition-colors duration-300"
                                                        placeholder="Optional"
                                                    />
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                </div>
                                            </div>

                                            {/* Interest Select */}
                                            <div className="sm:col-span-2 relative group flex flex-col mt-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-2 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="interest">
                                                    What are you interested in?
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="interest"
                                                        required
                                                        value={form.interest}
                                                        onChange={handleChange("interest")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] py-3 pr-8 appearance-none cursor-pointer focus:outline-none transition-colors duration-300"
                                                        style={{ color: form.interest ? '#211D18' : 'rgba(33, 29, 24, 0.25)' }}
                                                    >
                                                        <option value="" disabled>Select an area of focus</option>
                                                        {INTEREST_OPTIONS.map((option) => (
                                                            <option key={option} value={option} className="text-[#211D18]">
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                    <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#211D18]/40 transition-colors duration-300 group-focus-within:text-[#DD2D26]">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Message Textarea */}
                                            <div className="sm:col-span-2 relative group flex flex-col mt-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#211D18]/40 mb-4 transition-colors duration-300 group-focus-within:text-[#DD2D26]" htmlFor="message">
                                                    Message
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        id="message"
                                                        required
                                                        rows={3}
                                                        value={form.message}
                                                        onChange={handleChange("message")}
                                                        className="peer w-full bg-transparent border-b border-[#211D18]/15 text-[15px] text-[#211D18] placeholder-[#211D18]/25 py-2 resize-none focus:outline-none transition-colors duration-300"
                                                        placeholder="Tell us a little about what you're building or exploring."
                                                    />
                                                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#DD2D26] transition-all duration-500 ease-out peer-focus:w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-14 flex items-center justify-between">
                                            <button
                                                type="submit"
                                                className="group relative inline-flex items-center gap-4 bg-[#211D18] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F4F2E3] transition-all duration-500 hover:bg-[#DD2D26] overflow-hidden"
                                            >
                                                <span className="relative z-10">Start the Conversation</span>
                                                <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-1.5" aria-hidden="true">
                                                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M11 1L15 5M15 5L11 9M15 5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    /* Success State */
                                    <div className="flex flex-col items-center justify-center py-20 text-center animate-[slideUpFade_0.8s_ease-out_forwards]">
                                        <div className="w-16 h-16 rounded-full bg-[#DD2D26]/10 flex items-center justify-center mb-6">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20 6L9 17L4 12" stroke="#DD2D26" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
                                            </svg>
                                        </div>
                                        <h3 style={{ fontFamily: DISPLAY_FONT }} className="text-[2rem] font-medium text-[#211D18] mb-3">
                                            Opening your email app.
                                        </h3>
                                        <p className="text-[16px] text-[#211D18]/60 max-w-sm mx-auto">
                                            Your message has been pre-filled — just hit send from your email app to reach the DayOne team.
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Decorative form shadow/offset (creates depth) */}
                            <div className="absolute -inset-y-4 -inset-x-4 bg-[#FBF9F0]/40 -z-10 border border-[#211D18]/[0.03] transform translate-x-2 translate-y-2 pointer-events-none hidden sm:block" />
                        </div>
                    </div>
                </div>

                {/* PREMIUM MAP VISUALIZATION */}
                <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group mt-12 lg:mt-20 relative overflow-hidden border border-[#211D18]/[0.08] bg-[#FBF9F0] anim-fade [animation-delay:800ms] cursor-pointer"
                >
                    {/* Map Grid Background with Radial Mask & Hover Scale */}
                    <div 
                        className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-[1.02]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at center, transparent 15%, #FBF9F0 75%), 
                                linear-gradient(rgba(33,29,24,0.05) 1px, transparent 1px), 
                                linear-gradient(90deg, rgba(33,29,24,0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
                            backgroundPosition: "center center"
                        }}
                    />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center py-16 sm:py-24 px-6 text-center">
                        {/* Floating Pin Wrapper */}
                        <div className="relative mb-8" style={{ animation: 'floatMapPin 6s ease-in-out infinite' }}>
                            {/* Subtle pulsing shadow under pin */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#DD2D26]/10 rounded-full blur-md animate-pulse" />
                            <svg width="32" height="42" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                                <path
                                    d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z"
                                    fill="#DD2D26"
                                />
                                <circle cx="14" cy="14" r="5" fill="#FBF9F0" />
                            </svg>
                        </div>
                        
                        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#211D18] mb-1">
                            DayOne Ventures HQ
                        </p>
                        <p className="text-[14px] text-[#211D18]/50 font-serif italic mb-6">
                            Startup Park, Bengaluru
                        </p>
                        
                        <div className="inline-flex items-center gap-2 border-b border-[#DD2D26]/30 pb-1 transition-all duration-300 group-hover:border-[#DD2D26]">
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#DD2D26]">
                                View on Map
                            </span>
                            <span className="text-[#DD2D26] transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
}