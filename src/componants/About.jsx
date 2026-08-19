"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Brand tokens — sampled from the DayOne wordmark                    */
/* ------------------------------------------------------------------ */
const c = {
  cream: "#F4F0E2",
  creamDeep: "#ECE3CE",
  red: "#DC2D26",
  charcoal: "#211D1B",
  charcoalMuted: "#615A50",
};

const fontDisplay = {
  fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif",
};
const fontBody = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
};

/* ------------------------------------------------------------------ */
/* Premium Animation Helpers                                          */
/* ------------------------------------------------------------------ */
function useReveal(threshold = 0.15) {
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

function Reveal({ children, className = "", delay = 0, y = "translate-y-8" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "opacity-100 translate-y-0" : `opacity-0 ${y}`
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function TextMask({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal(0.15);
  return (
    <span ref={ref} className={`overflow-hidden inline-block ${className}`}>
      <span
        className={`block transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          visible ? "translate-y-0" : "translate-y-[115%]"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}

function ImageMask({ src, alt, className = "", imgClassName = "", delay = 0 }) {
  const [ref, visible] = useReveal(0.15);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <div
        className={`w-full h-full transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          visible ? "clip-path-full scale-100 opacity-100" : "clip-path-inset scale-105 opacity-0"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105 ${imgClassName}`}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */
const journey = ["OPPORTUNITY", "IDEA", "BUILD", "OPERATE", "GROW", "SCALE"];

const stages = [
  {
    title: "DISCOVER",
    copy: "Identify opportunities, market gaps and customer problems.",
  },
  {
    title: "BUILD",
    copy: "Shape strategy, brand, product, technology and the business foundation.",
  },
  {
    title: "OPERATE",
    copy: "Work across people, systems, marketing, sales and operations.",
  },
  {
    title: "SCALE",
    copy: "Turn traction into sustainable growth and stronger businesses.",
  },
];

const traditional = ["Idea", "Separate Specialists", "Multiple Handoffs", "Execution"];
const dayone = ["Opportunity", "Strategy", "Brand", "Technology", "Operations", "Growth"];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
function About() {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const scrollStage = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div id="about" style={{ ...fontBody, backgroundColor: c.cream }} className="text-[#211D1B] antialiased selection:bg-[#DC2D26] selection:text-[#F4F0E2]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&display=swap');
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .clip-path-inset {
          clip-path: inset(100% 0 0 0);
        }
        .clip-path-full {
          clip-path: inset(0 0 0 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .clip-path-inset, .clip-path-full {
            clip-path: none !important;
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/* SECTION 1 — NEW EDITORIAL HERO                               */}
      {/* ============================================================ */}
      <section className="relative min-h-screen pt-8 pb-20 px-6 sm:px-10 lg:px-16 bg-[#F4F0E2] flex flex-col">
        {/* Subtle Top Nav/Eyebrow */}
        <Reveal delay={100} y="translate-y-4">
          <div className="flex justify-between items-center pb-6 border-b border-[#211D1B]/15">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">DayOne Studio</span>
            <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[#615A50]">Venture Architecture</span>
          </div>
        </Reveal>

        {/* Viewport-Scaling Massive Headline */}
        <div className="pt-12 pb-16 md:pt-20 md:pb-24 w-full">
          <h1 className="text-[14vw] sm:text-[11vw] leading-[0.8] font-light tracking-tighter uppercase text-[#211D1B]" style={fontDisplay}>
            <div className="flex">
              <TextMask delay={200}>ARCHITECTING</TextMask>
            </div>
            <div className="flex items-center gap-4 sm:gap-8 mt-2 sm:mt-4">
              <TextMask delay={350} className="italic text-[#DC2D26]">THE FUTURE.</TextMask>
              {/* Dynamic Line filling the rest of the space */}
              <Reveal delay={600} className="flex-1 hidden md:block">
                <div className="h-[2px] w-full bg-[#211D1B]/15 mt-4 sm:mt-8" />
              </Reveal>
            </div>
          </h1>
        </div>

        {/* Asymmetric 3-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1 relative">
          
          {/* Column 1: Copy & CTA */}
          <div className="lg:col-span-3 flex flex-col justify-end lg:pb-12 order-2 lg:order-1">
            <Reveal delay={500}>
              <p className="text-xl sm:text-2xl text-[#211D1B] font-light leading-snug mb-10" style={fontDisplay}>
                We don't just invest. We co-create, build, and scale categorical leaders from the ground up.
              </p>
              <button className="group flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-semibold text-[#211D1B] hover:text-[#DC2D26] transition-colors">
                <span className="w-12 h-[1px] bg-current transition-all duration-300 group-hover:w-16" />
                Explore The Model
              </button>
            </Reveal>
          </div>

          {/* Column 2: Main Hero Image */}
          <div className="lg:col-span-6 h-[50vh] sm:h-[60vh] lg:h-auto relative group order-1 lg:order-2 z-10">
            <ImageMask src="/about.png" alt="Architecting the future" delay={300} className="w-full h-full shadow-2xl" imgClassName="object-cover object-center" />
            
            {/* Spinning/Floating Red Badge */}
            <Reveal delay={800} className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 z-20 hidden sm:block">
              <div className="bg-[#DC2D26] text-[#F4F0E2] rounded-full w-32 h-32 flex items-center justify-center text-xs tracking-widest uppercase transform rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700 shadow-xl border-4 border-[#F4F0E2]">
                <div className="text-center font-medium leading-tight">
                  <span className="block mb-1">Built</span>
                  <span className="block border-t border-[#F4F0E2]/30 pt-1">To Last</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Column 3: Secondary Image + Accent Card */}
          <div className="lg:col-span-3 flex flex-col gap-6 order-3">
            <div className="flex-1 relative hidden lg:block overflow-hidden shadow-lg">
              <ImageMask src="/aboutbanner.png" alt="Studio details" delay={700} className="w-full h-full" imgClassName="object-cover" />
            </div>
            
            <Reveal delay={900}>
              <div className="bg-[#211D1B] text-[#F4F0E2] p-8 sm:p-10 flex flex-col justify-between shadow-xl min-h-[200px] lg:min-h-0">
                <div className="flex justify-between items-start">
                  <span className="w-2 h-2 rounded-full bg-[#DC2D26] animate-pulse" />
                  <span className="text-4xl font-light opacity-30" style={fontDisplay}>01</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] leading-loose mt-12 text-[#F4F0E2]/80">
                  Strategy <br/>
                  Design <br/>
                  Engineering <br/>
                  Growth
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — OUR STORY / MINDSET & JOURNEY                    */}
      {/* ============================================================ */}
      <section className="relative py-32 sm:py-40 bg-[#211D1B] text-[#F4F0E2] overflow-hidden">
        {/* Deep background warmth gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DC2D26]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight" style={fontDisplay}>
                  <span className="italic font-light text-[#ECE3CE]">IDEAS ARE BEGINNINGS.</span>
                  <br />
                  <span className="font-semibold text-[#F4F0E2] tracking-normal">BUSINESSES ARE BUILT.</span>
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-4 lg:pt-4">
              <Reveal delay={200}>
                <p className="text-lg sm:text-xl text-[#F4F0E2]/70 leading-relaxed font-light">
                  An idea is only the beginning. Building something meaningful requires understanding the opportunity, knowing the customer, making decisions, testing assumptions and staying close to execution.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Interactive Journey Track */}
          <div className="mt-28 border-t border-[#F4F0E2]/15 pt-16">
            <Reveal delay={100}>
              <div className="flex flex-col space-y-2">
                {journey.map((step, i) => {
                  const isActive = activeJourney === i;
                  return (
                    <div
                      key={step}
                      onClick={() => setActiveJourney(i)}
                      onMouseEnter={() => setActiveJourney(i)}
                      className={`group cursor-pointer py-6 sm:py-8 border-b border-[#F4F0E2]/10 transition-all duration-500 flex flex-col sm:flex-row sm:items-center justify-between ${
                        isActive ? "bg-[#F4F0E2]/5 px-4 sm:px-8" : "hover:px-4"
                      }`}
                    >
                      <div className="flex items-center space-x-6 sm:space-x-10">
                        <span className={`w-3 h-3 rounded-full transition-all duration-500 ${isActive ? "bg-[#DC2D26] scale-125" : "bg-[#F4F0E2]/20 group-hover:bg-[#DC2D26]"}`} />
                        <span
                          className={`text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight transition-all duration-500 ${
                            isActive ? "text-[#F4F0E2] translate-x-2 sm:translate-x-4" : "text-[#F4F0E2]/40 group-hover:text-[#F4F0E2]"
                          }`}
                          style={fontDisplay}
                        >
                          {step}
                        </span>
                      </div>

                      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <span className={`text-xs uppercase tracking-[0.2em] transition-opacity duration-500 ${isActive ? "opacity-100 text-[#DC2D26]" : "opacity-0"}`}>
                          Active Phase
                        </span>
                        <div className={`h-[2px] transition-all duration-500 ${isActive ? "w-16 sm:w-28 bg-[#DC2D26]" : "w-0 bg-[#F4F0E2]/30 group-hover:w-12"}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Banner Container */}
          <div className="mt-32 relative">
            <Reveal delay={200}>
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden group border border-[#F4F0E2]/20 shadow-2xl">
                <ImageMask src="/aboutbanner.png" alt="The DayOne Mindset" delay={200} className="w-full h-full" imgClassName="brightness-95 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211D1B] via-transparent to-transparent opacity-60" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — HOW WE BUILD / ECOSYSTEM                         */}
      {/* ============================================================ */}
      <section className="py-32 sm:py-40 bg-[#ECE3CE] text-[#211D1B] overflow-hidden relative border-t border-[#211D1B]/10">
        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <Reveal>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight" style={fontDisplay}>
                FROM FIRST IDEA
                <br />
                <span className="italic font-normal text-[#DC2D26]">TO REAL BUSINESS.</span>
              </h2>
            </Reveal>

            {/* Custom Interactive Scroll Controls */}
            <Reveal delay={200}>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => scrollStage("prev")}
                  aria-label="Previous slide"
                  className="w-14 h-14 rounded-full border border-[#211D1B]/30 flex items-center justify-center hover:bg-[#211D1B] hover:text-[#F4F0E2] transition-colors duration-300"
                >
                  <span className="text-xl">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollStage("next")}
                  aria-label="Next slide"
                  className="w-14 h-14 rounded-full border border-[#211D1B]/30 flex items-center justify-center hover:bg-[#211D1B] hover:text-[#F4F0E2] transition-colors duration-300"
                >
                  <span className="text-xl">→</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Horizontal Track Slider */}
        <div
          ref={scrollContainerRef}
          className="flex no-scrollbar overflow-x-auto snap-x snap-mandatory px-6 sm:px-10 lg:px-16 gap-6 sm:gap-8 pb-8 cursor-grab active:cursor-grabbing"
        >
          {stages.map((stage, i) => {
            const isSelected = activeStageIndex === i;
            return (
              <div
                key={stage.title}
                onClick={() => setActiveStageIndex(i)}
                onMouseEnter={() => setActiveStageIndex(i)}
                className={`snap-start shrink-0 w-[85vw] sm:w-[460px] lg:w-[520px] p-8 sm:p-12 min-h-[460px] flex flex-col justify-between transition-all duration-700 relative border ${
                  isSelected
                    ? "bg-[#211D1B] text-[#F4F0E2] border-[#DC2D26] shadow-2xl -translate-y-2"
                    : "bg-[#F4F0E2] text-[#211D1B] border-[#211D1B]/15 hover:border-[#211D1B]/40"
                }`}
              >
                {/* Active Indicator Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${isSelected ? "bg-[#DC2D26]" : "bg-transparent"}`} />

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className={`w-3 h-3 rounded-full ${isSelected ? "bg-[#DC2D26]" : "bg-[#211D1B]/20"}`} />
                    <span className={`text-xs uppercase tracking-widest ${isSelected ? "text-[#F4F0E2]/60" : "text-[#615A50]"}`}>
                      Stage
                    </span>
                  </div>

                  <p className={`text-xl sm:text-2xl leading-relaxed font-light ${isSelected ? "text-[#F4F0E2]/90" : "text-[#211D1B]/80"}`}>
                    {stage.copy}
                  </p>
                </div>

                <div className="pt-12 border-t border-current/15 flex items-end justify-between">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight" style={fontDisplay}>
                    {stage.title}
                  </h3>
                  <span className={`text-2xl transition-transform duration-500 ${isSelected ? "translate-x-2 text-[#DC2D26]" : "opacity-30"}`}>
                    →
                  </span>
                </div>
              </div>
            );
          })}

          {/* Capstone Card */}
          <div className="snap-start shrink-0 w-[85vw] sm:w-[500px] lg:w-[580px] p-8 sm:p-12 min-h-[460px] flex flex-col justify-between bg-[#DC2D26] text-[#F4F0E2] border border-[#DC2D26]">
            <div className="w-3 h-3 rounded-full bg-[#F4F0E2]" />
            <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-snug" style={fontDisplay}>
              DayOne stays close to the work — from identifying the opportunity to building the momentum required for growth.
            </p>
            <div className="pt-8 border-t border-[#F4F0E2]/20 text-xs uppercase tracking-widest font-medium">
              Continuous Studio Involvement
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — DAYONE ADVANTAGE & FINAL STATEMENT               */}
      {/* ============================================================ */}
      <section className="bg-[#211D1B] text-[#F4F0E2] relative overflow-hidden">
        {/* Model Comparison */}
        <div className="px-6 py-32 sm:px-10 sm:py-40 lg:px-16 mx-auto max-w-7xl border-b border-[#F4F0E2]/10">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight max-w-4xl" style={fontDisplay}>
              BUILT AROUND <span className="italic text-[#DC2D26] font-normal">THE WORK.</span>
            </h2>
          </Reveal>

          <div className="mt-24 grid md:grid-cols-2 gap-16 md:gap-24 relative">
            {/* Center Vertical Divider Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#F4F0E2]/10" />

            {/* Traditional Column */}
            <div className="space-y-10">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.2em] text-[#F4F0E2]/40 mb-6 font-medium">
                  Traditional Approach
                </div>
              </Reveal>
              <div className="space-y-6">
                {traditional.map((item, i) => (
                  <Reveal key={item} delay={i * 80}>
                    <div className="relative inline-block group cursor-default">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4F0E2]/30 transition-colors duration-300 group-hover:text-[#F4F0E2]/50" style={fontDisplay}>
                        {item}
                      </span>
                      <span className="absolute left-0 top-1/2 h-[1px] w-full bg-[#DC2D26]/60 pointer-events-none" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* DayOne Model Column */}
            <div className="space-y-10">
              <Reveal delay={200}>
                <div className="text-xs uppercase tracking-[0.2em] text-[#DC2D26] mb-6 font-medium">
                  The DayOne Model
                </div>
              </Reveal>
              <div className="space-y-6">
                {dayone.map((item, i) => (
                  <Reveal key={item} delay={200 + i * 80}>
                    <div className="flex items-center space-x-6 group cursor-default">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DC2D26] transition-transform duration-300 group-hover:scale-150" />
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F4F0E2] transition-colors duration-300 group-hover:text-[#DC2D26]" style={fontDisplay}>
                        {item}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Statement & CTA Section */}
        <div className="relative py-36 sm:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden flex items-center justify-center text-center bg-gradient-to-b from-[#211D1B] to-[#DC2D26]">
          {/* Subtle Layered Border Framing */}
          <div className="absolute inset-6 sm:inset-12 border border-[#F4F0E2]/15 pointer-events-none" />
          <div className="absolute inset-10 sm:inset-16 border border-[#F4F0E2]/5 pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-light leading-[0.95] tracking-tight text-[#F4F0E2]" style={fontDisplay}>
              <div className="block"><TextMask delay={0}>EVERY ESTABLISHED</TextMask></div>
              <div className="block"><TextMask delay={150}>BUSINESS ONCE HAD</TextMask></div>
              <div className="block mt-2"><TextMask delay={300} className="italic font-semibold text-[#F4F0E2]">A DAY ONE.</TextMask></div>
            </h2>

            <Reveal delay={450} y="translate-y-10">
              <div className="mt-16 flex flex-col sm:flex-row gap-6 items-center">
                <button
                  type="button"
                  className="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] bg-[#F4F0E2] text-[#211D1B] transition-all duration-500 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-y-12">
                    Build With DayOne →
                  </span>
                  <span className="absolute left-0 top-0 z-10 flex h-full w-full translate-y-12 items-center justify-center transition-transform duration-500 group-hover:translate-y-0 text-[#F4F0E2] bg-[#211D1B]">
                    Build With DayOne →
                  </span>
                </button>

                <button
                  type="button"
                  className="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F0E2] border border-[#F4F0E2]/40 hover:border-[#F4F0E2] transition-colors duration-300"
                >
                  <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-y-12">
                    Explore Ventures
                  </span>
                  <span className="absolute left-0 top-0 z-10 flex h-full w-full translate-y-12 items-center justify-center transition-transform duration-500 group-hover:translate-y-0 bg-[#F4F0E2]/10">
                    Explore Ventures
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 