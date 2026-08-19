"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Brand Tokens                                                       */
/* ------------------------------------------------------------------ */
const c = {
  cream: "#F4F0E2",
  creamDeep: "#ECE3CE",
  red: "#DC2D26",
  charcoal: "#211D1B",
  charcoalDark: "#181514",
  textMuted: "rgba(33, 29, 27, 0.65)",
  textDarkMuted: "rgba(244, 240, 226, 0.65)",
};

const fontDisplay = {
  fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
};
const fontBody = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
};

/* ------------------------------------------------------------------ */
/* Premium Intersection Observer Hook                                 */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({
  children,
  className = "",
  delay = 0,
  y = "translate-y-10",
  duration = 1000,
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all cubic-bezier-[0.16,1,0.3,1] motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? `opacity-100 translate-y-0` : `opacity-0 ${y}`
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

function TextMask({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref} className={`overflow-hidden block ${className}`}>
      <div
        className={`transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          visible ? "translate-y-0" : "translate-y-[115%]"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content Data (Strictly preserved, numbers stripped)                */
/* ------------------------------------------------------------------ */
const CAPABILITIES = [
  {
    title: "Venture strategy",
    description:
      "Identify the opportunity, understand the market and define a clear path forward. We help shape the business model, positioning and priorities before the build begins.",
    highlights: ["Market Analysis", "Business Modeling", "Strategic Roadmap"],
  },
  {
    title: "Brand & identity",
    description:
      "Turn an idea into a brand people can recognize, understand and remember. From positioning to identity and communication, we build the foundation for meaningful connection.",
    highlights: ["Visual System", "Brand Narrative", "Positioning Strategy"],
  },
  {
    title: "Technology & digital",
    description:
      "Translate business ideas into useful digital products, platforms and experiences. Technology becomes part of the business model, not simply an added layer.",
    highlights: ["Product Architecture", "Custom Engineering", "User Experience"],
  },
  {
    title: "Marketing & growth",
    description:
      "Create the systems that help a business reach its audience, generate demand and build momentum — combining creative thinking with measurable growth.",
    highlights: ["Demand Generation", "Customer Acquisition", "Growth Loops"],
  },
  {
    title: "Operations",
    description:
      "Build the structures behind the business. Processes, systems, people and workflows are designed to help ventures operate efficiently as they grow.",
    highlights: ["Workflow Design", "Tooling & Tech Stack", "Team Scaling"],
  },
  {
    title: "Scale & evolution",
    description:
      "Growth changes the business. We help ventures adapt their strategy, strengthen their systems and identify the next opportunities for expansion.",
    highlights: ["Performance Optimization", "Expansion Strategy", "Long-term Capital"],
  },
];

const PROCESS_STAGES = [
  {
    title: "Discover",
    description: "Understand the opportunity, market and customer.",
    keyFocus: "Research & Validation",
  },
  {
    title: "Define",
    description: "Shape the strategy, business model and positioning.",
    keyFocus: "Core Architecture",
  },
  {
    title: "Build",
    description: "Create the brand, product, technology and operating foundation.",
    keyFocus: "Execution & Systems",
  },
  {
    title: "Launch",
    description: "Bring the venture to market, test assumptions and learn quickly.",
    keyFocus: "Market Entry & Testing",
  },
  {
    title: "Grow",
    description: "Build momentum, strengthen systems and pursue the next stage of growth.",
    keyFocus: "Optimization & Scale",
  },
];

const PRINCIPLES = [
  {
    title: "Stay close to the customer",
    description: "Understand what people need and let real behavior guide decisions.",
  },
  {
    title: "Keep building",
    description: "Use learning, experimentation and execution to continuously improve the business.",
  },
  {
    title: "Think long term",
    description: "Build systems, brands and businesses with the ambition to create lasting value.",
  },
];

/* ------------------------------------------------------------------ */
/* Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function Service() {
  const capabilitiesRef = useRef(null);
  const processScrollRef = useRef(null);
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [processScrollProgress, setProcessScrollProgress] = useState(0);

  function handleExploreClick(e) {
    e.preventDefault();
    capabilitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Handle horizontal process scroll tracker
  const handleProcessScroll = () => {
    if (!processScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = processScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
      setProcessScrollProgress(progress);
    }
  };

  const scrollProcess = (direction) => {
    if (!processScrollRef.current) return;
    const amount = processScrollRef.current.clientWidth * 0.7;
    processScrollRef.current.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ ...fontBody, backgroundColor: c.cream }} className="text-[#211D1B] antialiased selection:bg-[#DC2D26] selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&display=swap');
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.01); }
        }

        .animate-hero-float {
          animation: heroFloat 8s ease-in-out infinite;
        }

        .glow-red-subtle {
          box-shadow: 0 0 60px -15px rgba(220, 45, 38, 0.25);
        }

        .text-stroke-cream {
          -webkit-text-stroke: 1px rgba(244, 240, 226, 0.3);
          color: transparent;
        }
      `}</style>

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between overflow-hidden px-6 pt-32 pb-16 sm:px-10 lg:px-16 border-b border-[rgba(33,29,27,0.08)]">
        {/* Subtle Decorative Architectural Grid */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 md:grid-cols-12 max-w-7xl mx-auto opacity-[0.03]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-[#211D1B] h-full" />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Main Hero Header */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col">
              <h1 className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-light leading-[0.88] tracking-tight uppercase" style={fontDisplay}>
                <TextMask delay={100}>WE DON'T JUST</TextMask>
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  <TextMask delay={220} className="italic font-normal text-[#DC2D26]">
                    ADVISE.
                  </TextMask>
                  <span className="hidden sm:inline-block h-[2px] w-16 lg:w-24 bg-[#DC2D26] align-middle rounded-full my-auto" />
                </div>
                <TextMask delay={340}>WE BUILD.</TextMask>
              </h1>
            </div>

            {/* Top Right Strategic Tagline */}
            <div className="lg:col-span-4 lg:pt-6">
              <Reveal delay={450}>
                <div className="border-l-2 border-[#DC2D26] pl-6 py-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#DC2D26] font-semibold mb-2">
                    VENTURE STUDIO MODEL
                  </p>
                  <p className="text-base sm:text-lg text-[rgba(33,29,27,0.75)] leading-relaxed font-light">
                    Building next-generation companies through hands-on strategy, product engineering, design and growth execution.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Hero Lower Layout: Subtext + Interactive Integrated Image */}
          <div className="mt-16 lg:mt-24 grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 flex flex-col gap-8">
              <Reveal delay={550}>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.25] tracking-tight text-[#211D1B]" style={fontDisplay}>
                  DayOne brings together the capabilities required to turn opportunities into businesses — from strategy and brand to technology, growth and operations.
                </p>
              </Reveal>

              <Reveal delay={650}>
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <a
                    href="#capabilities"
                    onClick={handleExploreClick}
                    className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#211D1B] text-[#F4F0E2] text-xs font-semibold uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 hover:bg-[#DC2D26] hover:shadow-lg"
                  >
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                      Explore Capabilities
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative z-10 transition-transform duration-300 group-hover:translate-x-2"
                    >
                      <path
                        d="M3.33334 8H12.6667M12.6667 8L8 3.33334M12.6667 8L8 12.6667"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>

                  <p className="text-sm text-[rgba(33,29,27,0.6)] font-normal max-w-xs leading-relaxed">
                    Different ventures need different answers. We supply the exact capabilities required.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Asymmetric Framed Hero Image Composition */}
            <div className="lg:col-span-6 relative">
              <Reveal delay={750} y="translate-y-12">
                <div className="relative group mx-auto max-w-xl lg:max-w-none">
                  {/* Decorative Architectural Frame Line */}
                  <div className="absolute -inset-3 sm:-inset-4 border border-[rgba(33,29,27,0.15)] pointer-events-none transition-all duration-700 group-hover:border-[#DC2D26]/40" />
                  
                  {/* Main Image Mask Box */}
                  <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#211D1B] glow-red-subtle">
                    <img
                      src="/service.png"
                      alt="DayOne Services Execution"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* Layered Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211D1B]/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Floating Info Pill on Image */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[#F4F0E2] backdrop-blur-md bg-[#211D1B]/80 p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#DC2D26] animate-ping" />
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
                          End-to-End Execution
                        </span>
                      </div>
                      <span className="text-xs text-white/60 hidden sm:inline-block">
                        Strategy • Product • Growth
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CAPABILITIES (Deep Charcoal Editorial Moment) */}
      <section
        id="capabilities"
        ref={capabilitiesRef}
        className="relative py-32 lg:py-40 text-[#F4F0E2] transition-colors duration-700"
        style={{ backgroundColor: c.charcoal }}
      >
        {/* Ambient Subtle Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2D26]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="grid lg:grid-cols-12 gap-8 items-end pb-20 border-b border-[rgba(244,240,226,0.12)]">
            <div className="lg:col-span-8">
              <Reveal>
                <h2
                  className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight uppercase"
                  style={fontDisplay}
                >
                  THE CAPABILITIES
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">
                    BEHIND THE BUILD.
                  </span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={150}>
                <p className="text-base sm:text-lg text-[rgba(244,240,226,0.7)] leading-relaxed font-light">
                  Building a business rarely fits inside one discipline. DayOne brings different capabilities together around the same opportunity, allowing ideas to move from strategy into execution.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Editorial Accordion Capability List */}
          <div className="mt-8">
            {CAPABILITIES.map((item, i) => {
              const isActive = activeCapIndex === i;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveCapIndex(i)}
                  onMouseEnter={() => setActiveCapIndex(i)}
                  className="group relative border-b border-[rgba(244,240,226,0.1)] py-8 sm:py-12 cursor-pointer transition-colors duration-500 hover:bg-[#211D1B]"
                >
                  {/* Left Red Accent Line Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#DC2D26] transition-transform duration-500 ease-out origin-top ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <div className="grid lg:grid-cols-12 gap-6 items-start pl-4 sm:pl-8 pr-4">
                    {/* Capability Title */}
                    <div className="lg:col-span-6 flex items-center justify-between">
                      <h3
                        className={`text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight transition-all duration-500 ${
                          isActive
                            ? "text-[#DC2D26] translate-x-2"
                            : "text-[#F4F0E2] opacity-80 group-hover:opacity-100 group-hover:translate-x-2"
                        }`}
                        style={fontDisplay}
                      >
                        {item.title}
                      </h3>

                      {/* Animated Arrow Icon */}
                      <span
                        className={`transition-all duration-500 transform ${
                          isActive
                            ? "text-[#DC2D26] translate-x-2 rotate-90 sm:rotate-0"
                            : "text-[#F4F0E2]/30 group-hover:text-[#F4F0E2] group-hover:translate-x-1"
                        }`}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path
                            d="M5 12h14M12 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    {/* Description & Key Focus Pills */}
                    <div className="lg:col-span-6">
                      <p
                        className={`text-base sm:text-lg leading-relaxed font-light transition-all duration-500 ${
                          isActive
                            ? "text-[#F4F0E2] opacity-100"
                            : "text-[rgba(244,240,226,0.5)] group-hover:text-[rgba(244,240,226,0.8)]"
                        }`}
                      >
                        {item.description}
                      </p>

                      {/* Expandable Key Focus Tags */}
                      <div
                        className={`mt-6 flex flex-wrap gap-2 transition-all duration-500 overflow-hidden ${
                          isActive
                            ? "max-h-24 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.highlights.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs uppercase tracking-widest px-3 py-1 bg-[#F4F0E2]/10 border border-[#F4F0E2]/20 text-[#F4F0E2]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — PROCESS (Warm Architectural Stage Track) */}
      <section
        className="py-32 lg:py-40 overflow-hidden border-t border-[rgba(33,29,27,0.08)] transition-colors duration-700"
        style={{ backgroundColor: c.creamDeep }}
      >
        <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Reveal>
                <h2
                  className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight uppercase"
                  style={fontDisplay}
                >
                  FROM OPPORTUNITY
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">
                    TO MOMENTUM.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-6 text-lg sm:text-xl text-[rgba(33,29,27,0.7)] max-w-2xl leading-relaxed font-light">
                  The value is not simply in having different capabilities. It is in bringing them together at the right moment through a disciplined process.
                </p>
              </Reveal>
            </div>

            {/* Controls & Interactive Scroll Status Bar */}
            <Reveal delay={250} className="shrink-0 flex items-center gap-4">
              <button
                onClick={() => scrollProcess("prev")}
                aria-label="Previous Process Stage"
                className="w-12 h-12 border border-[#211D1B]/20 flex items-center justify-center hover:bg-[#211D1B] hover:text-[#F4F0E2] transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollProcess("next")}
                aria-label="Next Process Stage"
                className="w-12 h-12 border border-[#211D1B]/20 flex items-center justify-center hover:bg-[#211D1B] hover:text-[#F4F0E2] transition-colors duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </Reveal>
          </div>

          {/* Continuous Connecting Visual Progress Line */}
          <div className="relative w-full h-[2px] bg-[#211D1B]/10 mb-12">
            <div
              className="absolute left-0 top-0 h-full bg-[#DC2D26] transition-all duration-300 ease-out"
              style={{
                width: `${Math.max(processScrollProgress * 100, 20)}%`,
              }}
            />
          </div>

          {/* Horizontal Drag/Scroll Track */}
          <div
            ref={processScrollRef}
            onScroll={handleProcessScroll}
            className="flex no-scrollbar overflow-x-auto snap-x snap-mandatory pb-8 pt-2 gap-6 sm:gap-8 cursor-grab active:cursor-grabbing"
          >
            {PROCESS_STAGES.map((stage, i) => (
              <div
                key={stage.title}
                className="snap-start shrink-0 w-[85vw] sm:w-[380px] lg:w-[440px] p-8 sm:p-10 bg-[#F4F0E2] border border-[#211D1B]/10 relative group transition-all duration-500 hover:border-[#DC2D26] hover:shadow-xl flex flex-col justify-between"
              >
                {/* Top Active Indicator Bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DC2D26] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#DC2D26] font-semibold border-b border-[#DC2D26]/30 pb-1">
                      {stage.keyFocus}
                    </span>
                  </div>

                  <h3
                    className="text-4xl sm:text-5xl font-light tracking-tight uppercase text-[#211D1B] transition-colors duration-300 group-hover:text-[#DC2D26]"
                    style={fontDisplay}
                  >
                    {stage.title}
                  </h3>

                  <p className="mt-6 text-base sm:text-lg text-[rgba(33,29,27,0.7)] leading-relaxed font-light">
                    {stage.description}
                  </p>
                </div>

                {/* Subtitle stage progression note */}
                <div className="mt-12 pt-6 border-t border-[rgba(33,29,27,0.08)] flex items-center justify-between text-xs text-[rgba(33,29,27,0.5)]">
                  <span>DayOne Process</span>
                  <span className="group-hover:text-[#DC2D26] transition-colors">
                    Stage {i + 1} of {PROCESS_STAGES.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — GROWTH & GRAND FINALE CTA */}
      <section className="bg-[#F4F0E2] border-t border-[rgba(33,29,27,0.08)]">
        {/* Growth Philosophy Section */}
        <div className="px-6 py-32 sm:px-10 lg:px-16 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <h2
                  className="text-4xl sm:text-6xl font-light uppercase leading-[0.95] tracking-tight"
                  style={fontDisplay}
                >
                  BUILDING IS ONLY
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">
                    THE BEGINNING.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-8 flex flex-col gap-6 text-lg sm:text-xl text-[rgba(33,29,27,0.75)] leading-relaxed font-light">
                  <p>
                    A venture becomes valuable through what happens after the first launch. Customers respond. Markets change. Teams grow. New opportunities appear.
                  </p>
                  <p>
                    DayOne stays focused on the next stage — helping businesses learn from the market, improve the model, strengthen execution and build the momentum required for sustainable growth.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Principles Cards Column */}
            <div className="lg:col-span-6 flex flex-col gap-8">
              {PRINCIPLES.map((principle, i) => (
                <Reveal key={principle.title} delay={i * 120}>
                  <div className="group relative p-8 bg-[#ECE3CE]/50 border border-[rgba(33,29,27,0.08)] transition-all duration-500 hover:bg-[#ECE3CE] hover:border-[#DC2D26]">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#DC2D26] scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100" />
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#211D1B] transition-colors duration-300 group-hover:text-[#DC2D26]"
                      style={fontDisplay}
                    >
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-base sm:text-lg text-[rgba(33,29,27,0.7)] leading-relaxed font-light">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Grand Finale High-Impact DayOne Red CTA Block */}
        <div
          className="relative overflow-hidden px-6 py-32 sm:px-10 sm:py-44 flex justify-center items-center text-center transition-colors duration-700"
          style={{ backgroundColor: c.red }}
        >
          {/* Architectural Layered Frames */}
          <div className="absolute inset-4 sm:inset-10 border border-[#F4F0E2]/25 pointer-events-none" />
          <div className="absolute inset-8 sm:inset-16 border border-[#F4F0E2]/15 pointer-events-none hidden sm:block" />

          {/* Ambient Glow */}
          <div className="absolute w-[600px] h-[600px] bg-black/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <h2
              className="text-4xl sm:text-6.5xl lg:text-7.5xl xl:text-8xl font-light leading-[0.9] tracking-tight text-[#F4F0E2] uppercase"
              style={fontDisplay}
            >
              <TextMask delay={0}>READY TO BUILD</TextMask>
              <TextMask delay={150} className="italic font-normal">
                WHAT'S NEXT?
              </TextMask>
            </h2>

            <Reveal delay={300}>
              <p className="mt-8 max-w-xl text-lg sm:text-2xl text-[#F4F0E2]/90 leading-relaxed font-light">
                Have an opportunity worth exploring? Building something already? Let's start the conversation.
              </p>
            </Reveal>

            <Reveal delay={450} y="translate-y-12">
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none">
                <a
                  href="/contact"
                  className="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] bg-[#F4F0E2] text-[#DC2D26] shadow-2xl transition-all duration-500 hover:shadow-black/20 w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-12">
                    Start a conversation
                  </span>
                  <span className="absolute left-0 top-0 z-10 flex h-full w-full translate-y-12 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[#F4F0E2] bg-[#211D1B]">
                    Start a conversation
                  </span>
                </a>

                <a
                  href="/"
                  className="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F0E2] border border-[#F4F0E2]/40 hover:border-[#F4F0E2] transition-colors duration-300 w-full sm:w-auto text-center"
                >
                  <span className="relative z-10 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-12">
                    Explore DayOne
                  </span>
                  <span className="absolute left-0 top-0 z-10 flex h-full w-full translate-y-12 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-[#211D1B]">
                    Explore DayOne
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}