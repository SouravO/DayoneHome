"use client";

import { useEffect, useRef, useState } from "react";
import BuildWithUs from "./BuildWithUs";
import serviceImage from "../assets/service.png";

// Brand tokens
const c = {
  cream: "#F4F1DF",
  creamDeep: "#E8E4D3",
  red: "#DD3027",
  charcoal: "#221F1F",
};

const fontDisplay = { fontFamily: "var(--display)" };
const fontBody = { fontFamily: "var(--sans)" };

// Reveal-on-scroll hook
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

function Reveal({ children, className = "", delay = 0, y = "translate-y-10", duration = 1000 }) {
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

function ArrowIcon({ path, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScrollArrowButton({ onClick, ariaLabel, path }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-12 h-12 border border-[#211D1B]/20 flex items-center justify-center hover:bg-[#211D1B] hover:text-[#F4F0E2] transition-colors duration-300"
    >
      <ArrowIcon path={path} />
    </button>
  );
}

function SlideCTA({ href, outerClassName, innerActiveClassName, children }) {
  return (
    <a href={href} className={outerClassName}>
      <span className="relative z-10 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-12">
        {children}
      </span>
      <span
        className={`absolute left-0 top-0 z-10 flex h-full w-full translate-y-12 items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 ${innerActiveClassName}`}
      >
        {children}
      </span>
    </a>
  );
}

// Content data (from DAYONE Website Content PDF)
const CAPABILITIES = [
  {
    title: "Strategy & direction",
    description:
      "We stay close to the venture and work on the strategy behind every decision it makes.",
    highlights: ["Strategic Direction", "Close Support", "Founder Alignment"],
  },
  {
    title: "Brand & product",
    description:
      "We build the brand and shape the product, giving every venture a clear identity and experience.",
    highlights: ["Brand Identity", "Product Development", "Customer Experience"],
  },
  {
    title: "Go-to-market",
    description:
      "We develop the go-to-market plan that takes a venture from idea to the customers who need it.",
    highlights: ["Positioning", "Distribution", "Customer Acquisition"],
  },
  {
    title: "Numbers & operations",
    description:
      "We monitor the numbers and solve the operational problems that come with building a company.",
    highlights: ["Performance Monitoring", "Operational Support", "Problem-Solving"],
  },
  {
    title: "Team building",
    description:
      "We help build the team behind every venture, from first hires to leadership.",
    highlights: ["Hiring", "Team Structuring", "Leadership"],
  },
  {
    title: "Capital readiness",
    description: "When the business is ready, we help prepare it for capital.",
    highlights: ["Investor Preparation", "Capital Readiness", "Fundraising Support"],
  },
];

const PROCESS_STAGES = [
  {
    title: "Discover",
    description: "Understand the founder, problem, customer and market.",
    keyFocus: "Founder & Market Discovery",
  },
  {
    title: "Validate",
    description: "Test demand, business model, pricing and commercial viability.",
    keyFocus: "Demand & Viability",
  },
  {
    title: "Build",
    description: "Develop the product, brand, technology, team and operating foundation.",
    keyFocus: "Product & Foundation",
  },
  {
    title: "Go To Market",
    description: "Define positioning, launch the venture, build distribution and acquire customers.",
    keyFocus: "Market Entry",
  },
  {
    title: "Grow",
    description: "Improve revenue, retention, performance, systems and expansion.",
    keyFocus: "Revenue & Retention",
  },
  {
    title: "Scale",
    description: "Strengthen leadership, governance, capital strategy and investor readiness.",
    keyFocus: "Investor Readiness",
  },
];

const PRINCIPLES = [
  {
    title: "Better validation & founders",
    description:
      "Avoidable failure gets reduced through better validation and better founders — the earliest signals of whether a venture is built to last.",
  },
  {
    title: "Better economics & systems",
    description:
      "Better economics and better operating systems keep ventures financially sound and structurally strong as they grow.",
  },
  {
    title: "Better execution & earlier intervention",
    description:
      "Better execution and earlier intervention mean problems get caught — and solved — before they become irreversible.",
  },
];

export default function Service() {
  const capabilitiesRef = useRef(null);
  const processScrollRef = useRef(null);
  const [activeCapIndex, setActiveCapIndex] = useState(0);
  const [processScrollProgress, setProcessScrollProgress] = useState(0);

  function handleExploreClick(e) {
    e.preventDefault();
    capabilitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleProcessScroll = () => {
    if (!processScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = processScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setProcessScrollProgress(Math.min(Math.max(scrollLeft / maxScroll, 0), 1));
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
    <div style={{ ...fontBody, backgroundColor: c.cream }} className="text-[#211D1B] antialiased selection:bg-[#DC2D26] selection:text-white overflow-x-clip">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=Inter:wght@300;400;500;600&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glow-red-subtle { box-shadow: 0 0 60px -15px rgba(220, 45, 38, 0.25); }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-[85vh] lg:min-h-screen flex flex-col justify-between overflow-hidden px-6 pt-24 pb-12 sm:px-10 lg:px-16 border-b border-[rgba(33,29,27,0.08)]">
        <div className="absolute inset-0 pointer-events-none grid grid-cols-4 md:grid-cols-12 max-w-7xl mx-auto opacity-[0.03]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-[#211D1B] h-full" />
          ))}
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            <div className="lg:col-span-8 flex flex-col">
              <h1 className="text-[3.5rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] font-light leading-[0.88] tracking-tight uppercase" style={fontDisplay}>
                <TextMask delay={100}>WE DO NOT SIMPLY</TextMask>
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  <TextMask delay={220} className="italic font-normal text-[#DC2D26]">
                    ADVISE.
                  </TextMask>
                  <span className="hidden sm:inline-block h-[2px] w-16 lg:w-24 bg-[#DC2D26] align-middle rounded-full my-auto" />
                </div>
                <TextMask delay={340}>WE BUILD.</TextMask>
              </h1>
            </div>

            <div className="lg:col-span-4 lg:pt-6">
              <Reveal delay={450}>
                <div className="border-l-2 border-[#DC2D26] pl-6 py-1">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#DC2D26] font-semibold mb-2">
                    WHAT WE DO
                  </p>
                  <p className="text-base sm:text-lg text-[rgba(33,29,27,0.75)] leading-relaxed font-light">
                    DAYONE works with selected founders to build ventures from idea to scale through hands-on support, specialist operators, structured execution and access to capital.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 lg:mt-16 grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 flex flex-col gap-8">
              <Reveal delay={550}>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-light leading-[1.25] tracking-tight text-[#211D1B]" style={fontDisplay}>
                  Build the startups. Not the support system around it.
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
                    Strategy. Product. Brand. Growth. Operations. Technology. Capital.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 relative">
              <Reveal delay={750} y="translate-y-12">
                <div className="relative group mx-auto max-w-xl lg:max-w-none">
                  <div className="absolute -inset-3 sm:-inset-4 border border-[rgba(33,29,27,0.15)] pointer-events-none transition-all duration-700 group-hover:border-[#DC2D26]/40" />
                  <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-[#211D1B] glow-red-subtle">
                    <img
                      src={serviceImage}
                      alt="Dayone Ventures Execution"
                      className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#211D1B]/80 via-transparent to-transparent opacity-60" />
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

      <BuildWithUs />

      {/* CAPABILITIES */}
      <section
        id="capabilities"
        ref={capabilitiesRef}
        className="relative py-16 lg:py-24 text-[#F4F0E2] transition-colors duration-700"
        style={{ backgroundColor: c.charcoal }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2D26]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8 items-end pb-12 border-b border-[rgba(244,240,226,0.12)]">
            <div className="lg:col-span-8">
              <Reveal>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight uppercase" style={fontDisplay}>
                  WE STAY CLOSE
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">TO THE VENTURE.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={150}>
                <p className="text-base sm:text-lg text-[rgba(244,240,226,0.7)] leading-relaxed font-light">
                  The early years of a startup force founders to become strategists, marketers, recruiters, salespeople, operators and fundraisers at the same time. DAYONE exists to reduce that fragmentation, bringing the support infrastructure around selected founders so they can spend more time building the company that matters.
                </p>
              </Reveal>
            </div>
          </div>

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
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#DC2D26] transition-transform duration-500 ease-out origin-top ${
                      isActive ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  <div className="grid lg:grid-cols-12 gap-6 items-start pl-4 sm:pl-8 pr-4">
                    <div className="lg:col-span-6 flex items-center justify-between">
                      <h3
                        className={`text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight transition-all duration-500 ${
                          isActive ? "text-[#DC2D26] translate-x-2" : "text-[#F4F0E2] opacity-80 group-hover:opacity-100 group-hover:translate-x-2"
                        }`}
                        style={fontDisplay}
                      >
                        {item.title}
                      </h3>

                      <span
                        className={`transition-all duration-500 transform ${
                          isActive
                            ? "text-[#DC2D26] translate-x-2 rotate-90 sm:rotate-0"
                            : "text-[#F4F0E2]/30 group-hover:text-[#F4F0E2] group-hover:translate-x-1"
                        }`}
                      >
                        <ArrowIcon path="M5 12h14M12 5l7 7-7 7" size={28} />
                      </span>
                    </div>

                    <div className="lg:col-span-6">
                      <p
                        className={`text-base sm:text-lg leading-relaxed font-light transition-all duration-500 ${
                          isActive ? "text-[#F4F0E2] opacity-100" : "text-[rgba(244,240,226,0.5)] group-hover:text-[rgba(244,240,226,0.8)]"
                        }`}
                      >
                        {item.description}
                      </p>

                      <div
                        className={`mt-6 flex flex-wrap gap-2 transition-all duration-500 overflow-hidden ${
                          isActive ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.highlights.map((tag) => (
                          <span key={tag} className="text-xs uppercase tracking-widest px-3 py-1 bg-[#F4F0E2]/10 border border-[#F4F0E2]/20 text-[#F4F0E2]">
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

      {/* PROCESS */}
      <section className="py-16 lg:py-24 overflow-hidden border-t border-[rgba(33,29,27,0.08)] transition-colors duration-700" style={{ backgroundColor: c.creamDeep }}>
        <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <Reveal>
                <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight uppercase" style={fontDisplay}>
                  FROM IDEA
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">TO SCALE.</span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-6 text-lg sm:text-xl text-[rgba(33,29,27,0.7)] max-w-2xl leading-relaxed font-light">
                  A DAYONE venture moves through a structured building process — from discovery and validation to go-to-market, growth, scale and capital.
                </p>
              </Reveal>
            </div>

            <Reveal delay={250} className="shrink-0 flex items-center gap-4">
              <ScrollArrowButton onClick={() => scrollProcess("prev")} ariaLabel="Previous Process Stage" path="M19 12H5M12 19l-7-7 7-7" />
              <ScrollArrowButton onClick={() => scrollProcess("next")} ariaLabel="Next Process Stage" path="M5 12h14M12 5l7 7-7 7" />
            </Reveal>
          </div>

          <div className="relative w-full h-[2px] bg-[#211D1B]/10 mb-12">
            <div
              className="absolute left-0 top-0 h-full bg-[#DC2D26] transition-all duration-300 ease-out"
              style={{ width: `${Math.max(processScrollProgress * 100, 20)}%` }}
            />
          </div>

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
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DC2D26] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#DC2D26] font-semibold border-b border-[#DC2D26]/30 pb-1">
                      {stage.keyFocus}
                    </span>
                  </div>

                  <h3 className="text-4xl sm:text-5xl font-light tracking-tight uppercase text-[#211D1B] transition-colors duration-300 group-hover:text-[#DC2D26]" style={fontDisplay}>
                    {stage.title}
                  </h3>

                  <p className="mt-6 text-base sm:text-lg text-[rgba(33,29,27,0.7)] leading-relaxed font-light">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-12 pt-6 border-t border-[rgba(33,29,27,0.08)] flex items-center justify-between text-xs text-[rgba(33,29,27,0.5)]">
                  <span>Dayone Process</span>
                  <span className="group-hover:text-[#DC2D26] transition-colors">
                    Stage {i + 1} of {PROCESS_STAGES.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROWTH & FINALE CTA */}
      <section className="bg-[#F4F0E2] border-t border-[rgba(33,29,27,0.08)]">
        <div className="px-6 py-16 sm:px-10 lg:px-16 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-6">
              <Reveal>
                <h2 className="text-4xl sm:text-6xl font-light uppercase leading-[0.95] tracking-tight" style={fontDisplay}>
                  INCREASE THE STARTUP
                  <br />
                  <span className="italic font-normal text-[#DC2D26]">SUCCESS RATIO.</span>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-8 flex flex-col gap-6 text-lg sm:text-xl text-[rgba(33,29,27,0.75)] leading-relaxed font-light">
                  <p>
                    Startup building will always involve uncertainty. We cannot eliminate failure. But we believe avoidable failure can be reduced — through better validation, better founders, better economics, better operating systems, better execution and earlier intervention.
                  </p>
                  <p>
                    DAYONE's long-term operating ambition is to build a portfolio where the success ratio moves beyond 25%, and continues improving as our venture-building intelligence compounds. Not as a marketing claim — as a number we intend to measure.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-8">
              {PRINCIPLES.map((principle, i) => (
                <Reveal key={principle.title} delay={i * 120}>
                  <div className="group relative p-8 bg-[#ECE3CE]/50 border border-[rgba(33,29,27,0.08)] transition-all duration-500 hover:bg-[#ECE3CE] hover:border-[#DC2D26]">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#DC2D26] scale-y-0 origin-top transition-transform duration-500 ease-out group-hover:scale-y-100" />
                    <h3 className="text-2xl sm:text-3xl font-light text-[#211D1B] transition-colors duration-300 group-hover:text-[#DC2D26]" style={fontDisplay}>
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

        <div
          className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28 flex justify-center items-center text-center transition-colors duration-700"
          style={{ backgroundColor: c.red }}
        >
          <div className="absolute inset-4 sm:inset-10 border border-[#F4F0E2]/25 pointer-events-none" />
          <div className="absolute inset-8 sm:inset-16 border border-[#F4F0E2]/15 pointer-events-none hidden sm:block" />
          <div className="absolute w-[600px] h-[600px] bg-black/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-4xl sm:text-6.5xl lg:text-7.5xl xl:text-8xl font-light leading-[0.9] tracking-tight text-[#F4F0E2] uppercase" style={fontDisplay}>
              <TextMask delay={0}>LOOKING FOR</TextMask>
              <TextMask delay={150} className="italic font-normal">
                VENTURES?
              </TextMask>
            </h2>

            <Reveal delay={300}>
              <p className="mt-8 max-w-xl text-lg sm:text-2xl text-[#F4F0E2]/90 leading-relaxed font-light">
                Discover companies being built inside the DAYONE ecosystem.
              </p>
            </Reveal>

            <Reveal delay={450} y="translate-y-12">
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md sm:max-w-none">
                <SlideCTA
                  href="/contact"
                  outerClassName="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] bg-[#F4F0E2] text-[#DC2D26] shadow-2xl transition-all duration-500 hover:shadow-black/20 w-full sm:w-auto text-center"
                  innerActiveClassName="text-[#F4F0E2] bg-[#211D1B]"
                >
                  Start a conversation
                </SlideCTA>

                <SlideCTA
                  href="/"
                  outerClassName="group relative overflow-hidden px-10 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F0E2] border border-[#F4F0E2]/40 hover:border-[#F4F0E2] transition-colors duration-300 w-full sm:w-auto text-center"
                  innerActiveClassName="text-[#211D1B]"
                >
                  Explore DayOne
                </SlideCTA>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
