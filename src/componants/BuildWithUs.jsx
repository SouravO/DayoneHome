import { useEffect, useRef, useState } from "react";

const BUILD_TOGETHER_STATES = [
  {
    title: "Founders bring",
    desc: "Ambition, insight and a market opportunity worth building around.",
    bg: "#E3B651",
  },
  {
    title: "Dayone brings",
    desc: "The AXIS methodology, multidisciplinary teams, infrastructure and relationships to build it.",
    bg: "#181512",
  },
  {
    title: "Investors bring",
    desc: "Patient, strategic and growth capital that follows evidence, not enthusiasm.",
    bg: "#3B6946",
  },
  {
    title: "Together we create",
    desc: "Validated ventures, faster execution, stronger governance and scalable companies.",
    bg: "#E09C83",
  },
];

const ICONS = [
  <svg key="ideas" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="60" cy="60" r="6" fill="white" />
    <path d="M60 20L60 35M60 85L60 100M20 60L35 60M85 60L100 60M31.7157 31.7157L42.3223 42.3223M77.6777 77.6777L88.2843 88.2843M31.7157 88.2843L42.3223 77.6777M77.6777 42.3223L88.2843 31.7157M45 23L50 36M75 97L70 84M23 75L36 70M97 45L84 50M23 45L36 50M97 75L84 70M45 97L50 84M75 23L70 36" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>,
  <svg key="focus" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <circle cx="42" cy="60" r="18" fill="white" /><circle cx="78" cy="60" r="18" fill="white" /><circle cx="60" cy="42" r="18" fill="white" /><circle cx="60" cy="78" r="18" fill="white" />
    <rect x="36" y="54" width="12" height="12" fill="#181512" /><path d="M78 54L84 60L78 66L72 60L78 54Z" fill="#181512" /><path d="M60 34C60 34 63 42 66 42C63 42 60 50 60 50C60 50 57 42 54 42C57 42 60 34 60 34Z" fill="#181512" /><path d="M60 70C60 70 63 78 66 78C63 78 60 86 60 86C60 86 57 78 54 78C57 78 60 70 60 70Z" fill="#181512" />
  </svg>,
  <svg key="advantage" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <path d="M30 30H50V50H30V30Z M55 30H75V50H55V30Z M80 30H100V50H80V30Z M30 55H50V75H30V55Z M55 55H75V75H55V55Z M80 55L100 75H80V55Z M30 80H50V100H30V80Z M55 80L75 100H55V80Z" fill="white" />
    <path d="M30 30L50 50H30V30Z M55 30L75 50H55V30Z M30 55L50 75H30V55Z M30 80L50 100H30V80Z M55 55L75 75H55V55Z" fill="#3B6946" />
  </svg>,
  <svg key="impact" width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <path d="M60 40C60 40 64 52 70 52C64 52 60 64 60 64C60 64 56 52 50 52C56 52 60 40 60 40Z M36 60C36 60 48 88 60 88C60 88 60 70 60 60C60 60 46 54 36 60Z M84 60C84 60 72 88 60 88C60 88 60 70 60 60C60 60 74 54 84 60Z" fill="white" />
  </svg>,
];

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      const currentScroll = -rect.top;
      const nextProgress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setProgress(Math.max(0, Math.min(1, nextProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
}

export default function BuildWithUs() {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const activeIndex = Math.min(BUILD_TOGETHER_STATES.length - 1, Math.floor(progress * BUILD_TOGETHER_STATES.length));

  return (
    <section ref={containerRef} className="relative w-full h-[400vh]" style={{ backgroundColor: "#F4F0E2" }}>
      <div className="sticky top-0 w-full h-[100svh] flex flex-col lg:flex-row items-center px-6 sm:px-10 lg:px-16 2xl:px-24 max-w-[100rem] mx-auto pt-24 lg:pt-32">
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pr-16 shrink-0 z-10 pb-8 lg:pb-0">
          <h2 className="text-[10vw] lg:text-[5.5vw] font-medium leading-[1.05] tracking-tight mb-6 lg:mb-8" style={{ color: "#211D1B" }}>
            Built with<br />
            founders.<br />
            Powered by<br />
            execution.
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-md" style={{ color: "rgba(33, 29, 27, 0.65)" }}>
            Scaled with intelligent capital — because every venture we build compounds three things at once: founder ambition, embedded execution and long-term capital.
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center z-0 pb-16 lg:pb-0">
          <div className="relative w-full max-w-[28rem] mx-auto aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
            {BUILD_TOGETHER_STATES.map((state, index) => (
              <div
                key={state.title}
                className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center transition-opacity duration-700 ease-in-out"
                style={{ backgroundColor: state.bg, opacity: activeIndex === index ? 1 : 0, pointerEvents: activeIndex === index ? "auto" : "none", zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="mb-8 lg:mb-12 transition-transform duration-[1200ms] ease-out" style={{ transform: activeIndex === index ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)" }}>
                  {ICONS[index]}
                </div>
                <div className="text-white transition-all duration-[1000ms] delay-100 ease-out" style={{ opacity: activeIndex === index ? 1 : 0, transform: activeIndex === index ? "translateY(0)" : "translateY(15px)" }}>
                  <h3 className="text-2xl lg:text-4xl font-medium tracking-tight mb-3 lg:mb-4">{state.title}</h3>
                  <p className="text-sm lg:text-lg opacity-90 max-w-sm mx-auto leading-relaxed">{state.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}